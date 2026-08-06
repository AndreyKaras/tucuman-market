# Tucumán Market — Project Brief

## Product

`tucuman-market` is a portfolio-quality full-stack grocery store for San Miguel
de Tucumán, Argentina. It should feel like a credible small local supermarket,
not a generic e-commerce template.

## Goals

- Let customers discover products quickly by category, search, and filters.
- Let guests place delivery or pickup orders without online payment.
- Give staff a protected admin area for catalog and order management.
- Notify the administrator about new orders in Telegram.
- Support customer accounts, saved carts, addresses, order history, and repeat
  ordering after the core storefront and admin flows are stable.
- Demonstrate sound architecture, localization, accessibility, testing, and
  security in a public developer portfolio.

## Market and localization

- Primary market: San Miguel de Tucumán, Argentina.
- Default language: Argentinian Spanish (`es`).
- Secondary language: English (`en`).
- Currency in both locales: Argentine peso (`ARS`).
- Display examples: `$ 4.500` in Spanish and `ARS 4,500` in English.
- Storefront copy in Spanish uses natural local wording and `vos` forms.
- Taxes are included in displayed prices.

## Initial catalog

The demonstration catalog contains 80 products: 10 products in each of eight
categories.

1. Frutas y verduras / Fruit and vegetables
2. Almacén / Pantry
3. Lácteos y huevos / Dairy and eggs
4. Panadería / Bakery
5. Bebidas / Beverages
6. Snacks y dulces / Snacks and sweets
7. Carnes y fiambres / Meat and deli
8. Congelados / Frozen food

Prices are realistic demonstration values dated in seed metadata. They are not
promises of live market pricing and must be editable in the admin panel.

## Core release

- Home page with promotions, categories, featured products, and store trust
  information.
- Catalog with categories, search, sorting, and practical filters.
- Product detail page.
- Cart drawer and full cart page.
- Delivery or pickup checkout.
- Order creation without online payment.
- Telegram notification after order creation.
- Hidden storefront entry for admin; direct `/admin` access remains possible.
- Protected admin login and role-based admin area.
- Product create/edit/hide, category management, order list/detail/status.
- Editable store address, phone, hours, delivery, and pickup information.

## Extended release

- Customer registration and login.
- Profile and address management.
- Order history and repeat order.
- Server-persisted cart for authenticated customers.
- Guest cart preserved locally and merged after login.

## Explicitly out of scope for the first release

- Online card payment.
- Marketplace with multiple sellers.
- Native mobile apps.
- Real-time courier tracking.
- Complex product variants.
- Warehouse-grade inventory accounting.
- Multi-currency pricing.

## Success criteria

- A guest can find products, build a cart, choose delivery or pickup, and create
  a valid order on mobile without confusion.
- The administrator receives the order in Telegram and can process it in the
  protected admin area.
- Both locales cover all customer-facing routes without mixed-language UI.
- Reloading or changing locale does not lose the guest cart.
- Automated tests protect critical pricing, authorization, cart, stock, and
  order-state behavior.
