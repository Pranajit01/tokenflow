/**
 * priorityEngine.js — Priority Scoring System
 * 
 * Assigns numeric scores to priority levels for queue ordering.
 * Higher score = served sooner.
 * 
 * Score breakdown:
 *   emergency:      100  (life-threatening situations)
 *   disabled:        80  (accessibility needs)
 *   pregnant:        70  (physical comfort)
 *   senior_citizen:  60  (age-related needs)
 *   child:           40  (minors)
 *   normal:          10  (default)
 * 
 * Appointment bonus: +5 if isAppointment is true
 */

const PRIORITY_SCORES = {
  emergency: 100,
  disabled: 80,
  pregnant: 70,
  senior_citizen: 60,
  child: 40,
  normal: 10,
};

// Human-readable labels for display
const PRIORITY_LABELS = {
  emergency: 'Emergency',
  disabled: 'Disabled',
  pregnant: 'Pregnant',
  senior_citizen: 'Senior Citizen',
  child: 'Child',
  normal: 'Normal',
};

// Colors for frontend badge rendering (returned via API)
const PRIORITY_COLORS = {
  emergency: '#FF5B57',
  disabled: '#6B5BE6',
  pregnant: '#FF5B57',
  senior_citizen: '#FFC531',
  child: '#3AA0FF',
  normal: '#12B3A4',
};

/**
 * Calculate priority score for a queue entry
 * @param {string} level - Priority level (from Gemini output)
 * @param {boolean} isAppointment - Whether user has an appointment
 * @returns {number} Numeric score for sorting
 */
function calculatePriorityScore(level, isAppointment = false) {
  const baseScore = PRIORITY_SCORES[level] || PRIORITY_SCORES.normal;
  const appointmentBonus = isAppointment ? 5 : 0;
  return baseScore + appointmentBonus;
}

/**
 * Get display label for a priority level
 * @param {string} level - Priority level key
 * @returns {string} Human-readable label
 */
function getPriorityLabel(level) {
  return PRIORITY_LABELS[level] || 'Normal';
}

/**
 * Get display color for a priority level
 * @param {string} level - Priority level key
 * @returns {string} Hex color string
 */
function getPriorityColor(level) {
  return PRIORITY_COLORS[level] || PRIORITY_COLORS.normal;
}

/**
 * Validate that a priority level is one of the allowed values
 * @param {string} level - Priority level to validate
 * @returns {string} Validated level (falls back to 'normal')
 */
function validatePriorityLevel(level) {
  return PRIORITY_SCORES.hasOwnProperty(level) ? level : 'normal';
}

module.exports = {
  calculatePriorityScore,
  getPriorityLabel,
  getPriorityColor,
  validatePriorityLevel,
  PRIORITY_SCORES,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
};
