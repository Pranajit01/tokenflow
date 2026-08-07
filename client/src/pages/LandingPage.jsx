/**
 * LandingPage.jsx — Stacking Cards & Parallax Stars Architecture
 * 
 * Featuring:
 * - Parallax Stars background
 * - High-contrast hero section with AI Intent Engine Launcher Mockup
 * - STACKING CARDS FEATURE DECK: As the user scrolls, each card stays sticky at top: 120px so the next card slides over it like a physical deck of cards!
 * - STACKING CARDS HOW-IT-WORKS DECK
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowRight, Search, Sparkles, Command, Shield, Zap,
  Activity, Users, Clock, ChevronRight, CornerDownLeft,
  Brain, Mic, Eye, BarChart3, ListOrdered, CheckCircle
} from 'lucide-react';
import ParallaxStarsBackground from '../components/ParallaxStarsBackground';
import { useQueue } from '../contexts/QueueContext';

const STACKING_FEATURES = [
  {
    step: "FEATURE 01",
    icon: Brain,
    title: "AI-Powered Intent Analysis",
    subtitle: "Google Gemini AI Server Integration",
    description: "Describe any request in natural human language. Gemini AI extracts the service, department, and priority score automatically without manual form fields.",
    color: "#6b5be6",
    badge: "Gemini 2.5 Flash Engine",
    example: '"My grandmother needs urgent medical consultation, she is 82 years old"',
    details: ["Structured JSON Schema Output", "Auto Department Mapping", "Fail-safe Keyword Fallback"]
  },
  {
    step: "FEATURE 02",
    icon: Mic,
    title: "Voice Input Recognition",
    subtitle: "Native Web Speech API Integration",
    description: "Speak your request naturally using built-in speech-to-text recognition. Accessible for senior citizens, hands-free scenarios, and mobile users.",
    color: "#ff5b57",
    badge: "Web Speech API",
    example: '"I need to file my income tax return, preferably in the morning"',
    details: ["Feature-detected Mic Trigger", "No External Dependencies", "Instant Natural Language Fill"]
  },
  {
    step: "FEATURE 03",
    icon: Shield,
    title: "Smart Priority Scoring Engine",
    subtitle: "Context-Aware Fast Tracking",
    description: "Emergency situations, senior citizens, pregnant women, and disabled individuals are automatically prioritized ahead of standard requests.",
    color: "#ffc531",
    badge: "6-Level Priority Matrix",
    example: '"Emergency — my child needs immediate medical attention"',
    details: ["Emergency (100 pts)", "Disabled (80 pts)", "Pregnant (70 pts)", "Senior Citizen (60 pts)"]
  },
  {
    step: "FEATURE 04",
    icon: Eye,
    title: "Real-Time Multi-Device Stream",
    subtitle: "Background Polling Architecture",
    description: "Citizen views and admin dashboards stay in sync across devices with automatic 3-second background polling, ensuring zero delay.",
    color: "#12b3a4",
    badge: "3-Second Auto Polling",
    example: "Live Token Sequence: TF-HEA-001 • Serving Now",
    details: ["Zero WebSockets Overhead", "Multi-Browser Sync", "Position & Wait Recalculation"]
  },
  {
    step: "FEATURE 05",
    icon: BarChart3,
    title: "Live Admin Analytics OS",
    subtitle: "Recharts Visualization",
    description: "Complete counter control panel with Call Next, Skip, and Complete actions, plus department throughput and priority distribution charts.",
    color: "#3aa0ff",
    badge: "Admin OS Controls",
    example: "Stats: 100% Completion Rate • 5m Avg Wait",
    details: ["Call Next / Skip / Complete", "Department Bar Chart", "Hourly Throughput Metrics"]
  }
];

const STACKING_STEPS = [
  {
    num: "01",
    title: "Describe Your Request",
    desc: "Type or speak your need in natural human language — no rigid form dropdowns.",
    tag: "Natural Language"
  },
  {
    num: "02",
    title: "Gemini AI Classification",
    desc: "AI extracts service type, target department, and assigns priority level.",
    tag: "Structured JSON"
  },
  {
    num: "03",
    title: "Instant Digital Token",
    desc: "Receive your unique token ID (e.g. TF-HEA-001) with live wait time estimate.",
    tag: "Token ID"
  },
  {
    num: "04",
    title: "Track Live Stream",
    desc: "Watch your queue position update in real time from your phone or PC.",
    tag: "Live Sync"
  }
];

export default function LandingPage() {
  const { stats } = useQueue();
  const navigate = useNavigate();
  const [activeQuery, setActiveQuery] = useState("I need urgent medical consultation for my elderly grandmother");

  const handleCommandClick = (text) => {
    navigate('/queue', { state: { text } });
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white flex flex-col justify-between">
      {/* Animated Parallax Stars & Space Atmosphere */}
      <ParallaxStarsBackground speed={1.2} />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-24 w-full">

        {/* ═══ HERO SECTION ═══ */}
        <div className="text-center mb-24">
          {/* Eyebrow Badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 space-badge bg-white/5 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-white/90">
              <span className="w-2 h-2 rounded-full bg-[#12b3a4] animate-pulse" />
              <span className="text-xs font-mono">v2.0</span>
              <span className="text-white/30">•</span>
              <span className="text-xs font-medium text-white/80">Gemini AI Digital Waiting System</span>
              <Sparkles size={13} className="text-[#ffc531]" />
            </div>
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto font-sans">
            Queue without the <span className="text-star-gradient">chaotic lines.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
            Transform crowded waiting rooms into an intelligent AI-assisted digital queue system. 
            Describe any request in natural language — <strong>skip the line, not your turn.</strong>
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link to="/queue" className="btn-primary !text-sm !py-3 !px-6">
              <Zap size={16} />
              <span>Generate Digital Token</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/live" className="btn-outline !text-sm !py-3 !px-6">
              <ListOrdered size={16} className="text-[#12b3a4]" />
              <span>View Live Queue Stream</span>
            </Link>
          </div>

          {/* Launcher Mockup */}
          <div className="max-w-3xl mx-auto space-card text-left shadow-2xl overflow-hidden border border-white/15">
            <div className="p-4 border-b border-white/10 flex items-center justify-between gap-3 bg-white/[0.02]">
              <div className="flex items-center gap-3 flex-1">
                <Search size={18} className="text-[#12b3a4]" />
                <div className="text-sm font-medium text-white flex items-center flex-1 overflow-hidden">
                  <span className="truncate">{activeQuery}</span>
                  <span className="star-caret" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-white/60 bg-white/10 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                  <Command size={10} /> K
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#12b3a4]/20 text-[#12b3a4] border border-[#12b3a4]/30 font-semibold">
                  AI Intent Engine
                </span>
              </div>
            </div>

            <div className="divide-y divide-white/5 py-1">
              <div 
                onClick={() => handleCommandClick("Emergency medical consultation for elderly patient")}
                className="p-3.5 px-4 bg-[#12b3a4]/15 border-l-4 border-[#12b3a4] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5b57]/20 border border-[#ff5b57]/40 flex items-center justify-center text-[#ff5b57]">
                    <Activity size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      Emergency Medical Consultation
                      <span className="text-[10px] font-mono uppercase bg-[#ff5b57] text-white font-bold px-1.5 py-0.2 rounded">Senior Priority</span>
                    </div>
                    <div className="text-xs text-white/60 font-mono mt-0.5">
                      dept: Health Services <span className="text-white/20">|</span> est. wait: &lt; 1 min
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#12b3a4] bg-[#12b3a4]/10 px-2.5 py-1 rounded border border-[#12b3a4]/30 flex items-center gap-1">
                  <CornerDownLeft size={12} /> Select
                </span>
              </div>

              <div 
                onClick={() => handleCommandClick("I need to renew my passport before next month")}
                className="p-3.5 px-4 flex items-center justify-between hover:bg-white/[0.04] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ffc531]">
                    <Shield size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90">
                      Passport Renewal &amp; Travel Documents
                    </div>
                    <div className="text-xs text-white/50 font-mono mt-0.5">
                      dept: Passport Office <span className="text-white/20">|</span> est. wait: ~10 min
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">⌘B</span>
              </div>
            </div>

            <div className="p-3 px-4 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>•</span>
                <span>↵ select</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12b3a4] animate-pulse" />
                <span>TOKENFLOW OS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ STACKING CARDS FEATURE DECK SECTION ═══ */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 space-badge bg-white/5 border border-white/15 px-3.5 py-1 rounded-full text-xs font-mono text-[#12b3a4] mb-3">
              <span>STACKING CARDS FEATURE DECK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Why <span className="text-[#12b3a4]">Token Flow</span>?
            </h2>
            <p className="text-sm text-white/60 max-w-lg mx-auto mt-3">
              Scroll down — watch each feature card stay sticky at top while the next card slides over like a deck of cards!
            </p>
          </div>

          {/* Stacking Cards Container with ample vertical padding for sticky scrolling */}
          <div className="relative max-w-4xl mx-auto space-y-12 pb-24">
            {STACKING_FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              // Sticky top offset so each card sticks cleanly near top: 100px + i*20px
              const topOffset = `${100 + i * 24}px`;

              return (
                <div
                  key={i}
                  className="stacking-card p-6 sm:p-8 border border-white/20"
                  style={{ 
                    position: 'sticky',
                    top: topOffset,
                    zIndex: (i + 1) * 10,
                  }}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs font-bold text-white/40 tracking-widest">
                          {feature.step}
                        </span>
                        <span className="space-badge bg-white/5 text-white/80 border-white/15">
                          {feature.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/15 shadow-md"
                          style={{ backgroundColor: `${feature.color}25`, color: feature.color }}
                        >
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">{feature.title}</h3>
                          <p className="text-xs font-mono text-white/50">{feature.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-sm text-white/75 leading-relaxed my-4">
                        {feature.description}
                      </p>

                      {/* Feature Bullet Highlights */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-white/90 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                            <CheckCircle size={13} className="text-[#12b3a4]" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Example Preview Box */}
                    <div className="w-full md:w-72 bg-black/50 border border-white/10 rounded-2xl p-4.5 flex flex-col justify-between shadow-inner">
                      <div className="text-[11px] font-mono text-white/40 uppercase mb-2">Live Pattern Match</div>
                      <div className="text-xs text-white/90 italic font-sans bg-white/5 p-3 rounded-xl border border-white/10 mb-4">
                        {feature.example}
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#12b3a4] flex items-center gap-1 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-[#12b3a4] animate-ping" /> Active
                        </span>
                        <span className="text-white/40">Token Flow v2.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ STACKING CARDS HOW-IT-WORKS SECTION ═══ */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
              How It <span className="text-[#ffc531]">Works</span>
            </h2>
            <p className="text-sm text-white/60">4 seamless steps from natural language request to counter service</p>
          </div>

          <div className="relative max-w-3xl mx-auto space-y-8 pb-16">
            {STACKING_STEPS.map((step, i) => {
              const topOffset = `${110 + i * 24}px`;

              return (
                <div
                  key={i}
                  className="stacking-card p-6 flex items-center gap-6 border border-white/20"
                  style={{ 
                    position: 'sticky',
                    top: topOffset,
                    zIndex: (i + 1) * 10,
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#12b3a4]/20 border border-[#12b3a4]/40 text-[#12b3a4] font-mono text-lg font-bold flex items-center justify-center flex-shrink-0 shadow-lg">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                      <span className="space-badge bg-white/5 text-xs text-white/70 border-white/15">{step.tag}</span>
                    </div>
                    <p className="text-xs text-white/75 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/queue" className="btn-primary !py-3.5 !px-8 !text-base">
              <span>Try Token Flow System</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom Ghost Pill */}
        <div className="flex justify-center pt-4">
          <Link to="/about" className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white bg-white/5 border border-white/10 px-4 py-2 rounded-full transition-colors">
            <span>Learn more about Token Flow system architecture</span>
            <ChevronRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
