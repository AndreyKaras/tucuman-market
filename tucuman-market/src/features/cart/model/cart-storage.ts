import type { CatalogProduct } from "@/features/catalog/model/types";

import {
  normalizeCartQuantity,
  toCartProductSnapshot,
  type CartItem,
} from "./cart";

const STORAGE_VERSION = 1;

type PersistedCart = {
  items: Array<{ quantity: number; sku: string }>;
  version: typeof STORAGE_VERSION;
};

export const CART_STORAGE_KEY = "tucuman-market:cart:v1";

export function serializeCart(items: readonly CartItem[]) {
  const value: PersistedCart = {
    items: items.map(({ quantity, sku }) => ({ quantity, sku })),
    version: STORAGE_VERSION,
  };

  return JSON.stringify(value);
}

export function deserializeCart(
  raw: string | null,
  products: readonly CatalogProduct[],
): CartItem[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isPersistedCart(parsed)) return [];

    const productsBySku = new Map(products.map((product) => [product.sku, product]));

    const quantities = new Map<string, number>();

    for (const { quantity, sku } of parsed.items) {
      const product = productsBySku.get(sku);
      if (!product || product.isOutOfStock || product.stockQuantity < 1) continue;

      quantities.set(
        sku,
        normalizeCartQuantity(
          (quantities.get(sku) ?? 0) + quantity,
          product.quantityStep,
          product.stockQuantity,
        ),
      );
    }

    return [...quantities].map(([sku, quantity]) => ({
      ...toCartProductSnapshot(productsBySku.get(sku)!),
      quantity,
    }));
  } catch {
    return [];
  }
}

function isPersistedCart(value: unknown): value is PersistedCart {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<PersistedCart>;
  return (
    candidate.version === STORAGE_VERSION &&
    Array.isArray(candidate.items) &&
    candidate.items.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.sku === "string" &&
        Number.isFinite(item.quantity) &&
        item.quantity > 0,
    )
  );
}
