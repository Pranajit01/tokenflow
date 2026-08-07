/**
 * AnalyticsPage.jsx — Full analytics dashboard with recharts
 */

import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import StatsCard from '../components/StatsCard';
import { Users, Clock, CheckCircle, TrendingUp, BarChart3, PieChart as PieIcon } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  LineChart, Line, Area, AreaChart
} from 'recharts';

const PIE_COLORS = ['#12B3A4', '#FF5B57', '#FFC531', '#6B5BE6', '#3AA0FF', '#17140D'];

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
    // Refresh every 10 seconds
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner text="Loading analytics..." />;

  if (error) {
    return (
      <div className="py-12 px-4 text-center">
        <p className="text-lg" style={{ color: 'var(--color-coral)' }}>Failed to load analytics: {error}</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const deptBreakdown = data?.departmentBreakdown || [];
  const priorityDist = data?.priorityDistribution || [];
  const hourlyData = data?.hourlyThroughput || [];

  // Filter hourly data to show only hours with activity
  const activeHours = hourlyData.filter(h => h.completed > 0 || h.created > 0);

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-heading)' }}>
            <BarChart3 size={28} className="inline mr-2" style={{ color: 'var(--color-sky)' }} />
            Analytics <span style={{ color: 'var(--color-sky)' }}>Dashboard</span>
          </h1>
          <p className="text-sm opacity-50 mt-1">Real-time queue performance metrics</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Users} label="Total Today" value={stats.totalToday || 0} color="var(--color-teal)" />
          <StatsCard icon={CheckCircle} label="Completed" value={stats.totalServed || 0} color="var(--color-violet)" />
          <StatsCard icon={Clock} label="Avg. Wait" value={`${stats.avgWaitMinutes || 0}m`} color="var(--color-mustard)" />
          <StatsCard icon={TrendingUp} label="Completion %" value={`${stats.completionRate || 0}%`} color="var(--color-coral)" />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Department Breakdown Bar Chart */}
          <div className="memphis-card p-5">
            <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Department Breakdown
            </h3>
            {deptBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deptBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="department" tick={{ fontSize: 10, fontFamily: 'var(--font-body)' }} angle={-20} textAnchor="end" height={60} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #17140D', fontFamily: 'var(--font-body)' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="waiting" name="Waiting" fill="var(--color-mustard)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" name="Completed" fill="var(--color-teal)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="skipped" name="Skipped" fill="var(--color-coral)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-sm opacity-50 py-12">No department data yet</p>
            )}
          </div>

          {/* Priority Distribution Pie Chart */}
          <div className="memphis-card p-5">
            <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              <PieIcon size={16} className="inline mr-1" />
              Priority Distribution
            </h3>
            {priorityDist.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityDist}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ strokeWidth: 2 }}
                  >
                    {priorityDist.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.fill || PIE_COLORS[index % PIE_COLORS.length]}
                        stroke="#17140D"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #17140D' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-sm opacity-50 py-12">No priority data yet</p>
            )}
          </div>
        </div>

        {/* Hourly Throughput */}
        <div className="memphis-card p-5">
          <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Hourly Throughput
          </h3>
          {activeHours.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activeHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fontFamily: 'var(--font-body)' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #17140D' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="completed" name="Completed" stroke="var(--color-teal)" fill="var(--color-teal)" fillOpacity={0.2} strokeWidth={3} />
                <Area type="monotone" dataKey="created" name="Created" stroke="var(--color-violet)" fill="var(--color-violet)" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-sm opacity-50 py-12">
              Throughput data will appear as tokens are completed
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
