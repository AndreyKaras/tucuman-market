"use client";

import { useLocale, useTranslations } from "next-intl";

import { CartIcon } from "@/components/ui/icons";
import type {
  CatalogProduct,
  StoreLocale,
} from "@/features/catalog/model/types";
import { useCart } from "@/features/cart/ui/cart-provider";
import { formatMoney } from "@/lib/format-money";

import { ProductImage } from "./product-image";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const locale = useLocale() as StoreLocale;
  const t = useTranslations("Product");
  const cart = useCart();
  const unit = product.saleUnit === "KG" ? t("perKilogram") : t("each");
  const details = [
    product.brand,
    product.netContent
      ? `${product.netContent.value} ${product.netContent.unit.toLocaleLowerCase()}`
      : unit,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="product-card">
      <div className="product-card__media">
        <ProductImage image={product.image} />
        <div className="product-card__badges">
          {product.isOnSale ? (
            <span className="badge badge--sale">{t("onSale")}</span>
          ) : null}
          {product.isLowStock ? (
            <span className="badge badge--warning">{t("lowStock")}</span>
          ) : null}
          {product.isOutOfStock ? (
            <span className="badge badge--out">{t("outOfStock")}</span>
          ) : null}
        </div>
      </div>

      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p className="product-card__meta">{details}</p>
        <div className="product-card__price">
          <strong>{formatMoney(product.price, locale)}</strong>
          {product.compareAtPrice ? (
            <s>{formatMoney(product.compareAtPrice, locale)}</s>
          ) : null}
        </div>
        <button
          className="button button--primary product-card__action"
          disabled={product.isOutOfStock}
          onClick={() =>
            cart.addItem({
              image: product.image,
              name: product.name,
              price: product.price,
              saleUnit: product.saleUnit,
              sku: product.sku,
            })
          }
          type="button"
        >
          <CartIcon />
          <span>{product.isOutOfStock ? t("outOfStock") : t("addToCart")}</span>
        </button>
      </div>
    </article>
  );
}
