# Friday AI

Friday AI is a lightweight full-stack starter made of:

- a **Vite + React** frontend in `frontend/`
- a **Go HTTP API** backend in `backend/`
- a **GitHub Actions** workflow for build verification and optional Vercel deployment

The frontend is now structured so it can build reliably in CI and on Vercel, while still supporting local development against the Go backend.

## Project structure

```text
.
├── .github/workflows/deploy.yml   # CI build + Vercel deployment
├── backend/
│   ├── cmd/server.go              # Go application entrypoint
│   ├── go.mod                     # Go module definition
│   └── websocket/ws.go            # HTTP routes for health and chat API
├── cli/friday.sh                  # CLI helper script
├── frontend/
│   ├── index.html                 # Vite HTML entrypoint
│   ├── package.json               # Frontend package scripts and deps
│   ├── package-lock.json          # Locked dependency tree for CI/Vercel
│   ├── src/App.jsx                # Main app UI and API integration
│   ├── src/main.jsx               # React bootstrap
│   ├── src/styles.css             # Application styling
│   └── vite.config.js             # Dev/build configuration
└── vercel.json                    # Root Vercel build configuration
```

## Requirements

- **Node.js 20+** recommended
- **npm 10+** recommended
- **Go 1.21+**

## Environment variables

### Frontend

Create `frontend/.env.local` for local overrides if needed:

```bash
VITE_API_URL=http://localhost:8080/api/chat
```

If `VITE_API_URL` is not set:

- local browser development defaults to `http://localhost:8080/api/chat`
- non-local deployments default to `/api/chat`

For **Vercel**, set `VITE_API_URL` in the project settings if your backend is hosted elsewhere.

## Step-by-step guide to run the app locally

### 1. Install frontend dependencies

```bash
cd frontend
npm ci
```

### 2. Start the backend API

Open another terminal and run:

```bash
cd backend
go run ./cmd
```

The backend starts on `http://localhost:8080`.

### 3. Start the frontend development server

In a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend starts on `http://localhost:5173`.

### 4. Open the app

Visit:

```text
http://localhost:5173
```

Type a prompt and submit it. The frontend sends a POST request to the backend and displays the response in the UI.

## Build / compile the application

### Frontend production build

```bash
cd frontend
npm run build
```

The compiled static output is written to:

```text
frontend/dist
```

### Backend validation

```bash
cd backend
go test ./...
```

## Production deployment preparation

### Frontend production configuration

The frontend is production-ready for static hosting because it now includes:

- a valid `index.html` entrypoint for Vite
- a React bootstrap file in `src/main.jsx`
- a production-safe API configuration using `VITE_API_URL`
- a `vercel.json` file that tells Vercel exactly how to install and build the app

### Vercel configuration

The root `vercel.json` uses:

- `cd frontend && npm ci` for install
- `cd frontend && npm run build` for build
- `frontend/dist` as the output directory

### GitHub Actions workflow

The workflow in `.github/workflows/deploy.yml` now:

1. checks out the repository
2. installs Node.js 20
3. runs `npm ci` in `frontend/`
4. runs `npm run build` in `frontend/`
5. deploys to Vercel only on pushes to `main`

## Deployment checklist

Before deploying to production:

1. Host the Go backend somewhere reachable by the frontend.
2. Set `VITE_API_URL` in Vercel to the backend's `/api/chat` endpoint.
3. Add `VERCEL_TOKEN` to GitHub repository secrets if you want automatic deploys from GitHub Actions.
4. Run the frontend build locally to confirm there are no regressions.

## Useful commands

### Frontend

```bash
cd frontend
npm ci
npm run dev
npm run build
npm run preview
```

### Backend

```bash
cd backend
go run ./cmd
go test ./...
```
