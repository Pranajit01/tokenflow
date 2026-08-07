/**
 * LandingPage.jsx — Perfectly Centered & Ultra-Spacious Architecture
 * 
 * Clean, balanced design with:
 * - Parallax Stars space backdrop
 * - 100% Centered vertical and horizontal alignment (max-w-6xl mx-auto items-center text-center)
 * - Equal margins on left and right for 3-column & 4-column card grids
 * - AI Intent Engine Interactive Launcher Box
 * - Spacious 3-Column Capability Grid ("Why Token Flow?")
 * - 4-Column "How It Works" Showcase
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

const FEATURES = [
  {
    icon: Brain,
    title: "AI Intent Analysis",
    subtitle: "Google Gemini 2.5 Flash",
    description: "Describe any request in natural human language. Gemini AI extracts service type, department, and priority score automatically.",
    color: "#6b5be6",
    details: ["Structured JSON Output", "Auto Department Mapping", "Fail-safe Keyword Parser"]
  },
  {
    icon: Mic,
    title: "Voice Input Recognition",
    subtitle: "Web Speech API",
    description: "Speak your request naturally using built-in speech-to-text recognition. Perfect for senior citizens and hands-free mobile use.",
    color: "#ff5b57",
    details: ["Feature-Detected Mic Trigger", "No Third-Party SDK", "Instant Speech Autofill"]
  },
  {
    icon: Shield,
    title: "Smart Priority Engine",
    subtitle: "Context-Aware Matrix",
    description: "Emergency medical cases, senior citizens, pregnant women, and disabled individuals are automatically prioritized ahead of standard requests.",
    color: "#ffc531",
    details: ["Emergency (100 pts)", "Disabled (80 pts)", "Senior Citizen (60 pts)"]
  },
  {
    icon: Eye,
    title: "Real-Time 3s Stream",
    subtitle: "Background Polling Sync",
    description: "Citizen views and admin dashboards stay synchronized across all devices with background 3-second polling for zero stream delay.",
    color: "#12b3a4",
    details: ["Zero WebSockets Overhead", "Multi-Browser Sync", "Live Wait Recalculation"]
  },
  {
    icon: BarChart3,
    title: "Live Admin Analytics OS",
    subtitle: "Recharts Dashboard",
    description: "Complete counter control panel with Call Next, Skip, and Complete actions, plus department throughput and priority distribution charts.",
    color: "#3aa0ff",
    details: ["Call Next / Skip / Complete", "Department Bar Chart", "Hourly Throughput Metrics"]
  },
  {
    icon: Zap,
    title: "Instant Digital Token",
    subtitle: "Zero Paper Tickets",
    description: "Generates a unique token ID instantly (e.g. TF-HEA-001) with live wait time estimates. No physical paper tickets required.",
    color: "#12b3a4",
    details: ["Unique Token ID", "Estimated Wait Calc", "Direct Mobile Token"]
  }
];

const STEPS = [
  {
    num: "01",
    title: "Describe Request",
    desc: "Type or speak your need in natural human language — no rigid form dropdowns.",
    tag: "Natural Language"
  },
  {
    num: "02",
    title: "Gemini AI Processing",
    desc: "AI extracts service type, target department, and assigns priority level.",
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
    <div className="relative min-h-screen bg-[#07080a] text-white flex flex-col items-center justify-between">
      {/* Animated Parallax Stars & Space Atmosphere */}
      <ParallaxStarsBackground speed={1.2} />

      {/* Main Centered Container — max-w-6xl mx-auto w-full flex flex-col items-center text-center */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-28 flex flex-col items-center text-center">

        {/* ═══ HERO SECTION ═══ */}
        <div className="flex flex-col items-center text-center w-full mb-20">
          
          {/* Eyebrow Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2.5 space-badge bg-white/5 backdrop-blur-md border border-white/15 px-5 py-2 rounded-full text-white/90 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12b3a4] animate-pulse" />
              <span className="text-xs font-mono">v2.0</span>
              <span className="text-white/30">•</span>
              <span className="text-xs font-medium text-white/80">Gemini AI Digital Waiting System</span>
              <Sparkles size={14} className="text-[#ffc531]" />
            </div>
          </div>

          {/* H1 Headline — Strictly Centered */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] mb-8 max-w-4xl font-sans text-center">
            Queue without the <span className="text-star-gradient">chaotic lines.</span>
          </h1>

          {/* Subtitle — Strictly Centered */}
          <p className="text-base sm:text-lg text-white/75 max-w-2xl text-center mb-10 leading-relaxed font-sans">
            Transform crowded waiting rooms into an intelligent AI-assisted digital queue system. 
            Describe any request in natural language — <strong>skip the line, not your turn.</strong>
          </p>

          {/* Action Button Row — Spacious Centered Row */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
            <Link to="/queue" className="btn-primary !text-base !py-3.5 !px-8 shadow-xl">
              <Zap size={18} />
              <span>Generate Digital Token</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/live" className="btn-outline !text-base !py-3.5 !px-8">
              <ListOrdered size={18} className="text-[#12b3a4]" />
              <span>View Live Queue Stream</span>
            </Link>
          </div>

          {/* AI Intent Launcher Box — Centered with Luxurious Padding */}
          <div className="w-full max-w-3xl mx-auto space-card text-left shadow-2xl overflow-hidden border border-white/20">
            {/* Input Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.03]">
              <div className="flex items-center gap-3.5 flex-1">
                <Search size={20} className="text-[#12b3a4]" />
                <div className="text-sm font-medium text-white flex items-center flex-1 overflow-hidden">
                  <span className="truncate">{activeQuery}</span>
                  <span className="star-caret" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-white/60 bg-white/10 px-2.5 py-1 rounded border border-white/10 flex items-center gap-1">
                  <Command size={11} /> K
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#12b3a4]/20 text-[#12b3a4] border border-[#12b3a4]/30 font-semibold">
                  AI Intent Engine
                </span>
              </div>
            </div>

            {/* Interactive Options */}
            <div className="divide-y divide-white/10 py-2">
              <div 
                onClick={() => handleCommandClick("Emergency medical consultation for elderly patient")}
                className="p-4 px-5 bg-[#12b3a4]/15 border-l-4 border-[#12b3a4] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#ff5b57]/20 border border-[#ff5b57]/40 flex items-center justify-center text-[#ff5b57]">
                    <Activity size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      Emergency Medical Consultation
                      <span className="text-[10px] font-mono uppercase bg-[#ff5b57] text-white font-bold px-2 py-0.5 rounded">Senior Priority</span>
                    </div>
                    <div className="text-xs text-white/60 font-mono mt-0.5">
                      dept: Health Services <span className="text-white/20">|</span> est. wait: &lt; 1 min
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#12b3a4] bg-[#12b3a4]/15 px-3 py-1.5 rounded-lg border border-[#12b3a4]/30 flex items-center gap-1.5 font-semibold">
                  <CornerDownLeft size={13} /> Select
                </span>
              </div>

              <div 
                onClick={() => handleCommandClick("I need to renew my passport before next month")}
                className="p-4 px-5 flex items-center justify-between hover:bg-white/[0.05] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ffc531]">
                    <Shield size={18} />
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
                <span className="font-mono text-xs text-white/40 bg-white/5 px-2.5 py-1 rounded border border-white/10">⌘B</span>
              </div>
            </div>

            {/* Hints Footer */}
            <div className="p-3.5 px-5 bg-black/50 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <div className="flex items-center gap-4">
                <span>↑↓ navigate</span>
                <span>•</span>
                <span>↵ select</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span className="w-2 h-2 rounded-full bg-[#12b3a4] animate-pulse" />
                <span>TOKENFLOW OS ENGINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SYSTEM CAPABILITIES ("Why Token Flow?") ═══ */}
        <div className="w-full max-w-6xl mx-auto mb-28 flex flex-col items-center text-center">
          {/* Centered Section Header */}
          <div className="flex flex-col items-center text-center mb-14">
            <div className="inline-flex items-center gap-2 space-badge bg-white/5 border border-white/15 px-4 py-1.5 rounded-full text-xs font-mono text-[#12b3a4] mb-4">
              <span>CORE SYSTEM CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-center">
              Why <span className="text-[#12b3a4]">Token Flow</span>?
            </h2>
            <p className="text-sm text-white/70 max-w-lg text-center">
              Intelligent features built for healthcare centers, municipal offices, and high-volume public service counters.
            </p>
          </div>

          {/* Perfectly Centered 3-Column Grid across full max-w-6xl container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-center">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <div
                  key={i}
                  className="space-card p-8 flex flex-col justify-between text-left border border-white/15 w-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/15 shadow-md"
                        style={{ backgroundColor: `${feature.color}25`, color: feature.color }}
                      >
                        <Icon size={24} />
                      </div>
                      <span className="text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                        {feature.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-xs text-white/75 leading-relaxed mb-6">{feature.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/85">
                        <CheckCircle size={14} className="text-[#12b3a4]" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ HOW IT WORKS SECTION ═══ */}
        <div className="w-full max-w-6xl mx-auto mb-24 flex flex-col items-center text-center">
          {/* Centered Section Header */}
          <div className="flex flex-col items-center text-center mb-14">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-center">
              How It <span className="text-[#ffc531]">Works</span>
            </h2>
            <p className="text-sm text-white/70 max-w-md text-center">4 seamless steps from natural language request to counter service</p>
          </div>

          {/* Perfectly Centered 4-Column Grid across full max-w-6xl container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-center">
            {STEPS.map((step, i) => (
              <div key={i} className="space-card p-6 text-center flex flex-col items-center border border-white/15 w-full">
                <div className="w-14 h-14 rounded-2xl bg-[#12b3a4]/20 border border-[#12b3a4]/40 text-[#12b3a4] font-mono text-lg font-bold flex items-center justify-center mb-5 shadow-lg">
                  {step.num}
                </div>
                <span className="space-badge bg-white/5 text-xs text-white/60 border-white/15 mb-3">
                  {step.tag}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <Link to="/queue" className="btn-primary !py-4 !px-9 !text-base shadow-xl">
              <span>Try Token Flow System</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom Centered Ghost Pill */}
        <div className="flex justify-center pt-6">
          <Link to="/about" className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white bg-white/5 border border-white/10 px-5 py-2.5 rounded-full transition-colors">
            <span>Learn more about Token Flow system architecture</span>
            <ChevronRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
