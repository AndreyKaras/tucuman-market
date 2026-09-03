# Architecture

## Status

This document records current technical decisions. Change it when an accepted
decision changes; do not use it as a backlog.

## Stack

| Concern | Decision |
|---|---|
| Framework | Next.js App Router, React, TypeScript |
| Styling | Tailwind CSS |
| Localization | `next-intl`, locale segment for the public app |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Better Auth with database-backed sessions |
| Validation | Zod |
| Forms | React Hook Form where client-side form state adds value |
| Client state | Zustand for the interactive guest-cart layer |
| Notifications | Telegram Bot API called from server-only code |
| Unit/integration tests | Vitest |
| End-to-end tests | Playwright |
| Hosting target | Vercel |
| Product media | Object storage behind a small storage abstraction |

No separate Express server is planned. Server Components, Server Actions, and
Route Handlers provide the application server layer.

## Route layout

```text
src/app/
├── [locale]/
│   ├── (store)/
│   │   ├── page.tsx
│   │   ├── productos|products/...
│   │   ├── carrito|cart/...
│   │   └── checkout/...
│   └── (account)/...
├── admin/
│   ├── login/...
│   └── (protected)/...
└── api/...
```

The exact translated path implementation will be configured through
`next-intl`; application code should use named localized navigation helpers
rather than assembling URLs manually. Admin routes do not use a locale prefix
and use Spanish UI copy.

## Suggested source boundaries

```text
src/
├── app/                  # routes, layouts, route-local UI
├── components/           # reusable presentation components
├── features/             # catalog, cart, checkout, auth, admin, orders
├── lib/                  # auth, db, i18n, env, money, telegram, storage
├── server/               # server-only services and repositories
└── types/                # shared domain types when genuinely shared
```

React components do not query Prisma directly. Server-only services coordinate
authorization, validation, transactions, repositories, and side effects.

## Data model overview

Core entities:

- `User`, `Session`, `Account`, and verification entities required by auth.
- `Address` owned by a user.
- `Category` and `CategoryTranslation`.
- `Product` and `ProductTranslation`.
- `ProductImage`.
- `Cart` and `CartItem`.
- `Order` and `OrderItem`.
- `StoreSettings` and localized store content if required.

See `docs/DATA_MODEL.md` for fields and constraints.

## Money

- Database prices use an exact decimal or integer-minor-unit strategy chosen in
  the Prisma schema; one strategy must be used consistently.
- Browser-supplied totals are ignored.
- The server loads current product prices, validates availability, calculates
  subtotal and delivery fee, and persists the total in one transaction.
- Each `OrderItem` stores a snapshot of product name, SKU, unit, unit price, and
  quantity so historical orders remain stable.

## Cart model

### Guest

- Zustand drives immediate UI updates.
- A versioned guest cart is persisted in `localStorage`.
- The server revalidates product existence, activity, stock, price, and allowed
  quantity during checkout.

### Authenticated customer

- PostgreSQL is the source of truth.
- Client state is a view/cache, not authority.
- On login, guest items merge into the active user cart by product.
- Merge quantities are capped or rejected according to current stock rules.
- Merge is idempotent and clears local guest data only after server success.

## Order creation

1. Validate the request and fulfillment method.
2. Resolve products and prices from the database.
3. Validate active state, quantity rules, and stock.
4. Calculate subtotal, delivery fee, and total on the server.
5. Create the order and immutable order-item snapshots in a database transaction.
6. Return a customer-visible order number.
7. Send the Telegram notification after commit.

Telegram failure must not roll back a valid order. Notification attempts should
be logged and made idempotent so a retry does not create a duplicate order.

## Authentication and authorization

- `/admin/login` is public; all other admin pages require a valid session and
  `role === "ADMIN"`.
- Middleware may provide early redirects, but it is not the authorization
  boundary.
- Every admin Server Action and Route Handler repeats server-side authorization.
- Customer-owned records are queried by both resource ID and authenticated user
  ID to prevent insecure direct object references.
- Role changes, secrets, and initial admin creation happen through controlled
  server-side operations, never through public registration payloads.

## Localization

- UI messages live in `messages/es.json` and `messages/en.json`.
- Product/category names, descriptions, slugs, and SEO fields use translation
  tables.
- Price and number formatting use the selected locale while currency stays ARS.
- Locale switching keeps the equivalent route and never clears cart state.
- Localized pages provide canonical and alternate-language metadata.

## Images

- The database stores asset identifiers, URLs, dimensions, sort order, and
  localized alternative text; it does not store image bytes.
- Uploads are validated by MIME type and size on the server.
- Product cards use responsive optimized images with explicit dimensions.
- Seed data may initially use local placeholder assets, but production uploads
  go through the storage abstraction.

## Environment and secrets

Environment variables are parsed once in `src/lib/env.ts` with a server/client
schema. Server secrets are never imported into Client Components.

Expected variable names are documented in `.env.example`; actual values belong
in `.env.local` and deployment secrets.

## Observability and errors

- Log structured identifiers such as order number and request context, not full
  customer records.
- Present localized, actionable errors to customers.
- Preserve detailed server errors in protected logs.
- Add error boundaries and not-found states for public and admin route groups.

## Testing strategy

- Unit: money, quantity rules, status transitions, cart merge.
- Integration: repositories, order transaction, authorization, translations.
- E2E: browse → cart → checkout; delivery and pickup; admin login and order
  update; account cart persistence once released.
- Accessibility: keyboard flow, labels, focus management, dialog behavior, and
  automated checks for key pages.
