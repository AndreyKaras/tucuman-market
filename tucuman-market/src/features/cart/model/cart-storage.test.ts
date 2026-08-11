import { describe, expect, it } from "vitest";

import { getCatalog } from "../../catalog/data/catalog-repository";

import { deserializeCart, serializeCart } from "./cart-storage";
import { toCartProductSnapshot } from "./cart";

describe("cart storage", () => {
  const products = getCatalog("es").products;

  it("stores only versioned SKU and quantity values", () => {
    const product = products[0]!;
    const raw = serializeCart([{ ...toCartProductSnapshot(product), quantity: 2 }]);

    expect(JSON.parse(raw)).toEqual({
      items: [{ quantity: 2, sku: product.sku }],
      version: 1,
    });
  });

  it("rehydrates current product data and clamps quantity to stock", () => {
    const raw = JSON.stringify({ items: [{ quantity: 999, sku: "FV-001" }], version: 1 });
    const items = deserializeCart(raw, products);

    expect(items[0]?.quantity).toBe(20);
    expect(items[0]?.name).toBe("Banana por kg");
  });

  it("ignores missing and corrupted records", () => {
    const raw = JSON.stringify({
      items: [
        { quantity: 1, sku: "MISSING" },
      ],
      version: 1,
    });

    expect(deserializeCart(raw, products)).toEqual([]);
    expect(deserializeCart("not-json", products)).toEqual([]);
    expect(deserializeCart(JSON.stringify({ items: [], version: 2 }), products)).toEqual([]);
  });

  it("rehydrates fractional quantities using the current product step", () => {
    const raw = JSON.stringify({ items: [{ quantity: 1.5, sku: "FV-001" }], version: 1 });

    expect(deserializeCart(raw, products)[0]?.quantity).toBe(1.5);
  });

  it("deduplicates repeated SKU records from untrusted storage", () => {
    const raw = JSON.stringify({
      items: [
        { quantity: 2, sku: "FV-001" },
        { quantity: 3, sku: "FV-001" },
      ],
      version: 1,
    });

    expect(deserializeCart(raw, products)).toMatchObject([
      { quantity: 5, sku: "FV-001" },
    ]);
  });
});
