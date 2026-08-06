# Data Model

This is the conceptual model. Prisma field names and auth-owned tables may be
adjusted during implementation, but the constraints below are product
requirements.

## User and Address

`User` includes identity fields, `role` (`CUSTOMER` or `ADMIN`), timestamps, and
auth relations. Public registration must always create `CUSTOMER`.

`Address` belongs to one user and stores label, recipient, street, number,
optional apartment/reference, city, province, postal code, and default flag.

## Category

`Category`:

- stable ID
- internal key
- display order
- active state
- timestamps

`CategoryTranslation`:

- category ID
- locale
- name
- slug
- optional description and SEO fields

Constraints: unique `(categoryId, locale)` and unique `(locale, slug)`.

## Product

`Product`:

- stable ID and globally unique SKU
- optional brand
- category ID
- exact price and optional comparison price
- stock quantity and low-stock threshold
- sale unit and quantity step
- optional net-content value/unit
- featured and active states
- timestamps

`ProductTranslation`:

- product ID
- locale
- name
- slug
- description
- SEO title/description

Constraints: unique `(productId, locale)` and unique `(locale, slug)`.

`ProductImage`:

- product ID
- storage asset ID and URL
- width/height
- sort order
- localized alternative text when needed

## Cart

`Cart` belongs to one user for the authenticated flow and has a status/version
for safe updates. `CartItem` is unique by `(cartId, productId)` and stores
quantity. Display prices are always resolved from current product data.

Guest carts live locally until checkout or login and use a versioned schema.

## Order

`Order`:

- stable ID and human-friendly unique order number
- optional user ID
- status and fulfillment type
- customer name, phone, optional email
- delivery snapshot or pickup snapshot
- notes
- exact subtotal, delivery fee, and total
- locale used during checkout
- notification state/timestamps
- created and updated timestamps

`OrderItem` is an immutable snapshot:

- order ID
- optional source product ID
- SKU snapshot
- localized product-name snapshot
- sale-unit snapshot
- exact unit-price snapshot
- quantity
- exact line total

Deleting a product must never delete historical order items.

## StoreSettings

Singleton or versioned settings for phone, WhatsApp, address, hours, delivery
fee, delivery rules, pickup instructions, and operational flags. Localized text
may use a related translation table.

## Important constraints

- All timestamps stored in UTC and formatted in the store timezone at display.
- All writes use server-side validation.
- `compareAtPrice` is null or greater than `price`.
- Quantities are positive and follow product step rules.
- Order total equals persisted line totals plus delivery fee.
- Status changes follow an explicit transition map.
- Customer reads are scoped to the authenticated user.
