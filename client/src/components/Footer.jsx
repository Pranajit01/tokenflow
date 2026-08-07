/**
 * Footer.jsx — Site footer
 */

import { Zap, GitFork, Heart } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer
      className="mt-auto py-8 px-4 sm:px-6"
      style={{ borderTop: '3px solid var(--color-ink)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-teal)', border: '2px solid var(--color-ink)' }}
            >
              <Zap size={14} color="white" />
            </div>
            <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              TOKEN<span style={{ color: 'var(--color-teal)' }}>FLOW</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs">
            <Link to="/about" className="opacity-60 hover:opacity-100 transition-opacity no-underline" style={{ color: 'var(--color-ink)' }}>
              About
            </Link>
            <Link to="/live" className="opacity-60 hover:opacity-100 transition-opacity no-underline" style={{ color: 'var(--color-ink)' }}>
              Live Queue
            </Link>
            <a
              href="https://github.com/Pranajit01/tokenflow"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 no-underline"
              style={{ color: 'var(--color-ink)' }}
            >
              <GitFork size={14} />
              GitHub
            </a>
          </div>

          {/* Credit */}
          <p className="text-xs opacity-50 flex items-center gap-1">
            Made with <Heart size={12} style={{ color: 'var(--color-coral)' }} /> for Hackathon 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
