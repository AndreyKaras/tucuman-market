import type {
  CatalogProduct,
  CatalogQuery,
} from "./types";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();

export function selectProducts(
  products: readonly CatalogProduct[],
  query: CatalogQuery,
): CatalogProduct[] {
  const search = normalize(query.query?.trim() ?? "");

  return products
    .filter((product) => {
      if (query.category && product.categoryKey !== query.category) {
        return false;
      }

      if (query.inStock && product.isOutOfStock) {
        return false;
      }

      if (query.onSale && !product.isOnSale) {
        return false;
      }

      if (!search) {
        return true;
      }

      return normalize(
        [product.name, product.brand, product.description, product.sku]
          .filter(Boolean)
          .join(" "),
      ).includes(search);
    })
    .sort((left, right) => {
      switch (query.sort) {
        case "name":
          return left.name.localeCompare(right.name);
        case "price-asc": {
          const leftPrice = BigInt(left.price);
          const rightPrice = BigInt(right.price);
          return leftPrice === rightPrice ? 0 : leftPrice < rightPrice ? -1 : 1;
        }
        case "price-desc": {
          const leftPrice = BigInt(left.price);
          const rightPrice = BigInt(right.price);
          return leftPrice === rightPrice ? 0 : leftPrice > rightPrice ? -1 : 1;
        }
        default:
          return Number(right.isFeatured) - Number(left.isFeatured);
      }
    });
}
