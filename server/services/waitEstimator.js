/**
 * waitEstimator.js — Wait Time Estimation
 * 
 * Estimates how long each person in the queue will wait,
 * based on their position and the priority mix ahead of them.
 * 
 * Base formula: 5 minutes per person ahead in queue
 * Adjustments:
 *   - Emergency tokens are served faster (~2 min each)
 *   - Priority tokens are ~4 min each
 *   - Normal tokens are ~5 min each
 */

const SERVICE_TIME_MINUTES = {
  emergency: 2,
  disabled: 4,
  pregnant: 4,
  senior_citizen: 4,
  child: 3,
  normal: 5,
};

/**
 * Estimate wait time for a specific position in the queue
 * @param {Array} queueAhead - Array of queue entries ahead of this person
 * @returns {number} Estimated wait in minutes
 */
function estimateWaitMinutes(queueAhead) {
  if (!queueAhead || queueAhead.length === 0) return 0;

  let totalMinutes = 0;
  for (const entry of queueAhead) {
    const level = entry.priority?.level || 'normal';
    totalMinutes += SERVICE_TIME_MINUTES[level] || SERVICE_TIME_MINUTES.normal;
  }
  return totalMinutes;
}

/**
 * Recalculate wait times for all entries in the queue
 * Mutates entries in-place, setting their estimatedWaitMinutes
 * @param {Array} queue - Full queue array (only 'waiting' entries matter)
 */
function recalculateAllWaits(queue) {
  const waiting = queue.filter(e => e.status === 'waiting');
  for (let i = 0; i < waiting.length; i++) {
    const ahead = waiting.slice(0, i);
    waiting[i].estimatedWaitMinutes = estimateWaitMinutes(ahead);
  }
}

/**
 * Get a human-readable wait string
 * @param {number} minutes - Wait time in minutes
 * @returns {string} e.g., "~15 min" or "< 1 min"
 */
function formatWaitTime(minutes) {
  if (minutes <= 0) return '< 1 min';
  if (minutes < 60) return `~${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `~${hours}h ${remaining}m` : `~${hours}h`;
}

module.exports = { estimateWaitMinutes, recalculateAllWaits, formatWaitTime, SERVICE_TIME_MINUTES };
