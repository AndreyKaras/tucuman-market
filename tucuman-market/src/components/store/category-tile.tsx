import type { CatalogCategory } from "@/features/catalog/model/types";
import { Link } from "@/i18n/navigation";

import { ArrowIcon, CategoryIcon } from "../ui/icons";

export function CategoryTile({ category }: { category: CatalogCategory }) {
  return (
    <Link
      className="category-tile"
      href={{ pathname: "/products", query: { category: category.key } }}
    >
      <span className="category-tile__icon">
        <CategoryIcon kind={category.key} />
      </span>
      <span>{category.name}</span>
      <ArrowIcon className="category-tile__arrow" />
    </Link>
  );
}
