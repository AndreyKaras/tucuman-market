"use client";

import { useLocale, useTranslations } from "next-intl";

import { MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/icons";
import {
  cn,
  dangerIconButtonClass,
  quantityButtonClass,
  quantityControlClass,
  quantityOutputClass,
} from "@/components/ui/styles";
import {
  getCartLineSubtotal,
  type CartItem,
} from "@/features/cart/model/cart";
import { useCart } from "@/features/cart/ui/cart-provider";
import type { StoreLocale } from "@/features/catalog/model/types";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/format-money";

import { ProductImage } from "./product-image";

export function CartLineItem({
  item,
  variant = "drawer",
}: {
  item: CartItem;
  variant?: "drawer" | "page";
}) {
  const locale = useLocale() as StoreLocale;
  const cartT = useTranslations("Cart");
  const productT = useTranslations("Product");
  const cart = useCart();
  const isPage = variant === "page";
  const unit =
    item.saleUnit === "KG" ? productT("perKilogram") : productT("each");
  const lineTotal = getCartLineSubtotal(item);

  return (
    <li
      className={cn(
        "flex gap-3.5 border-b border-line last:border-b-0",
        isPage ? "p-6 max-[639px]:gap-4 max-[639px]:p-4" : "py-5",
      )}
    >
      <ProductImage image={item.image} size={isPage ? "cartPage" : "cart"} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              className="font-[650] hover:text-primary-700 hover:underline hover:underline-offset-4"
              href={{ pathname: "/products/[slug]", params: { slug: item.slug } }}
            >
              {item.name}
            </Link>
            <p className="mt-1 mb-0 text-xs text-ink-muted">{unit}</p>
            {isPage ? (
              <p className="mt-2 mb-0 text-xs text-ink-muted">
                {cartT("unitPrice")}: {formatMoney(item.price, locale)}
              </p>
            ) : null}
          </div>
          <strong
            aria-label={isPage ? cartT("lineTotal", { product: item.name }) : undefined}
            className={cn(
              "whitespace-nowrap",
              isPage ? "text-base text-primary-800" : "text-[13px]",
            )}
          >
            {formatMoney(isPage ? lineTotal : item.price, locale)}
          </strong>
        </div>
        <div className={cn("mt-3 flex items-center justify-between", isPage && "mt-5")}>
          <div className={cn(quantityControlClass, isPage && "grid-cols-[44px_48px_44px]")}>
            <button
              aria-label={cartT("decrease", { product: item.name })}
              className={quantityButtonClass}
              onClick={() => cart.decrement(item.sku)}
              type="button"
            >
              <MinusIcon />
            </button>
            <output
              aria-label={productT("quantity")}
              className={quantityOutputClass}
              key={item.quantity}
            >
              {item.quantity}
            </output>
            <button
              aria-label={cartT("increase", { product: item.name })}
              className={quantityButtonClass}
              disabled={item.quantity >= item.stockQuantity}
              onClick={() => cart.increment(item.sku)}
              type="button"
            >
              <PlusIcon />
            </button>
          </div>
          <button
            aria-label={cartT("removeProduct", { product: item.name })}
            className={dangerIconButtonClass}
            onClick={() => cart.remove(item.sku)}
            type="button"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  );
}
