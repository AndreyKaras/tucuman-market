import type { CatalogCategory } from "@/features/catalog/model/types";
import { Link } from "@/i18n/navigation";

import { ArrowIcon } from "../ui/icons";
import { ProductImage } from "./product-image";

export function CategoryTile({ category }: { category: CatalogCategory }) {
  return (
    <Link
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white text-sm font-[650] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_10px_24px_rgba(10,61,27,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 motion-reduce:transform-none motion-reduce:transition-none"
      href={{ pathname: "/categories/[slug]", params: { slug: category.slug } }}
    >
      <span className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
        <span className="absolute inset-0">
          <ProductImage decorative image={category.image} />
        </span>
      </span>
      <span className="flex min-h-[64px] w-full items-center justify-between gap-3 px-4 py-3 max-[639px]:min-h-[72px] max-[639px]:px-3.5">
        <span className="min-w-0 leading-snug">{category.name}</span>
        <span className="flex size-8 flex-none items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-colors duration-200 group-hover:bg-primary-700 group-hover:text-white group-focus-visible:bg-primary-700 group-focus-visible:text-white motion-reduce:transition-none">
          <ArrowIcon className="size-4" />
        </span>
      </span>
    </Link>
  );
}
