# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**BIAK** = Brønderslev International Apostolsk Kirke — a church website.
Stack: **Nuxt 3 + Vue 3**, Tailwind CSS, Prisma (SQLite), Docker.
Production runs on port **8003** via Docker behind Nginx Proxy Manager.

## Commands

```bash
# Development (local)
npm run dev          # Start dev server at localhost:3000

# Docker (recommended for full-stack testing)
docker compose -f docker-compose.dev.yml up   # Dev with hot-reload sync
docker compose up --build                     # Production build

# Database
npx prisma migrate dev    # Apply schema changes
npx prisma studio         # GUI for DB inspection
npx prisma db seed        # (admin events) POST /api/events/seed

# Build / lint
npm run build        # Production build
npm run generate     # Static generation
```

No test suite is configured.

## Architecture

### Nuxt 3 App Structure

- **`app.vue`** — root; initializes theme on `mounted` via `useTheme().initTheme()`
- **`layouts/default.vue`** — public layout (TheNavbar + TheFooter)
- **`layouts/admin.vue`** — admin layout (sidebar nav, `data-admin` attribute on `<html>` for CSS isolation)
- **`middleware/auth.ts`** — Nuxt route middleware that checks `/api/auth/session`; redirects to `/admin/login` if unauthenticated. Applied per-page with `definePageMeta({ middleware: 'auth' })`
- **`pages/`** — file-based routing: `index`, `about`, `youth`, `contact`, `events`, `sermons` + `admin/` subtree

### Server (Nitro/H3)

- **`server/api/`** — REST endpoints under `/api/*`
  - `auth/` — login (POST), logout (POST), session check (GET)
  - `events/` — CRUD + seed
  - `announcements/`, `sermons/`, `church-info/` — CRUD
  - `admin/` — admin-only endpoints guarded by `requireAdmin()`
- **`server/utils/prisma.ts`** — singleton Prisma client
- **`server/utils/session.ts`** — `requireAdmin(event)` helper; uses Nuxt's built-in `useSession` with `SESSION_SECRET`

### Auth

Single-admin password auth. Login stores `{ admin: true }` in a signed session cookie. The `ADMIN_PASSWORD` env var accepts plain text or a bcrypt hash.

### Database (Prisma + SQLite)

Models: `User`, `Event`, `Announcement`, `ChurchInfo`, `Sermon`.

`ChurchInfo` is a key/value store for runtime-editable site content (e.g. `hero_image_url`, `hero_badge`, `welcome_message`). Fetch all at once: `GET /api/church-info` returns `{ key: value }` map.

### Theming

Themes are applied by setting `data-theme="light|dark|youth"` on `<html>`. CSS variables in `assets/css/main.css` drive all colors. The `youth` theme is a dark neon/purple mode with glassmorphism cards; it overrides Tailwind color classes (`terra-*`, `warm-*`, `gold-*`) using `[data-theme="youth"]` selectors with `!important`. Admin pages set `data-admin` on `<html>` to always render in light mode regardless of global theme.

Theme state is persisted to `localStorage` via `useTheme()` composable (`composables/useTheme.ts`). The three themes cycle in order: light → dark → youth.

### i18n

`@nuxtjs/i18n` v9 with `strategy: 'no_prefix'`. Default locale: `da` (Danish). Locale files: `i18n/locales/{da,en,fr,sw}.json`. The `langDir` is relative to the `i18n/` directory. `@` signs in locale values must be escaped as `{'@'}` (vue-i18n linked message syntax).

### Design System (CSS classes)

Defined in `assets/css/main.css`:

| Class | Purpose |
|---|---|
| `card` | Standard card with theme-aware bg/border/shadow |
| `btn-primary` | Terra brown filled button |
| `btn-gold` | Gold accent button |
| `btn-outline` | White outline button (for dark bg) |
| `btn-terra-outline` | Terra outline button |
| `section-label` | Small uppercase label with accent line |
| `gold-line` | Gold horizontal divider |
| `form-input` / `form-label` | Themed form inputs |
| `reveal` / `visible` | Scroll-reveal animation (use `useReveal()` composable) |

Fonts: `Lora` (serif, headings), `Inter` (sans, body), `Space Grotesk` (youth theme headings).
Icons: `lucide-vue-next`. **No `Youtube` icon exists in lucide** — use inline SVG.

### Composables

- `useTheme()` — theme state + `setTheme`, `cycleTheme`, `initTheme`
- `useReveal(opts?)` — IntersectionObserver-based scroll reveal; returns `{ el, isVisible }`, bind `el` to template ref

### Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `DATABASE_URL` | `file:/app/data/biak.db` | Prisma SQLite path |
| `ADMIN_PASSWORD` | `admin123` | Admin login (plain or bcrypt) |
| `SESSION_SECRET` | (hardcoded dev value) | Cookie signing key |
