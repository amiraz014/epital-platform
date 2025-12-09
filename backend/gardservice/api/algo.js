const express = require('express');
const router = express.Router();
const db = require('../db');
const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');

dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);

const SECTORS = ['Secteur A', 'Secteur B', 'Secteur C', 'Secteur D', 'Secteur E', 'Secteur F'];
const MAX_GUARDS_PER_WEEK = 3;


async function getEmployeesByProfession(professionId) {
  const result = await db.query(
    'SELECT * FROM employe WHERE profession_idp = $1',
    [professionId]
  );
  return result.rows;
}

async function countGuardsByEmployeeAndType(employeeId, type) {
  const result = await db.query(
    'SELECT COUNT(*) AS cnt FROM garde WHERE employe_ide = $1 AND type = $2',
    [employeeId, type]
  );
  return parseInt(result.rows[0].cnt, 10);
}

async function getGuardsByEmployeeBetween(employeeId, startDate, endDate) {
  const result = await db.query(
    'SELECT * FROM garde WHERE employe_ide = $1 AND date BETWEEN $2 AND $3',
    [employeeId, startDate, endDate]
  );
  return result.rows;
}

async function getSectorsByEmployee(employeeId) {
  const result = await db.query(
    'SELECT DISTINCT l.secteur FROM garde g JOIN lieu l ON g.lieu_idl = l.idl WHERE g.employe_ide = $1',
    [employeeId]
  );
  return result.rows.map(r => r.secteur);
}

async function deleteGuardsBetween(startDate, endDate) {
  await db.query(
    'DELETE FROM garde WHERE date BETWEEN $1 AND $2',
    [startDate, endDate]
  );
}

async function findPlaceBySector(sector) {
  const result = await db.query(
    'SELECT * FROM lieu WHERE secteur = $1',
    [sector]
  );
  return result.rows[0] || null;
}

async function createPlace(sector) {
  const result = await db.query(
    'INSERT INTO lieu (secteur) VALUES ($1) RETURNING *',
    [sector]
  );
  return result.rows[0];
}

async function createGuard({ date, type, time, employeeId, placeId }) {
  await db.query(
    'INSERT INTO garde (date, heure, type, employe_ide, lieu_idl) VALUES ($1, $2, $3, $4, $5)',
    [date, time, type, employeeId, placeId]
  );
}



function getRandomSubarray(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function getTimeForType(type) {
  return type === 'MORNING' ? '08:00:00' : '20:00:00';
}



router.post('/guard-algo', async (req, res) => {
  try {
    const { end } = req.body;
    if (!end) {
      return res.status(400).json({ error: 'end (YYYY-MM-DD) is required' });
    }

    const startDate = dayjs().startOf('day');
    const endDate = dayjs(end, 'YYYY-MM-DD').startOf('day');
    if (endDate.isBefore(startDate)) {
      return res.status(400).json({ error: 'end must be >= today' });
    }

   
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const deleteStart = startDate.isBefore(yesterday)
      ? startDate.format('YYYY-MM-DD')
      : null;
    const deleteEnd = endDate.isAfter(yesterday)
      ? yesterday
      : endDate.format('YYYY-MM-DD');

    if (deleteStart && dayjs(deleteStart).isSameOrBefore(deleteEnd)) {
      await deleteGuardsBetween(deleteStart, deleteEnd);
    }

    
    const employees = await getEmployeesByProfession(40);
    if (!employees.length) {
      return res.status(400).json({ error: 'No employees available for guards' });
    }

    
    const daysOff = {};       
    const morningCount = {};   
    const eveningCount = {};   
    const weeklyCounts = {};   
    const sectorHistory = {};  

    
    for (const e of employees) {
      const morning = await countGuardsByEmployeeAndType(e.ide, 'MORNING');
      const evening = await countGuardsByEmployeeAndType(e.ide, 'EVENING');
      morningCount[e.ide] = morning;
      eveningCount[e.ide] = evening;
    }

   
    for (const e of employees) {
      const guards = await getGuardsByEmployeeBetween(
        e.ide,
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD')
      );
      const weekMap = {};
      for (const g of guards) {
        const week = dayjs(g.date).isoWeek();
        weekMap[week] = (weekMap[week] || 0) + 1;
      }
      weeklyCounts[e.ide] = weekMap;
    }

   
    for (const e of employees) {
      const sectors = await getSectorsByEmployee(e.ide);
      sectorHistory[e.ide] = new Set(sectors);
    }

   


    let current = startDate.clone();
    while (current.isSameOrBefore(endDate)) {
      const dateStr = current.format('YYYY-MM-DD');
      const week = current.isoWeek();

      

      const dayOfMonth = current.date();
      const types =
        dayOfMonth % 2 === 0 ? ['MORNING', 'EVENING'] : ['EVENING', 'MORNING'];

      for (const type of types) {
        for (const sector of SECTORS) {
          const candidate = employees
            
            .filter(e => (weeklyCounts[e.ide][week] || 0) < MAX_GUARDS_PER_WEEK)
         
            .filter(e => {
              const diff = (morningCount[e.ide] || 0) - (eveningCount[e.ide] || 0);
              if (type === 'MORNING') return diff <= 0;
              return diff >= 0;
            })
            
            .sort((a, b) => {
              const histA = sectorHistory[a.ide] || new Set();
              const histB = sectorHistory[b.ide] || new Set();

              const aHas = histA.has(sector) ? 1 : 0;
              const bHas = histB.has(sector) ? 1 : 0;
              if (aHas !== bHas) return aHas - bHas;

              const freqA = histA.has(sector) ? 1 : 0;
              const freqB = histB.has(sector) ? 1 : 0;
              if (freqA !== freqB) return freqA - freqB;

              const diffA =
                (morningCount[a.ide] || 0) - (eveningCount[a.ide] || 0);
              const diffB =
                (morningCount[b.ide] || 0) - (eveningCount[b.ide] || 0);
              const scoreA = type === 'MORNING' ? -diffA : diffA;
              const scoreB = type === 'MORNING' ? -diffB : diffB;
              return scoreA - scoreB;
            })[0];

          if (!candidate) {
          
            console.warn(`No employee for ${sector} - ${type} on ${dateStr}`);
            continue;
          }

          let place = await findPlaceBySector(sector);
          if (!place) {
            place = await createPlace(sector);
          }

          await createGuard({
            date: dateStr,
            type,
            time: getTimeForType(type),
            employeeId: candidate.ide,
            placeId: place.idl ?? place.id
          });

          weeklyCounts[candidate.ide][week] =
            (weeklyCounts[candidate.ide][week] || 0) + 1;
          sectorHistory[candidate.ide].add(sector);
          

          if (type === 'MORNING') {
            morningCount[candidate.ide] =
              (morningCount[candidate.ide] || 0) + 1;
          } else {
            eveningCount[candidate.ide] =
              (eveningCount[candidate.ide] || 0) + 1;
          }
        }
      }

      current = current.add(1, 'day');
    }

    return res.json({ message: 'Schedule generated (debug mode) successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
