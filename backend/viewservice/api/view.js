const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/gard-view', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT g.*, l.secteur 
            FROM garde g
            LEFT JOIN lieu l ON g.lieu_idl = l.idl
            ORDER BY g.date
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching guards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
});


router.get('/employees-with-guards', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT DISTINCT e.* 
            FROM employe e
            INNER JOIN garde g ON e.ide = g.employe_ide
            WHERE e.profession_idp = 40
            ORDER BY e.nom
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching employees with guards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/employee-view', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM employe');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/job-view', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM profression');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
