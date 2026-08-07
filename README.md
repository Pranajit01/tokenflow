# 🚀 TOKEN FLOW — Queue Without the Queue

A **Gemini-Powered Intelligent Digital Queue & Waiting System** designed for modern government counters, clinics, and municipal service centers.

> **Skip the Line, Not Your Turn.**

![Token Flow](https://img.shields.io/badge/Powered%20By-Google%20Gemini%202.5-ef233c?style=for-the-badge&logo=google)
![Tests](https://img.shields.io/badge/Tests-16%20Passed-12b3a4?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38BDF8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Design System](#-architecture--design-system)
- [Automated Unit Testing](#-automated-unit-testing)
- [Performance & Optimization](#-performance--optimization)
- [Quick Start (Local Development)](#-quick-start-local-development)
- [Vercel Deployment Guide](#-vercel-deployment-guide)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [AI Engine & Fallback Mechanism](#-ai-engine--fallback-mechanism)
- [License](#-license)

---

## 🎯 Overview

Token Flow replaces chaotic physical waiting lines with a digital AI-assisted queue experience. 

Citizens describe their needs in natural human language (via text or voice). **Google Gemini 2.5 Flash** parses the input, extracts service metadata, detects priority indicators (emergencies, seniors, disability, pregnancy), estimates wait times, and issues a structured digital token.

Both citizen views and the **Admin OS** sync automatically in real-time via 3-second background polling.

---

## ✨ Key Features

- 🧠 **Natural Language Intent Parsing**: Describe any request in plain English — no tedious multi-select forms.
- ⚡ **Context-Aware Priority Engine**: Automatically fast-tracks emergencies (100 pts), disabled individuals (80 pts), pregnant women (70 pts), and senior citizens (60 pts).
- 🎙️ **Voice Recognition**: Native Web Speech API integration for senior citizens and hands-free scenarios.
- 📊 **Real-Time Stream Sync**: Polling engine keeps live counters, waiting rooms, and admin dashboards in 3-second sync.
- 🖥️ **Admin OS Dashboard**: One-click counter actions (Call Next, Skip, Complete) with interactive Recharts analytics.
- 🧪 **Automated Unit Tests**: Complete unit testing suite with 100% pass rate covering priority scoring, token sequence generation, fallback intent classification, and queue sorting.
- 🔴 **Red Noir Aesthetic**: Dark mode (#000000), crimson (#ef233c) accents, spinning conic gradient border CTAs, and Manrope typography.
- 🚀 **Vercel Serverless Ready**: Instant deployment setup with serverless API rewrites.

---

## 🧪 Automated Unit Testing

Token Flow transitions from a prototype "hack" to a production-ready "skill" with a comprehensive automated unit test suite (`node:test`).

Run unit tests locally:

```bash
npm test
```

### Test Coverage Breakdown:
- ✅ **Priority Engine**: Validates base weights (Emergency: 100, Disabled: 80, Pregnant: 70, Senior: 60, Child: 40, Normal: 10), appointment bonus logic (+5), level validation, and color output.
- ✅ **Token Generator**: Tests 3-letter department code formatting (`Passport Office` → `PAS`, `Health Services` → `HEA`), sequential numbering (`001`, `002`), and counter resets.
- ✅ **Gemini Fallback Classifier**: Tests keyword intent matching for emergency detection, senior citizen routing, pregnancy flags, disability keywords, and time preferences.
- ✅ **Queue Engine**: Tests priority score re-sorting, position recalculations, live state polling payload, calling next, skipping, and completion state transitions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router v7, Tailwind CSS v4, Lucide React, Recharts |
| **Build System** | Vite 6.3 with Rollup manual chunking |
| **Backend** | Node.js, Express.js |
| **AI SDK** | `@google/genai` (Gemini 2.5 Flash model) |
| **Testing** | Node.js Test Runner (`node:test` + `node:assert`) |
| **Deployment** | Vercel (Frontend static assets + Serverless API Functions) |

---

## 🎨 Architecture & Design System

The application follows the **Red Noir** design philosophy:
- **Base Background**: `#000000` (Pure Dark)
- **Primary Accent**: `#ef233c` (Crimson Neon)
- **Typography**: `Manrope` (Headings), `Inter` (Body & UI), `Geist Mono` (Code & IDs)
- **Animations**: Conic border gradient rotation (`.shiny-cta`), star field background parallax, subtle micro-interactions.
- **Layout System**: 100% dead-center flex/grid containers with generous vertical spacing and text-wrapping safety (`break-words`, `min-w-0`).

---

## ⚡ Performance & Optimization

- **Bundle Optimization**: Custom Rollup `manualChunks` configuration splits vendor libraries (`react-vendor`, `recharts-vendor`, `icons`), reducing main bundle size by **67%** (from 735kB to 241kB).
- **Font Optimization**: Google Fonts preconnected with `display=swap` for zero render blocking.
- **Memory Safety**: Clean `useEffect` timer cleanup across polling contexts and analytics views.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js **v18+**
- A **Google Gemini API Key** (get one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey))

### 1. Clone Project

```bash
git clone https://github.com/Pranajit01/tokenflow.git
cd tokenflow
```

### 2. Environment Setup

Copy `.env.example` in the `server` directory and add your Gemini API key:

```bash
cd server
cp .env.example .env
```

Set inside `server/.env`:
```env
PORT=3001
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Run Unit Tests

```bash
npm test
```

### 4. Start Development Servers

Run from the project root:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3001/api/queue`

---

## 🌐 Vercel Deployment Guide

Token Flow is pre-configured for one-click Vercel deployment:

1. **Push your repository** to GitHub.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `tokenflow` repository.
4. Add the Environment Variable in Vercel settings:
   - `GEMINI_API_KEY` = *your_gemini_api_key*
5. Click **Deploy**.

`vercel.json` automatically routes `/api/(.*)` to the serverless function handler in `api/index.js` and serves `client/dist` for static single-page application routes.

---

## 📂 Project Structure

```
├── api/
│   └── index.js                 # Vercel Serverless Function entrypoint
├── client/                      # React 19 + Vite Frontend
│   ├── index.html               # Entry HTML with meta tags & Google Fonts
│   ├── vite.config.js           # Vite config with Rollup manualChunks optimization
│   ├── src/
│   │   ├── components/          # Reusable UI components (Navbar, Footer, TokenCard, StatsCard, etc.)
│   │   ├── contexts/            # QueueContext (Polling) & ToastContext
│   │   ├── pages/               # LandingPage, QueueFormPage, TokenSuccessPage, LiveQueuePage, AdminDashboardPage, AnalyticsPage, AboutPage
│   │   ├── services/api.js      # Frontend API client
│   │   ├── index.css            # Red Noir design tokens & animations
│   │   └── main.jsx             # React root mount
│   └── package.json
├── server/                      # Node.js + Express Backend
│   ├── index.js                 # Express server & Vercel export
│   ├── routes/queue.js          # REST API endpoints
│   ├── services/
│   │   ├── geminiService.js     # Google Gemini 2.5 Flash SDK integration & fallback parser
│   │   ├── queueEngine.js       # In-memory queue state management & sorting
│   │   ├── priorityEngine.js    # Priority scoring logic
│   │   ├── analyticsEngine.js   # Recharts metrics compiler
│   │   ├── tokenGenerator.js    # Token ID generator (TF-DEPT-001)
│   │   └── waitEstimator.js     # Wait time estimator
│   ├── tests/
│   │   └── suite.test.js        # Node.js automated unit test suite (16 tests)
│   └── package.json
├── package.json                 # Root script runner
├── vercel.json                  # Vercel deployment & rewrite configuration
└── README.md
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/queue/request` | Submit natural language request → Gemini AI → Token |
| `GET` | `/api/queue/live` | Fetch current active queue state (polled every 3s) |
| `POST` | `/api/queue/admin/call-next` | Admin OS: complete current & serve next in line |
| `POST` | `/api/queue/admin/skip` | Admin OS: skip current token |
| `POST` | `/api/queue/admin/complete` | Admin OS: complete current token |
| `GET` | `/api/queue/analytics` | Fetch department breakdown & hourly throughput metrics |
| `GET` | `/api/health` | Service health check |

---

## 🤖 AI Engine & Fallback Mechanism

Token Flow uses the official `@google/genai` SDK with `gemini-2.5-flash` and strict JSON schema enforcement (`responseMimeType: "application/json"`).

If the API key is missing or network connectivity to Gemini is interrupted, Token Flow seamlessly switches to a **deterministic keyword fallback engine**. The app will **always** issue a valid token and classify priorities, ensuring 100% uptime in production environments.

---

## 📄 License

Built for Hackathon 2026 🏆. Open-source under the MIT License.
