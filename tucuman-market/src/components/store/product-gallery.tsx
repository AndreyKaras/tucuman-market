"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import type { ProductImage } from "@/features/catalog/model/types";

import { ProductImage as StoreProductImage } from "./product-image";

export function ProductGallery({ images }: { images: readonly ProductImage[] }) {
  const t = useTranslations("Product");
  const [selected, setSelected] = useState(0);
  const activeImage = images[selected] ?? images[0];

  if (!activeImage) return null;

  return (
    <div>
      <div className="aspect-[4/3] overflow-hidden rounded-[14px] border border-line bg-surface-muted">
        <StoreProductImage image={activeImage} size="detail" />
      </div>
      <div aria-label={t("gallery")} className="mt-3 flex gap-2.5" role="list">
        {images.map((image, index) => (
          <span key={`${image.src}-${image.sortOrder}`} role="listitem">
            <button
              aria-current={selected === index ? "true" : undefined}
              aria-label={t("showImage", { index: index + 1 })}
              className="size-[76px] overflow-hidden rounded-[9px] border border-line bg-white p-[3px] aria-current:border-primary-700 aria-current:shadow-[0_0_0_2px_var(--primary-100)]"
              onClick={() => setSelected(index)}
              type="button"
            >
              <StoreProductImage image={image} size="thumbnail" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
