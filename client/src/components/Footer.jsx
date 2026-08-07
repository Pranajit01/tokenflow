/**
 * Footer.jsx — Red Noir Footer with Watermark
 */

import { Link } from 'react-router';
import { GitFork, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 relative z-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-[#ef233c] rounded-sm rotate-45" />
            <span className="text-2xl font-bold font-manrope tracking-tight text-white">TOKENFLOW</span>
          </div>
          <p className="text-zinc-500 max-w-xs leading-relaxed text-sm">
            Pioneering the future of digital queue systems with Google Gemini AI intelligence and human-centered design principles.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-bold text-[#ef233c] uppercase tracking-widest mb-6">Platform</h4>
          <ul className="space-y-4 text-zinc-400 text-sm list-none p-0">
            <li><Link to="/queue" className="hover:text-white transition-colors no-underline">Get Token</Link></li>
            <li><Link to="/live" className="hover:text-white transition-colors no-underline">Live Queue Stream</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors no-underline">Admin Dashboard</Link></li>
            <li><Link to="/analytics" className="hover:text-white transition-colors no-underline">Recharts Metrics</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-bold text-[#ef233c] uppercase tracking-widest mb-6">Resources</h4>
          <ul className="space-y-4 text-zinc-400 text-sm list-none p-0">
            <li><Link to="/about" className="hover:text-white transition-colors no-underline">Documentation</Link></li>
            <li><a href="https://github.com/Pranajit01/tokenflow" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors no-underline flex items-center gap-1.5"><GitFork size={14} /> GitHub Repository</a></li>
          </ul>
        </div>
      </div>

      {/* Huge Footer Text Watermark */}
      <div className="flex justify-center items-center py-10 opacity-20 pointer-events-none">
        <h1 className="text-[15vw] leading-none font-bold font-manrope tracking-tighter text-stroke select-none">TOKENFLOW</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-zinc-600 text-[11px] uppercase tracking-widest">
        <p>&copy; 2026 TOKEN FLOW AI INC. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 mt-4 md:mt-0 font-mono text-zinc-400">
          <span>Gemini 2.5 Flash Engine</span>
          <span>•</span>
          <span>Zero Paper Tickets</span>
        </div>
      </div>
    </footer>
  );
}
