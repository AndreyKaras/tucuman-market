import { getLocale, getTranslations } from "next-intl/server";

import { ProductCard } from "@/components/store/product-card";
import { SearchIcon, SlidersIcon } from "@/components/ui/icons";
import { getCatalog } from "@/features/catalog/data/catalog-repository";
import { selectProducts } from "@/features/catalog/model/selectors";
import type {
  CatalogQuery,
  StoreLocale,
} from "@/features/catalog/model/types";
import { Link } from "@/i18n/navigation";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const getValue = (
  params: Record<string, string | string[] | undefined>,
  key: string,
) => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

const toQuery = (
  params: Record<string, string | string[] | undefined>,
): CatalogQuery => {
  const sort = getValue(params, "sort");
  const validSort = ["featured", "name", "price-asc", "price-desc"].includes(
    sort ?? "",
  )
    ? (sort as CatalogQuery["sort"])
    : "featured";

  return {
    category: getValue(params, "category"),
    inStock: getValue(params, "inStock") === "1",
    onSale: getValue(params, "onSale") === "1",
    query: getValue(params, "q"),
    sort: validSort,
  };
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [locale, params, t] = await Promise.all([
    getLocale() as Promise<StoreLocale>,
    searchParams,
    getTranslations("Catalog"),
  ]);
  const catalog = getCatalog(locale);
  const query = toQuery(params);
  const products = selectProducts(catalog.products, query);
  const baseQuery = Object.fromEntries(
    Object.entries({
      q: query.query,
      sort: query.sort === "featured" ? undefined : query.sort,
    }).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );

  return (
    <main className="catalog-page container" id="main-content">
      <header className="catalog-page__header">
        <div>
          <p className="breadcrumbs">
            <Link href="/">{t("homeBreadcrumb")}</Link>
            <span aria-hidden="true">/</span>
            <span>{t("title")}</span>
          </p>
          <h1>{t("title")}</h1>
          <p>{t("resultCount", { count: products.length })}</p>
        </div>
      </header>

      <div className="catalog-layout">
        <aside className="catalog-filters" aria-labelledby="filters-title">
          <h2 id="filters-title">
            <SlidersIcon />
            {t("filters")}
          </h2>
          <section>
            <h3>{t("categories")}</h3>
            <Link
              aria-current={!query.category ? "true" : undefined}
              href={{ pathname: "/products", query: baseQuery }}
            >
              {t("allCategories")}
            </Link>
            {catalog.categories.map((category) => (
              <Link
                aria-current={query.category === category.key ? "true" : undefined}
                href={{
                  pathname: "/products",
                  query: { ...baseQuery, category: category.key },
                }}
                key={category.key}
              >
                {category.name}
              </Link>
            ))}
          </section>
          <section>
            <h3>{t("availability")}</h3>
            <Link
              aria-current={query.inStock ? "true" : undefined}
              href={{
                pathname: "/products",
                query: {
                  ...baseQuery,
                  ...(query.category ? { category: query.category } : {}),
                  ...(query.inStock ? {} : { inStock: "1" }),
                  ...(query.onSale ? { onSale: "1" } : {}),
                },
              }}
            >
              {t("inStock")}
            </Link>
            <Link
              aria-current={query.onSale ? "true" : undefined}
              href={{
                pathname: "/products",
                query: {
                  ...baseQuery,
                  ...(query.category ? { category: query.category } : {}),
                  ...(query.inStock ? { inStock: "1" } : {}),
                  ...(query.onSale ? {} : { onSale: "1" }),
                },
              }}
            >
              {t("onSale")}
            </Link>
          </section>
          <Link className="button button--secondary" href="/products">
            {t("clearFilters")}
          </Link>
        </aside>

        <section className="catalog-results" aria-labelledby="results-title">
          <div className="catalog-toolbar">
            <h2 className="sr-only" id="results-title">
              {t("results")}
            </h2>
            <form>
              {query.query ? <input name="q" type="hidden" value={query.query} /> : null}
              {query.category ? (
                <input name="category" type="hidden" value={query.category} />
              ) : null}
              {query.inStock ? <input name="inStock" type="hidden" value="1" /> : null}
              {query.onSale ? <input name="onSale" type="hidden" value="1" /> : null}
              <label htmlFor="catalog-sort">{t("sort")}</label>
              <select defaultValue={query.sort} id="catalog-sort" name="sort">
                <option value="featured">{t("sortFeatured")}</option>
                <option value="name">{t("sortName")}</option>
                <option value="price-asc">{t("sortPriceAsc")}</option>
                <option value="price-desc">{t("sortPriceDesc")}</option>
              </select>
              <button className="button button--secondary button--compact" type="submit">
                {t("apply")}
              </button>
            </form>
          </div>

          {products.length ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state catalog-empty">
              <span className="empty-state__icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <h2>{t("noResultsTitle")}</h2>
              <p>{t("noResults")}</p>
              <Link className="button button--primary" href="/products">
                {t("clearFilters")}
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
