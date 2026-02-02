'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ViewPage() {
  const [data, setData] = useState({ gardes: [], employees: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        const baseURL = process.env.NODE_ENV === 'production' 
          ? 'http://viewservice:3000' 
          : 'http://localhost:3002';
        
        const [gardesRes, employeesRes] = await Promise.all([
          fetch(`${baseURL}/api/gard-view`),
          fetch(`${baseURL}/api/employees-with-guards`)
        ]);

        if (!mounted) return;

        if (!gardesRes.ok || !employeesRes.ok) {
          throw new Error('Erreur lors du chargement des données');
        }

        const gardes = await gardesRes.json();
        const employees = await employeesRes.json();

        console.log('Données reçues:', { gardes: gardes.length, employees: employees.length });

        setData({ 
          gardes: Array.isArray(gardes) ? gardes : [], 
          employees: Array.isArray(employees) ? employees : [] 
        });
      } catch (err) {
        console.error('Erreur fetch:', err);
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, []);

  // Filtre par nom uniquement (sans prénom)
  const filteredEmployees = Array.isArray(data.employees) 
    ? data.employees.filter(emp => {
        if (!searchName) return true;
        const name = (emp.nom || '').toLowerCase();
        return name.includes(searchName.toLowerCase());
      })
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-xl p-6 max-w-md">
          <p className="text-red-200 text-center mb-2">⚠️ {error}</p>
          <p className="text-red-300 text-sm text-center">Vérifiez que le backend est démarré sur le port 3002</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-4">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-white font-semibold">Retour</span>
          </Link>

          {/* Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher par nom..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-gray-500"
              />
              {searchName && (
                <button
                  onClick={() => setSearchName('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <span className="text-gray-400 text-sm whitespace-nowrap">
              {filteredEmployees.length} / {data.employees.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Planning des <span className="text-gradient">Gardes</span>
          </h1>
          <p className="text-gray-400">Gardes de Sécurité</p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-blue-400">{filteredEmployees.length}</div>
            <p className="text-gray-400 text-sm">Employés Affichés</p>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-purple-400">{data.gardes.length}</div>
            <p className="text-gray-400 text-sm">Gardes Totales</p>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold text-pink-400">
              {filteredEmployees.reduce((sum, emp) => 
                sum + data.gardes.filter(g => g.employe_ide === emp.ide).length, 0
              )}
            </div>
            <p className="text-gray-400 text-sm">Gardes Affichées</p>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredEmployees.length > 0 ? (
          <>
            {searchName && (
              <p className="text-gray-400 text-sm mb-4">
                📌 Résultats pour "{searchName}" : {filteredEmployees.length} employé(s)
              </p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map((employee) => {
                const employeeGardes = data.gardes
                  .filter(g => g.employe_ide === employee.ide)
                  .sort((a, b) => new Date(a.date) - new Date(b.date));
                
                const morningGuards = employeeGardes.filter(g => g.type === 'MATIN');
                const eveningGuards = employeeGardes.filter(g => g.type === 'SOIR');
                
                return (
                  <div key={employee.ide} className="glass-card hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {employee.nom?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold truncate">{employee.nom}</h3>
                        <p className="text-gray-400 text-sm">Garde de Sécurité</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-blue-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-semibold">{employeeGardes.length} garde(s)</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                          ☀️ {morningGuards.length}
                        </span>
                        <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                          🌙 {eveningGuards.length}
                        </span>
                      </div>
                    </div>

                    {employeeGardes.length > 0 && (
                      <div className="space-y-1 max-h-40 overflow-y-auto scrollbar-thin">
                        {employeeGardes.slice(0, 8).map(garde => (
                          <div key={garde.idg} className="bg-white/5 rounded px-3 py-1.5 text-sm flex items-center justify-between gap-2">
                            <span className="text-gray-300 flex-shrink-0">
                              📅 {new Date(garde.date).toLocaleDateString('fr-FR', { 
                                day: '2-digit', 
                                month: '2-digit'
                              })}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                              garde.type === 'MATIN' 
                                ? 'bg-yellow-500/20 text-yellow-300' 
                                : 'bg-indigo-500/20 text-indigo-300'
                            }`}>
                              {garde.type === 'MATIN' ? '☀️' : '🌙'} {garde.secteur || 'N/A'}
                            </span>
                          </div>
                        ))}
                        {employeeGardes.length > 8 && (
                          <p className="text-xs text-gray-500 text-center py-1">
                            +{employeeGardes.length - 8} autres
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="glass-card text-center py-12">
            <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-400 text-lg mb-2">
              {searchName ? `Aucun résultat pour "${searchName}"` : 'Aucune garde trouvée'}
            </p>
            <p className="text-gray-500 text-sm">
              {searchName ? 'Essayez une autre recherche' : 'Lancez l\'algorithme depuis la page Schedule'}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
        }

        .text-gradient {
          background: linear-gradient(to right, #60a5fa, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.5);
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.7);
        }
      `}</style>
    </div>
  );
}
