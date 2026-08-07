/**
 * LandingPage.jsx — Hero + Features + Benefits + How-it-Works + Footer
 * 
 * Memphis/Postmodern animated landing with CSS-only confetti background.
 */

import { Link } from 'react-router';
import {
  Sparkles, ListOrdered, Shield, Clock, Mic, BarChart3,
  ArrowRight, CheckCircle, Zap, Users, Brain, Eye
} from 'lucide-react';
import ConfettiBackground from '../components/ConfettiBackground';
import FeatureCard from '../components/FeatureCard';
import useScrollReveal from '../hooks/useScrollReveal';
import { useQueue } from '../contexts/QueueContext';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Describe your needs in plain language. Gemini AI extracts the service, department, and priority automatically.',
    color: 'var(--color-violet)',
  },
  {
    icon: Mic,
    title: 'Voice Input',
    description: 'Speak your request using the built-in voice recognition. No typing needed.',
    color: 'var(--color-coral)',
  },
  {
    icon: Zap,
    title: 'Instant Digital Token',
    description: 'Get a unique token ID instantly. No physical ticket, no counter visit required.',
    color: 'var(--color-mustard)',
  },
  {
    icon: Eye,
    title: 'Live Queue Tracking',
    description: 'Watch your position update in real time. Know exactly when it\'s your turn.',
    color: 'var(--color-teal)',
  },
  {
    icon: Shield,
    title: 'Smart Priority',
    description: 'Emergency, senior citizen, pregnant, and disabled cases are automatically prioritized.',
    color: 'var(--color-coral)',
  },
  {
    icon: BarChart3,
    title: 'Admin Analytics',
    description: 'Comprehensive dashboard with queue statistics, wait times, and department breakdowns.',
    color: 'var(--color-sky)',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Describe Your Need', desc: 'Tell us what you need in plain language — type or speak.' },
  { step: '02', title: 'AI Analyzes', desc: 'Gemini extracts service type, department, and priority level.' },
  { step: '03', title: 'Get Your Token', desc: 'Receive a digital token with your position and estimated wait.' },
  { step: '04', title: 'Track Live', desc: 'Watch the queue update in real time from anywhere.' },
];

export default function LandingPage() {
  const scrollRef = useScrollReveal();
  const { stats } = useQueue();

  return (
    <div ref={scrollRef}>
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 overflow-hidden">
        <ConfettiBackground />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 memphis-badge px-4 py-2" style={{ backgroundColor: 'var(--color-cream)', border: '3px solid var(--color-ink)' }}>
                <Sparkles size={14} style={{ color: 'var(--color-mustard)' }} />
                <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Powered by Google Gemini AI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                <span className="marker-highlight">Queue</span> Without{' '}
                <br className="hidden sm:block" />
                the <span className="marker-highlight-teal">Queue</span>
              </h1>

              <p className="text-lg sm:text-xl opacity-70 max-w-lg leading-relaxed">
                Transform chaotic physical queues into an intelligent AI-assisted digital waiting experience. 
                <strong> Skip the line, not your turn.</strong>
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/queue" className="memphis-btn memphis-btn-primary text-lg">
                  Generate Token
                  <ArrowRight size={20} />
                </Link>
                <Link to="/live" className="memphis-btn memphis-btn-outline text-lg">
                  View Live Queue
                  <ListOrdered size={20} />
                </Link>
              </div>
            </div>

            {/* Right — Dashboard Preview */}
            <div className="hidden lg:block">
              <div className="memphis-card p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    Queue Preview
                  </h3>
                  <span className="memphis-badge" style={{ backgroundColor: 'var(--color-teal)', color: 'white' }}>
                    Live
                  </span>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--color-cream)', border: '2px solid var(--color-ink)' }}>
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-teal)' }}>
                      {stats.waitingCount || 0}
                    </p>
                    <p className="text-xs opacity-60">Waiting</p>
                  </div>
                  <div className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--color-cream)', border: '2px solid var(--color-ink)' }}>
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-coral)' }}>
                      {stats.servingCount || 0}
                    </p>
                    <p className="text-xs opacity-60">Serving</p>
                  </div>
                  <div className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--color-cream)', border: '2px solid var(--color-ink)' }}>
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-mustard)' }}>
                      {stats.totalServed || 0}
                    </p>
                    <p className="text-xs opacity-60">Served</p>
                  </div>
                </div>

                {/* Mini queue list */}
                <div className="space-y-2">
                  {[
                    { id: 'TF-PAS-001', dept: 'Passport Office', status: 'Serving', color: 'var(--color-teal)' },
                    { id: 'TF-HEA-001', dept: 'Health Services', status: 'Waiting', color: 'var(--color-mustard)' },
                    { id: 'TF-CIV-001', dept: 'Civil Registry', status: 'Waiting', color: 'var(--color-mustard)' },
                  ].map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl" style={{ border: '2px solid var(--color-ink)' }}>
                      <div>
                        <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-teal)' }}>{item.id}</span>
                        <span className="text-xs opacity-60 ml-2">{item.dept}</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: item.color, color: 'white', border: '1px solid var(--color-ink)' }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══ */}
      <section className="py-20 px-4 sm:px-6" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Why <span style={{ color: 'var(--color-teal)' }}>Token Flow</span>?
            </h2>
            <p className="text-lg opacity-60 max-w-2xl mx-auto">
              Powered by Google Gemini AI, our system understands your needs and gets you in line — intelligently.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS SECTION ═══ */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
        <ConfettiBackground density="sparse" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                No More Standing in <span className="marker-highlight-coral">Line</span>
              </h2>
              <div className="space-y-4">
                {[
                  'Submit your request from anywhere — no physical visit needed',
                  'AI understands context: "My elderly mother needs urgent help"',
                  'Priority cases are automatically detected and fast-tracked',
                  'Real-time updates so you know exactly when to show up',
                  'Works on any device — phone, tablet, or desktop',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} style={{ color: 'var(--color-teal)', flexShrink: 0, marginTop: '2px' }} />
                    <p className="text-sm opacity-80">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="memphis-card p-8 text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-teal)', border: '3px solid var(--color-ink)' }}>
                    <Users size={28} color="white" className="mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{stats.totalToday || 3}</p>
                    <p className="text-xs text-white/70">Today's Visitors</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-mustard)', border: '3px solid var(--color-ink)' }}>
                    <Clock size={28} className="mx-auto mb-2" style={{ color: 'var(--color-ink)' }} />
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-ink)' }}>{stats.avgWaitMinutes || 5}m</p>
                    <p className="text-xs opacity-70">Avg. Wait</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-violet)', border: '3px solid var(--color-ink)' }}>
                    <Sparkles size={28} color="white" className="mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>AI</p>
                    <p className="text-xs text-white/70">Powered</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-coral)', border: '3px solid var(--color-ink)' }}>
                    <Shield size={28} color="white" className="mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>6</p>
                    <p className="text-xs text-white/70">Priority Levels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14 scroll-reveal" style={{ fontFamily: 'var(--font-heading)' }}>
            How It <span style={{ color: 'var(--color-violet)' }}>Works</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="memphis-card p-6 text-center scroll-reveal">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: ['var(--color-teal)', 'var(--color-violet)', 'var(--color-mustard)', 'var(--color-coral)'][i],
                    border: '3px solid var(--color-ink)',
                  }}
                >
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="text-sm opacity-60">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 scroll-reveal">
            <Link to="/queue" className="memphis-btn memphis-btn-primary text-lg">
              Try It Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
