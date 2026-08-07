/**
 * AboutPage.jsx — Project description, tech stack, and how it works
 */

import { Zap, Brain, Code2, Server, Palette, GitFork, ExternalLink, Sparkles } from 'lucide-react';
import ParallaxStarsBackground from '../components/ParallaxStarsBackground';

const TECH_STACK = [
  { icon: Brain, name: 'Google Gemini AI', desc: 'gemini-2.5-flash model with enforced structured output schema', color: '#6b5be6' },
  { icon: Code2, name: 'React 19 + Vite', desc: 'Modern fast Single Page Application build tool', color: '#12b3a4' },
  { icon: Server, name: 'Node.js + Express', desc: 'REST API backend with in-memory single source of truth queue engine', color: '#ffc531' },
  { icon: Palette, name: 'Tailwind CSS v4', desc: 'Space Parallax design system with Inter & Geist Mono fonts', color: '#ff5b57' },
];

export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 relative min-h-screen">
      <ParallaxStarsBackground speed={1} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#12b3a4] to-[#3aa0ff] flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
            <Zap size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            TOKEN<span className="text-[#12b3a4]">FLOW</span>
          </h1>
          <p className="text-sm font-mono text-white/60">Queue Without the Queue • Architecture Overview</p>
        </div>

        {/* About */}
        <div className="space-card p-8 mb-8 border border-white/15">
          <h2 className="text-xl font-bold mb-4 tracking-tight flex items-center gap-2">
            <Sparkles size={18} className="text-[#ffc531]" />
            About the Project
          </h2>
          <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
              <strong>Token Flow</strong> is a Gemini-powered digital waiting system designed to eliminate physical queue congestion in hospitals, government offices, public registries, and customer service centers.
            </p>
            <p>
              Citizens express their needs in plain human language (such as <em>"My grandmother needs urgent medical consultation"</em>). Google Gemini AI processes the request server-side, extracts the appropriate service and department, evaluates priority indicators (senior, pregnant, emergency, disabled), estimates wait time, and assigns a unique digital token.
            </p>
            <p>
              Both citizen and administrative dashboards stay synchronized in real time using 3-second background polling without unnecessary WebSocket complexity.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-center tracking-tight">
            Technology Stack
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TECH_STACK.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div key={i} className="space-card p-5 flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10"
                    style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{tech.name}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture Details */}
        <div className="space-card p-8 mb-8 border border-white/15">
          <h2 className="text-xl font-bold mb-4 tracking-tight">
            System Architecture
          </h2>
          <div className="space-y-3 text-xs font-mono text-white/70 leading-relaxed">
            <p><span className="text-[#12b3a4]">1. Client Request:</span> User inputs natural language via text or voice (Web Speech API).</p>
            <p><span className="text-[#12b3a4]">2. Server Proxy:</span> Express API receives POST /api/queue/request (keeps API key secure).</p>
            <p><span className="text-[#12b3a4]">3. Structured Output:</span> Gemini SDK v2.16.0 executes with responseSchema enforcement.</p>
            <p><span className="text-[#12b3a4]">4. Priority Engine:</span> Scores request (emergency=100, disabled=80, pregnant=70, senior=60, child=40, normal=10).</p>
            <p><span className="text-[#12b3a4]">5. Queue Engine:</span> Inserts entry into priority-sorted in-memory queue &amp; generates token ID (TF-DEPT-001).</p>
            <p><span className="text-[#12b3a4]">6. Real-time Stream:</span> Frontend QueueContext polls GET /api/queue/live every 3s.</p>
            <p><span className="text-[#12b3a4]">7. Fail-safe Fallback:</span> Rule-based keyword parser handles API timeouts gracefully without crashing.</p>
          </div>
        </div>

        {/* GitHub Link */}
        <div className="text-center">
          <a
            href="https://github.com/Pranajit01/tokenflow"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <GitFork size={16} />
            <span>View Source on GitHub</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
