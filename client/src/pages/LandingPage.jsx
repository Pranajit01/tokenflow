/**
 * LandingPage.jsx — Red Noir Style Architecture (Reference Implementation)
 * 
 * Features:
 * - Red Noir color scheme (#ef233c crimson accents, pure #000000 background)
 * - Shiny conic border spinning CTA button (.shiny-cta)
 * - 4-Card Bento Grid for system capabilities ("Why Token Flow?")
 * - Vibrant Crimson Highlight Testimonial Banner
 * - 4-Step How It Works visual cards
 * - Huge stroke text watermark footer
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
    tag: "Natural Language"
  },
  {
    num: "02",
    title: "Gemini AI Processing",
    desc: "AI extracts service type, target department, and assigns priority score.",
    tag: "Structured JSON"
  },
  {
    num: "03",
    title: "Instant Token ID",
    desc: "Receive your unique token ID (e.g. TF-HEA-001) with live wait time estimate.",
    tag: "Token Assigned"
  },
  {
    num: "04",
    title: "Track Live Stream",
    desc: "Watch your queue position update in real time from your phone or PC.",
    tag: "Live 3s Sync"
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

        {/* ═══ HERO SECTION ═══ */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-36 pb-20 px-6 text-center">
          <div className="max-w-5xl mx-auto flex flex-col items-center">

            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef233c]" />
              </span>
              <span className="text-xs font-medium text-red-100/90 tracking-wide font-manrope">
                Token Flow AI 2.0 is now live
              </span>
              <ArrowRight className="w-3 h-3 text-red-400" />
            </div>

            {/* H1 Manrope Headline */}
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter font-manrope leading-[1.1] mb-8 animate-fade-up text-center">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                Queue without the
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                <span className="text-[#ef233c] inline-block relative">
                  chaotic lines
                  <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#ef233c] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up text-center">
              Transform crowded waiting rooms into an intelligent AI-assisted digital queue system. 
              Describe any request in natural language — <strong className="text-white">skip the line, not your turn.</strong>
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up w-full max-w-md">
              <Link to="/queue" className="shiny-cta group w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-2 text-white font-medium text-base">
                  <Zap size={18} className="text-[#ef233c]" />
                  <span>Generate Digital Token</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              
              <Link to="/live" className="group px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 w-full sm:w-auto no-underline">
                <ListOrdered className="w-5 h-5 text-[#ef233c]" />
                View Live Stream
              </Link>
            </div>

            {/* Interactive Launcher Mockup Inside Hero */}
            <div className="w-full max-w-3xl mx-auto mt-16 text-left border border-white/10 bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between gap-3 bg-black/40">
                <div className="flex items-center gap-3 flex-1">
                  <Search size={18} className="text-[#ef233c]" />
                  <div className="text-sm font-medium text-white flex items-center flex-1 overflow-hidden">
                    <span className="truncate">{activeQuery}</span>
                    <span className="star-caret" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                    ⌘K
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#ef233c]/20 text-[#ef233c] border border-[#ef233c]/30 font-semibold">
                    AI Engine
                  </span>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                <div 
                  onClick={() => handleCommandClick("Emergency medical consultation for elderly patient")}
                  className="p-4 px-5 bg-[#ef233c]/10 border-l-4 border-[#ef233c] flex items-center justify-between cursor-pointer transition-colors hover:bg-[#ef233c]/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ef233c]/20 border border-[#ef233c]/40 flex items-center justify-center text-[#ef233c]">
                      <Activity size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        Emergency Medical Consultation
                        <span className="text-[10px] font-mono uppercase bg-[#ef233c] text-white font-bold px-1.5 py-0.5 rounded">Senior Priority</span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-0.5">
                        dept: Health Services <span className="text-zinc-600 mx-1">|</span> est. wait: &lt; 1 min
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#ef233c] bg-[#ef233c]/15 px-3 py-1 rounded-lg border border-[#ef233c]/30 flex items-center gap-1 font-semibold">
                    <CornerDownLeft size={12} /> Select
                  </span>
                </div>

                <div 
                  onClick={() => handleCommandClick("I need to renew my passport before next month")}
                  className="p-4 px-5 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-yellow-400">
                      <Shield size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-200">
                        Passport Renewal &amp; Travel Documents
                      </div>
                      <div className="text-xs text-zinc-500 font-mono mt-0.5">
                        dept: Passport Office <span className="text-zinc-700 mx-1">|</span> est. wait: ~10 min
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-white/5 px-2.5 py-1 rounded border border-white/10">⌘B</span>
                </div>
              </div>
            </div>

          </div>

          {/* Integrated With Logo Strip */}
          <div className="w-full mt-28 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm py-8 opacity-70 hover:opacity-100 transition-opacity">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
              <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase shrink-0">Powered by modern tech:</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center w-full font-manrope text-sm font-semibold text-zinc-300">
                <div className="flex items-center gap-2"><Bot className="w-5 h-5 text-[#ef233c]" /> Google Gemini 2.5</div>
                <div className="flex items-center gap-2"><Code className="w-5 h-5 text-blue-400" /> React 19</div>
                <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Vite</div>
                <div className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-cyan-400" /> Recharts</div>
                <div className="flex items-center gap-2"><Layers className="w-5 h-5 text-emerald-400" /> Express API</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURES BENTO GRID ("Why Token Flow?") ═══ */}
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Bento Header */}
            <div className="mb-20 text-center max-w-3xl mx-auto animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight font-manrope mb-6">
                The Operating System for <br />
                <span className="text-[#ef233c]">Modern Waiting Rooms</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light">
                Replace crowded physical lines with intelligent Gemini AI intent processing.
              </p>
            </div>

            {/* 4-Card Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto">
              
              {/* Bento Card 1 (Large 2x2 Span) */}
              <div className="lg:col-span-2 group relative overflow-hidden p-8 border border-white/10 bg-gradient-to-b from-zinc-900/60 to-black hover:border-white/30 transition-all rounded-2xl flex flex-col justify-between shadow-2xl">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-[#ef233c]">
                    <Brain className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#ef233c] uppercase tracking-wider block mb-2 font-bold">GEMINI 2.5 FLASH ENGINE</span>
                  <h3 className="text-3xl font-semibold text-white font-manrope mb-4 tracking-tight">AI Intent Classification</h3>
                  <p className="text-zinc-400 text-base leading-relaxed mb-6">
                    Describe any service request in natural human language. Gemini AI parses service type, target department, and urgency score automatically.
                  </p>
                  
                  <div className="space-y-2 font-mono text-xs text-zinc-300">
                    <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#ef233c]" /> Structured JSON Output Schema</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#ef233c]" /> Auto Department Routing</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#ef233c]" /> Fail-safe Rule Engine Fallback</div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between text-xs font-mono text-[#ef233c]">
                  <span>SKIP THE LINE • NOT YOUR TURN</span>
                  <ArrowRight className="w-4 h-4 text-[#ef233c] group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #ef233c, transparent 70%)' }} />
              </div>

              {/* Bento Card 2 (Wide 2-col) */}
              <div className="lg:col-span-2 group relative overflow-hidden p-8 border border-white/10 bg-black hover:border-white/30 transition-all rounded-2xl flex flex-col justify-between">
                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-yellow-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider block mb-2 font-bold">SMART PRIORITY ENGINE</span>
                  <h3 className="text-2xl font-semibold text-white font-manrope mb-2">Context-Aware Fast Tracking</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    Emergency cases (100 pts), disabled individuals (80 pts), pregnant women (70 pts), and senior citizens (60 pts) are automatically fast-tracked ahead of standard requests.
                  </p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle at top right, #eab308, transparent 70%)' }} />
              </div>

              {/* Bento Card 3 */}
              <div className="group relative overflow-hidden p-8 border border-white/10 bg-black hover:border-white/30 transition-all rounded-2xl flex flex-col justify-between">
                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-red-400">
                    <Mic className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-manrope mb-2">Voice Recognition</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">Speak naturally using built-in Web Speech API recognition for senior citizens and hands-free scenarios.</p>
                </div>
              </div>

              {/* Bento Card 4 */}
              <div className="group relative overflow-hidden p-8 border border-white/10 bg-black hover:border-white/30 transition-all rounded-2xl flex flex-col justify-between">
                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-manrope mb-2">Real-Time 3s Stream</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">Citizen views and admin OS stay synchronized with 3-second background polling across all devices.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══ CRIMSON HIGHLIGHT TESTIMONIAL BANNER ═══ */}
        <section className="w-full bg-[#ef233c] py-20 px-6 text-black">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-1.5 text-black mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current text-black" />
              ))}
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-black font-manrope leading-tight mb-8">
              "Token Flow completely transformed how our municipal office serves citizens. What used to be a chaotic 2-hour physical line is now an instant AI digital queue."
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold font-manrope">
                TF
              </div>
              <div className="text-left">
                <div className="text-black font-bold text-lg">Municipal Operations Lead</div>
                <div className="text-black/80 font-medium text-sm">Public Service Counter • Dept of Health</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS SECTION ═══ */}
        <section className="py-28 px-6 bg-black relative border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold text-white font-manrope mb-4">
                How It <span className="text-[#ef233c]">Works</span>
              </h2>
              <p className="text-zinc-400">4 seamless steps from natural language request to counter service</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, i) => (
                <div key={i} className="p-8 border border-zinc-800 bg-zinc-950/60 hover:border-[#ef233c]/50 transition-all rounded-2xl flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-[#ef233c]/15 border border-[#ef233c]/40 text-[#ef233c] font-manrope text-xl font-bold flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    {step.num}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">{step.tag}</span>
                  <h3 className="text-lg font-bold text-white font-manrope mb-2">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16">
              <Link to="/queue" className="shiny-cta group no-underline">
                <span className="relative z-10 flex items-center gap-2 text-white font-medium text-base">
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
