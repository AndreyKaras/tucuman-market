# AGENTS.md

## Role

Work as a senior full-stack engineer for a production-minded bilingual grocery
store. Preserve agreed product scope, existing code, and user changes.

## Required context

Before changing code:

1. Read `PROJECT_BRIEF.md` and `ARCHITECTURE.md` completely.
2. Read only the relevant files in `docs/` for the current task.
3. Inspect `git status`, `package.json`, and the files you intend to modify.

If code and documentation disagree, stop and describe the conflict. Do not
silently redefine product behavior.

## Product invariants

- Public storefront languages are Argentinian Spanish (`es`) and English (`en`).
- Spanish is the default locale. Currency is always ARS.
- Admin routes are not linked from the storefront.
- Hiding `/admin` is not security. Protect every admin page, Server Action, and
  Route Handler with authenticated `ADMIN` authorization.
- Orders do not use online payment in the current scope.
- An order must persist successfully before sending its Telegram notification.
- Product price, name, SKU, quantity, and unit must be snapshotted into order
  items. Historical orders must not change when a product changes.
- Never trust totals, prices, stock, user IDs, roles, or order status supplied by
  the browser. Recalculate and authorize on the server.

## Engineering conventions

- Use strict TypeScript. Avoid `any`; narrow `unknown` at boundaries.
- Prefer Server Components. Add `"use client"` only for actual browser state or
  interaction.
- Keep business logic out of React components and Route Handlers.
- Validate external input with Zod on the server.
- Store money with an exact database type; never use floating-point arithmetic
  for totals.
- Keep translatable content separate from locale-independent product data.
- Use semantic HTML, keyboard-accessible controls, visible focus, and meaningful
  image alternative text.
- Do not add a production dependency without explaining its purpose and checking
  that an existing dependency cannot solve the problem.
- Never commit secrets, credentials, personal customer data, or `.env.local`.
- Do not edit generated Prisma migration SQL after it has been applied.

## Data and localization

- `data/catalog/*.json` is deterministic seed/demo data, not the production data
  source after PostgreSQL is connected.
- Every public category and product must contain both `es` and `en` translations.
- SKU is globally unique. Slugs are unique within a locale.
- `compareAtPrice` must be `null` or greater than `price`.
- `stockQuantity === 0` means out of stock; `isActive === false` means hidden.
- UI copy belongs in `messages/es.json` and `messages/en.json`, not inline in
  components.

## Change discipline

- Make the smallest coherent change that completes the request.
- Preserve unrelated and pre-existing changes.
- Update the relevant documentation when architecture, schema, commands, or
  product behavior changes.
- Add or update tests for changed behavior, especially auth, cart totals, stock,
  checkout, order status, and cart merging.

## Verification

Before declaring work complete, run the scripts that exist in `package.json`:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

If a listed script does not exist yet, say so explicitly; do not claim it
passed. For user-facing changes, also verify the affected flow at mobile and
desktop widths and check the browser console.
