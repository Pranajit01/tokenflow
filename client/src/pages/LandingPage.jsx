/**
 * LandingPage.jsx — Premium Dark Developer-Tool Landing Page Hero
 * 
 * Centered desktop hero on near-black #07080a canvas with a LIVING ANIMATED WARM AURORA background.
 * Crimson (~#ff2f3a) -> Coral (~#ff6b4a) -> Amber (~#ffb347)
 * Strictly warm — no purple/indigo/violet anywhere!
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowRight, Search, Sparkles, Command, Shield, Zap,
  Activity, Users, Clock, CheckCircle2, ChevronRight, CornerDownLeft
} from 'lucide-react';
import AuroraBackground from '../components/AuroraBackground';
import { useQueue } from '../contexts/QueueContext';

export default function LandingPage() {
  const { stats, queue } = useQueue();
  const navigate = useNavigate();
  const [activeQuery, setActiveQuery] = useState("I need urgent medical consultation for my elderly grandmother");

  const handleCommandClick = (text) => {
    navigate('/queue', { state: { text } });
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white overflow-hidden flex flex-col justify-between">
      {/* Living Warm Aurora Background */}
      <AuroraBackground />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 pt-10 pb-16 w-full flex flex-col items-center text-center">

        {/* (1) Eyebrow Chip */}
        <div className="mb-6 animate-fade-in">
          <div className="eyebrow-chip cursor-pointer hover:border-white/20 transition-all">
            <span className="w-2 h-2 rounded-full bg-[#ff5b57] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/90">v2.0</span>
            <span className="text-[#9c9c9d]">•</span>
            <span className="text-white/80">now with an AI command bar</span>
            <Sparkles size={12} className="text-[#ffb347] ml-0.5" />
          </div>
        </div>

        {/* (2) H1 Headline — 64px / 600 Inter in white with ONE warm-gradient accent word */}
        <h1 className="hero-h1 max-w-4xl mb-6">
          Queue without the <span className="warm-text-gradient">chaotic</span> lines.
        </h1>

        {/* (3) Subtitle — Inter 18px / 400 muted-white */}
        <p className="hero-subtitle max-w-[640px] mb-8">
          Transform physical waiting into an intelligent AI-assisted digital queue. 
          Describe any request in natural language and skip the line, not your turn.
        </p>

        {/* (4) Keycap-Raised Download Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
          {/* Download / Get Token for Mac */}
          <Link to="/queue" className="keycap-btn">
            {/* Apple inline-SVG */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.94.13-9.8-1.92-14.58-6.13-3.14-2.73-7.05-7.4-11.73-14-6.3-8.87-11.28-18.9-14.93-30.08-3.66-11.19-5.49-21.94-5.49-32.27 0-14.88 3.73-27.27 11.19-37.16 7.46-9.89 16.92-14.93 28.38-15.14 4.54 0 9.77 1.15 15.69 3.45 5.92 2.3 9.79 3.45 11.62 3.45 1.57 0 5.51-1.2 11.83-3.6 6.32-2.4 11.45-3.5 15.39-3.3 10.74.84 19.57 4.9 26.5 12.18-9.56 5.75-14.19 13.91-13.88 24.47.31 8.35 3.47 15.3 9.48 20.85 6.01 5.55 13.25 8.71 21.72 9.48-2.22 6.64-5.24 13.43-9.06 20.37zM119.22 31.81c0-7.06 2.53-13.78 7.59-20.16 5.06-6.38 11.53-10.29 19.41-11.73.1 1.05.15 1.99.15 2.83 0 7.07-2.67 13.98-8.01 20.73-5.34 6.75-11.89 10.74-19.65 11.97-.07-1.12-.11-2.07-.11-2.84z"/>
            </svg>
            <span>Download for Mac</span>
          </Link>

          {/* Download / View Live Queue for Windows */}
          <Link to="/live" className="keycap-btn">
            {/* Windows inline-SVG */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 88 88">
              <path d="M0 12.402l35.687-4.86.016 34.423-35.67.243zm35.67 33.527l.025 34.41-35.662-4.9-.033-29.743zm4.305-39.06l47.525-6.869.03 40.809-47.555.304zm47.555 38.647l-.03 40.785-47.525-6.702-.025-33.824z"/>
            </svg>
            <span>Download for Windows</span>
          </Link>
        </div>

        {/* (5) GeistMono Install Caption */}
        <p className="font-mono text-[12px] text-[#9c9c9d] mb-10 flex items-center gap-2">
          <span>brew install basalt</span>
          <span className="text-white/20">•</span>
          <span>Install via homebrew or winget</span>
        </p>

        {/* (6) Dark-Glass Command-Bar Launcher Mockup */}
        <div className="w-full max-w-3xl command-bar-mockup text-left mb-8 shadow-2xl">
          {/* Top Search Input Row */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between gap-3 bg-white/[0.02]">
            <div className="flex items-center gap-3 flex-1">
              <Search size={18} className="text-[#ff6b4a]" />
              <div className="text-sm font-medium text-white flex items-center flex-1 overflow-hidden">
                <span className="truncate">{activeQuery}</span>
                <span className="warm-caret" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="shortcut-chip flex items-center gap-1">
                <Command size={10} /> K
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#ff5b57]/20 text-[#ffb347] border border-[#ff5b57]/30">
                Command Mode
              </span>
            </div>
          </div>

          {/* Command Result Rows */}
          <div className="divide-y divide-white/5 py-1">
            {/* Row 1 — Active State Tinted from Warm Aurora (Emergency / Priority) */}
            <div 
              onClick={() => handleCommandClick("Emergency medical consultation for elderly patient")}
              className="command-row-active p-3.5 px-4 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#ff2f3a]/20 border border-[#ff2f3a]/40 flex items-center justify-center text-[#ff5b57]">
                  <Activity size={15} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    Emergency Medical Consultation
                    <span className="text-[10px] font-mono uppercase bg-[#ff2f3a] text-white font-bold px-1.5 py-0.2 rounded">Senior Priority</span>
                  </div>
                  <div className="text-xs text-[#9c9c9d] font-mono mt-0.5">
                    dept: Health Services <span className="text-white/30">|</span> wait: &lt; 1 min
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="shortcut-chip flex items-center gap-1">
                  <CornerDownLeft size={10} /> ↵ Enter
                </span>
              </div>
            </div>

            {/* Row 2 — Passport Services */}
            <div 
              onClick={() => handleCommandClick("I need to renew my passport before next month")}
              className="p-3.5 px-4 flex items-center justify-between hover:bg-white/[0.04] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ffb347]">
                  <Shield size={15} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">
                    Passport Renewal &amp; Travel Documents
                  </div>
                  <div className="text-xs text-[#9c9c9d] font-mono mt-0.5">
                    dept: Passport Office <span className="text-white/30">|</span> est: ~10 min
                  </div>
                </div>
              </div>
              <span className="shortcut-chip">⌘B</span>
            </div>

            {/* Row 3 — Civil Registry */}
            <div 
              onClick={() => handleCommandClick("Register birth certificate application")}
              className="p-3.5 px-4 flex items-center justify-between hover:bg-white/[0.04] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#3aa0ff]">
                  <Users size={15} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">
                    Birth Certificate &amp; Civil Registry
                  </div>
                  <div className="text-xs text-[#9c9c9d] font-mono mt-0.5">
                    dept: Civil Registry <span className="text-white/30">|</span> est: ~15 min
                  </div>
                </div>
              </div>
              <span className="shortcut-chip">⌘O</span>
            </div>

            {/* Row 4 — Admin & Live Queue Stream */}
            <div 
              onClick={() => navigate('/live')}
              className="p-3.5 px-4 flex items-center justify-between hover:bg-white/[0.04] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#12b3a4]">
                  <Zap size={15} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">
                    View Real-time Live Queue Stream
                  </div>
                  <div className="text-xs text-[#9c9c9d] font-mono mt-0.5">
                    status: {stats.waitingCount || 2} waiting <span className="text-white/30">|</span> {stats.servingCount || 1} serving
                  </div>
                </div>
              </div>
              <span className="shortcut-chip">⌘K</span>
            </div>
          </div>

          {/* Footer Strip */}
          <div className="p-3 px-4 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9c9c9d]">
            <div className="flex items-center gap-3">
              <span>↑↓ navigate</span>
              <span className="text-white/20">•</span>
              <span>↵ open</span>
              <span className="text-white/20">•</span>
              <span>esc dismiss</span>
            </div>
            <div className="flex items-center gap-1 text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12b3a4]" />
              <span>TOKENFLOW OS</span>
            </div>
          </div>
        </div>

        {/* (7) Single Centered Ghost Pill Link */}
        <Link to="/about" className="ghost-pill-link mb-4">
          <span>Learn more</span>
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* (8) Floating Dark Product Hunt Badge Card (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a 
          href="https://www.producthunt.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="product-hunt-badge p-3 px-4 flex items-center gap-3 no-underline group hover:border-white/30 transition-all"
        >
          {/* Product Hunt P logo icon */}
          <div className="w-8 h-8 rounded-full bg-[#da552f] flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#9c9c9d]">Featured on</div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              Product Hunt <span className="text-[#ffb347] font-normal text-[11px]">#1 of the Day</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
