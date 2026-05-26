# CLAUDE.md

Permanent project facts. Loaded automatically every session — this is the memory
that survives when Claude Code starts fresh with zero context. Keep it 100–300
lines. Every time the AI makes a surprising mistake, ask: "would a rule here have
prevented it?" If yes, add the rule.

> This is a starter template for the feature-factory workflow. Replace the
> placeholder stack/commands below with your project's real values.

## Stack

<!-- Example — replace with yours -->
- Framework: Next.js (App Router)
- Runtime: Node.js
- ORM / DB: Prisma
- Background jobs: BullMQ
- Email: Resend

## Commands

<!-- Example — replace with yours -->
- Dev server: `npm run dev`
- Tests: `npm test`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Migrate: `npx prisma migrate dev`

## Architecture rules

- Business logic lives in services. API routes stay thin.
- Reuse existing helpers and patterns before writing new ones.
- Respect tenant isolation on every query that touches tenant-scoped data.
- Handle timezones explicitly — never assume server-local time.

## Do not

- Do not add cron — use BullMQ for scheduled work.
- Do not log raw payment payloads or any secret material.
- Do not store IDs only in memory when they must persist.
- Do not add new dependencies without explicit instruction.

## Deeper docs

<!-- Point to longer docs instead of inlining them here -->
- `docs/architecture.md`
- `docs/billing.md`

## The feature factory

Features are built by the 7-agent chain, not one-shot prompting. See
`.claude/skills/feature-factory/SKILL.md`. The chain:

`research → story → brief → build (backend, then frontend) → verify → validate`

Three human checkpoints: **approve the story**, **approve the brief**,
**approve the PR**. Everything in between runs on its own.

## Context drift

A wrong architectural assumption doesn't get patched — it gets thrown away.
Small typo? Correct it inline. Wrong mental model? Start a fresh session with the
right assumption baked into the first prompt. A clean session beats a patched one.
