/**
 * Navbar.jsx — Red Noir Pill Header Layout Fix
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Product' },
  { path: '/queue', label: 'Get Token' },
  { path: '/live', label: 'Live Stream' },
  { path: '/admin', label: 'Admin OS' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/about', label: 'Docs' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-4 sm:pt-6 px-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between bg-black/70 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 py-3 shadow-2xl">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group flex-shrink-0">
          <div className="w-5 h-5 bg-[#ef233c] rounded-sm rotate-45 shadow-[0_0_12px_rgba(239,35,60,0.6)] group-hover:scale-110 transition-transform" />
          <span className="text-base sm:text-lg font-bold font-manrope tracking-tight text-white whitespace-nowrap">
            TOKEN<span className="text-[#ef233c]">FLOW</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
            v2.0
          </span>
        </Link>

        {/* Desktop Navigation Links — lg:flex to avoid crowding on 768px tablets */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors no-underline whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link
            to="/queue"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/5 px-4 sm:px-6 py-2 transition-transform active:scale-95 no-underline text-white whitespace-nowrap"
          >
            <span className="absolute inset-0 border border-white/10 rounded-full" />
            <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#ef233c_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-[1px] rounded-full bg-black" />
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
              Get Token <ArrowRight className="w-3.5 h-3.5 text-[#ef233c] group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Mobile Hamburger Button — lg:hidden */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer — lg:hidden */}
      {menuOpen && (
        <div className="lg:hidden max-w-5xl mx-auto mt-2 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-[#ef233c]/20 text-white font-bold border border-[#ef233c]/30' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
