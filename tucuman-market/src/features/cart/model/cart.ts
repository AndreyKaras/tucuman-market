import type {
  CatalogProduct,
  ProductImage,
} from "@/features/catalog/model/types";
import { moneyToMinorUnits } from "../../../lib/money";

const QUANTITY_SCALE = 1000;

const roundQuantity = (quantity: number) =>
  Math.round(quantity * QUANTITY_SCALE) / QUANTITY_SCALE;

export function normalizeCartQuantity(
  quantity: number,
  quantityStep: number,
  stockQuantity: number,
) {
  const steps = Math.max(1, Math.round(quantity / quantityStep));
  return Math.min(stockQuantity, roundQuantity(steps * quantityStep));
}

export type CartProductSnapshot = {
  image: ProductImage;
  name: string;
  price: string;
  quantityStep: number;
  saleUnit: "KG" | "UNIT";
  sku: string;
  slug: string;
  stockQuantity: number;
};

export type CartItem = CartProductSnapshot & {
  quantity: number;
};

export type CartState = {
  hasHydrated: boolean;
  isOpen: boolean;
  items: CartItem[];
};

export type CartAction =
  | { product: CartProductSnapshot; quantity?: number; type: "add" }
  | { items: CartItem[]; type: "hydrate" }
  | { sku: string; type: "decrement" | "increment" | "remove" }
  | { type: "close" | "open" };

export const initialCartState: CartState = {
  hasHydrated: false,
  isOpen: false,
  items: [],
};

export function cartReducer(
  state: CartState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case "add": {
      if (action.product.stockQuantity < 1) return state;
      const existing = state.items.find(
        (item) => item.sku === action.product.sku,
      );
      const quantity = normalizeCartQuantity(
        action.quantity ?? action.product.quantityStep,
        action.product.quantityStep,
        action.product.stockQuantity,
      );

      return {
        ...state,
        items: existing
          ? state.items.map((item) =>
              item.sku === action.product.sku
                ? {
                    ...item,
                    quantity: normalizeCartQuantity(
                      item.quantity + quantity,
                      item.quantityStep,
                      item.stockQuantity,
                    ),
                  }
                : item,
            )
          : [
              ...state.items,
              {
                ...action.product,
                quantity,
              },
            ],
      };
    }
    case "increment":
      return {
        ...state,
        items: state.items.map((item) =>
          item.sku === action.sku
            ? {
                ...item,
                quantity: normalizeCartQuantity(
                  item.quantity + item.quantityStep,
                  item.quantityStep,
                  item.stockQuantity,
                ),
              }
            : item,
        ),
      };
    case "decrement":
      return {
        ...state,
        items: state.items.flatMap((item) => {
          if (item.sku !== action.sku) return [item];
          return item.quantity > item.quantityStep
            ? [{
                ...item,
                quantity: roundQuantity(item.quantity - item.quantityStep),
              }]
            : [];
        }),
      };
    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.sku !== action.sku),
      };
    case "open":
      return { ...state, isOpen: true };
    case "close":
      return { ...state, isOpen: false };
    case "hydrate":
      return { hasHydrated: true, isOpen: false, items: action.items };
  }
}

export function toCartProductSnapshot(
  product: CatalogProduct,
): CartProductSnapshot {
  return {
    image: product.image,
    name: product.name,
    price: product.price,
    quantityStep: product.quantityStep,
    saleUnit: product.saleUnit,
    sku: product.sku,
    slug: product.slug,
    stockQuantity: product.stockQuantity,
  };
}

export function getCartCount(items: readonly CartItem[]) {
  return items.length;
}

export function getCartLineSubtotal(item: CartItem) {
  const quantity = BigInt(Math.round(item.quantity * QUANTITY_SCALE));
  const numerator = moneyToMinorUnits(item.price) * quantity;
  const scale = BigInt(QUANTITY_SCALE);

  return (numerator + scale / BigInt(2)) / scale;
}

export function getCartSubtotal(items: readonly CartItem[]) {
  return items.reduce(
    (total, item) => total + getCartLineSubtotal(item),
    BigInt(0),
  );
}
