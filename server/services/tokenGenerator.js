/**
 * tokenGenerator.js — Token ID Generator
 * 
 * Format: TF-{DEPT_CODE}-{3-digit sequence}
 * - DEPT_CODE: first 3 letters of department name, uppercased
 * - Sequence: 001, 002, ... resets daily per department
 * 
 * Example: TF-PAS-001 (Passport department, first token of the day)
 */

// Track per-department daily counters
// Key: "YYYY-MM-DD:DEPT_CODE", Value: last sequence number
const counters = new Map();

/**
 * Get today's date string for counter keying
 */
function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Extract 3-letter department code from department name
 * @param {string} department - Full department name (e.g., "Passport Office")
 * @returns {string} 3-letter code (e.g., "PAS")
 */
function getDeptCode(department) {
  if (!department || typeof department !== 'string') return 'GEN'; // fallback: GENeral
  // Remove non-alpha chars, take first 3 chars, uppercase
  const cleaned = department.replace(/[^a-zA-Z]/g, '');
  return (cleaned.substring(0, 3) || 'GEN').toUpperCase();
}

/**
 * Generate a new token ID for the given department
 * @param {string} department - Department name
 * @returns {string} Token ID like "TF-PAS-001"
 */
function generateTokenId(department) {
  const deptCode = getDeptCode(department);
  const dateKey = getTodayKey();
  const counterKey = `${dateKey}:${deptCode}`;

  const current = counters.get(counterKey) || 0;
  const next = current + 1;
  counters.set(counterKey, next);

  const sequence = String(next).padStart(3, '0');
  return `TF-${deptCode}-${sequence}`;
}

/**
 * Reset all counters (useful for testing)
 */
function resetCounters() {
  counters.clear();
}

module.exports = { generateTokenId, getDeptCode, resetCounters };
