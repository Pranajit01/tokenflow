/**
 * routes/queue.js — Queue API Routes
 * 
 * All queue operations are exposed as REST endpoints.
 * Frontend polls GET /api/queue/live every 3 seconds for sync.
 * 
 * Endpoints:
 *   POST /api/queue/request     — Citizen submits NL request → Gemini → token
 *   GET  /api/queue/live        — Current queue state (for polling)
 *   POST /api/queue/admin/call-next  — Admin: serve next person
 *   POST /api/queue/admin/skip       — Admin: skip current person
 *   POST /api/queue/admin/complete   — Admin: mark current as complete
 *   GET  /api/queue/analytics        — Analytics data for charts
 */

const express = require('express');
const router = express.Router();
const { analyzeRequest } = require('../services/geminiService');
const queueEngine = require('../services/queueEngine');
const { getFullAnalytics } = require('../services/analyticsEngine');

/**
 * POST /api/queue/request
 * Citizen submits a natural language request.
 * Backend calls Gemini (with fallback), creates token, adds to queue.
 */
router.post('/request', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        error: 'Missing or empty "text" field in request body',
        success: false,
      });
    }

    const trimmed = text.trim();

    // Analyze via Gemini (or fallback parser)
    console.log(`[Queue] Analyzing request: "${trimmed.substring(0, 100)}..."`);
    const analysis = await analyzeRequest(trimmed);

    // Add to queue engine
    const entry = queueEngine.addToQueue(analysis, trimmed);

    console.log(`[Queue] Token created: ${entry.tokenId} | Dept: ${entry.department} | Priority: ${entry.priority.level}`);

    return res.status(201).json({
      success: true,
      token: entry,
      aiAnalysis: analysis,
    });
  } catch (error) {
    console.error('[Queue] Error processing request:', error);
    return res.status(500).json({
      error: 'Failed to process queue request. Please try again.',
      success: false,
    });
  }
});

/**
 * GET /api/queue/live
 * Returns current queue state for polling.
 * Frontend calls this every 3 seconds.
 */
router.get('/live', (req, res) => {
  try {
    const state = queueEngine.getLiveState();
    return res.json(state);
  } catch (error) {
    console.error('[Queue] Error fetching live state:', error);
    return res.status(500).json({ error: 'Failed to fetch queue state' });
  }
});

/**
 * POST /api/queue/admin/call-next
 * Admin action: complete current token, serve next in line
 */
router.post('/admin/call-next', (req, res) => {
  try {
    const result = queueEngine.callNext();
    console.log(`[Admin] Called next. Previous: ${result.previous?.tokenId || 'none'} → Current: ${result.current?.tokenId || 'none'}`);
    return res.json({
      success: true,
      ...result,
      liveState: queueEngine.getLiveState(),
    });
  } catch (error) {
    console.error('[Admin] Error calling next:', error);
    return res.status(500).json({ error: 'Failed to call next token', success: false });
  }
});

/**
 * POST /api/queue/admin/skip
 * Admin action: skip current token, serve next in line
 */
router.post('/admin/skip', (req, res) => {
  try {
    const result = queueEngine.skip();
    console.log(`[Admin] Skipped: ${result.skipped?.tokenId || 'none'} → Current: ${result.current?.tokenId || 'none'}`);
    return res.json({
      success: true,
      ...result,
      liveState: queueEngine.getLiveState(),
    });
  } catch (error) {
    console.error('[Admin] Error skipping:', error);
    return res.status(500).json({ error: 'Failed to skip token', success: false });
  }
});

/**
 * POST /api/queue/admin/complete
 * Admin action: mark current token as completed
 */
router.post('/admin/complete', (req, res) => {
  try {
    const result = queueEngine.complete();
    console.log(`[Admin] Completed: ${result.completed?.tokenId || 'none'}`);
    return res.json({
      success: true,
      ...result,
      liveState: queueEngine.getLiveState(),
    });
  } catch (error) {
    console.error('[Admin] Error completing:', error);
    return res.status(500).json({ error: 'Failed to complete token', success: false });
  }
});

/**
 * GET /api/queue/analytics
 * Returns analytics data for recharts (department breakdown, priority dist, hourly throughput)
 */
router.get('/analytics', (req, res) => {
  try {
    const activeQueue = queueEngine.getQueue();
    const analytics = getFullAnalytics(activeQueue);
    return res.json(analytics);
  } catch (error) {
    console.error('[Analytics] Error fetching analytics:', error);
    return res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
