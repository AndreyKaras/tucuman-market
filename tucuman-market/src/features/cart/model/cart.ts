export type CartProductSnapshot = {
  image: { alt: string; position: number; src: string };
  name: string;
  price: string;
  saleUnit: "KG" | "UNIT";
  sku: string;
};

export type CartItem = CartProductSnapshot & {
  quantity: number;
};

export type CartState = {
  isOpen: boolean;
  items: CartItem[];
};

export type CartAction =
  | { product: CartProductSnapshot; type: "add" }
  | { sku: string; type: "decrement" | "increment" | "remove" }
  | { type: "close" | "open" };

export const initialCartState: CartState = { isOpen: false, items: [] };

export function cartReducer(
  state: CartState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.items.find(
        (item) => item.sku === action.product.sku,
      );

      return {
        isOpen: true,
        items: existing
          ? state.items.map((item) =>
              item.sku === action.product.sku
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "increment":
      return {
        ...state,
        items: state.items.map((item) =>
          item.sku === action.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case "decrement":
      return {
        ...state,
        items: state.items.flatMap((item) => {
          if (item.sku !== action.sku) return [item];
          return item.quantity > 1
            ? [{ ...item, quantity: item.quantity - 1 }]
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
  }
}

export function getCartCount(items: readonly CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: readonly CartItem[]) {
  return items.reduce(
    (total, item) => total + BigInt(item.price) * BigInt(item.quantity),
    BigInt(0),
  );
}
