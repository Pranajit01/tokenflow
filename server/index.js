/**
 * index.js — Token Flow Backend Server (Standalone + Vercel Serverless Ready)
 * 
 * Express server with:
 * - CORS for frontend & Vercel deployments
 * - JSON body parsing
 * - Queue API routes mounted at /api/queue
 * - Demo data seeded on startup
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const queueRoutes = require('./routes/queue');
const { seedDemoData } = require('./services/queueEngine');

const app = express();
const PORT = process.env.PORT || 3001;

// Seed initial demo data
seedDemoData();

// ─── Middleware ───
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

// ─── Health check ───
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Token Flow API',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
  });
});

// ─── Queue API routes ───
app.use('/api/queue', queueRoutes);

// ─── 404 handler ───
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// ─── Global error handler ───
app.use((err, req, res, next) => {
  console.error('[Server] Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start server if running directly ───
if (require.main === module || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════════╗');
    console.log('  ║          TOKEN FLOW — Backend            ║');
    console.log('  ║      Queue Without the Queue             ║');
    console.log('  ╚══════════════════════════════════════════╝');
    console.log('');
    console.log(`  🚀 Server running at http://localhost:${PORT}`);
    console.log(`  📡 API endpoints at http://localhost:${PORT}/api/queue`);
    console.log(`  🤖 Gemini API key: ${process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? '✅ configured' : '⚠️  not set (using fallback parser)'}`);
    console.log('');
  });
}

module.exports = app;
