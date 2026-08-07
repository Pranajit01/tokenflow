/**
 * LandingPage.jsx — Extended Ultra-Spacious Red Noir Architecture
 * 
 * Key Spacing Enhancements:
 * - 100% Horizontal & Vertical Centering across all sections & headers (max-w-5xl mx-auto items-center text-center).
 * - Massive Vertical Section Separation (py-36 sm:py-48, my-36).
 * - Ultra-Spacious Bento Cards: Internal padding (p-10 sm:p-14), card grid gaps (gap-10 sm:gap-14).
 * - Extended Page Height: Breathable layout with zero crowding or text collisions.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowRight, Search, Sparkles, Command, Shield, Zap,
  Activity, Users, Clock, ChevronRight, CornerDownLeft,
  Brain, Mic, Eye, BarChart3, ListOrdered, CheckCircle, Star, Bot, Code, Layers
} from 'lucide-react';
import { useQueue } from '../contexts/QueueContext';

const STEPS = [
  {
    num: "01",
    title: "Describe Request",
    desc: "Type or speak your need in natural human language — no complex form dropdowns.",
    tag: "Natural Language Input"
  },
  {
    num: "02",
    title: "Gemini AI Processing",
    desc: "AI extracts service type, target department, and assigns priority score.",
    tag: "Structured JSON Output"
  },
  {
    num: "03",
    title: "Instant Token ID",
    desc: "Receive your unique token ID (e.g. TF-HEA-001) with live wait time estimate.",
    tag: "Token ID Assigned"
  },
  {
    num: "04",
    title: "Track Live Stream",
    desc: "Watch your queue position update in real time from your phone or PC.",
    tag: "Live 3s Stream Sync"
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
    <div className="min-h-screen bg-black text-white font-inter relative overflow-x-hidden">
      
      {/* Global Background Grid & Ambient Red Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505] to-black" />
        <div className="absolute top-0 left-0 w-[1px] h-[1px] bg-transparent stars-1 animate-[animStar_50s_linear_infinite]" />
        <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent stars-2 animate-[animStar_80s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]" />
      </div>

      {/* Top Blur Filter */}
      <div className="gradient-blur" />

      <main className="relative z-10">

        {/* ═══ 1. HERO SECTION (ULTRA-SPACIOUS) ═══ */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-44 pb-32 px-6 text-center">
          <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center">

            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 animate-fade-up">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef233c]" />
              </span>
              <span className="text-xs font-medium text-red-100/90 tracking-wide font-manrope">
                Token Flow AI 2.0 is now live
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-red-400" />
            </div>

            {/* H1 Manrope Headline — 100% Centered */}
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter font-manrope leading-[1.15] mb-10 animate-fade-up text-center">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                Queue without the
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                <span className="text-[#ef233c] inline-block relative mt-2">
                  chaotic lines
                  <svg className="absolute w-full h-3.5 -bottom-3 left-0 text-[#ef233c] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-14 leading-relaxed animate-fade-up text-center">
              Transform crowded waiting rooms into an intelligent AI-assisted digital queue system. 
              Describe any request in natural language — <strong className="text-white">skip the line, not your turn.</strong>
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up w-full max-w-md mb-16">
              <Link to="/queue" className="shiny-cta group w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-3 text-white font-semibold text-base">
                  <Zap size={18} className="text-[#ef233c]" />
                  <span>Generate Digital Token</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              
              <Link to="/live" className="group px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2.5 w-full sm:w-auto no-underline">
                <ListOrdered className="w-5 h-5 text-[#ef233c]" />
                View Live Stream
              </Link>
            </div>

            {/* Interactive Launcher Mockup Inside Hero — Spacious Margins (my-16) */}
            <div className="w-full max-w-3xl mx-auto my-12 text-left border border-white/12 bg-zinc-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-black/50">
                <div className="flex items-center gap-3.5 flex-1">
                  <Search size={20} className="text-[#ef233c]" />
                  <div className="text-base font-medium text-white flex items-center flex-1 overflow-hidden">
                    <span className="truncate">{activeQuery}</span>
                    <span className="star-caret" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-zinc-400 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                    ⌘K
                  </span>
                  <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-[#ef233c]/20 text-[#ef233c] border border-[#ef233c]/30 font-semibold">
                    AI Engine
                  </span>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                <div 
                  onClick={() => handleCommandClick("Emergency medical consultation for elderly patient")}
                  className="p-5 px-6 bg-[#ef233c]/10 border-l-4 border-[#ef233c] flex items-center justify-between cursor-pointer transition-colors hover:bg-[#ef233c]/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#ef233c]/20 border border-[#ef233c]/40 flex items-center justify-center text-[#ef233c] flex-shrink-0">
                      <Activity size={18} />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white flex items-center gap-2.5">
                        Emergency Medical Consultation
                        <span className="text-[10px] font-mono uppercase bg-[#ef233c] text-white font-bold px-2 py-0.5 rounded-md">Senior Priority</span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-1">
                        dept: Health Services <span className="text-zinc-600 mx-1">|</span> est. wait: &lt; 1 min
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#ef233c] bg-[#ef233c]/15 px-3.5 py-1.5 rounded-lg border border-[#ef233c]/30 flex items-center gap-1.5 font-semibold">
                    <CornerDownLeft size={13} /> Select
                  </span>
                </div>

                <div 
                  onClick={() => handleCommandClick("I need to renew my passport before next month")}
                  className="p-5 px-6 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-400 flex-shrink-0">
                      <Shield size={18} />
                    </div>
                    <div>
                      <div className="text-base font-medium text-zinc-200">
                        Passport Renewal &amp; Travel Documents
                      </div>
                      <div className="text-xs text-zinc-500 font-mono mt-1">
                        dept: Passport Office <span className="text-zinc-700 mx-1">|</span> est. wait: ~10 min
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-white/5 px-3 py-1 rounded border border-white/10">⌘B</span>
                </div>
              </div>
            </div>

          </div>

          {/* Integrated Tech Logo Strip — Spacious Separation */}
          <div className="w-full my-36 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm py-10 opacity-75 hover:opacity-100 transition-opacity">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
              <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase shrink-0">Powered by modern tech:</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center w-full font-manrope text-sm font-semibold text-zinc-300">
                <div className="flex items-center gap-2.5"><Bot className="w-5 h-5 text-[#ef233c]" /> Google Gemini 2.5</div>
                <div className="flex items-center gap-2.5"><Code className="w-5 h-5 text-blue-400" /> React 19</div>
                <div className="flex items-center gap-2.5"><Zap className="w-5 h-5 text-yellow-400" /> Vite</div>
                <div className="flex items-center gap-2.5"><BarChart3 className="w-5 h-5 text-cyan-400" /> Recharts</div>
                <div className="flex items-center gap-2.5"><Layers className="w-5 h-5 text-emerald-400" /> Express API</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. BENTO GRID ("Why Token Flow?") — 100% CENTERED & ULTRA-SPACIOUS ═══ */}
        <section className="py-36 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-full flex flex-col items-center justify-center text-center">
            
            {/* Bento Header — 100% Centered */}
            <div className="mb-24 text-center max-w-3xl mx-auto flex flex-col items-center justify-center">
              <span className="text-xs font-mono text-[#ef233c] uppercase tracking-widest block mb-4 font-bold border border-[#ef233c]/30 bg-[#ef233c]/10 px-4 py-1.5 rounded-full">
                CORE CAPABILITIES
              </span>
              <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight font-manrope mb-6 text-center leading-tight">
                The Operating System for <br />
                <span className="text-[#ef233c] inline-block mt-1">Modern Waiting Rooms</span>
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-xl text-center leading-relaxed">
                Replace crowded physical lines with intelligent Gemini AI intent processing.
              </p>
            </div>

            {/* 4-Card Bento Grid — Spacious Gaps (gap-10 sm:gap-14), Spacious Internal Padding (p-10 sm:p-14) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-14 w-full h-auto">
              
              {/* Bento Card 1 (Large 2x2 Span) */}
              <div className="lg:col-span-2 group relative overflow-hidden p-10 sm:p-14 border border-white/12 bg-gradient-to-b from-zinc-900/70 to-black hover:border-white/30 transition-all rounded-3xl flex flex-col justify-between shadow-2xl text-left">
                <div className="relative z-10">
                  <div className="mb-8 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-[#ef233c] shadow-lg">
                    <Brain className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono text-[#ef233c] uppercase tracking-wider block mb-3 font-bold">GEMINI 2.5 FLASH ENGINE</span>
                  <h3 className="text-3xl font-semibold text-white font-manrope mb-5 tracking-tight">AI Intent Classification</h3>
                  <p className="text-zinc-400 text-base leading-relaxed mb-8">
                    Describe any service request in natural human language. Gemini AI parses service type, target department, and urgency score automatically.
                  </p>
                  
                  <div className="space-y-3 font-mono text-xs sm:text-sm text-zinc-300">
                    <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#ef233c] flex-shrink-0" /> Structured JSON Output Schema</div>
                    <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#ef233c] flex-shrink-0" /> Auto Department Routing</div>
                    <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#ef233c] flex-shrink-0" /> Fail-safe Rule Engine Fallback</div>
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-between text-xs font-mono text-[#ef233c] font-bold">
                  <span>SKIP THE LINE • NOT YOUR TURN</span>
                  <ArrowRight className="w-4 h-4 text-[#ef233c] group-hover:translate-x-1.5 transition-transform" />
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #ef233c, transparent 70%)' }} />
              </div>

              {/* Bento Card 2 (Wide 2-col) */}
              <div className="lg:col-span-2 group relative overflow-hidden p-10 sm:p-14 border border-white/12 bg-black hover:border-white/30 transition-all rounded-3xl flex flex-col justify-between text-left">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-yellow-400 shadow-lg">
                    <Shield className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider block mb-3 font-bold">SMART PRIORITY ENGINE</span>
                  <h3 className="text-2xl font-semibold text-white font-manrope mb-4">Context-Aware Fast Tracking</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                    Emergency cases (100 pts), disabled individuals (80 pts), pregnant women (70 pts), and senior citizens (60 pts) are automatically fast-tracked ahead of standard requests.
                  </p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #eab308, transparent 70%)' }} />
              </div>

              {/* Bento Card 3 */}
              <div className="group relative overflow-hidden p-10 border border-white/12 bg-black hover:border-white/30 transition-all rounded-3xl flex flex-col justify-between text-left">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-red-400 shadow-lg">
                    <Mic className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-manrope mb-3">Voice Recognition</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">Speak naturally using built-in Web Speech API recognition for senior citizens and hands-free scenarios.</p>
                </div>
              </div>

              {/* Bento Card 4 */}
              <div className="group relative overflow-hidden p-10 border border-white/12 bg-black hover:border-white/30 transition-all rounded-3xl flex flex-col justify-between text-left">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shadow-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-manrope mb-3">Real-Time 3s Stream</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">Citizen views and admin OS stay synchronized with 3-second background polling across all devices.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══ 3. CRIMSON HIGHLIGHT TESTIMONIAL BANNER (SPACIOUS) ═══ */}
        <section className="w-full bg-[#ef233c] py-28 px-8 text-black my-36">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
            <div className="flex justify-center gap-2 text-black mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-current text-black" />
              ))}
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-black font-manrope leading-tight mb-10 text-center">
              "Token Flow completely transformed how our municipal office serves citizens. What used to be a chaotic 2-hour physical line is now an instant AI digital queue."
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-bold font-manrope text-lg shadow-xl">
                TF
              </div>
              <div className="text-left">
                <div className="text-black font-bold text-xl">Municipal Operations Lead</div>
                <div className="text-black/80 font-medium text-sm">Public Service Counter • Dept of Health</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 4. HOW IT WORKS SECTION (SPACIOUS 4-STEP GRID) ═══ */}
        <section className="py-36 px-6 bg-black relative border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
            
            {/* Section Header */}
            <div className="text-center mb-24 max-w-3xl mx-auto flex flex-col items-center justify-center">
              <h2 className="text-4xl md:text-6xl font-semibold text-white font-manrope mb-6 text-center">
                How It <span className="text-[#ef233c]">Works</span>
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed text-center max-w-md">
                4 seamless steps from natural language request to counter service
              </p>
            </div>

            {/* 4 Step Cards with Spacious Padding & Gaps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
              {STEPS.map((step, i) => (
                <div key={i} className="p-10 border border-zinc-800 bg-zinc-950/70 hover:border-[#ef233c]/60 transition-all rounded-3xl flex flex-col items-center text-center group shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#ef233c]/15 border border-[#ef233c]/40 text-[#ef233c] font-manrope text-2xl font-bold flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">{step.tag}</span>
                  <h3 className="text-xl font-bold text-white font-manrope mb-3 text-center">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed text-center">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-20">
              <Link to="/queue" className="shiny-cta group no-underline">
                <span className="relative z-10 flex items-center gap-3 text-white font-semibold text-base">
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
