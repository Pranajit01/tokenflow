/**
 * Navbar.jsx — Top navigation bar with Memphis styling
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/queue', label: 'Get Token' },
  { path: '/live', label: 'Live Queue' },
  { path: '/admin', label: 'Admin' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="sticky top-0 z-40 px-4 sm:px-6"
      style={{
        backgroundColor: 'var(--color-cream)',
        borderBottom: '3px solid var(--color-ink)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-teal)', border: '3px solid var(--color-ink)' }}
          >
            <Zap size={18} color="white" />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-ink)' }}>
            TOKEN<span style={{ color: 'var(--color-teal)' }}>FLOW</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline"
                style={{
                  fontFamily: 'var(--font-heading)',
                  backgroundColor: isActive ? 'var(--color-teal)' : 'transparent',
                  color: isActive ? 'white' : 'var(--color-ink)',
                  border: isActive ? '2px solid var(--color-ink)' : '2px solid transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden pb-4 border-t-2"
          style={{ borderColor: 'var(--color-ink)' }}
        >
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium no-underline"
                style={{
                  fontFamily: 'var(--font-heading)',
                  backgroundColor: isActive ? 'var(--color-teal)' : 'transparent',
                  color: isActive ? 'white' : 'var(--color-ink)',
                  borderRadius: '8px',
                  margin: '2px 0',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
