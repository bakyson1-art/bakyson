# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records for the Bakyson `main-site/` project.

## What is an ADR?

An ADR is a short document that captures a significant architectural decision, the context in which it was made, the options considered, and the outcome. ADRs are immutable historical records — once written, they are not edited. If a decision is reversed, a new ADR supersedes the old one.

## Naming convention

`NNNN-title-slug.md` where `NNNN` is a zero-padded sequential number.

## Format (MADR-lite)

```markdown
# ADR-NNNN: Title

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-NNNN

## Date
YYYY-MM-DD

## Context
What problem are we solving? What constraints exist?

## Decision
What did we decide? (short, clear statement)

## Options considered
1. Option A — pros/cons
2. Option B — pros/cons
3. Option C — pros/cons

## Consequences
Positive, negative, and neutral outcomes of this decision.

## References
Links to PRs, issues, docs, or external resources.
```

## Existing ADRs

| ADR | Title | Status |
|-----|-------|--------|
| 0001 | Next.js 16 + Turbopack | Accepted |
| 0002 | next-auth v4 Credentials + JWT | Accepted |
| 0003 | Vercel + Railway Postgres | Accepted |
| 0004 | Tailwind CSS v4 | Accepted |

## When to write an ADR

Write an ADR when:
- Choosing a library, framework, or service
- Changing the database schema in a breaking way
- Introducing a new architectural pattern (e.g., middleware → proxy)
- Making a decision with long-term maintenance impact
- Reversing a previous ADR

Do not write ADRs for:
- CSS class naming changes
- Component refactors without architectural impact
- Dependency version bumps (unless breaking)
