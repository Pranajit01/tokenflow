/**
 * analyticsEngine.js — Analytics & Statistics Tracker
 * 
 * Tracks queue metrics for the admin dashboard and analytics page.
 * All data is in-memory (resets on server restart — acceptable for hackathon).
 * 
 * Tracked metrics:
 * - Total tokens served today
 * - Average wait time
 * - Department breakdown
 * - Priority distribution
 * - Hourly throughput
 * - Completion times
 */

// In-memory analytics store
const analytics = {
  completedTokens: [],   // Array of completed token records
  skippedTokens: [],     // Array of skipped token records
  startTime: new Date(), // Server start time
};

/**
 * Record a completed token for analytics
 * @param {Object} token - The completed queue entry
 */
function recordCompletion(token) {
  analytics.completedTokens.push({
    ...token,
    completedAt: new Date().toISOString(),
    actualWaitMinutes: calculateActualWait(token),
  });
}

/**
 * Record a skipped token for analytics
 * @param {Object} token - The skipped queue entry
 */
function recordSkip(token) {
  analytics.skippedTokens.push({
    ...token,
    skippedAt: new Date().toISOString(),
  });
}

/**
 * Calculate actual wait time from when token was created to now
 * @param {Object} token - Queue entry with createdAt timestamp
 * @returns {number} Actual wait in minutes
 */
function calculateActualWait(token) {
  if (!token.createdAt) return 0;
  const created = new Date(token.createdAt);
  const now = new Date();
  return Math.round((now - created) / (1000 * 60));
}

/**
 * Get summary statistics for the dashboard
 * @param {Array} currentQueue - Current queue state
 * @returns {Object} Stats object
 */
function getStats(currentQueue) {
  const allCompleted = analytics.completedTokens;
  const allSkipped = analytics.skippedTokens;
  const totalServed = allCompleted.length;
  const totalSkipped = allSkipped.length;
  const totalToday = totalServed + totalSkipped + currentQueue.length;

  // Average wait time
  const avgWait = totalServed > 0
    ? Math.round(allCompleted.reduce((sum, t) => sum + (t.actualWaitMinutes || 0), 0) / totalServed)
    : 0;

  // Currently waiting count
  const waitingCount = currentQueue.filter(e => e.status === 'waiting').length;
  const servingCount = currentQueue.filter(e => e.status === 'serving').length;

  return {
    totalServed,
    totalSkipped,
    totalToday,
    avgWaitMinutes: avgWait,
    waitingCount,
    servingCount,
    completionRate: totalToday > 0 ? Math.round((totalServed / totalToday) * 100) : 0,
  };
}

/**
 * Get department breakdown data for recharts
 * @param {Array} currentQueue - Current queue state
 * @returns {Array} Array of {department, waiting, completed, total}
 */
function getDepartmentBreakdown(currentQueue) {
  const deptMap = new Map();

  // Count current queue
  for (const entry of currentQueue) {
    const dept = entry.department || 'General';
    if (!deptMap.has(dept)) deptMap.set(dept, { department: dept, waiting: 0, completed: 0, skipped: 0 });
    if (entry.status === 'waiting' || entry.status === 'serving') {
      deptMap.get(dept).waiting++;
    }
  }

  // Count completed
  for (const entry of analytics.completedTokens) {
    const dept = entry.department || 'General';
    if (!deptMap.has(dept)) deptMap.set(dept, { department: dept, waiting: 0, completed: 0, skipped: 0 });
    deptMap.get(dept).completed++;
  }

  // Count skipped
  for (const entry of analytics.skippedTokens) {
    const dept = entry.department || 'General';
    if (!deptMap.has(dept)) deptMap.set(dept, { department: dept, waiting: 0, completed: 0, skipped: 0 });
    deptMap.get(dept).skipped++;
  }

  return Array.from(deptMap.values()).map(d => ({
    ...d,
    total: d.waiting + d.completed + d.skipped,
  }));
}

/**
 * Get priority distribution data for recharts pie chart
 * @param {Array} currentQueue - Current queue state
 * @returns {Array} Array of {name, value, color}
 */
function getPriorityDistribution(currentQueue) {
  const priorityColors = {
    emergency: '#FF5B57',
    disabled: '#6B5BE6',
    pregnant: '#FF5B57',
    senior_citizen: '#FFC531',
    child: '#3AA0FF',
    normal: '#12B3A4',
  };

  const priorityLabels = {
    emergency: 'Emergency',
    disabled: 'Disabled',
    pregnant: 'Pregnant',
    senior_citizen: 'Senior Citizen',
    child: 'Child',
    normal: 'Normal',
  };

  const allEntries = [
    ...currentQueue,
    ...analytics.completedTokens,
    ...analytics.skippedTokens,
  ];

  const counts = {};
  for (const entry of allEntries) {
    const level = entry.priority?.level || 'normal';
    counts[level] = (counts[level] || 0) + 1;
  }

  return Object.entries(counts).map(([level, count]) => ({
    name: priorityLabels[level] || level,
    value: count,
    fill: priorityColors[level] || '#12B3A4',
  }));
}

/**
 * Get hourly throughput data for recharts line chart
 * @returns {Array} Array of {hour, completed, created}
 */
function getHourlyThroughput() {
  const hours = [];
  for (let h = 0; h < 24; h++) {
    hours.push({
      hour: `${String(h).padStart(2, '0')}:00`,
      completed: 0,
      created: 0,
    });
  }

  for (const entry of analytics.completedTokens) {
    const hour = new Date(entry.completedAt).getHours();
    hours[hour].completed++;
  }

  // We can't track created-per-hour for current queue easily without
  // adding createdAt tracking, so we estimate from completed + current queue
  for (const entry of analytics.completedTokens) {
    if (entry.createdAt) {
      const hour = new Date(entry.createdAt).getHours();
      hours[hour].created++;
    }
  }

  return hours;
}

/**
 * Get full analytics payload
 * @param {Array} currentQueue - Current queue state
 * @returns {Object} Complete analytics data for the frontend
 */
function getFullAnalytics(currentQueue) {
  return {
    stats: getStats(currentQueue),
    departmentBreakdown: getDepartmentBreakdown(currentQueue),
    priorityDistribution: getPriorityDistribution(currentQueue),
    hourlyThroughput: getHourlyThroughput(),
  };
}

module.exports = { recordCompletion, recordSkip, getStats, getFullAnalytics };
