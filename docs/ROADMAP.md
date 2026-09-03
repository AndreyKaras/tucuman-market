# Roadmap

Statuses: `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`.

## Phase 0 — Foundation

- [ ] Confirm repository documents and decisions.
- [ ] Install only the dependencies required for the first vertical slice.
- [ ] Add `typecheck`, Vitest, and Playwright scripts.
- [x] Configure `next-intl` with `es` default and `en` secondary locale.
- [ ] Configure environment validation.
- [ ] Configure PostgreSQL and Prisma.
- [ ] Create initial schema and seed pipeline.
- [ ] Add CI for lint, typecheck, tests, and build.

Exit: clean installation, valid environment template, database migration and
seed work locally, CI is green.

## Phase 1 — Storefront vertical slice

- [ ] App shell, design tokens, responsive header/footer.
- [ ] Localized home page.
- [ ] Category and product repositories.
- [ ] Catalog grid and category routes.
- [ ] Product detail page.
- [ ] Search, filters, sorting, and URL state.
- [ ] Loading, empty, error, and not-found states.

Exit: customers can browse the bilingual seeded catalog end to end.

## Phase 2 — Guest cart

- [ ] Cart domain rules and tests.
- [ ] Zustand guest cart with versioned local persistence.
- [ ] Cart drawer and full cart page.
- [ ] Server price/stock revalidation.
- [ ] Locale-switch persistence.

Exit: guest cart survives reload and handles changed products safely.

## Phase 3 — Checkout and orders

- [ ] Delivery/pickup form and validation.
- [ ] Store settings and fulfillment rules.
- [ ] Transactional order creation and item snapshots.
- [ ] Duplicate-submission protection.
- [ ] Confirmation page.
- [ ] Telegram notification and retry-safe logging.
- [ ] E2E tests for both fulfillment methods.

Exit: a guest can place an order and the administrator is notified.

## Phase 4 — Admin

- [ ] Better Auth integration and initial admin provisioning.
- [ ] Admin route, action, and handler authorization.
- [ ] Product and category management.
- [ ] Image upload through storage abstraction.
- [ ] Order list/detail and valid status updates.
- [ ] Store settings editor.
- [ ] Authorization and admin E2E tests.

Exit: the store can be operated without editing code or seed files.

## Phase 5 — Customer accounts

- [ ] Registration/login and customer profile.
- [ ] Saved addresses.
- [ ] Database cart.
- [ ] Idempotent guest-cart merge.
- [ ] Owned order history and detail.
- [ ] Repeat-order flow using current catalog data.

Exit: authenticated customers retain their cart and account history securely.

## Phase 6 — Quality and release

- [ ] Accessibility audit and keyboard testing.
- [ ] Responsive visual QA on representative devices.
- [ ] Performance and image optimization.
- [ ] Localized SEO metadata, sitemap, robots, and structured data.
- [ ] Security review of auth, authorization, input, uploads, secrets, and logs.
- [ ] Production database, storage, Telegram, and Vercel configuration.
- [ ] Backup/restore and operational notes.

Exit: production deployment is tested, documented, and portfolio-ready.

## Current next task

Complete Phase 0 in small commits. Do not design all pages or install the full
dependency list in one step. First configure localization and render one
localized page; then connect the database and seed the current 20 products.
