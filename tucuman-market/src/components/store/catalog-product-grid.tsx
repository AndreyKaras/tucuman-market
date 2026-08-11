"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { ChevronDownIcon } from "@/components/ui/icons";
import type { CatalogProduct } from "@/features/catalog/model/types";
import { secondaryButtonClass } from "@/components/ui/styles";

import { ProductCard } from "./product-card";

type CatalogProductGridProps = {
  initialVisibleCount: number;
  pageSize: number;
  products: CatalogProduct[];
};

function updatePageInUrl(page: number) {
  const url = new URL(window.location.href);

  if (page > 1) {
    url.searchParams.set("page", String(page));
  } else {
    url.searchParams.delete("page");
  }

  window.history.replaceState(window.history.state, "", url);
}

export function CatalogProductGrid({
  initialVisibleCount,
  pageSize,
  products,
}: CatalogProductGridProps) {
  const t = useTranslations("Catalog");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  function showMore() {
    const nextVisibleCount = Math.min(products.length, visibleCount + pageSize);
    const nextPage = Math.ceil(nextVisibleCount / pageSize);

    setVisibleCount(nextVisibleCount);
    updatePageInUrl(nextPage);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 max-[1120px]:grid-cols-3 max-[639px]:grid-cols-1" id="catalog-product-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
      <div className="mt-[30px] flex flex-col items-center">
        {hasMore ? (
          <button
            aria-controls="catalog-product-grid"
            className={`${secondaryButtonClass} min-w-[190px] [&_svg]:transition-transform [&_svg]:duration-[140ms] hover:[&_svg]:translate-y-0.5`}
            onClick={showMore}
            type="button"
          >
            <span>{t("showMore")}</span>
            <ChevronDownIcon />
          </button>
        ) : null}
        <p className="mt-2.5 mb-0 text-[13px] text-ink-muted" aria-live="polite">
          {t("showingCount", {
            count: visibleProducts.length,
            total: products.length,
          })}
        </p>
      </div>
    </>
  );
}
