'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
              <img src="/logo.png" alt="Epital Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-white font-bold text-lg">Epital</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                isActive('/') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/schedule"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                isActive('/schedule') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              Planning
            </Link>
            <Link
              href="/view"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                isActive('/view') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              Voir les Gardes
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                isActive('/about') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              À Propos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
