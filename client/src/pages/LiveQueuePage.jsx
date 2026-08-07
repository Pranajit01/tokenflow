/**
 * LiveQueuePage.jsx — Real-time queue view (polling-based sync)
 */

import { useQueue } from '../contexts/QueueContext';
import QueueTable from '../components/QueueTable';
import TokenCard from '../components/TokenCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import StatsCard from '../components/StatsCard';
import ParallaxStarsBackground from '../components/ParallaxStarsBackground';
import { formatRelativeTime } from '../utils/formatTime';
import { Users, Clock, CheckCircle, Activity } from 'lucide-react';

export default function LiveQueuePage() {
  const { queue, currentToken, stats, loading, lastUpdated } = useQueue();

  if (loading) {
    return <LoadingSpinner text="Loading live queue..." />;
  }

  return (
    <div className="py-10 px-4 sm:px-6 relative min-h-screen">
      <ParallaxStarsBackground speed={1} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Live <span className="text-[#12b3a4]">Queue Stream</span>
            </h1>
            <p className="text-xs font-mono text-white/50 mt-1">
              Auto-syncs every 3 seconds • Last synced: {formatRelativeTime(lastUpdated)}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#12b3a4]/15 border border-[#12b3a4]/40 px-3 py-1.5 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12b3a4] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#12b3a4] tracking-wider">
              REALTIME LIVE
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Users} label="Waiting In Line" value={stats.waitingCount || 0} color="#ffc531" />
          <StatsCard icon={Activity} label="Currently Serving" value={stats.servingCount || 0} color="#12b3a4" />
          <StatsCard icon={CheckCircle} label="Served Today" value={stats.totalServed || 0} color="#6b5be6" />
          <StatsCard icon={Clock} label="Avg. Wait Time" value={`${stats.avgWaitMinutes || 0}m`} color="#ff5b57" />
        </div>

        {/* Currently Serving Token */}
        {currentToken && (
          <div className="mb-8">
            <h2 className="text-sm font-mono uppercase text-[#12b3a4] tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#12b3a4] animate-pulse" />
              🔔 Now Serving at Counter
            </h2>
            <TokenCard token={currentToken} highlighted />
          </div>
        )}

        {/* Active Queue Table */}
        {queue && queue.length > 0 ? (
          <div>
            <h2 className="text-sm font-mono uppercase text-white/60 tracking-wider mb-3">
              Active Waiting Queue ({queue.length} {queue.length === 1 ? 'person' : 'people'})
            </h2>
            <QueueTable queue={queue} />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
