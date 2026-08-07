/**
 * Footer.jsx — Site footer
 */

import { GitFork, Heart } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="mt-auto py-8 px-4 sm:px-6 border-t border-white/10 bg-[#07080a] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#ffb347] via-[#ff6b4a] to-[#ff2f3a] flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-[#07080a] rotate-45" />
            </div>
            <span className="text-sm font-bold tracking-tight">
              TOKEN<span className="warm-text-gradient">FLOW</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-[#9c9c9d]">
            <Link to="/about" className="hover:text-white transition-colors no-underline">
              Docs &amp; About
            </Link>
            <Link to="/live" className="hover:text-white transition-colors no-underline">
              Live Queue
            </Link>
            <Link to="/admin" className="hover:text-white transition-colors no-underline">
              Admin OS
            </Link>
            <a
              href="https://github.com/Pranajit01/tokenflow"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 no-underline"
            >
              <GitFork size={13} />
              GitHub
            </a>
          </div>

          {/* Credit */}
          <p className="text-xs text-[#9c9c9d] flex items-center gap-1.5 font-mono">
            Made with <Heart size={12} className="text-[#ff5b57] fill-current" /> for Hackathon 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
