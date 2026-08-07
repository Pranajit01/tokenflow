/**
 * LiveQueuePage.jsx — Real-time queue view (polling-based sync)
 */

import { useQueue } from '../contexts/QueueContext';
import QueueTable from '../components/QueueTable';
import TokenCard from '../components/TokenCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import StatsCard from '../components/StatsCard';
import { formatRelativeTime } from '../utils/formatTime';
import { Users, Clock, CheckCircle, Activity } from 'lucide-react';

export default function LiveQueuePage() {
  const { queue, currentToken, stats, loading, lastUpdated } = useQueue();

  if (loading) {
    return <LoadingSpinner text="Loading live queue..." />;
  }

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-heading)' }}>
              Live <span style={{ color: 'var(--color-teal)' }}>Queue</span>
            </h1>
            <p className="text-sm opacity-50 mt-1">
              Auto-updates every 3 seconds • Last: {formatRelativeTime(lastUpdated)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-teal)' }} />
            <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-teal)' }}>
              LIVE
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Users} label="Waiting" value={stats.waitingCount || 0} color="var(--color-mustard)" />
          <StatsCard icon={Activity} label="Serving" value={stats.servingCount || 0} color="var(--color-teal)" />
          <StatsCard icon={CheckCircle} label="Served Today" value={stats.totalServed || 0} color="var(--color-violet)" />
          <StatsCard icon={Clock} label="Avg. Wait" value={`${stats.avgWaitMinutes || 0}m`} color="var(--color-coral)" />
        </div>

        {/* Currently Serving */}
        {currentToken && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              🔔 Now Serving
            </h2>
            <TokenCard token={currentToken} highlighted />
          </div>
        )}

        {/* Queue Table */}
        {queue && queue.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Queue ({queue.length} {queue.length === 1 ? 'person' : 'people'})
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
