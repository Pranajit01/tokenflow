/**
 * TokenSuccessPage.jsx — Shows the generated token with AI-extracted details
 */

import { useLocation, Link, Navigate } from 'react-router';
import { ArrowRight, ListOrdered, Home, PartyPopper } from 'lucide-react';
import TokenCard from '../components/TokenCard';
import ParallaxStarsBackground from '../components/ParallaxStarsBackground';

export default function TokenSuccessPage() {
  const location = useLocation();
  const token = location.state?.token;
  const aiAnalysis = location.state?.aiAnalysis;

  if (!token) {
    return <Navigate to="/queue" replace />;
  }

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 relative flex flex-col justify-center items-center">
      <ParallaxStarsBackground speed={1} />

      <div className="max-w-xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#12b3a4]/20 border border-[#12b3a4]/40 flex items-center justify-center mx-auto mb-4 text-[#12b3a4]">
            <PartyPopper size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
            Token Generated Successfully!
          </h1>
          <p className="text-sm text-white/60">Your digital queue token is now live in the system</p>
        </div>

        {/* Token Display Card */}
        <div className="space-card p-8 text-center mb-6 border border-[#12b3a4]/40 shadow-[0_0_30px_rgba(18,179,164,0.2)]">
          <p className="text-xs font-mono uppercase text-white/50 mb-2 tracking-wider">Assigned Digital Token ID</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-[#12b3a4] font-mono">
            {token.tokenId}
          </h2>
        </div>

        {/* Token Card Component */}
        <TokenCard token={token} highlighted />

        {/* AI Analysis Breakdown */}
        {aiAnalysis && (
          <div className="space-card p-5 mt-6 border border-white/15">
            <h3 className="text-xs font-mono uppercase text-[#ffc531] mb-3 flex items-center gap-2">
              <span>🤖</span> Gemini AI Classification Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-white/40 block mb-1">Target Service:</span>
                <p className="font-semibold text-white">{aiAnalysis.service}</p>
              </div>
              <div>
                <span className="text-white/40 block mb-1">Target Department:</span>
                <p className="font-semibold text-white">{aiAnalysis.department}</p>
              </div>
              <div>
                <span className="text-white/40 block mb-1">Priority Level:</span>
                <p className="font-semibold text-white capitalize">{aiAnalysis.priority?.level?.replace('_', ' ')}</p>
              </div>
              <div>
                <span className="text-white/40 block mb-1">Appointment:</span>
                <p className="font-semibold text-white">{aiAnalysis.isAppointment ? 'Yes (Confirmed)' : 'No (Walk-in)'}</p>
              </div>
            </div>
            {aiAnalysis.priority?.reason && (
              <p className="text-xs text-white/50 mt-3 pt-3 border-t border-white/10 italic">
                AI Priority Reason: "{aiAnalysis.priority.reason}"
              </p>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <Link to="/live" className="btn-primary">
            <ListOrdered size={16} />
            <span>Track Live Queue Stream</span>
          </Link>
          <Link to="/" className="btn-outline">
            <Home size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
