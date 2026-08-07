/**
 * LandingPage.jsx — Clean, Spacious Space Parallax Architecture
 * 
 * Clean vertical hierarchy with zero overlapping elements:
 * - Parallax Stars background
 * - Crisp Hero Section (Headline, Subtitle, Keycap CTAs)
 * - AI Intent Launcher Mockup with clear margins
 * - Spacious Feature Cards Grid ("Why Token Flow?")
 * - 4-Step "How It Works" Showcase
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
    title: "AI-Powered Intent Analysis",
    subtitle: "Google Gemini 2.5 Flash Engine",
    description: "Describe any request in natural human language. Gemini AI extracts the service, department, and priority score automatically without manual forms.",
    color: "#6b5be6",
    details: ["Structured JSON Output", "Auto Department Mapping", "Fail-safe Keyword Fallback"]
  },
  {
    icon: Mic,
    title: "Voice Input Recognition",
    subtitle: "Web Speech API Integration",
    description: "Speak your request naturally using built-in speech-to-text recognition. Perfect for senior citizens, hands-free scenarios, and mobile users.",
    color: "#ff5b57",
    details: ["Feature-Detected Mic Trigger", "No Extra Dependencies", "Instant Text Autofill"]
  },
  {
    icon: Shield,
    title: "Smart Priority Engine",
    subtitle: "6-Level Priority Matrix",
    description: "Emergency situations, senior citizens, pregnant women, and disabled individuals are automatically prioritized ahead of standard requests.",
    color: "#ffc531",
    details: ["Emergency (100 pts)", "Disabled (80 pts)", "Senior Citizen (60 pts)"]
  },
  {
    icon: Eye,
    title: "Real-Time 3s Sync Stream",
    subtitle: "Automatic Polling Stream",
    description: "Citizen views and admin dashboards stay synchronized across all devices with background 3-second polling, ensuring zero delay.",
    color: "#12b3a4",
    details: ["Zero WebSocket Overhead", "Multi-Browser Sync", "Live Position Updates"]
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
    details: ["Unique Token ID", "Estimated Wait Calc", "Direct Mobile View"]
  }
];

const STEPS = [
  {
    num: "01",
    title: "Describe Your Request",
    desc: "Type or speak your need in natural human language — no complex form dropdowns.",
    tag: "Natural Language"
  },
  {
    num: "02",
    title: "Gemini AI Classification",
    desc: "AI extracts service type, target department, and assigns priority score.",
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24 w-full">

        {/* ═══ HERO SECTION ═══ */}
        <div className="text-center mb-16">
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
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
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
          <div className="max-w-3xl mx-auto space-card text-left shadow-2xl overflow-hidden border border-white/15 my-8">
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
                <span>TOKENFLOW OS ENGINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ FEATURE CARDS SHOWCASE ("Why Token Flow?") ═══ */}
        <div className="mb-24 pt-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 space-badge bg-white/5 border border-white/15 px-3.5 py-1 rounded-full text-xs font-mono text-[#12b3a4] mb-3">
              <span>CORE SYSTEM CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why <span className="text-[#12b3a4]">Token Flow</span>?
            </h2>
            <p className="text-sm text-white/60 max-w-lg mx-auto mt-2">
              Intelligent features designed for government offices, healthcare centers, and public service counters.
            </p>
          </div>

          {/* Clean 3-Column / 2-Column Responsive Grid with High Contrast */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <div
                  key={i}
                  className="space-card p-6 flex flex-col justify-between border border-white/15 hover:border-white/30 transition-all shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/15"
                        style={{ backgroundColor: `${feature.color}25`, color: feature.color }}
                      >
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {feature.subtitle}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">{feature.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-1">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-white/80">
                        <CheckCircle size={12} className="text-[#12b3a4]" />
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
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              How It <span className="text-[#ffc531]">Works</span>
            </h2>
            <p className="text-sm text-white/60">4 seamless steps from natural language request to counter service</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="space-card p-6 text-center border border-white/15">
                <div className="w-12 h-12 rounded-2xl bg-[#12b3a4]/20 border border-[#12b3a4]/40 text-[#12b3a4] font-mono text-base font-bold flex items-center justify-center mx-auto mb-4 shadow-md">
                  {step.num}
                </div>
                <span className="space-badge bg-white/5 text-[10px] text-white/60 border-white/10 mb-2">
                  {step.tag}
                </span>
                <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/65 leading-relaxed">{step.desc}</p>
              </div>
            ))}
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
