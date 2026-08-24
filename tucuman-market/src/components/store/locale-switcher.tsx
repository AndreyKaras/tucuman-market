'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/components/ui/styles';
import type { StoreLocale } from '@/features/catalog/model/types';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LocaleSwitcher() {
  const common = useTranslations('Common');
  const locale = useLocale() as StoreLocale;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  async function switchLocale(nextLocale: StoreLocale) {
    if (nextLocale === locale) return;

    const browserSegments = window.location.pathname.split('/').filter(Boolean);
    const localizedSection = browserSegments[1];
    const localizedSlug = decodeURIComponent(browserSegments[2] ?? '');

    if (localizedSlug && (localizedSection === 'products' || localizedSection === 'productos')) {
      const { getLocalizedProductSlugs, getProductBySlug } =
        await import('@/features/catalog/data/catalog-repository');
      const currentProduct = getProductBySlug(locale, localizedSlug);
      const slug = currentProduct
        ? getLocalizedProductSlugs(currentProduct.sku)[nextLocale]
        : undefined;
      if (slug) {
        router.replace({ pathname: '/products/[slug]', params: { slug } }, { locale: nextLocale });
        return;
      }
    }

    if (localizedSlug && (localizedSection === 'categories' || localizedSection === 'categorias')) {
      const { getCatalog, getLocalizedCategorySlugs } =
        await import('@/features/catalog/data/catalog-repository');
      const currentCategory = getCatalog(locale).categories.find(
        (category) => category.slug === localizedSlug,
      );
      const slug = currentCategory
        ? getLocalizedCategorySlugs(currentCategory.key)[nextLocale]
        : undefined;
      if (slug) {
        router.replace(
          {
            pathname: '/categories/[slug]',
            params: { slug },
            query: Object.fromEntries(searchParams.entries()),
          },
          { locale: nextLocale },
        );
        return;
      }
    }

    const query = Object.fromEntries(searchParams.entries());
    if (pathname === '/products') {
      router.replace({ pathname: '/products', query }, { locale: nextLocale });
    } else if (pathname === '/cart') {
      router.replace('/cart', { locale: nextLocale });
    } else {
      router.replace({ pathname: '/', query }, { locale: nextLocale });
    }
  }

  return (
    <nav
      aria-label={common('language')}
      className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-muted p-1 text-xs font-bold"
    >
      {(['es', 'en'] as const).map((item) => (
        <button
          aria-current={locale === item ? 'page' : undefined}
          className={cn(
            'inline-flex h-9 min-w-10 items-center justify-center rounded-md border-0 px-2 transition-[background-color,color,box-shadow] duration-[140ms]',
            locale === item
              ? 'bg-primary-700 text-white shadow-sm'
              : 'bg-transparent text-ink-muted hover:bg-white hover:text-primary-800',
          )}
          key={item}
          onClick={() => switchLocale(item)}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
