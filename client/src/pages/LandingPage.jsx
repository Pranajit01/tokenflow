/**
 * LandingPage.jsx — Minimal, Ultra-Spacious Red Noir Home Page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowRight, Search, Zap, Activity, Shield, CornerDownLeft,
  Brain, Mic, Eye, BarChart3, ListOrdered, CheckCircle, Star, Bot, Code, Layers
} from 'lucide-react';
import { useQueue } from '../contexts/QueueContext';

const STEPS = [
  {
    num: "01",
    title: "Describe Request",
    desc: "Speak or type your service need in plain natural human language.",
    tag: "Natural Input"
  },
  {
    num: "02",
    title: "Gemini AI Processing",
    desc: "AI classifies service department and priority urgency score instantly.",
    tag: "AI Classification"
  },
  {
    num: "03",
    title: "Instant Token ID",
    desc: "Receive your unique digital token ID with real-time wait estimation.",
    tag: "Token Issued"
  },
  {
    num: "04",
    title: "Track Live Stream",
    desc: "Follow queue updates in real-time on any device without waiting in line.",
    tag: "Live Stream Sync"
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
    <div className="min-h-screen w-full bg-black text-white font-inter relative overflow-hidden">
      
      {/* Background Shapes & Grid Mesh (Isolated z-0 pointer-events-none) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#120303] via-black to-black" />
        <div className="absolute top-0 left-0 w-full h-full stars-1" />
        <div className="absolute top-0 left-0 w-full h-full stars-2" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/5 rounded-full blur-[140px]" />
      </div>

      <main className="relative z-10 w-full">

        {/* ═══ 1. HERO SECTION (Minimal & Spacious) ═══ */}
        <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-8 w-full max-w-7xl mx-auto flex flex-col items-center text-center justify-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">

            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef233c]" />
              </span>
              <span className="text-xs font-semibold text-zinc-300 tracking-wide font-manrope">
                Token Flow AI 2.0
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-xs text-zinc-400 font-mono">Next-Gen Waiting Room OS</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-manrope leading-[1.1] mb-8 text-center break-words">
              Queue without the <br />
              <span className="text-[#ef233c]">chaotic lines.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed text-center break-words font-light">
              Transform physical waiting rooms into an intelligent AI digital queue. 
              Describe your need naturally — <span className="text-white font-medium">skip the line, not your turn.</span>
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
              <Link to="/queue" className="shiny-cta group w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-2.5 text-white font-bold text-base">
                  <Zap size={18} className="text-[#ef233c]" />
                  <span>Generate Token</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              
              <Link to="/live" className="group px-7 py-4 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 font-semibold hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2.5 w-full sm:w-auto no-underline text-sm">
                <ListOrdered className="w-4 h-4 text-[#ef233c]" />
                View Live Stream
              </Link>
            </div>

            {/* Interactive Launcher Mockup (Minimal Spotlight Style) */}
            <div className="w-full max-w-2xl mx-auto text-left border border-white/10 bg-zinc-950/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden p-3 sm:p-4">
              <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/40 rounded-2xl w-full">
                <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                  <Search size={18} className="text-[#ef233c] flex-shrink-0" />
                  <div className="text-sm font-medium text-white min-w-0 flex-1 break-words">
                    <span>{activeQuery}</span>
                    <span className="star-caret flex-shrink-0" />
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <span className="font-mono text-[11px] text-zinc-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    ⌘K
                  </span>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#ef233c]/20 text-[#ef233c] border border-[#ef233c]/30 font-semibold">
                    AI Engine
                  </span>
                </div>
              </div>

              <div className="mt-2 space-y-2">
                <div 
                  onClick={() => handleCommandClick("Emergency medical consultation for elderly patient")}
                  className="p-4 sm:p-5 bg-[#ef233c]/10 border border-[#ef233c]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-colors hover:bg-[#ef233c]/20 w-full"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#ef233c]/20 border border-[#ef233c]/40 flex items-center justify-center text-[#ef233c] flex-shrink-0">
                      <Activity size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white flex flex-wrap items-center gap-2">
                        <span>Emergency Medical Consultation</span>
                        <span className="text-[10px] font-mono uppercase bg-[#ef233c] text-white font-bold px-2 py-0.5 rounded-md whitespace-nowrap">Senior Priority</span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-1 break-words">
                        dept: Health Services <span className="text-zinc-600 mx-1">|</span> wait: &lt; 1 min
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#ef233c] bg-[#ef233c]/15 px-3 py-1.5 rounded-lg border border-[#ef233c]/30 flex items-center gap-1 font-semibold flex-shrink-0 self-end sm:self-center">
                    <CornerDownLeft size={12} /> Select
                  </span>
                </div>

                <div 
                  onClick={() => handleCommandClick("I need to renew my passport before next month")}
                  className="p-4 sm:p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white/5 cursor-pointer transition-colors w-full"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-400 flex-shrink-0">
                      <Shield size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-zinc-200 break-words">
                        Passport Renewal &amp; Travel Documents
                      </div>
                      <div className="text-xs text-zinc-500 font-mono mt-1 break-words">
                        dept: Passport Office <span className="text-zinc-700 mx-1">|</span> wait: ~10 min
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-white/5 px-3 py-1 rounded-lg border border-white/10 flex-shrink-0 self-end sm:self-center">⌘B</span>
                </div>
              </div>
            </div>

          </div>

          {/* Minimal Tech Partner Bar */}
          <div className="w-full mt-20 border-y border-white/5 py-8">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="font-bold shrink-0">POWERED BY MODERN TECH STACK:</span>
              <div className="flex flex-wrap justify-center gap-8 items-center font-sans text-sm text-zinc-300 font-medium normal-case tracking-normal">
                <div className="flex items-center gap-2"><Bot className="w-4 h-4 text-[#ef233c]" /> Google Gemini 2.5</div>
                <div className="flex items-center gap-2"><Code className="w-4 h-4 text-blue-400" /> React 19</div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> Vite</div>
                <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-cyan-400" /> Recharts</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. BENTO GRID (Minimal & Spacious) ═══ */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-full flex flex-col items-center justify-center text-center">
            
            {/* Header */}
            <div className="mb-16 text-center max-w-2xl mx-auto flex flex-col items-center justify-center">
              <span className="text-xs font-mono text-[#ef233c] uppercase tracking-widest block mb-4 font-bold border border-[#ef233c]/30 bg-[#ef233c]/10 px-3.5 py-1 rounded-full">
                CORE SYSTEM
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-manrope mb-4 text-center leading-tight break-words">
                The Operating System for <br />
                <span className="text-[#ef233c]">Modern Waiting Rooms</span>
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 font-light text-center leading-relaxed break-words">
                Replace physical lines with intelligent Gemini AI intent routing.
              </p>
            </div>

            {/* 4-Card Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center w-full">
              
              {/* Bento Card 1 */}
              <div className="lg:col-span-2 group p-8 sm:p-10 border border-white/10 bg-zinc-950 hover:border-white/25 transition-all rounded-3xl flex flex-col justify-between text-left w-full shadow-2xl">
                <div>
                  <div className="mb-6 inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#ef233c]">
                    <Brain className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#ef233c] uppercase tracking-wider block mb-2 font-bold">GEMINI 2.5 ENGINE</span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white font-manrope mb-3 tracking-tight break-words">AI Intent Classification</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 font-light break-words">
                    Describe any request in natural language. Gemini AI parses service type, target department, and priority urgency automatically.
                  </p>
                  
                  <div className="space-y-3 font-mono text-xs sm:text-sm text-zinc-300">
                    <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#ef233c] flex-shrink-0" /> Structured JSON Output Schema</div>
                    <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#ef233c] flex-shrink-0" /> Auto Department Routing</div>
                    <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#ef233c] flex-shrink-0" /> Fail-safe Rule Engine Fallback</div>
                  </div>
                </div>

                <div className="mt-10 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#ef233c] font-bold">
                  <span>SKIP THE LINE • NOT YOUR TURN</span>
                  <ArrowRight className="w-4 h-4 text-[#ef233c] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* Bento Card 2 */}
              <div className="lg:col-span-2 group p-8 sm:p-10 border border-white/10 bg-zinc-950 hover:border-white/25 transition-all rounded-3xl flex flex-col justify-between text-left w-full shadow-2xl">
                <div>
                  <div className="mb-6 inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-yellow-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider block mb-2 font-bold">SMART PRIORITY</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white font-manrope mb-3 break-words">Context-Aware Fast Tracking</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light break-words">
                    Emergency cases (100 pts), disabled individuals (80 pts), pregnant women (70 pts), and senior citizens (60 pts) are fast-tracked automatically.
                  </p>
                </div>
              </div>

              {/* Bento Card 3 */}
              <div className="group p-8 sm:p-10 border border-white/10 bg-zinc-950 hover:border-white/25 transition-all rounded-3xl flex flex-col justify-between text-left w-full shadow-2xl">
                <div>
                  <div className="mb-6 inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-red-400">
                    <Mic className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white font-manrope mb-2 break-words">Voice Input</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light break-words">Speak naturally using built-in Web Speech API recognition for hands-free requests.</p>
                </div>
              </div>

              {/* Bento Card 4 */}
              <div className="group p-8 sm:p-10 border border-white/10 bg-zinc-950 hover:border-white/25 transition-all rounded-3xl flex flex-col justify-between text-left w-full shadow-2xl">
                <div>
                  <div className="mb-6 inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white font-manrope mb-2 break-words">Real-Time Stream</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light break-words">Citizen views and admin OS stay synchronized with 3-second live background polling.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══ 3. MINIMAL CRIMSON QUOTE BANNER ═══ */}
        <section className="w-full bg-[#ef233c] py-16 sm:py-24 px-4 sm:px-8 text-black my-16">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
            <div className="flex justify-center gap-1.5 text-black mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-black" />
              ))}
            </div>
            <blockquote className="text-2xl sm:text-4xl md:text-5xl font-bold text-black font-manrope leading-tight mb-8 text-center break-words">
              "Token Flow transformed our municipal waiting room. What used to be a chaotic 2-hour physical line is now an instant AI digital queue."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white font-bold font-manrope text-sm shadow-xl">
                TF
              </div>
              <div className="text-left">
                <div className="text-black font-bold text-sm">Municipal Operations Lead</div>
                <div className="text-black/80 font-medium text-xs">Public Service Counter • Department of Health</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 4. HOW IT WORKS (Minimal Step Grid) ═══ */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="w-full flex flex-col items-center justify-center text-center">
            
            {/* Section Header */}
            <div className="text-center mb-16 max-w-2xl mx-auto flex flex-col items-center justify-center">
              <h2 className="text-3xl sm:text-5xl font-bold text-white font-manrope mb-4 text-center break-words">
                How It <span className="text-[#ef233c]">Works</span>
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed text-center font-light break-words">
                4 simple steps from natural language request to counter service
              </p>
            </div>

            {/* 4 Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center w-full">
              {STEPS.map((step, i) => (
                <div key={i} className="p-8 sm:p-10 border border-zinc-900 bg-zinc-950/80 hover:border-[#ef233c]/50 transition-all rounded-3xl flex flex-col items-center text-center group shadow-xl w-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#ef233c]/15 border border-[#ef233c]/40 text-[#ef233c] font-manrope text-lg font-bold flex items-center justify-center mb-6 shadow-xl group-hover:scale-105 transition-transform">
                    {step.num}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 font-semibold">{step.tag}</span>
                  <h3 className="text-lg font-bold text-white font-manrope mb-2 text-center break-words">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed text-center font-light break-words">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16">
              <Link to="/queue" className="shiny-cta group no-underline">
                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold text-base">
                  <span>Try Token Flow System</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
