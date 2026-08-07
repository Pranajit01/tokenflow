/**
 * TokenSuccessPage.jsx — Shows the generated token with AI-extracted details
 */

import { useLocation, Link, Navigate } from 'react-router';
import { ArrowRight, ListOrdered, Home, PartyPopper } from 'lucide-react';
import TokenCard from '../components/TokenCard';
import ConfettiBackground from '../components/ConfettiBackground';
import { useMemo } from 'react';

// CSS-only celebration confetti pieces
function CelebrationConfetti() {
  const pieces = useMemo(() => {
    const colors = ['var(--color-teal)', 'var(--color-coral)', 'var(--color-mustard)', 'var(--color-violet)', 'var(--color-sky)'];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2}s`,
      color: colors[i % colors.length],
      size: `${6 + Math.random() * 8}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
  }, []);

  return (
    <>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.rotation})`,
          }}
        />
      ))}
    </>
  );
}

export default function TokenSuccessPage() {
  const location = useLocation();
  const token = location.state?.token;
  const aiAnalysis = location.state?.aiAnalysis;

  // Redirect if no token data (direct URL access)
  if (!token) {
    return <Navigate to="/queue" replace />;
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 relative">
      <CelebrationConfetti />
      <ConfettiBackground density="sparse" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Success header */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'var(--color-teal)', border: '3px solid var(--color-ink)' }}
          >
            <PartyPopper size={36} color="white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Token Generated!
          </h1>
          <p className="opacity-60">Your digital queue token is ready</p>
        </div>

        {/* Token display */}
        <div className="mb-6">
          <div className="memphis-card p-8 text-center mb-4">
            <p className="text-sm opacity-50 mb-2">Your Token Number</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-widest"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-teal)' }}
            >
              {token.tokenId}
            </h2>
          </div>
        </div>

        {/* Full token details */}
        <TokenCard token={token} highlighted />

        {/* AI Analysis section */}
        {aiAnalysis && (
          <div className="memphis-card p-5 mt-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
              <span style={{ color: 'var(--color-violet)' }}>🤖</span>
              AI Analysis
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="opacity-50">Service:</span>
                <p className="font-medium">{aiAnalysis.service}</p>
              </div>
              <div>
                <span className="opacity-50">Department:</span>
                <p className="font-medium">{aiAnalysis.department}</p>
              </div>
              <div>
                <span className="opacity-50">Priority:</span>
                <p className="font-medium capitalize">{aiAnalysis.priority?.level?.replace('_', ' ')}</p>
              </div>
              <div>
                <span className="opacity-50">Appointment:</span>
                <p className="font-medium">{aiAnalysis.isAppointment ? 'Yes' : 'No'}</p>
              </div>
            </div>
            {aiAnalysis.priority?.reason && (
              <p className="text-xs mt-3 italic opacity-50">
                Priority reason: "{aiAnalysis.priority.reason}"
              </p>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <Link to="/live" className="memphis-btn memphis-btn-primary">
            <ListOrdered size={18} />
            View Live Queue
          </Link>
          <Link to="/" className="memphis-btn memphis-btn-outline">
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
