/**
 * AnalyticsPage.jsx — Analytics Dashboard Layout Fix
 */

import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import StatsCard from '../components/StatsCard';
import ParallaxStarsBackground from '../components/ParallaxStarsBackground';
import { Users, Clock, CheckCircle, TrendingUp, BarChart3, PieChart as PieIcon } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  AreaChart, Area
} from 'recharts';

const PIE_COLORS = ['#12B3A4', '#FF5B57', '#FFC531', '#6B5BE6', '#3AA0FF', '#FFFFFF'];

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchAnalytics();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner text="Loading analytics metrics..." />;

  if (error) {
    return (
      <div className="min-h-screen w-full pt-28 pb-16 px-4 text-center">
        <p className="text-sm font-mono text-[#ff5b57] break-words">Failed to load analytics: {error}</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const deptBreakdown = data?.departmentBreakdown || [];
  const priorityDist = data?.priorityDistribution || [];
  const hourlyData = data?.hourlyThroughput || [];
  const activeHours = hourlyData.filter(h => h.completed > 0 || h.created > 0);

  return (
    <div className="min-h-screen w-full pt-28 pb-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Stars Isolated Wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <ParallaxStarsBackground speed={1} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2 break-words text-white">
            <BarChart3 size={28} className="text-[#3aa0ff]" />
            Analytics <span className="text-[#3aa0ff]">Dashboard</span>
          </h1>
          <p className="text-xs font-mono text-white/50 mt-1 break-words">Real-time queue performance and department throughput metrics</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center mb-8 w-full">
          <StatsCard icon={Users} label="Total Today" value={stats.totalToday || 0} color="#12b3a4" />
          <StatsCard icon={CheckCircle} label="Completed" value={stats.totalServed || 0} color="#6b5be6" />
          <StatsCard icon={Clock} label="Avg. Wait Time" value={`${stats.avgWaitMinutes || 0}m`} color="#ffc531" />
          <StatsCard icon={TrendingUp} label="Completion Rate" value={`${stats.completionRate || 0}%`} color="#ff5b57" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 w-full">
          {/* Department Breakdown Bar Chart */}
          <div className="space-card p-5 w-full">
            <h3 className="text-xs font-mono uppercase text-white/70 mb-4">
              Department Queue Volume Breakdown
            </h3>
            {deptBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={deptBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="department" tick={{ fontSize: 10, fill: '#9c9c9d' }} angle={-15} textAnchor="end" height={50} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#9c9c9d' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0e121e', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="waiting" name="Waiting" fill="#ffc531" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" name="Completed" fill="#12b3a4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="skipped" name="Skipped" fill="#ff5b57" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-xs font-mono text-white/40 py-16">No department breakdown data yet</p>
            )}
          </div>

          {/* Priority Distribution Pie Chart */}
          <div className="space-card p-5 w-full">
            <h3 className="text-xs font-mono uppercase text-white/70 mb-4 flex items-center gap-2">
              <PieIcon size={15} className="text-[#3aa0ff]" />
              Priority Distribution Mix
            </h3>
            {priorityDist.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={priorityDist}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ strokeWidth: 1.5, stroke: '#9c9c9d' }}
                  >
                    {priorityDist.map((entry, index) => (
                      <Cell key={index} fill={entry.fill || PIE_COLORS[index % PIE_COLORS.length]} stroke="#07080a" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0e121e', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', fill: '#9c9c9d' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-xs font-mono text-white/40 py-16">No priority distribution data yet</p>
            )}
          </div>
        </div>

        {/* Hourly Throughput */}
        <div className="space-card p-5 w-full">
          <h3 className="text-xs font-mono uppercase text-white/70 mb-4">
            Hourly Queue Throughput
          </h3>
          {activeHours.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={activeHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9c9c9d' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#9c9c9d' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0e121e', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="completed" name="Completed Tokens" stroke="#12b3a4" fill="#12b3a4" fillOpacity={0.2} strokeWidth={2} />
                <Area type="monotone" dataKey="created" name="Created Tokens" stroke="#6b5be6" fill="#6b5be6" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-xs font-mono text-white/40 py-16">
              Throughput metrics will appear as tokens are completed
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
