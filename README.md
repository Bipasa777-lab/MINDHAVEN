# 🌿 MINDHAVEN — AI-Powered Mental Health & Wellness Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)

**MindHaven** is a comprehensive, AI-driven mental health and wellness platform designed to provide accessible, empathetic, and real-time support. By combining generative AI, mental health screening tools, therapist booking, peer support networks, and wellness analytics, MindHaven empowers individuals to prioritize their mental well-being in a safe and confidential environment.

---

## ✨ Key Features

- 🤖 **AI Mental Health Counselor / Assistant**: Real-time conversational AI powered by Google Gemini and Vercel AI SDK to offer empathetic guidance and active listening.
- 📋 **Clinical Mental Health Screening**: Self-assessment modules (PHQ-9, GAD-7, Stress Scale) to evaluate anxiety, depression, and stress levels with instant feedback.
- 📅 **Therapist & Counselor Booking**: Streamlined appointment scheduling system to book sessions with certified mental health professionals.
- 💬 **Peer Support Community**: Safe, moderated space for users to share experiences, join support groups, and connect with peers.
- 📚 **Resource Hub**: Curated library of self-help articles, guided audio relaxation sessions, wellness videos, and coping strategy guides.
- 📊 **Personalized Wellness Analytics**: Interactive dashboards tracking mood patterns, assessment history, and wellness milestones over time.
- 🚨 **Emergency Crisis Support**: Immediate access to national crisis hotlines, emergency contacts, and geolocation-assisted support map.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS, `tailwindcss-animate`, `clsx`, `tailwind-variants`
- **UI Components & Icons**: Radix UI Primitives, Lucide React Icons, React Icons, Shadcn UI
- **Animations & Interactivity**: Framer Motion, Embla Carousel, `react-type-animation`
- **AI Integration**: Vercel AI SDK (`ai`, `@ai-sdk/google`, `@ai-sdk/react`)
- **HTTP Client**: Axios

### **Backend**
- **Runtime & Framework**: Node.js, Express.js
- **Language**: TypeScript (`ts-node-dev`)
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens), `bcryptjs` for password hashing
- **Validation & Security**: Zod validation, CORS, Dotenv
- **Services & Utilities**: Nodemailer (Email notifications), Supertest (Testing)

---

## 📁 Project Structure

```
MINDHAVEN/
├── backend/
│   ├── src/
│   │   ├── config/             # Database and server configs
│   │   ├── middlewares/        # Auth and validation middlewares
│   │   ├── modules/            # Feature-based API modules
│   │   │   ├── ai-chat/        # AI conversation endpoints & services
│   │   │   ├── analytics/      # User metrics & dashboard data
│   │   │   ├── auth/           # Login, registration, JWT handling
│   │   │   ├── booking/        # Therapist appointment booking
│   │   │   ├── peer-support/   # Community & peer group discussions
│   │   │   ├── resources/      # Audio, video, and article library
│   │   │   └── screening/      # Mental health questionnaire scoring
│   │   ├── utils/              # Helper functions & loggers
│   │   └── server.ts           # Express application entry point
│   ├── scripts/                # Database migration and seed scripts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── app/                # Next.js App Router pages
    │   │   ├── about/          # About page
    │   │   ├── auth/           # Login & Registration pages
    │   │   ├── chat/           # AI Chatbot interface
    │   │   ├── dashboard/      # Analytics & user dashboard
    │   │   ├── Emergency.tsx   # Emergency crisis hotlines page
    │   │   ├── map.tsx         # Nearby support map
    │   │   ├── history.tsx     # Session & screening history
    │   │   └── page.tsx        # Landing Page
    │   ├── components/         # Reusable UI components & AI elements
    │   ├── services/           # Frontend API service calls
    │   └── styles/             # Global CSS & Tailwind styles
    ├── public/                 # Static assets (images, icons)
    ├── package.json
    ├── tailwind.config.js
    └── tsconfig.json
```

---

## ⚙️ Prerequisites

Before getting started, ensure you have the following installed on your system:
- **Node.js**: `v18.x` or `v20.x` or higher
- **npm** or **yarn** or **pnpm**
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI
- **Google Gemini API Key** (for AI chatbot functionality)

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/mindhaven
JWT_SECRET=your_jwt_super_secret_key
JWT_EXPIRES_IN=1d
FRONTEND_ORIGIN=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_AI_SERVER_URL=http://localhost:5001/api
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key
```

---

## 🏃 Step-by-Step Run Instructions

### 1. Clone & Navigate
```bash
git clone https://github.com/bipasa777-lab/MINDHAVEN.git
cd MINDHAVEN
```

---

### 2. Backend Setup & Run

Open a terminal window and execute:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# (Optional) Seed initial database data
npm run seed

# Start backend in development mode (Runs on http://localhost:5001)
npm run dev
```

> **Note**: The server connects to MongoDB and logs: `✅ MongoDB Connected` & `🚀 Server running on http://localhost:5001`.

---

### 3. Frontend Setup & Run

Open a second terminal window and execute:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Next.js development server (Runs on http://localhost:3000)
npm run dev
```

---

### 4. Access Application

Open your web browser and go to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📡 API Endpoints Overview

| Service Module | Route Base | Description |
| :--- | :--- | :--- |
| **Health Check** | `GET /api/health` | Backend status verification |
| **Authentication** | `/api/auth` | User register, login, session check |
| **AI Chat** | `/api/ai-chat` | Interactive AI assistant session handling |
| **Mental Screening** | `/api/screenings` | PHQ-9 / GAD-7 submission and scoring |
| **Therapist Booking**| `/api/bookings` | Counselor booking & schedule retrieval |
| **Peer Support** | `/api/peer-support` | Community discussion threads & peer groups |
| **Resource Hub** | `/api/resources` | Fetch audio tracks, videos, and articles |
| **Analytics** | `/api/analytics` | User mood history and progress metrics |

---

## 🤝 Contributing & Contact

Contributions, issues, and feature requests are welcome!

- **Email**: bipasasa69@gmail.com
- **GitHub Repository**: [https://github.com/bipasa777-lab/MINDHAVEN](https://github.com/bipasa777-lab/MINDHAVEN)

*Empowering mental health care with technology and empathy.* 💚
