import { describe, expect, it } from "vitest";

import {
  cartReducer,
  getCartCount,
  getCartSubtotal,
  initialCartState,
  type CartProductSnapshot,
} from "./cart";

const product: CartProductSnapshot = {
  image: { alt: "Banana", position: 0, src: "/products.png" },
  name: "Banana",
  price: "2790",
  saleUnit: "KG",
  sku: "FV-001",
};

describe("cart reducer", () => {
  it("adds an item and opens the visual cart", () => {
    const state = cartReducer(initialCartState, { product, type: "add" });

    expect(state.isOpen).toBe(true);
    expect(getCartCount(state.items)).toBe(1);
  });

  it("increments and decrements existing items", () => {
    const added = cartReducer(initialCartState, { product, type: "add" });
    const incremented = cartReducer(added, { sku: product.sku, type: "increment" });
    const decremented = cartReducer(incremented, { sku: product.sku, type: "decrement" });

    expect(incremented.items[0]?.quantity).toBe(2);
    expect(decremented.items[0]?.quantity).toBe(1);
  });

  it("calculates subtotal with bigint instead of floating point", () => {
    const state = cartReducer(initialCartState, { product, type: "add" });
    const incremented = cartReducer(state, { sku: product.sku, type: "increment" });

    expect(getCartSubtotal(incremented.items)).toBe(BigInt(5580));
  });
});
