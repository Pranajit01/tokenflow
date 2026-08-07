/**
 * formatTime.js — Time formatting utilities
 */

/**
 * Format minutes to human-readable wait time
 * @param {number} minutes
 * @returns {string} e.g., "~15 min", "< 1 min", "~1h 20m"
 */
export function formatWaitTime(minutes) {
  if (!minutes || minutes <= 0) return '< 1 min';
  if (minutes < 60) return `~${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = Math.round(minutes % 60);
  return remaining > 0 ? `~${hours}h ${remaining}m` : `~${hours}h`;
}

/**
 * Format ISO timestamp to relative time
 * @param {string} isoString - ISO 8601 timestamp
 * @returns {string} e.g., "2 min ago", "just now"
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '';
  const now = new Date();
  const then = new Date(isoString);
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);

  if (diffSec < 30) return 'just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return then.toLocaleDateString();
}

/**
 * Format ISO timestamp to readable time
 * @param {string} isoString
 * @returns {string} e.g., "2:30 PM"
 */
export function formatTime(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
