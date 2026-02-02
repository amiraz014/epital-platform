import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background*/}
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
      <div className="relative z-10 min-h-screen px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header Section */}
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              À propos d'{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Epital
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Project Description Card */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-slide-up">
            <h2 className="text-3xl font-bold text-white mb-6">Le Projet</h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-4">
              Epital est un projet étudiant de l'{" "}
              <span className="font-semibold text-blue-300">EPISEN</span> réalisé 
              dans le cadre du{" "}
              <span className="font-semibold text-purple-300">Projet Sirius</span> (2023-2026).
            </p>
            <p className="text-lg text-gray-200 leading-relaxed">
              Le projet couvre le développement logiciel, le cloud computing et la cybersécurité 
              à travers différentes phases de formation.
            </p>
          </div>

          {/* Team Section */}
          <div className="space-y-8 animate-slide-up-delayed">
            <h2 className="text-4xl font-bold text-white text-center">Notre Équipe</h2>
            
            {/* Team Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Amir Card */}
              <div className="group backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center space-y-4">
                  {/* Avatar */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                    A
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-2xl font-bold text-white">Amir</h3>
                  
                  {/* Role Badge */}
                  <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
                    <p className="text-blue-300 font-semibold text-sm">Développeur Principal</p>
                  </div>

                  {/* Responsibilities */}
                  <div className="w-full space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Cloud Computing Natif</p>
                        <p className="text-gray-300 text-sm">Architecture et stratégies de déploiement</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Sécurité IAM & Chiffrement</p>
                        <p className="text-gray-300 text-sm">Authentification MFA & protocoles HTTPS/TLS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hamza Card */}
              <div className="group backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center space-y-4">
                  {/* Avatar */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                    H
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-2xl font-bold text-white">Hamza</h3>
                  
                  {/* Role Badge */}
                  <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm">
                    <p className="text-purple-300 font-semibold text-sm">Spécialiste Données</p>
                  </div>

                  {/* Responsibilities */}
                  <div className="w-full space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Ingénierie des Données</p>
                        <p className="text-gray-300 text-sm">Conception de bases de données & pipelines</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Architecture Zero Trust</p>
                        <p className="text-gray-300 text-sm">Sécurité des données & modèle de confiance nulle</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-slide-up-more-delayed">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Chronologie du Projet</h2>
            <div className="space-y-8">
              
              {/* Phase 1: 2023-2024 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-32 text-center">
                  <div className="text-3xl font-bold text-blue-400">2023-2024</div>
                </div>
                <div className="flex-1 backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 1 : Développement Java</h3>
                  <p className="text-gray-300">Apprentissage des fondamentaux de la programmation orientée objet et développement d'applications Java.</p>
                </div>
              </div>

              {/* Phase 2: 2024-2025 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-32 text-center">
                  <div className="text-3xl font-bold text-purple-400">2024-2025</div>
                </div>
                <div className="flex-1 backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 2 : Développement Web</h3>
                  <p className="text-gray-300">Création d'applications web modernes et maîtrise des technologies front-end et back-end.</p>
                </div>
              </div>

              {/* Phase 3: 2025-2026 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-32 text-center">
                  <div className="text-3xl font-bold text-pink-400">2025-2026</div>
                </div>
                <div className="flex-1 backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 3 : Spécialisations</h3>
                  <p className="text-gray-300 mb-3">Approfondissement selon les domaines de spécialité :</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Cloud Computing Natif
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      Gestion de Données
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      Cybersécurité
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
