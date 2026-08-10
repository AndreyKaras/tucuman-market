"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import {
  cartReducer,
  getCartCount,
  getCartSubtotal,
  initialCartState,
  type CartAction,
  type CartProductSnapshot,
  type CartState,
} from "../model/cart";

type CartContextValue = {
  addItem: (product: CartProductSnapshot) => void;
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const value = useMemo<CartContextValue>(
    () => ({
      addItem: (product) => dispatch({ product, type: "add" }),
      closeCart: () => dispatch({ type: "close" }),
      count: getCartCount(state.items),
      decrement: (sku) => dispatch({ sku, type: "decrement" }),
      increment: (sku) => dispatch({ sku, type: "increment" }),
      openCart: () => dispatch({ type: "open" }),
      remove: (sku) => dispatch({ sku, type: "remove" }),
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
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export type { CartAction };
