'use client';

import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';

import {
  cartReducer,
  getCartCount,
  getCartSubtotal,
  initialCartState,
  type CartAction,
  type CartProductSnapshot,
  type CartItem,
  type CartState,
} from '../model/cart';
import { CART_STORAGE_KEY, deserializeCart, serializeCart } from '../model/cart-storage';
import type { CatalogProduct } from '@/features/catalog/model/types';

type CartContextValue = {
  addItem: (product: CartProductSnapshot, quantity?: number) => void;
  closeCart: () => void;
  count: number;
  decrement: (sku: string) => void;
  increment: (sku: string) => void;
  openCart: () => void;
  remove: (sku: string) => void;
  state: CartState;
  subtotal: bigint;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  products,
}: {
  children: ReactNode;
  products: readonly CatalogProduct[];
}) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    let items: CartItem[] = [];

    try {
      items = deserializeCart(window.localStorage.getItem(CART_STORAGE_KEY), products);
    } catch {
      items = [];
    }

    dispatch({ items, type: 'hydrate' });
  }, [products]);

  useEffect(() => {
    if (!state.hasHydrated) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(state.items));
    } catch {
      // The visual cart still works when storage is unavailable.
    }
  }, [state.hasHydrated, state.items]);

  const value = useMemo<CartContextValue>(
    () => ({
      addItem: (product, quantity) => dispatch({ product, quantity, type: 'add' }),
      closeCart: () => dispatch({ type: 'close' }),
      count: getCartCount(state.items),
      decrement: (sku) => dispatch({ sku, type: 'decrement' }),
      increment: (sku) => dispatch({ sku, type: 'increment' }),
      openCart: () => dispatch({ type: 'open' }),
      remove: (sku) => dispatch({ sku, type: 'remove' }),
      state,
      subtotal: getCartSubtotal(state.items),
    }),
    [state],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}

export type { CartAction };
