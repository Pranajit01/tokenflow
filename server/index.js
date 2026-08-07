/**
 * index.js — Token Flow Backend Server (Standalone + Vercel Serverless Ready)
 * 
 * Express server with:
 * - Helmet for security headers & XSS protection
 * - Compression for high efficiency Gzip/Brotli payloads
 * - Rate limiting for API defense
 * - CORS for frontend & Vercel deployments
 * - JSON body parsing & sanitization
 * - Queue API routes mounted at /api/queue
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const queueRoutes = require('./routes/queue');
const { seedDemoData } = require('./services/queueEngine');

const app = express();
const PORT = process.env.PORT || 3001;

// Seed initial demo data
seedDemoData();

// ─── Security Headers (Helmet) ───
app.use(helmet({
  contentSecurityPolicy: false, // Allow cross-origin static assets
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// ─── Response Compression (Efficiency) ───
app.use(compression());

// ─── Rate Limiting (Security Defense) ───
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.', success: false },
});
app.use('/api/', limiter);

// ─── CORS Middleware ───
app.use(cors({
  origin: true,
  credentials: true,
}));

// ─── JSON Body Parser with 1mb limit ───
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── Cache-Control Headers for Static API Efficiency ───
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

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
