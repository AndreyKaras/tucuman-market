import { normalizePriceFilter } from "./selectors";
import type { CatalogQuery } from "./types";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const SORT_VALUES = ["featured", "name", "price-asc", "price-desc"] as const;

function getValue(params: RawSearchParams, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export function parseCatalogQuery(
  params: RawSearchParams,
  forcedCategory?: string,
): CatalogQuery {
  const sort = getValue(params, "sort");
  const pageValue = Number.parseInt(getValue(params, "page") ?? "1", 10);
  let minPrice = normalizePriceFilter(getValue(params, "minPrice"));
  let maxPrice = normalizePriceFilter(getValue(params, "maxPrice"));

  if (minPrice && maxPrice && BigInt(minPrice) > BigInt(maxPrice)) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  return {
    category: forcedCategory ?? getValue(params, "category"),
    inStock: getValue(params, "inStock") === "1",
    maxPrice,
    minPrice,
    onSale: getValue(params, "onSale") === "1",
    page: Number.isFinite(pageValue) && pageValue > 0 ? Math.min(pageValue, 100) : 1,
    query: getValue(params, "q")?.trim() || undefined,
    sort: SORT_VALUES.includes(sort as (typeof SORT_VALUES)[number])
      ? (sort as CatalogQuery["sort"])
      : "featured",
  };
}

export function toCatalogSearchParams(
  query: CatalogQuery,
  options: { includeCategory?: boolean } = {},
) {
  const values = {
    category: options.includeCategory === false ? undefined : query.category,
    inStock: query.inStock ? "1" : undefined,
    maxPrice: query.maxPrice,
    minPrice: query.minPrice,
    onSale: query.onSale ? "1" : undefined,
    page: query.page && query.page > 1 ? String(query.page) : undefined,
    q: query.query,
    sort: query.sort && query.sort !== "featured" ? query.sort : undefined,
  };

  return Object.fromEntries(
    Object.entries(values).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
}

export function getActiveFilterCount(query: CatalogQuery, includeCategory = true) {
  return [
    includeCategory && Boolean(query.category),
    query.inStock,
    query.onSale,
    Boolean(query.minPrice),
    Boolean(query.maxPrice),
  ].filter(Boolean).length;
}
