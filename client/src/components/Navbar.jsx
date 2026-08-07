/**
 * Navbar.jsx — Floating Translucent Pill Nav
 * 
 * Dark translucent (backdrop-blurred) rounded container with a 1px hairline border
 * and faint inner-top highlight, centered near top-center.
 * Left: warm diamond logo glyph + wordmark
 * Center: muted #9c9c9d 14px/500 Inter links
 * Right: muted 'Log in' + small near-white 'Download' / 'Get Token' pill
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Product' },
  { path: '/live', label: 'Live Queue' },
  { path: '/admin', label: 'Admin' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/about', label: 'Docs' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="sticky top-4 z-50 px-4 sm:px-6 w-full flex justify-center">
      <nav className="floating-pill-nav max-w-5xl w-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
        {/* Left: Warm diamond logo glyph + wordmark */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#ffb347] via-[#ff6b4a] to-[#ff2f3a] flex items-center justify-center shadow-[0_0_12px_rgba(255,107,74,0.5)] transform group-hover:rotate-45 transition-transform duration-300">
            {/* Diamond glyph */}
            <div className="w-3 h-3 bg-[#07080a] rotate-45" />
          </div>
          <span className="text-base font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
            TOKEN<span className="warm-text-gradient">FLOW</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-[#9c9c9d] font-normal border border-white/10">v2.0</span>
          </span>
        </Link>

        {/* Center: Muted 14px/500 Inter links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors no-underline ${
                  isActive ? 'text-white font-semibold' : 'text-[#9c9c9d] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Muted Log in + small near-white pill button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/admin"
            className="text-sm font-medium text-[#9c9c9d] hover:text-white transition-colors no-underline"
          >
            Log in
          </Link>

          <Link
            to="/queue"
            className="keycap-btn !py-1.5 !px-3.5 !text-xs !gap-1.5"
          >
            {/* Apple / OS mark SVG */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.94.13-9.8-1.92-14.58-6.13-3.14-2.73-7.05-7.4-11.73-14-6.3-8.87-11.28-18.9-14.93-30.08-3.66-11.19-5.49-21.94-5.49-32.27 0-14.88 3.73-27.27 11.19-37.16 7.46-9.89 16.92-14.93 28.38-15.14 4.54 0 9.77 1.15 15.69 3.45 5.92 2.3 9.79 3.45 11.62 3.45 1.57 0 5.51-1.2 11.83-3.6 6.32-2.4 11.45-3.5 15.39-3.3 10.74.84 19.57 4.9 26.5 12.18-9.56 5.75-14.19 13.91-13.88 24.47.31 8.35 3.47 15.3 9.48 20.85 6.01 5.55 13.25 8.71 21.72 9.48-2.22 6.64-5.24 13.43-9.06 20.37zM119.22 31.81c0-7.06 2.53-13.78 7.59-20.16 5.06-6.38 11.53-10.29 19.41-11.73.1 1.05.15 1.99.15 2.83 0 7.07-2.67 13.98-8.01 20.73-5.34 6.75-11.89 10.74-19.65 11.97-.07-1.12-.11-2.07-.11-2.84z"/>
            </svg>
            <span>Get Token</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-1.5 text-[#9c9c9d] hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-[#0f1117]/95 border border-white/10 backdrop-blur-xl rounded-2xl p-4 space-y-3 z-50 shadow-2xl">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#9c9c9d] hover:text-white no-underline"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <Link to="/admin" className="text-xs text-[#9c9c9d] no-underline">Log in</Link>
            <Link to="/queue" className="keycap-btn !py-1.5 !px-3 !text-xs">
              Get Token
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
