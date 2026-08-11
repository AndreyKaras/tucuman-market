import type { CatalogCategory } from "@/features/catalog/model/types";
import { Link } from "@/i18n/navigation";

import { ArrowIcon, CategoryIcon } from "../ui/icons";

export function CategoryTile({ category }: { category: CatalogCategory }) {
  return (
    <Link
      className="grid min-h-[92px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-line p-3.5 text-sm font-[650] transition-[border-color,box-shadow,transform] duration-160 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_6px_18px_rgba(10,61,27,0.08)] max-[639px]:flex-[0_0_78%] max-[639px]:snap-start motion-reduce:transform-none"
      href={{ pathname: "/categories/[slug]", params: { slug: category.slug } }}
    >
      <span className="flex size-[52px] items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        <CategoryIcon className="size-[30px]" kind={category.key} />
      </span>
      <span>{category.name}</span>
      <ArrowIcon className="size-[18px] text-primary-700" />
    </Link>
  );
}
