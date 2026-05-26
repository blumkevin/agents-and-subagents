---
name: feature-factory
description: Orchestrates the 7-agent software factory chain for shipping a feature end to end. Use when the user says "build <feature>" and wants the full research → story → brief → build → verify → validate pipeline with human checkpoints, rather than one-shot vibe coding. Wires the 7 agents in .claude/agents/ into a coordinated chain.
---

# Feature Factory Orchestrator

Run one feature through the full chain. One prompt starts it all; three human
checkpoints keep the developer in the loop where judgment matters. Everything
else runs on its own.

## The chain

1. **Researcher** (`codebase-researcher`) — maps the relevant code. Returns
   relevant files, existing patterns, similar features, risks, and tests that
   will need updating. Runs first, always.

2. **Story Writer** (`story-writer`) — turns the idea + research into one user
   story with acceptance criteria, edge cases, out-of-scope, and open questions.
   ⏸ **CHECKPOINT 1 — human approves the story.** Do not proceed without it.

3. **Spec Writer** (`spec-writer`) — turns the approved story into a technical
   brief: data model, process flow, API, frontend, tests required, risks, and
   every file that will change.
   ⏸ **CHECKPOINT 2 — human approves the brief.** This is where architectural
   mistakes (e.g. "store IDs in memory") get caught — before any file changes.

4. **Backend Builder** (`backend-builder`) — implements API routes, services,
   business logic, DB access, migrations, jobs, and unit tests. Backend folders
   only. Runs typecheck + lint + tests. Returns a summary including the API
   contract.

5. **Frontend Builder** (`frontend-builder`) — reads the backend's API contract
   first, then builds components, pages, hooks, loading/error states, and
   component tests. Frontend folders only. Runs typecheck + lint + tests.
   Surfaces any API mismatch as feedback rather than patching it.

6. **Test Verifier** (`test-verifier`) — writes acceptance tests against every
   acceptance criterion in the story. Reports pass/fail/uncoverable. Test files
   only.

7. **Validator** (`implementation-validator`) — compares the implementation
   against the approved story and brief. Reports gaps grouped Critical /
   Important / Minor, each with file path and line number. Fixes nothing.

## The fix loop

If the Test Verifier reports a failing criterion, or the Validator reports a
Critical/Important finding, **loop back to the responsible builder** (backend or
frontend) with the specific finding. The builder fixes; then re-run the Test
Verifier and Validator. Repeat until acceptance tests pass and the Validator is
clean.

⏸ **CHECKPOINT 3 — human reviews and opens the PR.**

## Rules

- Always run the Researcher first. Never let a build agent guess.
- Honor every pause. Do not silently skip a checkpoint.
- Each agent gets only the inputs listed in its file and only the tools it needs.
- Builders never cross the backend/frontend line.
- The Validator and Test Verifier never patch product code — findings route back
  to a builder.
