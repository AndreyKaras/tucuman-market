import type { CSSProperties } from "react";

import type { ProductImage as ProductImageValue } from "@/features/catalog/model/types";
import { cn } from "@/components/ui/styles";

const sizeClasses = {
  card: "h-full w-full",
  cart: "aspect-square flex-[0_0_72px] rounded-lg bg-surface-muted",
  cartPage:
    "aspect-square w-28 flex-none rounded-xl bg-surface-muted max-[639px]:w-20",
  detail: "h-full w-full",
  thumbnail: "h-full w-full",
} as const;

export function ProductImage({
  decorative = false,
  image,
  size = "card",
}: {
  decorative?: boolean;
  image: ProductImageValue;
  size?: "card" | "cart" | "cartPage" | "detail" | "thumbnail";
}) {
  const isSprite = image.spritePosition !== undefined;
  const position = isSprite ? (image.spritePosition! / 9) * 100 : 50;
  const style: CSSProperties = {
    backgroundImage: `url(${image.src})`,
    backgroundPosition: `${position}% center`,
    backgroundSize: isSprite ? "1000% auto" : "cover",
  };

  return (
    <span
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : image.alt}
      className={cn(
        "block bg-no-repeat",
        sizeClasses[size],
      )}
      role={decorative ? undefined : "img"}
      style={style}
    />
  );
}
