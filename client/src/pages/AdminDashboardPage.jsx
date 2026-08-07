/**
 * AdminDashboardPage.jsx — Admin Queue OS Layout Fix
 */

import { useState, useCallback } from 'react';
import { useQueue } from '../contexts/QueueContext';
import { useToast } from '../contexts/ToastContext';
import { adminCallNext, adminSkip, adminComplete } from '../services/api';
import TokenCard from '../components/TokenCard';
import QueueTable from '../components/QueueTable';
import EmptyState from '../components/EmptyState';
import StatsCard from '../components/StatsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ParallaxStarsBackground from '../components/ParallaxStarsBackground';
import {
  SkipForward, PlayCircle, CheckCircle, Users,
  Clock, TrendingUp, BarChart3, ShieldAlert
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = ['#12B3A4', '#FF5B57', '#FFC531', '#6B5BE6', '#3AA0FF', '#FFFFFF'];

export default function AdminDashboardPage() {
  const { queue, currentToken, nextToken, stats, loading, refresh } = useQueue();
  const { addToast } = useToast();
  const [actionLoading, setActionLoading] = useState(null);

  const handleAction = useCallback(async (action, label) => {
    setActionLoading(action);
    try {
      let result;
      if (action === 'call-next') result = await adminCallNext();
      else if (action === 'skip') result = await adminSkip();
      else if (action === 'complete') result = await adminComplete();

      if (result?.success) {
        addToast(`${label} — Action Executed`, 'success');
        await refresh();
      }
    } catch (err) {
      addToast(`Failed: ${err.message}`, 'error');
    } finally {
      setActionLoading(null);
    }
  }, [addToast, refresh]);

  // Build chart data from queue
  const deptData = (() => {
    const depts = {};
    queue.forEach(entry => {
      const dept = entry.department || 'General';
      depts[dept] = (depts[dept] || 0) + 1;
    });
    return Object.entries(depts).map(([name, value]) => ({ name, count: value }));
  })();

  const priorityData = (() => {
    const priorities = {};
    const labels = {
      emergency: 'Emergency', disabled: 'Disabled', pregnant: 'Pregnant',
      senior_citizen: 'Senior', child: 'Child', normal: 'Normal'
    };
    queue.forEach(entry => {
      const level = entry.priority?.level || 'normal';
      const label = labels[level] || level;
      priorities[label] = (priorities[label] || 0) + 1;
    });
    return Object.entries(priorities).map(([name, value]) => ({ name, value }));
  })();

  if (loading) return <LoadingSpinner text="Loading admin dashboard..." />;

  return (
    <div className="min-h-screen w-full py-12 md:py-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Stars Isolated Wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <ParallaxStarsBackground speed={1} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight break-words">
              Admin <span className="text-[#6b5be6]">Queue OS</span>
            </h1>
            <p className="text-xs font-mono text-white/50 mt-1 break-words">Real-time counter controls and queue orchestration</p>
          </div>
          <div className="flex items-center gap-2 bg-[#6b5be6]/20 border border-[#6b5be6]/40 text-[#6b5be6] px-3.5 py-1.5 rounded-full font-mono text-xs font-bold flex-shrink-0">
            <ShieldAlert size={14} />
            ADMIN CONTROL MODE
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center mb-8 w-full">
          <StatsCard icon={Users} label="Today's Visitors" value={stats.totalToday || 0} color="#12b3a4" />
          <StatsCard icon={Clock} label="Avg. Wait Time" value={`${stats.avgWaitMinutes || 0}m`} color="#ffc531" />
          <StatsCard icon={CheckCircle} label="Completed" value={stats.totalServed || 0} color="#6b5be6" />
          <StatsCard icon={TrendingUp} label="Completion Rate" value={`${stats.completionRate || 0}%`} color="#ff5b57" />
        </div>

        {/* Current + Next Token + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 w-full">
          {/* Current Token */}
          <div className="w-full">
            <h2 className="text-xs font-mono uppercase text-white/50 tracking-wider mb-3">
              CURRENTLY SERVING AT COUNTER
            </h2>
            {currentToken ? (
              <TokenCard token={currentToken} highlighted />
            ) : (
              <div className="space-card p-6 text-center text-white/40">
                <p className="text-sm">No token currently serving</p>
              </div>
            )}
          </div>

          {/* Next Token */}
          <div className="w-full">
            <h2 className="text-xs font-mono uppercase text-white/50 tracking-wider mb-3">
              NEXT IN LINE FOR COUNTER
            </h2>
            {nextToken ? (
              <TokenCard token={nextToken} />
            ) : (
              <div className="space-card p-6 text-center text-white/40">
                <p className="text-sm">Queue is empty</p>
              </div>
            )}
          </div>

          {/* Actions Panel */}
          <div className="w-full">
            <h2 className="text-xs font-mono uppercase text-white/50 tracking-wider mb-3">
              COUNTER CONTROLS
            </h2>
            <div className="space-card p-5 space-y-3">
              <button
                onClick={() => handleAction('call-next', 'Called Next Token')}
                disabled={actionLoading === 'call-next'}
                className="btn-primary w-full justify-center !py-3 !text-sm"
              >
                <PlayCircle size={18} />
                {actionLoading === 'call-next' ? 'Processing...' : 'Call Next Token'}
              </button>
              <button
                onClick={() => handleAction('skip', 'Skipped Current Token')}
                disabled={!currentToken || actionLoading === 'skip'}
                className="btn-outline w-full justify-center !py-3 !text-sm border-[#ffc531]/40 text-[#ffc531] hover:bg-[#ffc531]/10"
                style={{ opacity: (!currentToken || actionLoading === 'skip') ? 0.5 : 1 }}
              >
                <SkipForward size={18} />
                {actionLoading === 'skip' ? 'Processing...' : 'Skip Current Token'}
              </button>
              <button
                onClick={() => handleAction('complete', 'Marked Token Complete')}
                disabled={!currentToken || actionLoading === 'complete'}
                className="btn-outline w-full justify-center !py-3 !text-sm border-[#ff5b57]/40 text-[#ff5b57] hover:bg-[#ff5b57]/10"
                style={{ opacity: (!currentToken || actionLoading === 'complete') ? 0.5 : 1 }}
              >
                <CheckCircle size={18} />
                {actionLoading === 'complete' ? 'Processing...' : 'Mark Completed'}
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 w-full">
          {/* Department Breakdown Bar Chart */}
          <div className="space-card p-5 w-full">
            <h3 className="text-xs font-mono uppercase text-white/70 mb-4 flex items-center gap-2">
              <BarChart3 size={15} className="text-[#12b3a4]" />
              Queue Breakdown by Department
            </h3>
            {deptData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={deptData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9c9c9d' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#9c9c9d' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0e121e', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }} />
                  <Bar dataKey="count" fill="#12b3a4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-xs font-mono text-white/40 py-12">No department queue data yet</p>
            )}
          </div>

          {/* Priority Distribution Pie Chart */}
          <div className="space-card p-5 w-full">
            <h3 className="text-xs font-mono uppercase text-white/70 mb-4">
              Priority Distribution Mix
            </h3>
            {priorityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={{ fontSize: 11, fill: '#fff' }}>
                    {priorityData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#07080a" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0e121e', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#9c9c9d' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-xs font-mono text-white/40 py-12">No priority data yet</p>
            )}
          </div>
        </div>

        {/* Full Queue Table */}
        <div className="w-full">
          <h2 className="text-xs font-mono uppercase text-white/60 tracking-wider mb-3">
            Full Queue State Overview ({queue.length})
          </h2>
          {queue.length > 0 ? (
            <QueueTable queue={queue} />
          ) : (
            <EmptyState message="Queue is empty" subtitle="All tickets processed! No one is waiting." />
          )}
        </div>
      </div>
    </div>
  );
}
