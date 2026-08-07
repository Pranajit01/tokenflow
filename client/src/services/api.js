/**
 * api.js — Frontend API Client
 * 
 * All fetch wrappers to the backend. NO direct Gemini calls here.
 * Uses relative URLs that Vite proxies to http://localhost:3001
 */

const API_BASE = '/api/queue';
const TIMEOUT_MS = 15000; // 15 second timeout for Gemini-powered requests

/**
 * Fetch with timeout wrapper
 */
async function fetchWithTimeout(url, options = {}, timeout = TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
}

/**
 * Submit a natural language queue request
 * @param {string} text - User's natural language input
 * @returns {Object} { success, token, aiAnalysis }
 */
export async function submitQueueRequest(text) {
  return fetchWithTimeout(`${API_BASE}/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
}

/**
 * Fetch current live queue state (for polling)
 * @returns {Object} { queue, currentToken, nextToken, stats, updatedAt }
 */
export async function fetchLiveQueue() {
  return fetchWithTimeout(`${API_BASE}/live`, {}, 5000);
}

/**
 * Admin: call next person in queue
 */
export async function adminCallNext() {
  return fetchWithTimeout(`${API_BASE}/admin/call-next`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Admin: skip current person
 */
export async function adminSkip() {
  return fetchWithTimeout(`${API_BASE}/admin/skip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Admin: complete current person
 */
export async function adminComplete() {
  return fetchWithTimeout(`${API_BASE}/admin/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Fetch analytics data for charts
 */
export async function fetchAnalytics() {
  return fetchWithTimeout(`${API_BASE}/analytics`, {}, 5000);
}

/**
 * Health check
 */
export async function checkHealth() {
  return fetchWithTimeout('/api/health', {}, 3000);
}
