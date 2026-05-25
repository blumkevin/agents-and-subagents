@AGENTS.md

# Aegis — resident security app

Liquid Glass mobile companion for residents of buildings running our security
system. Web prototype first (Next.js), to be ported to native SwiftUI once the
aesthetic and flows are approved.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline` in `app/globals.css`)
- lucide-react for icons
- TypeScript (strict)

## Commands

- Dev server: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

## Architecture

- `app/<route>/page.tsx` — one screen per tab route (`/`, `/camera`, `/alerts`,
  `/community`, `/household`, `/safety`).
- `components/` — design system. `glass.tsx` is the core Liquid Glass surface;
  build new surfaces on it rather than re-deriving `backdrop-filter`.
- `lib/mock-data.ts` — all data is mocked. There is no backend yet.
- Liquid Glass material + tokens live in `app/globals.css` (`.glass`, aurora
  backdrop, accents). Reuse the tokens; don't hardcode new colors.
- Server Components by default; add `"use client"` only for interactive screens
  (camera timer, SOS, toggles).

## Do not

- Do not treat any life-safety path (SOS dispatch, monitoring, live location) as
  real — they are UI stubs and MUST be backed by hardened, redundant
  infrastructure before any deployment. Keep the stub disclaimers in the UI.
- Do not add dependencies without explicit instruction.
- Do not invent new glass styling per-component — extend `Glass`/tokens.
- Read the bundled Next.js 16 docs in `node_modules/next/dist/docs/` before
  using an unfamiliar Next API; training data may be stale.

## Aesthetic bar

Treat this like Apple design work: generous radii, translucency with real depth,
specular highlights, restraint in color, legible contrast over the glass.
