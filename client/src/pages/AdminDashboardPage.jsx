/**
 * AdminDashboardPage.jsx — Admin Queue Control Dashboard
 * 
 * Current/Next token, Call Next/Skip/Complete actions,
 * queue overview, stats, and charts (recharts).
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
import {
  SkipForward, PlayCircle, CheckCircle, Users,
  Clock, TrendingUp, BarChart3, AlertTriangle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = ['#12B3A4', '#FF5B57', '#FFC531', '#6B5BE6', '#3AA0FF', '#17140D'];

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
        addToast(`${label} — action completed`, 'success');
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
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-heading)' }}>
              Admin <span style={{ color: 'var(--color-violet)' }}>Dashboard</span>
            </h1>
            <p className="text-sm opacity-50 mt-1">Manage the queue in real time</p>
          </div>
          <div className="memphis-badge px-3 py-2" style={{ backgroundColor: 'var(--color-violet)', color: 'white', borderColor: 'var(--color-ink)' }}>
            <AlertTriangle size={14} />
            Admin Mode
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Users} label="Today's Visitors" value={stats.totalToday || 0} color="var(--color-teal)" />
          <StatsCard icon={Clock} label="Avg. Wait" value={`${stats.avgWaitMinutes || 0}m`} color="var(--color-mustard)" />
          <StatsCard icon={CheckCircle} label="Completed" value={stats.totalServed || 0} color="var(--color-violet)" />
          <StatsCard icon={TrendingUp} label="Completion Rate" value={`${stats.completionRate || 0}%`} color="var(--color-coral)" />
        </div>

        {/* Current + Next Token + Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Current Token */}
          <div>
            <h2 className="text-sm font-bold mb-3 opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>
              CURRENTLY SERVING
            </h2>
            {currentToken ? (
              <TokenCard token={currentToken} highlighted />
            ) : (
              <div className="memphis-card p-6 text-center opacity-50">
                <p className="text-sm">No one being served</p>
              </div>
            )}
          </div>

          {/* Next Token */}
          <div>
            <h2 className="text-sm font-bold mb-3 opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>
              NEXT IN LINE
            </h2>
            {nextToken ? (
              <TokenCard token={nextToken} />
            ) : (
              <div className="memphis-card p-6 text-center opacity-50">
                <p className="text-sm">Queue is empty</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div>
            <h2 className="text-sm font-bold mb-3 opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>
              QUEUE ACTIONS
            </h2>
            <div className="memphis-card p-5 space-y-3">
              <button
                onClick={() => handleAction('call-next', 'Called next person')}
                disabled={actionLoading === 'call-next'}
                className="memphis-btn memphis-btn-primary w-full justify-center"
              >
                <PlayCircle size={18} />
                {actionLoading === 'call-next' ? 'Processing...' : 'Call Next'}
              </button>
              <button
                onClick={() => handleAction('skip', 'Skipped current person')}
                disabled={!currentToken || actionLoading === 'skip'}
                className="memphis-btn memphis-btn-mustard w-full justify-center"
                style={{ opacity: (!currentToken || actionLoading === 'skip') ? 0.5 : 1 }}
              >
                <SkipForward size={18} />
                {actionLoading === 'skip' ? 'Processing...' : 'Skip Current'}
              </button>
              <button
                onClick={() => handleAction('complete', 'Completed current token')}
                disabled={!currentToken || actionLoading === 'complete'}
                className="memphis-btn memphis-btn-coral w-full justify-center"
                style={{ opacity: (!currentToken || actionLoading === 'complete') ? 0.5 : 1 }}
              >
                <CheckCircle size={18} />
                {actionLoading === 'complete' ? 'Processing...' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Department Breakdown */}
          <div className="memphis-card p-5">
            <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              <BarChart3 size={16} className="inline mr-1" />
              Queue by Department
            </h3>
            {deptData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={deptData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'var(--font-body)' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #17140D', fontFamily: 'var(--font-body)' }} />
                  <Bar dataKey="count" fill="var(--color-teal)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-sm opacity-50 py-8">No data yet</p>
            )}
          </div>

          {/* Priority Distribution */}
          <div className="memphis-card p-5">
            <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Priority Distribution
            </h3>
            {priorityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={{ fontSize: 11 }}>
                    {priorityData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#17140D" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #17140D' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-sm opacity-50 py-8">No data yet</p>
            )}
          </div>
        </div>

        {/* Queue Overview */}
        <div>
          <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Queue Overview ({queue.length})
          </h2>
          {queue.length > 0 ? (
            <QueueTable queue={queue} />
          ) : (
            <EmptyState message="Queue is clear" subtitle="All caught up! No one is waiting." />
          )}
        </div>
      </div>
    </div>
  );
}
