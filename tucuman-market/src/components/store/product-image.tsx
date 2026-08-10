import type { CSSProperties } from "react";

import type { ProductImage as ProductImageValue } from "@/features/catalog/model/types";

export function ProductImage({
  image,
  size = "card",
}: {
  image: ProductImageValue;
  size?: "card" | "cart";
}) {
  const position = (image.position / 9) * 100;
  const style: CSSProperties = {
    backgroundImage: `url(${image.src})`,
    backgroundPosition: `${position}% center`,
  };

  return (
    <span
      aria-label={image.alt}
      className={`product-image product-image--${size}`}
      role="img"
      style={style}
    />
  );
}
