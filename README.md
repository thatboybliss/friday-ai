# Vox Game Room (Vite + React)

A mobile-first, AI-orchestrated trivia web app with:
- voice-first gameplay prompts,
- AR-style visual clue overlays,
- shared virtual game room sync,
- optional video answer clips,
- production-ready Vercel deployment path.

## What was corrected and improved
1. Refactored into clearer modules (`components`, `hooks`, `services`, `data`, `styles`).
2. Replaced single-file logic with reusable game orchestration helpers.
3. Added shared room synchronization (BroadcastChannel + localStorage fallback).
4. Added in-browser video clip recording using `MediaRecorder`.
5. Kept deployment stable for Vercel using static SPA rewrite config.

## Project Structure (reviewed)

```text
frontend/
├── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── ControlPanel.jsx
│   │   └── Recorder.jsx
│   ├── hooks/
│   │   └── useSharedRoom.js
│   ├── services/
│   │   └── aiDirector.js
│   ├── data/
│   │   └── questions.js
│   ├── styles/
│   │   └── app.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vercel.json
```

## Step-by-step run guide

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in terminal (usually `http://localhost:5173`).

## Build / compile

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`.

## Deploy to Vercel (verified configuration)

1. Push this repo to GitHub.
2. In Vercel: **Add New Project**.
3. Import repository.
4. Set **Root Directory** = `frontend`.
5. Build Command = `npm run build`.
6. Output Directory = `dist`.
7. Deploy.

`frontend/vercel.json` includes SPA rewrite to `index.html`, so client-side routes remain deploy-safe.

## Known environment constraints
- Browser permission is required for camera/microphone recording.
- Multi-device real-time at production scale should use Firebase/Socket backend; current version provides local real-time sync for rapid MVP iteration.
