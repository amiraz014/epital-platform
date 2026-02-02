import Link from 'next/link';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navigation />
      
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

      {/* Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 -z-5"></div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16">
        {/* Logo and Text Container with Glassmorphism */}
        <div className="flex flex-col items-center space-y-8 backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl animate-fade-in">
          {/* Logo */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 animate-float">
            <img
              src="/logo.png"
              alt="Epital Logo"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight animate-slide-up">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Epital
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 animate-slide-up-delayed">
              Experience the future of digital innovation
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-more-delayed">
            <Link 
              href="/schedule"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
            >
              Lancer le Planning
            </Link>
            <Link 
              href="/view"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            >
              Voir les Gardes
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
