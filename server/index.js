/**
 * index.js — Token Flow Backend Server
 * 
 * Express server with:
 * - CORS for frontend dev server
 * - JSON body parsing
 * - Queue API routes mounted at /api/queue
 * - Demo data seeded on startup
 * 
 * Run: npm run dev (nodemon) or npm start (production)
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const queueRoutes = require('./routes/queue');
const { seedDemoData } = require('./services/queueEngine');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
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

// ─── Start server ───
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

  // Seed demo data so judges see a populated queue on first run
  seedDemoData();
  console.log('  📋 Demo data seeded (3 sample tokens)');
  console.log('');
});
