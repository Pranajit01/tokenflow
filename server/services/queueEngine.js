/**
 * queueEngine.js — In-Memory Queue Store
 * 
 * The single source of truth for queue state.
 * All queue mutations go through this module.
 * 
 * Queue entry shape:
 * {
 *   tokenId: "TF-PAS-001",
 *   service: "Passport Renewal",
 *   department: "Passport Office",
 *   preferredTime: "morning" | null,
 *   isAppointment: false,
 *   priority: { level: "normal", reason: "Standard request" },
 *   priorityScore: 10,
 *   estimatedWaitMinutes: 15,
 *   notes: "Needs form 2A" | null,
 *   status: "waiting" | "serving" | "completed" | "skipped",
 *   position: 1,
 *   createdAt: "2026-08-07T12:00:00.000Z",
 *   originalRequest: "I need to renew my passport"
 * }
 */

const { calculatePriorityScore, validatePriorityLevel } = require('./priorityEngine');
const { recalculateAllWaits } = require('./waitEstimator');
const { generateTokenId } = require('./tokenGenerator');
const { recordCompletion, recordSkip, getStats } = require('./analyticsEngine');

// ─── In-memory queue (single source of truth) ───
let queue = [];

/**
 * Add a new entry to the queue
 * @param {Object} geminiOutput - Structured data from Gemini (or fallback parser)
 * @param {string} originalRequest - The user's raw natural language input
 * @returns {Object} The created queue entry
 */
function addToQueue(geminiOutput, originalRequest) {
  const validatedLevel = validatePriorityLevel(geminiOutput.priority?.level);

  const entry = {
    tokenId: generateTokenId(geminiOutput.department),
    service: geminiOutput.service || 'General Service',
    department: geminiOutput.department || 'General',
    preferredTime: geminiOutput.preferredTime || null,
    isAppointment: Boolean(geminiOutput.isAppointment),
    priority: {
      level: validatedLevel,
      reason: geminiOutput.priority?.reason || 'Standard request',
    },
    priorityScore: calculatePriorityScore(validatedLevel, geminiOutput.isAppointment),
    estimatedWaitMinutes: geminiOutput.estimatedWaitMinutes || 0,
    notes: geminiOutput.notes || null,
    status: 'waiting',
    position: 0, // will be recalculated
    createdAt: new Date().toISOString(),
    originalRequest: originalRequest || '',
  };

  queue.push(entry);

  // Re-sort by priority score (descending), then by creation time (ascending)
  sortQueue();

  // Recalculate positions and wait times
  recalculatePositions();
  recalculateAllWaits(queue);

  return entry;
}

/**
 * Sort the queue: higher priority first, within same priority FIFO order
 */
