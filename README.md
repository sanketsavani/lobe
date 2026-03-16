# Lobes — Personal Command Center

A frontend-first app to manage 4 parallel lives (Startup 1, Startup 2, Job, Personal). Uses **localStorage** by default; optional **Cloudflare Workers + D1** backend in the `backend/` folder (can be a separate repo).

## Quick start (local only)

```bash
npm install
npm run dev
```

Tasks and inbox are stored in the browser via Zustand persist. No backend required.

## Adding tasks

- **Quick Add:** Click the **+** in the top bar or press **Ctrl/Cmd + N**. Fill title, area, priority, due date and save.
- **Full form:** Open **Projects** → **Add task**, or use the task drawer for full fields (status, importance, notes).
- **Brain Dump:** Add a quick thought; it goes to the inbox. Triage later into tasks.
- **Edit:** Click any task on the Dashboard (Today’s focus, On fire) or a task card in Projects to open the drawer and edit.

## Backend (optional, separate repo)

The **`backend/`** folder is the full Cloudflare Worker + D1 API. You can:

1. **Use it inside this repo:** run everything from `backend/` (see `backend/README.md`).
2. **Push it as its own repo:** copy or move `backend/` to a new repo, push to GitHub, and have Cloudflare pull/deploy from that repo. The frontend then points at the deployed Worker URL via `VITE_API_URL`.

Setup and deploy steps are in **`backend/README.md`**. After the Worker is deployed, set in this project:

```env
VITE_API_URL=https://lobes-api.<your-subdomain>.workers.dev
```

The app will then load and save tasks and inbox from D1. Without `VITE_API_URL`, everything stays in localStorage.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run Vite dev server (frontend only) |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |

## Tech stack

- **Frontend:** Vite, React 18, React Router v6, Zustand, Framer Motion, TanStack Table, @dnd-kit, Lucide, Tailwind
- **Backend (in `backend/`):** Cloudflare Workers, D1 (SQLite at the edge)
