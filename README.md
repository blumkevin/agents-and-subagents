# agents-and-subagents

A personal collection of Claude Code subagents for security and technology work.

## What's here

Subagents live in `.claude/agents/` as Markdown files. Each has YAML frontmatter
(`name`, `description`, `tools`, `model`) and a system prompt body that defines
how that specialist behaves.

### Security & prototyping

| Agent | Use it for |
|-------|-----------|
| `security-researcher` | Deep investigation of a topic/vuln/tech and turning it into a clear writeup. Read-only research + reports. |
| `recon-analyst` | Authorized assessment: attack-surface mapping, enumeration, weakness analysis, CTF challenges. Requires a stated authorization/scope. |
| `prototyper` | Turning a rough idea into a runnable proof-of-concept fast. |

### Software factory (7-agent feature pipeline)

A coordinated chain that ships a feature end to end instead of one-shot
prompting: `research → story → brief → build → verify → validate`, with three
human checkpoints (approve the story, approve the brief, approve the PR).

| Agent | Job | Tools |
|-------|-----|-------|
| `codebase-researcher` | Runs first. Maps relevant files, patterns, similar features, risks, tests to update. | Read-only |
| `story-writer` | Rough idea → user story + testable acceptance criteria. **Checkpoint 1.** | Read-only |
| `spec-writer` | Approved story → technical brief (data model, API, UI, tests, every file). **Checkpoint 2.** | Read-only |
| `backend-builder` | API routes, services, DB access, jobs, unit tests. Returns the API contract. | Backend folders only |
| `frontend-builder` | Components, pages, hooks, UI tests. Consumes the backend's API contract. | Frontend folders only |
| `test-verifier` | Acceptance tests against the user story. Routes failures back to a builder. | Test files only |
| `implementation-validator` | Compares implementation vs. story/brief, reports gaps by severity. Fixes nothing. | Read-only |

Supporting pieces: `.claude/skills/feature-factory/` (orchestrator that wires
the chain), `.claude/skills/build-with-tests/` (build conventions),
`.claude/hooks/pre-commit` (blocks `.env`/`.key`/`.pem`/`secrets.json`), and
`CLAUDE.md` (per-project memory loaded every session).

Kick off the whole chain with a single prompt, e.g.
*"Build invoice reminders for invoices unpaid for more than 7 days."*

To enable the pre-commit hook in a clone:
`ln -sf ../../.claude/hooks/pre-commit .git/hooks/pre-commit`

## How to use them

- **Automatic:** describe a task and Claude Code will route to the matching
  agent based on its `description`.
- **Explicit:** ask directly, e.g. *"use the prototyper to build a..."* or
  *"have the security-researcher investigate..."*.

Output conventions: researcher writes to `research/`, recon-analyst to
`findings/`, prototyper builds runnable code in the repo.

## Adding a new agent

Copy any file in `.claude/agents/`, rename it, and edit the frontmatter +
prompt. Keep the `description` specific — that's what Claude uses to decide when
to delegate to it.

## Scope note

These agents are for defensive security, authorized testing, research, and
education. The offensive-leaning `recon-analyst` expects a clear authorization
context (your own systems, a scoped engagement, or a CTF).