function sortQueue() {
  queue.sort((a, b) => {
    // Only sort 'waiting' entries; 'serving' stays at position 0
    if (a.status === 'serving') return -1;
    if (b.status === 'serving') return 1;
    if (a.status !== 'waiting' || b.status !== 'waiting') return 0;

    // Higher priority score first
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }
    // Same priority: earlier creation time first (FIFO)
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}

/**
 * Recalculate position numbers for all waiting entries
 */
function recalculatePositions() {
  let pos = 1;
  for (const entry of queue) {
    if (entry.status === 'serving') {
      entry.position = 0; // Currently being served
    } else if (entry.status === 'waiting') {
      entry.position = pos++;
    }
  }
}

/**
 * Get the current queue state (active entries only)
 * @returns {Array} Queue entries that are waiting or serving
 */
function getQueue() {
  return queue.filter(e => e.status === 'waiting' || e.status === 'serving');
}

/**
 * Get the full queue including completed/skipped (for internal use)
 * @returns {Array} All queue entries
 */
function getFullQueue() {
  return [...queue];
}

/**
 * Get the currently serving token
 * @returns {Object|null} The entry being served, or null
 */
function getCurrentToken() {
  return queue.find(e => e.status === 'serving') || null;
}

/**
 * Get the next token in line
 * @returns {Object|null} The next waiting entry, or null
 */
function getNextToken() {
  return queue.find(e => e.status === 'waiting') || null;
}

/**
 * Call the next person: complete current (if any), serve next in line
 * @returns {Object} { previous, current } — who was just completed and who is now serving
 */
function callNext() {
  // Complete whoever is currently serving
  const currentlyServing = getCurrentToken();
  if (currentlyServing) {
    currentlyServing.status = 'completed';
    recordCompletion(currentlyServing);
  }

  // Find next waiting person and set to serving
  const next = getNextToken();
  if (next) {
    next.status = 'serving';
    next.position = 0;
  }

  recalculatePositions();
  recalculateAllWaits(queue);

  return { previous: currentlyServing, current: next };
}

/**
 * Skip the currently serving person
 * @returns {Object} { skipped, current } — who was skipped and who is now serving
 */
function skip() {
  const currentlyServing = getCurrentToken();
  if (currentlyServing) {
    currentlyServing.status = 'skipped';
    recordSkip(currentlyServing);
  }

  // Serve next person
  const next = getNextToken();
  if (next) {
    next.status = 'serving';
    next.position = 0;
  }

  recalculatePositions();
  recalculateAllWaits(queue);

  return { skipped: currentlyServing, current: next };
}

/**
 * Complete the currently serving person
 * @returns {Object} { completed, current } — who was completed and who is next
 */
function complete() {
  const currentlyServing = getCurrentToken();
  if (currentlyServing) {
    currentlyServing.status = 'completed';
    recordCompletion(currentlyServing);
  }

  recalculatePositions();
  recalculateAllWaits(queue);

  return { completed: currentlyServing, next: getNextToken() };
}

/**
 * Get live state for polling endpoint
 * @returns {Object} Full state for the frontend
 */
function getLiveState() {
  const activeQueue = getQueue();
  return {
    queue: activeQueue,
    currentToken: getCurrentToken(),
    nextToken: getNextToken(),
    stats: getStats(activeQueue),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Seed demo data for first-run experience
 * Called on server startup to ensure judges see a populated queue
 */
function seedDemoData() {
  const demoEntries = [
    {
      service: 'Passport Renewal',
      department: 'Passport Office',
      preferredTime: 'morning',
      isAppointment: false,
      priority: { level: 'normal', reason: 'Standard passport renewal request' },
      estimatedWaitMinutes: 10,
      notes: 'Needs to bring original documents',
    },
    {
      service: 'Urgent Medical Consultation',
      department: 'Health Services',
      preferredTime: null,
      isAppointment: false,
      priority: { level: 'senior_citizen', reason: 'Elderly patient requiring immediate attention' },
      estimatedWaitMinutes: 5,
      notes: 'Patient is 78 years old, needs wheelchair access',
    },
    {
      service: 'Birth Certificate Application',
      department: 'Civil Registry',
      preferredTime: 'afternoon',
      isAppointment: true,
      priority: { level: 'normal', reason: 'Scheduled appointment for birth certificate' },
      estimatedWaitMinutes: 15,
      notes: 'Appointment confirmed for today',
    },
  ];

  for (const entry of demoEntries) {
    addToQueue(entry, `[Demo] ${entry.service}`);
  }

  // Set the first priority token (senior citizen) to 'serving' for demo
  const firstPriority = queue.find(e => e.priority.level === 'senior_citizen');
  if (firstPriority) {
    firstPriority.status = 'serving';
    firstPriority.position = 0;
    recalculatePositions();
    recalculateAllWaits(queue);
  }
}

module.exports = {
  addToQueue,
  getQueue,
  getFullQueue,
  getCurrentToken,
  getNextToken,
  callNext,
  skip,
  complete,
  getLiveState,
  seedDemoData,
};
