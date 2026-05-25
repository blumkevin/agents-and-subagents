---
name: build-with-tests
description: Describes how this team builds code — match existing patterns, write tests alongside code, and run typecheck/lint/tests before reporting done. Use whenever implementing or modifying code (invoked by the backend-builder and frontend-builder), so new code is consistent, tested, and verified rather than just generated.
---

# Build With Tests

How this team builds. The build agents follow these rules so code is consistent
and verified, not just generated.

## Principles

1. **Match existing patterns.** Before writing new code, find how the codebase
   already solves the nearby problem and follow it. Reuse existing helpers,
   services, and conventions. Do not introduce a new pattern when one exists.

2. **Write tests alongside the code**, not after. Every unit of behavior you add
   gets a test in the same change. Cover the happy path and the failure paths
   the brief lists.

3. **Stay in scope.** Only change files the technical brief agreed to. If you
   discover something outside scope that needs changing, surface it — don't
   silently expand the change.

4. **Don't invent dependencies.** No new packages without explicit instruction.

5. **Verify before reporting done.** Run, in order:
   - typecheck
   - lint
   - the test suite

   All green, or you are not done. If something fails, fix it or report exactly
   what failed and why — never claim success on red.

## Reporting

When finished, return:
- Every file added or edited.
- Every existing helper or pattern reused.
- For backend work: the API contract (endpoints, request/response shapes).
- Any rule that, had it been in CLAUDE.md, would have prevented a wrong guess —
  so it can be added.
