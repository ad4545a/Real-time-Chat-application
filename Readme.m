# ⚡ PULSE — Real-Time Chat Application

> **WebSocket-powered real-time messaging. No latency. No clutter. Just the pure signal.**

Pulse is a full-stack, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) featuring WebSocket communication via Socket.IO, Clerk authentication, and a stunning neo-brutalist UI design.

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-19-blue)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Socket Events](#-socket-events)
- [Deployment](#-deployment)
- [3-Week Development Plan](#-3-week-development-plan)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Clerk Authentication** | Enterprise-grade auth with sign-up, sign-in, and session management |
| ⚡ **Real-Time Messaging** | Instant message delivery via WebSocket (Socket.IO) |
| 🟢 **Live Online Status** | Millisecond-accurate online/offline presence tracking |
| ✍️ **Typing Indicators** | Real-time "typing…" animation when the other user is composing |
| 🔔 **Smart Notifications** | OS-level browser notifications + in-app unread badge counters |
| 🔊 **Sound Effects** | Web Audio API-generated send/receive notification sounds |
| 📱 **Responsive Design** | Mobile-first, adaptive layout from phone to ultrawide |
| 🎨 **Neo-Brutalist UI** | Stunning design with hard shadows, bold typography, and accent colors |
| 🔍 **User Search** | Ctrl+K powered keyboard-first user search |
| 📜 **Persistent Messages** | Chat history stored in MongoDB with pagination support |
| 🛡️ **Security Hardened** | Helmet, CORS, rate limiting, Zod validation, and JWT socket auth |
| 📊 **Structured Logging** | Winston + Morgan production-grade request and event logging |

---

## 🛠 Tech Stack

### Frontend (CLIENT)
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling with custom neo-brutalist design system |
| **Socket.IO Client** | Real-time WebSocket communication |
| **Clerk React SDK** | Authentication UI & session management |
| **Framer Motion** | Smooth micro-animations & transitions |
| **React Router DOM v6** | Client-side routing |
| **React Icons** | Icon library (Remix Icons) |

### Backend (SERVER)
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **Socket.IO** | WebSocket server for real-time events |
| **MongoDB + Mongoose** | NoSQL database & ODM |
| **Clerk Backend SDK** | Server-side auth token verification |
| **Helmet** | HTTP security headers |
| **Express Rate Limit** | API abuse prevention (100 req/15 min) |
| **Zod** | Request validation schemas |
| **Winston** | Structured logging |
| **Morgan** | HTTP request logging |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Vercel)                     │
│  React 19 + Vite + Tailwind CSS + Framer Motion         │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────────┐ │
│  │ Landing  │  │   Auth   │  │      Chat Page         │ │
│  │  Page    │  │  (Clerk) │  │ ┌────────┐ ┌─────────┐ │ │
│  │          │  │          │  │ │Sidebar │ │ ChatBox │ │ │
│  └──────────┘  └──────────┘  │ └────────┘ └─────────┘ │ │
│                              └────────────────────────┘ │
├─────────────────────┬───────────────────────────────────┤
│    REST API (HTTP)  │      WebSocket (Socket.IO)        │
├─────────────────────┴───────────────────────────────────┤
│                    SERVER (Render)                       │
│  Node.js + Express + Socket.IO                          │
│  ┌────────────┐ ┌────────────┐ ┌──────────────────────┐ │
│  │ Middleware │ │ Controllers│ │   Socket Service     │ │
│  │  • Clerk   │ │  • sync    │ │  • send_message      │ │
│  │  • Rate    │ │  • users   │ │  • typing            │ │
│  │  • Validate│ │  • messages│ │  • onlineUsers       │ │
│  └────────────┘ └────────────┘ └──────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│                  MongoDB Atlas                          │
│  Collections: Users | Conversations | Messages          │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
User A types message
    ↓
Socket.IO emit("send_message")
    ↓
Server validates token → Creates Message doc → Updates Conversation
    ↓
Server emits("receive_message") to User B's socket
    ↓
User B receives message instantly + sound + notification
```

---

## 📂 Folder Structure

```
MYChatApplication/
├── CLIENT/                          # Frontend (React + Vite)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── Hero.jsx            # Landing page hero section
│   │   │   ├── Features.jsx        # Feature cards grid
│   │   │   ├── HowItWorks.jsx      # Onboarding steps + Footer
│   │   │   ├── Sidebar.jsx         # User list with search & online status
│   │   │   ├── ChatBox.jsx         # Main chat interface & message handling
│   │   │   └── MessageBubble.jsx   # Individual message bubble component
│   │   ├── config/
│   │   │   └── clerkTheme.js       # Custom Clerk UI theme (neo-brutalist)
│   │   ├── hooks/
│   │   │   ├── useSocket.js        # Socket.IO connection & online users
│   │   │   ├── useSound.js         # Web Audio API send/receive sounds
│   │   │   └── useNotification.js  # OS notifications & title badge
│   │   ├── pages/
│   │   │   ├── Landing.jsx         # Marketing landing page
│   │   │   ├── Auth.jsx            # Clerk sign-in / sign-up
│   │   │   └── Chat.jsx           # Main chat page (Sidebar + ChatBox)
│   │   ├── utils/
│   │   │   └── api.js              # Axios-like API helper functions
│   │   ├── App.jsx                 # Route definitions + auth guards
│   │   ├── main.jsx                # Entry point (ClerkProvider wraps App)
│   │   └── index.css               # Global styles & design tokens
│   ├── index.html                  # HTML entry
│   ├── vite.config.js              # Vite configuration
│   ├── vercel.json                 # Vercel deployment config (SPA rewrites)
│   ├── package.json
│   └── .env.example                # Required frontend env vars
│
├── SERVER/                          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js               # MongoDB connection via Mongoose
│   │   │   ├── socket.js           # Socket.IO server initialization + CORS
│   │   │   └── morgan.js           # HTTP request logger configuration
│   │   ├── controllers/
│   │   │   └── chat.controller.js  # Request handlers (sync, users, messages)
│   │   ├── middlewares/
│   │   │   ├── clerk.middleware.js  # JWT token verification via Clerk
│   │   │   ├── error.middleware.js  # Global error handler + 404 catch
│   │   │   └── validate.middleware.js # Zod schema validation middleware
│   │   ├── models/
│   │   │   ├── user.model.js       # User schema (clerkId, online status)
│   │   │   ├── conversation.model.js # Conversation (2 participants)
│   │   │   └── message.model.js    # Message schema (text, read status)
│   │   ├── routes/
│   │   │   └── chat.routes.js      # All API route definitions
│   │   ├── services/
│   │   │   ├── chat.service.js     # Business logic (CRUD operations)
│   │   │   └── socket.service.js   # Real-time event handling
│   │   ├── utils/
│   │   │   ├── ApiError.js         # Custom error class
│   │   │   ├── ApiResponse.js      # Standardized API response format
│   │   │   ├── asyncHandler.js     # Async try-catch wrapper
│   │   │   └── logger.js           # Winston logger setup
│   │   ├── validations/
│   │   │   └── chat.validation.js  # Zod schemas for message routes
│   │   ├── app.js                  # Express app setup + middleware stack
│   │   └── server.js               # HTTP server + Socket.IO + DB bootstrap
│   ├── package.json
│   ├── .env.example                # Required backend env vars
│   └── .gitignore
│
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB Atlas** account (free tier works)
- **Clerk** account ([clerk.com](https://clerk.com)) for authentication

### 1. Clone the Repository

```bash
git clone https://github.com/ad4545a/Real-time-Chat-application.git
cd MYChatApplication
```

### 2. Setup Backend (SERVER)

```bash
cd SERVER
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill in the values (see [Environment Variables](#-environment-variables)).

Start the development server:

```bash
npm run dev
```

The backend runs on `http://localhost:5000`.

### 3. Setup Frontend (CLIENT)

```bash
cd CLIENT
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill in the values.

Start the dev server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

---

## 🔑 Environment Variables

### Backend (`SERVER/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/chatapp` |
| `CLERK_SECRET_KEY` | Clerk secret key (from Clerk dashboard) | `sk_test_...` |
| `CLIENT_URL` | Frontend URL for CORS whitelist | `http://localhost:5173` or Vercel URL |

### Frontend (`CLIENT/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | `pk_test_...` |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_SOCKET_URL` | Backend Socket.IO URL | `http://localhost:5000` |

---

## 📡 API Endpoints

All routes are prefixed with `/api` and require Clerk authentication.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/sync` | Sync current user's Clerk data to MongoDB |
| `GET` | `/api/users` | Get all registered users (excluding self) |
| `GET` | `/api/conversations` | Get all conversations for current user |
| `GET` | `/api/conversations/:otherUserId` | Get or create a 1-on-1 conversation |
| `GET` | `/api/messages/:conversationId` | Get paginated messages (`?page=1&limit=50`) |
| `POST` | `/api/messages` | Send a new message (REST fallback) |

### Rate Limiting

- **100 requests per 15 minutes** per IP on all `/api` routes.
- Standard rate limit headers included in responses.

---

## 🔌 Socket Events

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `send_message` | `{ conversationId, receiverId, text }` | Send a message to a user |
| `typing` | `{ receiverId, isTyping }` | Broadcast typing indicator |

### Server → Client

| Event | Payload | Description |
|---|---|---|
| `receive_message` | Message object | New message received |
| `typing` | `{ senderId, isTyping }` | Typing status from another user |
| `onlineUsers` | `string[]` | Updated list of online user IDs |
| `auth_error` | `{ message }` | Authentication failure on socket |

### Authentication

Socket connections require:
- `auth.token` — Clerk session JWT
- `query.userId` — Clerk user ID

The server verifies the token using `@clerk/backend` before accepting the connection.

---

## 🌐 Deployment

### Frontend → Vercel

1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Set root directory to `CLIENT`
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Vite

### Backend → Render

1. Connect your GitHub repo to [Render](https://render.com)
2. Set root directory to `SERVER`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables in Render dashboard

---

## 📅 3-Week Development Plan

### 🗓 Week 1 — Foundation & Core Backend (Days 1–7)

> **Goal:** Set up the complete backend infrastructure and database layer.

| Day | Task | Details | Status |
|-----|------|---------|--------|
| **1** | Project Initialization | Create project structure (CLIENT + SERVER), initialize `package.json`, install core dependencies (Express, Mongoose, dotenv, cors) | ✅ |
| **1** | Git & Repository Setup | Initialize Git repo, create `.gitignore`, push to GitHub remote | ✅ |
| **2** | Database Design & Models | Design MongoDB schemas — `User` (clerkId, username, email, profileImage, isOnline, lastSeen), `Conversation` (participants, lastMessage), `Message` (conversationId, senderId, receiverId, text, isRead) | ✅ |
| **2** | MongoDB Atlas Setup | Create Atlas cluster, configure network access, get connection string, implement `db.js` connection module | ✅ |
| **3** | Express App Setup | Configure Express app with middleware stack — `helmet()` for security headers, `cors()` with origin whitelist, `express.json()` body parsing, `morgan` request logging | ✅ |
| **3** | Utility Classes | Build reusable utilities — `ApiError` (custom error class with status codes), `ApiResponse` (standardized JSON response), `asyncHandler` (try-catch wrapper), `logger` (Winston structured logging) | ✅ |
| **4** | Clerk Authentication | Set up Clerk project, install `@clerk/backend`, build `clerk.middleware.js` to extract & verify JWT tokens from `Authorization` header, protect all `/api` routes | ✅ |
| **4** | Validation Layer | Install Zod, create `chat.validation.js` with schemas for message sending (text length, required fields) and message retrieval (pagination params), build `validate.middleware.js` | ✅ |
| **5** | Chat Service Layer | Implement `ChatService` class — `syncUser()` (upsert Clerk data to MongoDB), `getUsers()`, `getOrCreateConversation()`, `getMessages()` with pagination, `sendMessage()` | ✅ |
| **5** | Chat Controller & Routes | Wire up controllers to service layer, define REST routes — `POST /users/sync`, `GET /users`, `GET /conversations`, `GET /conversations/:otherUserId`, `GET /messages/:conversationId`, `POST /messages` | ✅ |
| **6** | Error Handling | Implement global error middleware (`error.middleware.js`) — handle API errors, validation errors, and 404 not-found routes with consistent JSON responses | ✅ |
| **6** | Health Check & Testing | Add `/health` endpoint, test all API routes with Postman/Thunder Client, verify DB reads/writes, test auth flow end-to-end | ✅ |
| **7** | Socket.IO Server Setup | Install Socket.IO, configure with CORS, implement `socket.js` initialization, create `socket.service.js` — handle connection auth (verify Clerk JWT), manage online users Map, implement `send_message`, `typing`, and `disconnect` events | ✅ |

#### 📦 Week 1 Deliverables
- ✅ Fully functional REST API with 6 endpoints
- ✅ MongoDB database with 3 collections (Users, Conversations, Messages)
- ✅ Clerk JWT authentication on all routes
- ✅ Socket.IO server with real-time messaging + typing + presence
- ✅ Production-grade error handling and logging

---

### 🗓 Week 2 — Frontend Development & UI (Days 8–14)

> **Goal:** Build the complete React frontend with real-time chat functionality.

| Day | Task | Details | Status |
|-----|------|---------|--------|
| **8** | React Project Setup | Initialize Vite project with React 19, install dependencies — `react-router-dom`, `socket.io-client`, `@clerk/clerk-react`, `framer-motion`, `tailwindcss`, `react-icons` | ✅ |
| **8** | Design System & CSS | Create `index.css` with custom design tokens — color palette (void, base, surface, accent, mint, danger), neo-brutalist utilities (`.neo-btn`, `.neo-input`, `.shadow-neo`, `.shadow-hard`), typography setup (display + body fonts) | ✅ |
| **9** | Clerk Theme Customization | Build `clerkTheme.js` — customize Clerk's SignIn/SignUp components to match neo-brutalist design system (hard borders, custom colors, squared corners, accent highlights) | ✅ |
| **9** | Routing & Auth Guards | Set up React Router with 3 routes — `/` (Landing), `/auth` (SignIn/SignUp), `/chat` (protected). Wrap `/chat` with `<SignedIn>` / `<SignedOut>` Clerk guards for redirect | ✅ |
| **10** | Landing Page — Navbar | Build responsive Navbar component — logo, navigation links (Features, How It Works), "Start Chatting" CTA button, mobile hamburger menu | ✅ |
| **10** | Landing Page — Hero | Build Hero section — headline ("PURE CONVERSATION"), mock chat preview with animated message bubbles, version badge ("Pulse Engine v2.0"), primary CTA button | ✅ |
| **11** | Landing Page — Features | Build Features grid — 6 feature cards (Speed, Security, Messaging, Presence, Alerts, Adaptive UI) with icons, hover effects (border-accent, shadow-neo, translate), staggered scroll animations | ✅ |
| **11** | Landing Page — How It Works + Footer | Build step-by-step onboarding section (Sign Up → Find People → Start Chatting), build Footer with links and branding | ✅ |
| **12** | Custom Hooks | Implement 3 custom hooks — `useSocket` (Socket.IO connection, online users, reconnection), `useSound` (Web Audio API for send/receive notification tones), `useNotification` (OS Notification API, title badge counter) | ✅ |
| **12** | API Utility Layer | Build `api.js` — helper functions for `syncUser()`, `getUsers()`, `getOrCreateConversation()`, `getMessages()` using `fetch` with Clerk JWT headers | ✅ |
| **13** | Sidebar Component | Build Sidebar — user list with avatar, online/offline indicators, unread message badges, user search input, Ctrl+K shortcut, signed-in user info, Home/Sign-Out buttons, connection status indicator | ✅ |
| **13** | ChatBox Component | Build ChatBox — message list with date separators, message bubbles (own vs. received), typing indicator animation, textarea input with character counter (2000 max), Enter to send / Shift+Enter newline, scroll-to-bottom button with new message count | ✅ |
| **14** | Chat Page Assembly | Wire up Chat page — integrate Sidebar + ChatBox, manage selected user state, handle token refresh (every 50s), implement unread message counter across conversations, keyboard shortcuts (Ctrl+K for search, Esc to go back) | ✅ |

#### 📦 Week 2 Deliverables
- ✅ Complete landing page with 4 sections (Navbar, Hero, Features, How It Works)
- ✅ Clerk authentication integrated with custom theme
- ✅ Real-time chat UI with Sidebar + ChatBox
- ✅ Sound effects, notifications, typing indicators
- ✅ Fully responsive (mobile → desktop) neo-brutalist design

---

### 🗓 Week 3 — Polish, Testing & Deployment (Days 15–21)

> **Goal:** QA, performance optimization, and production deployment.

| Day | Task | Details | Status |
|-----|------|---------|--------|
| **15** | End-to-End Testing | Test complete flow — sign up → user sync → find users → start conversation → send/receive messages → typing indicators → online status → sign out. Test with 2+ browser tabs | ✅ |
| **15** | Mobile Responsiveness QA | Audit all pages across breakpoints (320px, 375px, 768px, 1024px, 1440px), fix overflow issues, verify mobile sidebar/chat toggle, test touch interactions | ✅ |
| **16** | Performance Optimization | Implement `useMemo` for message list with date separators, `useCallback` for event handlers, `useRef` for scroll position tracking, lazy typing emit with debounce (1.5s timeout) | ✅ |
| **16** | Security Audit | Verify Helmet headers, confirm CORS is restricted to `CLIENT_URL` only, audit rate limiting, verify socket token auth rejects invalid/missing tokens, confirm Zod validation catches malformed requests | ✅ |
| **17** | Edge Case Handling | Handle: network disconnection (reconnection UI), empty states (no users, no messages), long messages (2000 char limit), rapid message sending, duplicate message prevention (`msg._id` check), simultaneous tab usage | ✅ |
| **17** | Browser Notifications | Test OS-level notifications on Chrome/Firefox/Safari, verify notifications only fire when tab is in background (`document.hidden`), test notification permission request flow | ✅ |
| **18** | Backend Deployment (Render) | Deploy SERVER to Render — configure environment variables, set start command to `npm start`, verify health endpoint, test MongoDB Atlas connectivity from Render, verify Socket.IO WebSocket upgrade works behind Render proxy | ✅ |
| **18** | Frontend Deployment (Vercel) | Deploy CLIENT to Vercel — configure `vercel.json` SPA rewrites, set environment variables (API URL, Socket URL, Clerk key), verify build succeeds, test live Clerk auth flow | ✅ |
| **19** | Production Testing | Full regression on production URLs — test Clerk auth, Socket.IO connection, message delivery, online status, notifications, sound effects. Monitor Render logs for errors | ✅ |
| **19** | Clerk Webhook (Optional) | Set up Clerk webhook for `user.created` / `user.updated` events to auto-sync user data without requiring manual `/users/sync` call | ⬜ |
| **20** | Documentation & README | Write comprehensive README with setup instructions, architecture diagram, API docs, socket event reference, deployment guide, and this development timeline | ✅ |
| **20** | Code Cleanup | Remove console.logs, add JSDoc comments to service layer, ensure `.env.example` files are up-to-date, verify `.gitignore` covers `node_modules`, `.env`, and build artifacts | ✅ |
| **21** | Final Review & Demo | Record demo walkthrough, final cross-browser testing (Chrome, Firefox, Edge, Safari), create GitHub release tag `v1.0.0`, update repo description and topics | ⬜ |

#### 📦 Week 3 Deliverables
- ✅ Production deployment (Vercel + Render + MongoDB Atlas)
- ✅ Full end-to-end testing across devices
- ✅ Performance optimized with React best practices
- ✅ Security hardened for production
- ✅ Complete documentation

---

## 📊 Development Summary

```
Week 1  ██████████████████████████████  Backend & Database       [COMPLETE]
Week 2  ██████████████████████████████  Frontend & Real-time UI  [COMPLETE]
Week 3  ██████████████████████████████  Testing & Deployment     [COMPLETE]
```

### Key Metrics

| Metric | Value |
|---|---|
| **Total Development Days** | 21 days (3 weeks) |
| **Backend API Endpoints** | 6 RESTful routes |
| **Socket Events** | 4 real-time events |
| **React Components** | 10 components |
| **Custom Hooks** | 3 hooks |
| **Database Collections** | 3 (Users, Conversations, Messages) |
| **Frontend Pages** | 3 (Landing, Auth, Chat) |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**ad4545a** — [GitHub](https://github.com/ad4545a)

---

<div align="center">

**⚡ Built with Pulse Engine v2.0 ⚡**

*Real-time. Brutalist. Uncompromised.*

</div>
