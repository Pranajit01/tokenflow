/**
 * LandingPage.jsx — Spacious, Faceless & Perfectly Centered Architecture
 * 
 * Key Layout Enhancements:
 * - 100% Centered on desktop & mobile viewports (max-w-5xl mx-auto items-center text-center)
 * - Zero Overlapping: Generous top/bottom section margins (my-24, py-20)
 * - Ultra-Spacious Cards: Internal padding (p-8 sm:p-10), large card gaps (gap-10 sm:gap-12)
 * - Clear Typography: Relaxed line heights (leading-relaxed), tracking, generous line breaks
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
    description: "Describe any request in natural human language. Gemini AI extracts service type, department, and priority score automatically without complex forms.",
    color: "#6b5be6",
    details: ["Structured JSON Output", "Auto Department Mapping", "Fail-safe Keyword Fallback"]
  },
  {
    icon: Mic,
    title: "Voice Input Recognition",
    subtitle: "Web Speech API Integration",
    description: "Speak your request naturally using built-in speech-to-text recognition. Accessible for senior citizens, hands-free scenarios, and mobile users.",
    color: "#ff5b57",
    details: ["Feature-Detected Mic Trigger", "No Third-Party Dependencies", "Instant Speech Autofill"]
  },
  {
    icon: Shield,
    title: "Smart Priority Engine",
    subtitle: "Context-Aware Priority Matrix",
    description: "Emergency medical cases, senior citizens, pregnant women, and disabled individuals are automatically prioritized ahead of standard requests.",
    color: "#ffc531",
    details: ["Emergency (100 pts)", "Disabled (80 pts)", "Senior Citizen (60 pts)"]
  },
  {
    icon: Eye,
    title: "Real-Time 3s Stream",
    subtitle: "Background Polling Stream",
    description: "Citizen views and admin dashboards stay synchronized across all devices with background 3-second polling, ensuring zero stream delay.",
    color: "#12b3a4",
    details: ["Zero WebSockets Overhead", "Multi-Browser Sync", "Live Wait Recalculation"]
  },
  {
    icon: BarChart3,
    title: "Live Admin Analytics OS",
    subtitle: "Recharts Metrics Dashboard",
    description: "Complete counter control panel with Call Next, Skip, and Complete actions, plus department throughput and priority distribution charts.",
    color: "#3aa0ff",
    details: ["Call Next / Skip / Complete", "Department Bar Chart", "Hourly Throughput Metrics"]
  },
  {
    icon: Zap,
    title: "Instant Digital Token",
    subtitle: "Zero Physical Ticket Queue",
    description: "Generates a unique token ID instantly (e.g. TF-HEA-001) with live wait time estimates. No physical paper tickets required.",
    color: "#12b3a4",
    details: ["Unique Token ID", "Estimated Wait Calc", "Direct Mobile Token"]
  }
];

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
    desc: "AI extracts service type, target department, and assigns priority level.",
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
    <div className="relative min-h-screen bg-[#07080a] text-white flex flex-col items-center justify-between">
      {/* Animated Parallax Stars & Space Atmosphere */}
      <ParallaxStarsBackground speed={1.2} />

      {/* Main Centered Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-32 flex flex-col items-center text-center">

        {/* ═══ 1. HERO SECTION ═══ */}
        <div className="flex flex-col items-center text-center w-full mb-24">
          
          {/* Eyebrow Badge */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-3 space-badge bg-white/5 backdrop-blur-md border border-white/15 px-6 py-2.5 rounded-full text-white/90 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12b3a4] animate-pulse" />
              <span className="text-xs font-mono">v2.0</span>
              <span className="text-white/30">•</span>
              <span className="text-xs font-medium text-white/80">Gemini AI Digital Waiting System</span>
              <Sparkles size={14} className="text-[#ffc531]" />
            </div>
          </div>

          {/* H1 Headline — Strictly Centered with Generous Spacing */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.2] mb-8 max-w-4xl font-sans text-center">
            Queue without the <span className="text-star-gradient">chaotic lines.</span>
          </h1>

          {/* Subtitle — Spacious Line Height */}
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl text-center mb-12 leading-relaxed font-sans">
            Transform crowded waiting rooms into an intelligent AI-assisted digital queue system. 
            Describe any request in natural language — <strong className="text-white">skip the line, not your turn.</strong>
          </p>

          {/* Action Button Row — Spacious Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
            <Link to="/queue" className="btn-primary !text-base !py-4 !px-8 shadow-xl">
              <Zap size={18} />
              <span>Generate Digital Token</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/live" className="btn-outline !text-base !py-4 !px-8">
              <ListOrdered size={18} className="text-[#12b3a4]" />
              <span>View Live Queue Stream</span>
            </Link>
          </div>

          {/* ═══ 2. AI INTENT LAUNCHER MOCKUP — SEPARATE SPACIOUS BLOCK ═══ */}
          <div className="w-full max-w-3xl mx-auto space-card text-left shadow-2xl overflow-hidden border border-white/20 my-12">
            {/* Input Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.03]">
              <div className="flex items-center gap-4 flex-1">
                <Search size={22} className="text-[#12b3a4]" />
                <div className="text-base font-medium text-white flex items-center flex-1 overflow-hidden">
                  <span className="truncate">{activeQuery}</span>
                  <span className="star-caret" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/60 bg-white/10 px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                  <Command size={12} /> K
                </span>
                <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-[#12b3a4]/20 text-[#12b3a4] border border-[#12b3a4]/30 font-semibold">
                  AI Intent Engine
                </span>
              </div>
            </div>

            {/* Interactive Options — Spacious Padding */}
            <div className="divide-y divide-white/10 py-3">
              <div 
                onClick={() => handleCommandClick("Emergency medical consultation for elderly patient")}
                className="p-5 px-6 bg-[#12b3a4]/15 border-l-4 border-[#12b3a4] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff5b57]/20 border border-[#ff5b57]/40 flex items-center justify-center text-[#ff5b57]">
                    <Activity size={20} />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white flex items-center gap-3">
                      Emergency Medical Consultation
                      <span className="text-xs font-mono uppercase bg-[#ff5b57] text-white font-bold px-2.5 py-0.5 rounded-md">Senior Priority</span>
                    </div>
                    <div className="text-xs text-white/60 font-mono mt-1">
                      dept: Health Services <span className="text-white/20 mx-1">|</span> est. wait: &lt; 1 min
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#12b3a4] bg-[#12b3a4]/15 px-3.5 py-2 rounded-xl border border-[#12b3a4]/30 flex items-center gap-2 font-semibold">
                  <CornerDownLeft size={14} /> Select
                </span>
              </div>

              <div 
                onClick={() => handleCommandClick("I need to renew my passport before next month")}
                className="p-5 px-6 flex items-center justify-between hover:bg-white/[0.05] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ffc531]">
                    <Shield size={20} />
                  </div>
                  <div>
                    <div className="text-base font-medium text-white/90">
                      Passport Renewal &amp; Travel Documents
                    </div>
                    <div className="text-xs text-white/50 font-mono mt-1">
                      dept: Passport Office <span className="text-white/20 mx-1">|</span> est. wait: ~10 min
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs text-white/40 bg-white/5 px-3 py-1 rounded-lg border border-white/10">⌘B</span>
              </div>
            </div>

            {/* Hints Footer */}
            <div className="p-4 px-6 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <div className="flex items-center gap-5">
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

        {/* ═══ 3. SYSTEM CAPABILITIES SECTION — SPACIOUS SEPARATE BLOCK ═══ */}
        <div className="w-full max-w-5xl mx-auto my-28 flex flex-col items-center text-center">
          
          {/* Centered Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 space-badge bg-white/5 border border-white/15 px-5 py-2 rounded-full text-xs font-mono text-[#12b3a4] mb-4">
              <span>CORE SYSTEM CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-center">
              Why <span className="text-[#12b3a4]">Token Flow</span>?
            </h2>
            <p className="text-base text-white/75 max-w-xl text-center leading-relaxed">
              Intelligent features built for healthcare centers, municipal offices, and high-volume public service counters.
            </p>
          </div>

          {/* Spacious Centered 2-Column Grid — gap-10 sm:gap-12 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 w-full justify-center">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <div
                  key={i}
                  className="space-card p-8 sm:p-10 flex flex-col justify-between text-left border border-white/15 w-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div 
                        className="w-13 h-13 rounded-2xl flex items-center justify-center border border-white/15 shadow-md p-3"
                        style={{ backgroundColor: `${feature.color}25`, color: feature.color }}
                      >
                        <Icon size={26} />
                      </div>
                      <span className="text-xs font-mono text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        {feature.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-sm text-white/75 leading-relaxed mb-8">{feature.description}</p>
                  </div>

                  <div className="pt-5 border-t border-white/10 space-y-3">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-white/85">
                        <CheckCircle size={16} className="text-[#12b3a4] flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ 4. HOW IT WORKS SECTION — SPACIOUS SEPARATE BLOCK ═══ */}
        <div className="w-full max-w-5xl mx-auto my-28 flex flex-col items-center text-center">
          
          {/* Centered Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-center">
              How It <span className="text-[#ffc531]">Works</span>
            </h2>
            <p className="text-base text-white/75 max-w-md text-center leading-relaxed">
              4 seamless steps from natural language request to counter service
            </p>
          </div>

          {/* Spacious Centered 2-Column Grid — gap-10 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full justify-center">
            {STEPS.map((step, i) => (
              <div key={i} className="space-card p-8 sm:p-10 text-center flex flex-col items-center border border-white/15 w-full">
                <div className="w-16 h-16 rounded-2xl bg-[#12b3a4]/20 border border-[#12b3a4]/40 text-[#12b3a4] font-mono text-xl font-bold flex items-center justify-center mb-6 shadow-xl">
                  {step.num}
                </div>
                <span className="space-badge bg-white/5 text-xs text-white/70 border-white/15 mb-4">
                  {step.tag}
                </span>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link to="/queue" className="btn-primary !py-4.5 !px-10 !text-base shadow-xl">
              <span>Try Token Flow System</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Bottom Centered Ghost Pill */}
        <div className="flex justify-center pt-8">
          <Link to="/about" className="inline-flex items-center gap-3 text-sm text-white/60 hover:text-white bg-white/5 border border-white/10 px-6 py-3 rounded-full transition-colors">
            <span>Learn more about Token Flow system architecture</span>
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
