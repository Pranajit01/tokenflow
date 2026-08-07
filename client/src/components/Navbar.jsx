/**
 * Navbar.jsx — Clean, Non-Overlapping Top Navigation Header
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Zap, ArrowRight, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/queue', label: 'Get Token' },
  { path: '/live', label: 'Live Queue' },
  { path: '/admin', label: 'Admin OS' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/about', label: 'Docs' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full clean-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#12b3a4] to-[#3aa0ff] flex items-center justify-center shadow-[0_0_12px_rgba(18,179,164,0.4)] group-hover:scale-105 transition-transform">
            <Zap size={18} color="white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              TOKEN<span className="text-[#12b3a4]">FLOW</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
              <Sparkles size={10} className="text-[#ffc531]" />
              v2.0
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/admin" className="text-sm font-medium text-white/70 hover:text-white transition-colors no-underline px-2">
            Log in
          </Link>
          <Link to="/queue" className="btn-primary !py-2 !px-4 !text-xs">
            <span>Get Digital Token</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#090A0F]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium no-underline ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-xs text-white/70 no-underline">Log in</Link>
            <Link to="/queue" onClick={() => setMenuOpen(false)} className="btn-primary !py-1.5 !px-3 !text-xs">
              Get Token
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
