# agents-and-subagents

A personal collection of Claude Code subagents for security and technology work.

## What's here

Subagents live in `.claude/agents/` as Markdown files. Each has YAML frontmatter
(`name`, `description`, `tools`, `model`) and a system prompt body that defines
how that specialist behaves.

| Agent | Use it for |
|-------|-----------|
| `security-researcher` | Deep investigation of a topic/vuln/tech and turning it into a clear writeup. Read-only research + reports. |
| `recon-analyst` | Authorized assessment: attack-surface mapping, enumeration, weakness analysis, CTF challenges. Requires a stated authorization/scope. |
| `prototyper` | Turning a rough idea into a runnable proof-of-concept fast. |

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
