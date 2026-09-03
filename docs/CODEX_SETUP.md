# Codex Setup for This Repository

## Project instructions

Keep `AGENTS.md` in the Git repository root. Codex reads applicable
`AGENTS.md` files from the repository root toward the current working directory.
Use nested instruction files only when a directory genuinely needs different
rules.

Start Codex from the repository root so it sees the complete project context.
Useful first prompt:

```text
Read AGENTS.md, PROJECT_BRIEF.md, ARCHITECTURE.md and the relevant docs. Inspect
package.json and git status. Propose the smallest Phase 0 task without editing
files yet.
```

## MCP

First inspect what is already configured:

```bash
codex mcp list
```

Context7 is useful for current library documentation. Add it only if missing:

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

Use a browser/DevTools MCP for direct visual inspection, console errors,
responsive behavior, accessibility, and network debugging. Do not add duplicate
servers when one is already available globally. Codex CLI and the IDE extension
on the same host share MCP configuration; a trusted repository may also use
project-scoped `.codex/config.toml` when the setup truly belongs to this repo.

## Plugins

Install plugins only when the corresponding phase needs external access:

- GitHub: Issues, pull requests, and hosted repository workflows.
- Neon Postgres: cloud database work after the local Prisma schema is stable.
- Vercel: deployment and environment configuration near release.
- Codex Security: focused security review before production release.

Local coding does not require these plugins. Never put provider tokens in this
file or in `AGENTS.md`.

## Skills

Do not create a broad “build the whole app” skill. `AGENTS.md` already covers
durable repository rules. Add a repo skill under `.agents/skills/` only after a
workflow repeats and its inputs/outputs are stable.

The first justified candidate is `catalog-workflow`, after the JSON schema and
Prisma model agree. It should validate bilingual translations, SKU/slug
uniqueness, price rules, units, and seed compatibility through a deterministic
script. Until then, keep catalog validation in ordinary project scripts so the
schema can still change cheaply.

## Working rhythm

1. Give Codex one coherent task from `docs/ROADMAP.md`.
2. Ask it to inspect before editing.
3. Review the plan and dependency changes.
4. Let it implement and run relevant checks.
5. Review the diff and commit a small logical change.
6. Update the documents when a decision changes.
