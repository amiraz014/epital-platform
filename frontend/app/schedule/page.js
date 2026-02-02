'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SchedulePage() {
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const baseURL = process.env.NODE_ENV === 'production' 
        ? 'http://gardservice:3000' 
        : 'http://localhost:3001';
      
      const res = await fetch(`${baseURL}/api/guard-algo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ end: endDate }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover -z-10"
      >
        <source src="/epital-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 -z-5"></div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-20 animate-fade-in">
        <Link 
          href="/"
          className="group flex items-center gap-2 px-6 py-3 text-white text-base font-semibold rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-4 py-16 md:py-24 flex items-center justify-center">
        <div className="max-w-2xl w-full space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Schedule
              </span>
            </h1>
            <p className="text-lg text-gray-200">Lancez l'algorithme de planification</p>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Form Card */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Date Input */}
              <div className="space-y-3">
                <label htmlFor="endDate" className="block text-lg font-semibold text-white">
                  Date de Fin
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full px-6 py-4 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !endDate}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Lancer l'Algorithme
                  </>
                )}
              </button>
            </form>

            {/* Success Response */}
            {response && (
              <div className="mt-6 p-4 rounded-xl backdrop-blur-sm bg-green-500/20 border border-green-400/30 animate-fade-in">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Succès</h3>
                    <p className="text-green-200 text-sm">
                      {response.message || 'L\'algorithme a été lancé avec succès'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 rounded-xl backdrop-blur-sm bg-red-500/20 border border-red-400/30 animate-fade-in">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Erreur</h3>
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 animate-slide-up-delayed">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-white font-semibold mb-2">Information</h3>
                <p className="text-gray-300 text-sm">
                  Sélectionnez une date de fin pour lancer l'algorithme de planification. 
                  Le système calculera automatiquement le planning optimal.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
