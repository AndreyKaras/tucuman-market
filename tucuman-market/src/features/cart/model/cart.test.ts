import { describe, expect, it } from 'vitest';

import {
  cartReducer,
  getCartCount,
  getCartSubtotal,
  initialCartState,
  type CartProductSnapshot,
} from './cart';

const product: CartProductSnapshot = {
  image: {
    alt: 'Banana',
    height: 240,
    sortOrder: 0,
    spritePosition: 0,
    src: '/products.png',
    width: 320,
  },
  name: 'Banana',
  price: '2790',
  quantityStep: 0.5,
  saleUnit: 'KG',
  sku: 'FV-001',
  slug: 'banana-por-kilo',
  stockQuantity: 2,
};

describe('cart reducer', () => {
  it('adds an item without opening the visual cart', () => {
    const state = cartReducer(initialCartState, { product, type: 'add' });

    expect(state.isOpen).toBe(false);
    expect(getCartCount(state.items)).toBe(1);
  });

  it('opens the visual cart only after an explicit action', () => {
    const added = cartReducer(initialCartState, { product, type: 'add' });
    const opened = cartReducer(added, { type: 'open' });

    expect(opened.isOpen).toBe(true);
  });

  it('increments and decrements existing items', () => {
    const added = cartReducer(initialCartState, { product, type: 'add' });
    const incremented = cartReducer(added, { sku: product.sku, type: 'increment' });
    const decremented = cartReducer(incremented, { sku: product.sku, type: 'decrement' });

    expect(incremented.items[0]?.quantity).toBe(1);
    expect(decremented.items[0]?.quantity).toBe(0.5);
  });

  it('calculates subtotal with bigint instead of floating point', () => {
    const state = cartReducer(initialCartState, { product, type: 'add' });
    const incremented = cartReducer(state, { sku: product.sku, type: 'increment' });

    expect(getCartSubtotal(incremented.items)).toBe(BigInt(279000));
  });

  it('never increments beyond current stock', () => {
    const added = cartReducer(initialCartState, { product, quantity: 10, type: 'add' });
    const incremented = cartReducer(added, { sku: product.sku, type: 'increment' });

    expect(incremented.items[0]?.quantity).toBe(2);
  });

  it('calculates half-kilogram totals in minor units without floating-point money math', () => {
    const state = cartReducer(initialCartState, { product, type: 'add' });

    expect(getCartSubtotal(state.items)).toBe(BigInt(139500));
  });
});
