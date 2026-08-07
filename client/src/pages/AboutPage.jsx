/**
 * AboutPage.jsx — Project description, tech stack, and how it works
 */

import { Zap, Brain, Shield, Code2, Server, Palette, GitFork, ExternalLink } from 'lucide-react';
import ConfettiBackground from '../components/ConfettiBackground';
import useScrollReveal from '../hooks/useScrollReveal';

const TECH_STACK = [
  { icon: Brain, name: 'Google Gemini AI', desc: 'gemini-2.5-flash with structured JSON output', color: 'var(--color-violet)' },
  { icon: Code2, name: 'React 19 + Vite', desc: 'Fast modern frontend with hot module reload', color: 'var(--color-teal)' },
  { icon: Server, name: 'Node.js + Express', desc: 'Backend API with in-memory queue engine', color: 'var(--color-mustard)' },
  { icon: Palette, name: 'Tailwind CSS v4', desc: 'Memphis/Postmodern design system', color: 'var(--color-coral)' },
];

export default function AboutPage() {
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef} className="py-12 px-4 sm:px-6 relative">
      <ConfettiBackground density="sparse" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 scroll-reveal">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'var(--color-teal)', border: '3px solid var(--color-ink)' }}
          >
            <Zap size={40} color="white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            TOKEN<span style={{ color: 'var(--color-teal)' }}>FLOW</span>
          </h1>
          <p className="text-xl opacity-60 italic">Queue Without the Queue</p>
        </div>

        {/* About */}
        <div className="memphis-card p-8 mb-8 scroll-reveal">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            About the Project
          </h2>
          <div className="space-y-4 opacity-80 leading-relaxed">
            <p>
              <strong>Token Flow</strong> is a Gemini-powered digital waiting system that transforms chaotic physical queues into an intelligent AI-assisted digital waiting experience.
            </p>
            <p>
              Instead of standing in long lines at government offices, hospitals, or service centers, citizens simply describe their needs in plain language — 
              <em>"My grandmother needs urgent medical consultation"</em> — and our AI extracts the service type, department, priority level, and estimated wait time automatically.
            </p>
            <p>
              The system intelligently prioritizes emergency cases, senior citizens, pregnant women, and people with disabilities while maintaining fair queue ordering for everyone.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8 scroll-reveal">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Tech Stack
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TECH_STACK.map((tech, i) => (
              <div key={i} className="memphis-card p-5 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: tech.color, border: '3px solid var(--color-ink)' }}
                >
                  <tech.icon size={22} color="white" />
                </div>
                <div>
                  <h3 className="font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{tech.name}</h3>
                  <p className="text-sm opacity-60">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="memphis-card p-8 mb-8 scroll-reveal">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              '🤖 Natural language queue request via Gemini AI',
              '🎤 Voice input using Web Speech API',
              '🔄 Real-time queue sync across devices (3s polling)',
              '⚡ Automatic priority detection (6 levels)',
              '📊 Admin dashboard with live analytics',
              '📱 Fully responsive Memphis design',
              '🛡️ Server-side API key security',
              '🔁 Graceful fallback when AI is unavailable',
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="memphis-card p-8 mb-8 scroll-reveal">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            How It Works
          </h2>
          <div className="space-y-3 text-sm opacity-80">
            <p><strong>1. Citizen</strong> describes their need in natural language (text or voice)</p>
            <p><strong>2. Frontend</strong> sends the request to the Express backend (never calls Gemini directly)</p>
            <p><strong>3. Backend</strong> calls Gemini AI with structured output schema (responseMimeType + responseSchema)</p>
            <p><strong>4. Gemini</strong> returns structured JSON: service, department, priority, estimated wait, notes</p>
            <p><strong>5. Queue Engine</strong> assigns a token ID (TF-DEPT-001), scores priority, and adds to in-memory queue</p>
            <p><strong>6. Frontend</strong> polls GET /api/queue/live every 3 seconds for real-time sync</p>
            <p><strong>7. Admin</strong> can Call Next / Skip / Complete from the admin dashboard</p>
            <p><strong>8. If Gemini fails</strong>, a rule-based keyword parser produces a usable fallback token</p>
          </div>
        </div>

        {/* GitHub */}
        <div className="text-center scroll-reveal">
          <a
            href="https://github.com/Pranajit01/tokenflow"
            target="_blank"
            rel="noopener noreferrer"
            className="memphis-btn memphis-btn-outline inline-flex"
          >
            <GitFork size={20} />
            View on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
