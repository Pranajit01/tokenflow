# 🚀 TOKEN FLOW — Queue Without the Queue

A **Gemini-powered Digital Waiting System** that transforms chaotic physical queues into an intelligent AI-assisted digital waiting experience.

> **Skip the Line, Not Your Turn.**

![Token Flow](https://img.shields.io/badge/Powered%20By-Google%20Gemini%20AI-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge)

---

## 📋 What It Does

Citizens describe their needs in **natural language** (e.g., *"My grandmother needs urgent medical consultation"*). Google Gemini AI:
- Extracts the **service type** and **department**
- Detects **priority level** (emergency, senior citizen, pregnant, disabled, child, normal)
- Estimates **wait time**
- Assigns a **digital token** (e.g., `TF-HEA-001`)

The queue stays in **real-time sync** across admin and citizen dashboards via polling.

---

## 🛠️ Quick Start

### Prerequisites
- **Node.js** v18+ installed
- A **Google Gemini API key** (get one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey))

### 1. Clone & Setup

```bash
git clone https://github.com/Pranajit01/tokenflow.git
cd tokenflow
```

### 2. Start the Backend

```bash
cd server
cp .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_actual_key_here

npm install
npm run dev
```

The server starts at **http://localhost:3001** with 3 demo tokens pre-seeded.

### 3. Start the Frontend

```bash
cd client
npm install
npm run dev
```

The app opens at **http://localhost:5173**.

### 4. That's It! 🎉

- Visit **http://localhost:5173** for the citizen view
- Open **http://localhost:5173/admin** in another tab for the admin dashboard
- Submit a queue request, and watch both tabs sync in real time

---

## 📂 Project Structure

```
├── server/                      # Backend (Node.js + Express)
│   ├── index.js                 # Server entry point
│   ├── routes/queue.js          # REST API endpoints
│   ├── services/
│   │   ├── geminiService.js     # Gemini AI integration (ONLY place Gemini is called)
│   │   ├── queueEngine.js       # In-memory queue store (single source of truth)
│   │   ├── priorityEngine.js    # Priority scoring system
│   │   ├── waitEstimator.js     # Wait time estimation
│   │   ├── tokenGenerator.js    # Token ID generator (TF-DEPT-001)
│   │   └── analyticsEngine.js   # Queue metrics tracker
│   ├── .env.example             # Environment variable template
│   └── package.json
│
├── client/                      # Frontend (React + Vite)
│   ├── index.html               # HTML with Google Fonts
│   ├── vite.config.js           # Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── main.jsx             # React entry
│   │   ├── App.jsx              # Router + Providers
│   │   ├── index.css            # Memphis design system + animations
│   │   ├── components/          # 10+ reusable components
│   │   ├── pages/               # 7 pages
│   │   ├── layouts/             # MainLayout
│   │   ├── contexts/            # QueueContext, ToastContext
│   │   ├── services/api.js      # API client (fetch wrappers)
│   │   ├── hooks/               # useScrollReveal
│   │   └── utils/               # formatTime
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/queue/request` | Submit a natural language queue request |
| `GET` | `/api/queue/live` | Get current queue state (polled every 3s) |
| `POST` | `/api/queue/admin/call-next` | Admin: serve next person |
| `POST` | `/api/queue/admin/skip` | Admin: skip current person |
| `POST` | `/api/queue/admin/complete` | Admin: mark current as completed |
| `GET` | `/api/queue/analytics` | Get analytics data for charts |
| `GET` | `/api/health` | Server health check |

---

## 🎨 Design System

**Memphis/Postmodern** style with:
- Warm cream background (`#F5EFE2`)
- Thick 3px black outlines
- Hard offset shadows (no blur)
- CSS-only animated geometric confetti (9 shape types)
- Bricolage Grotesque (headings) + DM Sans (body) via Google Fonts

---

## 🧠 AI Integration

- **SDK**: `@google/genai` v2.16.0
- **Model**: `gemini-2.5-flash` (verified production-stable flash-tier)
- **Structured Output**: `responseMimeType: "application/json"` + `responseSchema`
- **Fallback**: Rule-based keyword parser if Gemini fails (emergency/senior/pregnant detection)
- **Security**: API key stays server-side only (never in browser bundle)

---

## 📱 Pages

1. **Landing** — Animated hero, features, benefits, how-it-works
2. **Queue Form** — Natural language + voice input → Gemini analysis
3. **Token Success** — Generated token with AI analysis breakdown
4. **Live Queue** — Real-time queue table with stats
5. **Admin Dashboard** — Call Next / Skip / Complete + recharts
6. **Analytics** — Department breakdown, priority distribution, hourly throughput
7. **About** — Project info and tech stack

---

## ⚠️ Important Notes

- The queue is stored **in-memory** (resets on server restart) — this is by design for hackathon scope
- Voice input uses the **Web Speech API** (works in Chrome; mic button auto-hides in Firefox)
- Without a Gemini API key, the app uses a **rule-based fallback parser** — still functional, just less intelligent
- Frontend **polls** the backend every 3 seconds (no WebSocket complexity needed)

---

## 📄 License

Built for Hackathon 2026 🏆
