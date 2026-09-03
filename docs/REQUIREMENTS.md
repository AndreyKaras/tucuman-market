# Functional Requirements

## Actors

- Guest customer
- Registered customer
- Administrator

## Storefront

### Navigation and home

- The customer can switch between Spanish and English.
- The selected locale persists and keeps the equivalent current page.
- The header exposes catalog search, categories, cart, and customer profile.
- No admin login link appears on the public storefront.
- The home page presents categories, promotions, featured products, store
  benefits, delivery/pickup information, and contact details.

### Catalog

- Browse all active products or a category.
- Search by localized product name, brand, and relevant keywords.
- Filter at minimum by category, availability, promotion, and price range.
- Sort by relevance, price, name, and newest/featured where meaningful.
- Pagination or incremental loading must preserve filters in the URL.
- Hidden products never appear publicly.

### Product

- Show localized name, description, images, brand, net content or sale unit,
  price, comparison price when valid, availability, and quantity control.
- Disable adding an unavailable product.
- Clearly distinguish products sold by unit from products sold by weight.
- Do not imply exact final weight if future variable-weight selling is added.

## Cart

- Add, remove, and change quantity from product UI, cart drawer, or cart page.
- Show server-revalidated subtotal before order confirmation.
- Preserve guest cart across reloads.
- Do not lose the cart when locale changes.
- Show a clear resolution when a product becomes hidden, unavailable, repriced,
  or has insufficient stock.

## Checkout

- Guest checkout is allowed.
- Collect name, phone, optional email, fulfillment method, and order notes.
- Delivery requires a valid address and displays fee/conditions.
- Pickup displays address, hours, and instructions and does not require a
  delivery address.
- The customer reviews items, fulfillment data, subtotal, fee, and total before
  confirming.
- No online payment is collected.
- A successful order produces a stable public order number and confirmation.
- Repeated submission must not create accidental duplicate orders.

## Telegram notification

- Notify the configured administrator after an order is committed.
- Include order number, time, fulfillment type, customer contact, items, totals,
  notes, and admin order link where safe.
- Message text is Spanish.
- Notification failure is logged and retryable without duplicating the order.

## Admin

### Access

- `/admin` redirects unauthenticated visitors to `/admin/login`.
- Authenticated non-admin users receive no admin access.
- Pages and mutations independently enforce `ADMIN` authorization.

### Catalog

- Create and edit products with shared commercial fields and both translations.
- Upload, order, and remove product images.
- Set price, comparison price, stock, low-stock threshold, sale unit, net
  content, category, brand, featured state, and active state.
- Create, edit, order, and hide categories with both translations.
- Validate unique SKU and locale-specific slugs.

### Orders

- List and filter orders by date, status, fulfillment type, and order number.
- View immutable item snapshots and customer fulfillment details.
- Change only through valid status transitions.
- Keep an audit timestamp for status updates.

Initial statuses:

```text
PENDING → CONFIRMED → PREPARING → READY → COMPLETED
   └───────────────→ CANCELLED
```

Delivery may later add `OUT_FOR_DELIVERY`; do not add it until the operational
workflow is confirmed.

### Store settings

- Edit address, phone, WhatsApp, opening hours, pickup instructions, delivery
  zones/conditions, and delivery fee.
- Public pages load these values from the database rather than hard-coded copy.

## Customer account — extended release

- Register, sign in, sign out, and recover access using the accepted auth design.
- Edit name, phone, email, and saved addresses.
- View owned order history and order details.
- Repeat an order by adding currently available products at current prices;
  never silently reuse old prices.
- Persist the authenticated cart in PostgreSQL.
- Merge guest cart after login and explain unavailable or adjusted items.

## Non-functional requirements

- Mobile-first responsive interface.
- WCAG 2.2 AA-oriented semantics, focus, contrast, forms, and dialogs.
- Search-engine-friendly localized public pages and structured product metadata.
- No secrets or customer personal data in client bundles or source control.
- Critical server mutations are validated, authorized, and covered by tests.
- Production builds, linting, type checks, and tests pass before release.
