"use client";

import { useLocale, useTranslations } from "next-intl";

import { CartIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";
import type {
  CatalogProduct,
  StoreLocale,
} from "@/features/catalog/model/types";
import { useCart } from "@/features/cart/ui/cart-provider";
import { toCartProductSnapshot } from "@/features/cart/model/cart";
import { formatMoney } from "@/lib/format-money";
import { formatNetContent } from "@/lib/format-net-content";
import { Link } from "@/i18n/navigation";
import {
  cn,
  outBadgeClass,
  primaryButtonClass,
  quantityButtonClass,
  quantityControlClass,
  quantityOutputClass,
  saleBadgeClass,
  warningBadgeClass,
} from "@/components/ui/styles";

import { ProductImage } from "./product-image";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const locale = useLocale() as StoreLocale;
  const t = useTranslations("Product");
  const cartT = useTranslations("Cart");
  const cart = useCart();
  const cartItem = cart.state.items.find((item) => item.sku === product.sku);
  const unit = product.saleUnit === "KG" ? t("perKilogram") : t("each");
  const details = [
    product.brand,
    product.netContent
      ? formatNetContent(product.netContent, locale)
      : unit,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,box-shadow,transform] duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_8px_22px_rgba(10,61,27,0.1)] motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        className="flex min-w-0 flex-1 flex-col focus-visible:outline-offset-[-3px]"
        href={{ pathname: "/products/[slug]", params: { slug: product.slug } }}
      >
        <div className="relative mt-3 mr-3 ml-3 aspect-[4/3] overflow-hidden bg-surface-muted max-[639px]:mt-2 max-[639px]:mr-2 max-[639px]:ml-2">
          <ProductImage decorative image={product.image} />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            {product.isOnSale ? (
              <span className={saleBadgeClass}>{t("onSale")}</span>
            ) : null}
            {product.isLowStock ? (
              <span className={warningBadgeClass}>{t("lowStock")}</span>
            ) : null}
            {product.isOutOfStock ? (
              <span className={outBadgeClass}>{t("outOfStock")}</span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 max-[639px]:p-3">
          <h3 className="m-0 min-h-[43px] text-base leading-[1.35] font-[650] max-[639px]:min-h-[38px] max-[639px]:text-sm">{product.name}</h3>
          <p className="mt-1.5 mb-0 min-h-[19px] text-[13px] text-ink-muted max-[639px]:text-xs">{details}</p>
          <div className="my-4 flex flex-wrap items-baseline gap-2 max-[380px]:flex-col max-[380px]:items-start max-[380px]:gap-0.5">
            <strong className="text-xl tracking-[-0.015em] text-primary-700 max-[639px]:text-[17px]">{formatMoney(product.price, locale)}</strong>
            {product.compareAtPrice ? (
              <s className="text-[13px] text-ink-subtle">{formatMoney(product.compareAtPrice, locale)}</s>
            ) : null}
          </div>
        </div>
      </Link>
      <div className="flex flex-none flex-col px-4 pt-0 pb-4 max-[639px]:px-3 max-[639px]:pb-3">
        {cart.state.hasHydrated && cartItem ? (
          <div
            aria-label={`${product.name}: ${t("quantity")}`}
            className={cn(
              quantityControlClass,
              "mt-auto h-12 w-full grid-cols-[48px_minmax(0,1fr)_48px] [&_button]:h-full",
            )}
            role="group"
          >
            <button
              aria-label={cartT("decrease", { product: product.name })}
              className={quantityButtonClass}
              onClick={() => cart.decrement(product.sku)}
              type="button"
            >
              <MinusIcon />
            </button>
            <output className={quantityOutputClass} key={cartItem.quantity}>
              {cartItem.quantity}
            </output>
            <button
              aria-label={cartT("increase", { product: product.name })}
              className={quantityButtonClass}
              disabled={cartItem.quantity >= product.stockQuantity}
              onClick={() => cart.increment(product.sku)}
              type="button"
            >
              <PlusIcon />
            </button>
          </div>
        ) : (
          <button
            className={cn(
              primaryButtonClass,
              "mt-auto w-full max-[639px]:px-2.5 max-[639px]:[&_span]:text-xs max-[380px]:[&_span]:sr-only max-[380px]:[&_svg]:size-[22px]",
            )}
            disabled={product.isOutOfStock}
            onClick={() => cart.addItem(toCartProductSnapshot(product))}
            type="button"
          >
            <CartIcon />
            <span>{product.isOutOfStock ? t("outOfStock") : t("addToCart")}</span>
          </button>
        )}
      </div>
    </article>
  );
}
