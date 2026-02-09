# GitHub Deep Audit — Frontend

The Angular frontend for **GitHub Deep Audit**, an AI-powered repository security and code quality auditor.  
Users provide a public GitHub repository URL, and the application generates a comprehensive audit report covering security vulnerabilities, API key leaks, architecture issues, and more — powered by Google Gemini.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Angular 20 (Signals, Zoneless, SSR-ready) |
| **Styling** | Tailwind CSS v4 (`@theme` design tokens) |
| **Language** | TypeScript 5.9 (strict mode) |
| **HTTP** | Angular HttpClient with RxJS polling |
| **Rendering** | SSR via `@angular/ssr` + Express |
| **Build** | Angular CLI 21 |

---

## Architecture

```
src/app/
├── core/                          # Singleton services, models, config
│   ├── config/
│   │   └── environment.ts         # API base URL, polling interval
│   ├── models/
│   │   └── audit.models.ts        # All TypeScript interfaces (AuditReport, AuditIssue, etc.)
│   └── services/
│       ├── audit.service.ts        # POST /audit + GET /audit/{jobId}
│       └── theme.service.ts        # Light/dark mode toggle with localStorage persistence
│
├── shared/                         # Reusable UI components
│   └── components/
│       └── header/                 # Sticky header with branding + theme toggle
│
├── features/                       # Feature modules (lazy-loaded)
│   └── audit/
│       ├── audit-page.ts           # Smart container — state machine (idle → polling → complete)
│       └── components/
│           ├── audit-form/         # URL input + description + GitHub URL validation
│           ├── audit-loading/      # Spinner + progress bar + stage indicators
│           ├── audit-error/        # Error display with retry button
│           ├── audit-report/       # Report container with severity filter + PDF export
│           ├── score-gauge/        # Animated SVG circular progress bar
│           ├── issue-card/         # Expandable issue cards with severity badges
│           ├── architecture-review/ # Strengths/weaknesses grid
│           └── prevention-guide/   # Numbered recommendations list
│
├── app.ts                          # Root component (shell)
├── app.routes.ts                   # Lazy-loaded routes
├── app.config.ts                   # Providers (HttpClient, Router, Zoneless)
└── app.routes.server.ts            # SSR route config (Client rendering)
```

### State Machine

The `AuditPage` component drives the entire user flow through a single signal-based state machine:

```
idle  →  submitting  →  polling  →  complete
                  ↘          ↘
                    error  ←──┘  (reset returns to idle)
```

| Phase | UI |
|---|---|
| **idle** | Input form (repo URL + description) centered on screen |
| **submitting** | Loading spinner with "Submitting..." message |
| **polling** | Progress bar + stage indicators (Queued → Reading → Validating → Auditing → Finalizing) |
| **error** | Error message + "Try Again" button |
| **complete** | Full audit report with score gauge, issues, architecture review, prevention guide |

---

## Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- **Backend** running at `http://localhost:8080` (see [github-deep-audit](https://github.com/your-username/github-deep-audit))

---

## Setup

```bash
# Clone the repository
git clone https://github.com/your-username/github-deep-audit-frontend.git
cd github-deep-audit-frontend

# Install dependencies
npm install
```

---

## Configuration

Edit `src/app/core/config/environment.ts` to change the API URL or polling interval:

```typescript
export const environment = {
  apiBaseUrl: 'http://localhost:8080/api/v1',
  pollingIntervalMs: 5_000,
} as const;
```

---

## Development

```bash
# Start dev server (http://localhost:4200)
npm start

# Build for production
npm run build

# Run SSR server
npm run serve:ssr:github-deep-audit-frontend
```

---

## Features

### Audit Flow
- GitHub URL validation with real-time feedback (regex-based)
- Optional project description to improve audit accuracy
- Async job submission → polling every 5 seconds → report display
- Graceful error handling with retry capability

### Audit Report
- **Score gauge** — animated SVG circular progress with color-coded scoring (0–100)
- **Issue summary** — clickable severity cards (Critical / High / Medium / Low) that filter the issues list
- **Issue cards** — expandable accordion with severity badge, category label, code snippet, impact, and recommendation
- **Architecture review** — strengths and weaknesses displayed in a two-column grid
- **Prevention guide** — numbered action items
- **PDF export** — `window.print()` with dedicated `@media print` styles

### Theming
- **Light and dark mode** — GitHub-inspired color palette
- Toggle button in header (sun/moon icons)
- Persisted in `localStorage` (`gda-theme`)
- Respects `prefers-color-scheme` on first visit
- Flash-free: inline `<script>` applies `.dark` class before first paint

### Design Tokens

All colors are defined as Tailwind v4 `@theme` tokens in `src/styles.css`:

| Token | Light | Dark |
|---|---|---|
| `base` | `#ffffff` | `#0d1117` |
| `base-alt` | `#fafbfc` | `#161b22` |
| `surface` | `#f6f8fa` | `#21262d` |
| `content` | `#24292e` | `#f0f6fc` |
| `accent` | `#2dba4e` | `#2dba4e` |
| `critical` | `#d1242f` | `#d1242f` |
| `high` | `#cf222e` | `#cf222e` |
| `medium` | `#bf8700` | `#bf8700` |
| `low` | `#0969da` | `#0969da` |

---

## API Integration

The frontend communicates with two backend endpoints:

### `POST /api/v1/audit`

Submits a repository for auditing.

```json
{
  "repoUrl": "https://github.com/owner/repo",
  "projectDescription": "Optional description"
}
```

Returns a `jobId` used for polling.

### `GET /api/v1/audit/{jobId}`

Polls job status. Returns `status`, `message`, and `report` (null until complete).

Status progression: `QUEUED → CLONING → READING → VALIDATING_DESCRIPTION → AUDITING → VALIDATING_STRUCTURE → COMPLETED`

---

## Deployment

### Frontend — Vercel

The Angular SSR app is deployable on Vercel. Ensure the backend CORS configuration includes your production domain.

### Environment

Update `environment.ts` with the production API URL before building:

```bash
npm run build
```

The output is in `dist/github-deep-audit-frontend/`.

---

## License

MIT
