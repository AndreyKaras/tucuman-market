import { getLocale, getTranslations } from 'next-intl/server';

import { ChevronDownIcon, SearchIcon } from '@/components/ui/icons';
import { getCatalog } from '@/features/catalog/data/catalog-repository';
import {
  parseCatalogQuery,
  toCatalogSearchParams,
  type RawSearchParams,
} from '@/features/catalog/model/catalog-query';
import { selectProducts } from '@/features/catalog/model/selectors';
import type { CatalogCategory, StoreLocale } from '@/features/catalog/model/types';
import { Link } from '@/i18n/navigation';
import {
  cn,
  containerClass,
  primaryButtonClass,
  secondaryButtonClass,
} from '@/components/ui/styles';

import { CatalogControls } from './catalog-controls';
import { CatalogProductGrid } from './catalog-product-grid';

const PAGE_SIZE = 12;

type CatalogViewProps = {
  category?: CatalogCategory;
  searchParams: Promise<RawSearchParams>;
};

export async function CatalogView({ category, searchParams }: CatalogViewProps) {
  const [locale, params, t] = await Promise.all([
    getLocale() as Promise<StoreLocale>,
    searchParams,
    getTranslations('Catalog'),
  ]);
  const catalog = getCatalog(locale);
  const query = parseCatalogQuery(params, category?.key);
  const products = selectProducts(catalog.products, query);
  const selectedCategory =
    category ?? catalog.categories.find((item) => item.key === query.category);
  const catalogTitle = query.query
    ? t('searchResultsTitle', { query: query.query })
    : (selectedCategory?.name ?? (query.onSale ? t('offersTitle') : t('title')));
  const shouldShowResultCount = Boolean(
    category ||
    query.query ||
    query.category ||
    query.inStock ||
    query.onSale ||
    query.minPrice ||
    query.maxPrice,
  );
  const visibleCount = Math.min(products.length, (query.page ?? 1) * PAGE_SIZE);
  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;
  const nextQuery = toCatalogSearchParams(
    { ...query, page: (query.page ?? 1) + 1 },
    { includeCategory: !category },
  );
  const loadMoreHref = category
    ? ({
        pathname: '/categories/[slug]' as const,
        params: { slug: category.slug },
        query: nextQuery,
      } as const)
    : ({ pathname: '/products' as const, query: nextQuery } as const);
  const clearHref = category
    ? ({
        pathname: '/categories/[slug]' as const,
        params: { slug: category.slug },
        query: query.query ? { q: query.query } : {},
      } as const)
    : ({ pathname: '/products' as const } as const);

  return (
    <main
      className={cn(containerClass, 'pt-8 pb-20 max-[639px]:pt-6 max-[639px]:pb-14')}
      id="main-content"
    >
      <header>
        {category ? (
          <p className="m-0 flex items-center gap-2 text-[13px] text-ink-muted [&_a]:inline-flex [&_a]:min-h-11 [&_a]:min-w-11 [&_a]:items-center [&_a:hover]:text-primary-700 [&_a:hover]:underline">
            <Link href="/">{t('homeBreadcrumb')}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products">{t('title')}</Link>
            <span aria-hidden="true">/</span>
            <span>{category.name}</span>
          </p>
        ) : null}
        <h1 className="mt-2.5 mb-2 text-[40px] leading-[1.12] tracking-[-0.025em] max-[639px]:text-[32px]">
          {catalogTitle}
        </h1>
        {shouldShowResultCount ? (
          <p className="m-0 text-ink-muted">{t('resultCount', { count: products.length })}</p>
        ) : null}
      </header>

      <div className="relative mt-6 grid grid-cols-[232px_minmax(0,1fr)] gap-8 max-[900px]:grid-cols-1 max-[639px]:mt-5">
        <CatalogControls
          categories={catalog.categories}
          categorySlug={category?.slug}
          query={query}
        />

        <section
          aria-labelledby="results-title"
          className="col-start-2 row-start-1 min-w-0 max-[900px]:col-start-1 max-[900px]:row-start-2"
        >
          <h2 className="sr-only" id="results-title">
            {t('results')}
          </h2>
          {products.length ? (
            <>
              <CatalogProductGrid products={visibleProducts} />
              <div className="mt-[30px] flex flex-col items-center">
                {hasMore ? (
                  <Link
                    aria-controls="catalog-product-grid"
                    className={`${secondaryButtonClass} min-w-[190px] [&_svg]:transition-transform [&_svg]:duration-[140ms] hover:[&_svg]:translate-y-0.5`}
                    href={loadMoreHref}
                    scroll={false}
                  >
                    <span>{t('showMore')}</span>
                    <ChevronDownIcon />
                  </Link>
                ) : null}
                <p className="mt-2.5 mb-0 text-[13px] text-ink-muted" aria-live="polite">
                  {t('showingCount', { count: visibleProducts.length, total: products.length })}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-line-strong px-6 py-16 text-center">
              <span
                className="inline-flex size-[72px] items-center justify-center rounded-full bg-primary-50 text-primary-700"
                aria-hidden="true"
              >
                <SearchIcon className="size-9" />
              </span>
              <h2 className="mt-5 mb-0">{t('noResultsTitle')}</h2>
              <p className="mt-2.5 mb-6 max-w-[460px] leading-6 text-ink-muted">{t('noResults')}</p>
              <Link className={primaryButtonClass} href={clearHref}>
                {t('clearFilters')}
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
