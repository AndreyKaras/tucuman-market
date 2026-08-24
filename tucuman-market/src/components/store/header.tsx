'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { CartIcon, CloseIcon, MenuIcon, SearchIcon } from '@/components/ui/icons';
import { useCart } from '@/features/cart/ui/cart-provider';
import {
  addRecentSearch,
  getRecentSearchesStorageKey,
  parseRecentSearches,
  serializeRecentSearches,
} from '@/features/catalog/model/recent-searches';
import type { StoreLocale } from '@/features/catalog/model/types';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn, containerClass, iconButtonClass } from '@/components/ui/styles';

import { Brand } from './brand';
import { useScrollToPageTopAfterNavigation } from './scroll-to-top-link';

const subscribeToClient = () => () => undefined;

const desktopNavLinkClass =
  'min-h-11 border-b-2 pt-[13px] text-sm font-semibold transition-[border-color,color] duration-[140ms] hover:border-primary-700 hover:text-primary-700';
const activeNavLinkClass = 'border-primary-700 text-primary-700';
const inactiveNavLinkClass = 'border-transparent text-ink';

export function Header() {
  const t = useTranslations('Navigation');
  const catalog = useTranslations('Catalog');
  const common = useTranslations('Common');
  const cartT = useTranslations('Cart');
  const locale = useLocale() as StoreLocale;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cart = useCart();
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const displayedCartCount = isClient ? cart.count : 0;
  const cartBadgeCount = displayedCartCount > 99 ? '99+' : displayedCartCount;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return parseRecentSearches(window.localStorage.getItem(getRecentSearchesStorageKey(locale)));
    } catch {
      return [];
    }
  });
  const menuCloseButtonRef = useRef<HTMLButtonElement>(null);
  const scrollToTop = useScrollToPageTopAfterNavigation();

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const desktopQuery = window.matchMedia('(min-width: 900px)');

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    desktopQuery.addEventListener('change', closeOnDesktop);
    menuCloseButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
      desktopQuery.removeEventListener('change', closeOnDesktop);
      if (!desktopQuery.matches) previousFocus?.focus();
    };
  }, [isMenuOpen]);

  const navigateFromHeader = () => {
    setMenuOpen(false);
    scrollToTop();
  };

  const switchLocale = async (nextLocale: StoreLocale) => {
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
  };

  const runSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get('q') ?? '').trim();
    if (value) {
      const next = addRecentSearch(recentSearches, value, locale);
      setRecentSearches(next);
      try {
        window.localStorage.setItem(
          getRecentSearchesStorageKey(locale),
          serializeRecentSearches(next),
        );
      } catch {
        // Search remains available when storage is unavailable.
      }
    }
    router.push({
      pathname: '/products',
      query: value ? { q: value } : {},
    });
    navigateFromHeader();
    setSearchFocused(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      window.localStorage.removeItem(getRecentSearchesStorageKey(locale));
    } catch {
      // Local clearing still succeeds when storage is unavailable.
    }
  };

  const isOffersActive = pathname === '/products' && searchParams.get('onSale') === '1';
  const isCatalogActive =
    (pathname.startsWith('/products') || pathname.startsWith('/categories')) && !isOffersActive;

  return (
    <>
      <div className="border-b border-primary-100 bg-primary-50 text-[13px] text-primary-900">
        <div
          className={cn(
            containerClass,
            'flex h-9 items-center justify-center max-[639px]:justify-start max-[639px]:overflow-hidden max-[639px]:text-xs max-[639px]:whitespace-nowrap',
          )}
        >
          <span>{common('serviceArea')}</span>
          <span className="mx-4 text-line-strong max-[639px]:hidden" aria-hidden="true">
            •
          </span>
          <span className="max-[639px]:hidden">{common('deliveryPickup')}</span>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-white/98">
        <div
          className={cn(
            containerClass,
            'grid min-h-[84px] grid-cols-[auto_auto_minmax(280px,1fr)_auto_auto] items-center gap-6 max-[1120px]:grid-cols-[auto_auto_minmax(220px,1fr)_auto_auto] max-[1120px]:gap-4 max-[900px]:grid-cols-[44px_minmax(0,1fr)_auto_auto] max-[900px]:gap-3 max-[900px]:py-3 max-[639px]:grid-cols-[44px_minmax(0,1fr)_auto_auto] max-[380px]:gap-[7px]',
          )}
        >
          <button
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={t('openMenu')}
            className={cn(iconButtonClass, 'min-[900px]:hidden')}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <MenuIcon />
          </button>
          <Brand />

          <nav
            aria-label={t('primary')}
            className="flex items-center gap-5 max-[1120px]:gap-3 max-[900px]:hidden"
          >
            <Link
              aria-current={pathname === '/' ? 'page' : undefined}
              className={cn(
                desktopNavLinkClass,
                pathname === '/' ? activeNavLinkClass : inactiveNavLinkClass,
              )}
              href="/"
              onClick={navigateFromHeader}
            >
              {t('home')}
            </Link>
            <Link
              aria-current={isCatalogActive ? 'page' : undefined}
              className={cn(
                desktopNavLinkClass,
                isCatalogActive ? activeNavLinkClass : inactiveNavLinkClass,
              )}
              href="/products"
              onClick={navigateFromHeader}
            >
              {t('catalog')}
            </Link>
            <Link
              aria-current={isOffersActive ? 'page' : undefined}
              className={cn(
                desktopNavLinkClass,
                isOffersActive ? activeNavLinkClass : inactiveNavLinkClass,
              )}
              href={{ pathname: '/products', query: { onSale: '1' } }}
              onClick={navigateFromHeader}
            >
              {t('offers')}
            </Link>
          </nav>

          <form
            className="relative z-35 min-w-0 max-[900px]:col-span-full max-[900px]:row-start-2"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setSearchFocused(false);
            }}
            onFocus={() => setSearchFocused(true)}
            onSubmit={runSearch}
            role="search"
          >
            <label className="sr-only" htmlFor="site-search">
              {catalog('searchLabel')}
            </label>
            <div
              className="grid h-12 grid-cols-[auto_minmax(0,1fr)_auto] items-center overflow-hidden rounded-lg border border-line transition-[border-color,box-shadow] duration-[140ms]"
              style={
                isSearchFocused
                  ? {
                      borderColor: 'var(--primary-700)',
                      boxShadow: '0 0 0 2px var(--primary-100)',
                    }
                  : undefined
              }
            >
              <SearchIcon className="ml-3.5 size-5 text-ink-muted" />
              <input
                className="h-[46px] min-w-0 border-0 px-3 outline-0"
                id="site-search"
                defaultValue={searchParams.get('q') ?? ''}
                key={searchParams.get('q') ?? ''}
                name="q"
                placeholder={catalog('searchPlaceholder')}
                type="search"
              />
              <button
                className="self-stretch border-0 bg-primary-700 px-4 text-sm font-[650] text-white transition-colors duration-[140ms] hover:bg-primary-800 max-[639px]:px-[13px] max-[380px]:w-12 max-[380px]:px-0"
                type="submit"
              >
                <span className="max-[380px]:sr-only">{catalog('searchAction')}</span>
                <span className="hidden text-lg max-[380px]:inline" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
            {isSearchFocused && recentSearches.length ? (
              <div className="absolute top-full right-0 left-0 mt-1.5 overflow-hidden rounded-[10px] border border-line bg-surface shadow-[0_12px_28px_rgba(23,32,26,0.14)]">
                <div className="flex items-center justify-between px-3.5 pt-2.5 pb-1.5">
                  <strong className="text-xs text-ink-muted uppercase">
                    {catalog('recentSearches')}
                  </strong>
                  <button
                    className="min-h-9 bg-transparent px-1.5 text-xs text-primary-700"
                    onClick={clearRecentSearches}
                    type="button"
                  >
                    {catalog('clearRecentSearches')}
                  </button>
                </div>
                <ul className="m-0 list-none px-2 pb-2">
                  {recentSearches.map((search) => (
                    <li key={search}>
                      <button
                        className="flex min-h-11 w-full items-center gap-2.5 rounded-[7px] bg-transparent px-2.5 text-left text-ink transition-colors hover:bg-primary-50 hover:text-primary-800 [&_svg]:size-[17px] [&_svg]:text-ink-muted"
                        onClick={() => {
                          router.push({ pathname: '/products', query: { q: search } });
                          setSearchFocused(false);
                        }}
                        type="button"
                      >
                        <SearchIcon />
                        {search}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </form>

          <nav
            aria-label={common('language')}
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-muted p-1 text-xs font-bold"
          >
            <button
              aria-current={locale === 'es' ? 'page' : undefined}
              className={cn(
                'inline-flex h-9 min-w-10 items-center justify-center rounded-md border-0 px-2 transition-[background-color,color,box-shadow] duration-[140ms]',
                locale === 'es'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'bg-transparent text-ink-muted hover:bg-white hover:text-primary-800',
              )}
              onClick={() => switchLocale('es')}
              type="button"
            >
              ES
            </button>
            <button
              aria-current={locale === 'en' ? 'page' : undefined}
              className={cn(
                'inline-flex h-9 min-w-10 items-center justify-center rounded-md border-0 px-2 transition-[background-color,color,box-shadow] duration-[140ms]',
                locale === 'en'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'bg-transparent text-ink-muted hover:bg-white hover:text-primary-800',
              )}
              onClick={() => switchLocale('en')}
              type="button"
            >
              EN
            </button>
          </nav>

          <button
            aria-label={`${cartT('title')}: ${displayedCartCount}`}
            className="group flex min-h-11 items-center gap-[7px] rounded-lg border-0 bg-white px-2 text-sm font-[650] transition-[background-color,color,transform] duration-[140ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-primary-50 hover:text-primary-800 active:scale-[0.97] max-[639px]:[&_span]:hidden"
            onClick={cart.openCart}
            type="button"
          >
            <CartIcon />
            <span>{t('cart')}</span>
            <strong className="inline-flex h-6 w-7 flex-none items-center justify-center rounded-full bg-primary-700 text-[11px] text-white tabular-nums">
              {cartBadgeCount}
            </strong>
          </button>
        </div>
      </header>

      <div
        aria-hidden={!isMenuOpen}
        aria-label={t('mobile')}
        aria-modal={isMenuOpen ? 'true' : undefined}
        className="group invisible fixed inset-0 z-[80] block pointer-events-none opacity-0 transition-[opacity,visibility] duration-[140ms] ease-out data-[open=true]:visible data-[open=true]:pointer-events-auto data-[open=true]:opacity-100 min-[900px]:hidden"
        data-open={isMenuOpen ? 'true' : 'false'}
        inert={!isMenuOpen}
        role="dialog"
      >
        <button
          aria-label={common('close')}
          className="absolute inset-0 w-full border-0 bg-[rgba(23,32,26,0.48)] p-0 transition-opacity duration-[220ms] group-data-[open=false]:opacity-0"
          onClick={() => setMenuOpen(false)}
          tabIndex={-1}
          type="button"
        />
        <nav
          aria-label={t('mobile')}
          className="absolute inset-y-0 left-0 flex h-dvh w-[360px] max-w-[calc(100%-48px)] -translate-x-full flex-col bg-surface shadow-[12px_0_32px_rgba(23,32,26,0.18)] transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-data-[open=true]:translate-x-0 max-[639px]:max-w-[calc(100%-32px)]"
          id="mobile-navigation"
        >
          <div className="flex min-h-[76px] items-center justify-between border-b border-line px-6 py-3.5">
            <strong className="text-lg text-primary-900">{t('mobile')}</strong>
            <button
              aria-label={common('close')}
              className={iconButtonClass}
              onClick={() => setMenuOpen(false)}
              ref={menuCloseButtonRef}
              type="button"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex flex-col overflow-y-auto px-6 pt-4 pb-6 [&_a]:flex [&_a]:min-h-14 [&_a]:items-center [&_a]:border-b [&_a]:border-line [&_a]:font-semibold [&_a[aria-current=page]]:text-primary-700">
            <Link
              aria-current={pathname === '/' ? 'page' : undefined}
              href="/"
              onClick={navigateFromHeader}
            >
              {t('home')}
            </Link>
            <Link
              aria-current={isCatalogActive ? 'page' : undefined}
              href="/products"
              onClick={navigateFromHeader}
            >
              {t('catalog')}
            </Link>
            <Link
              aria-current={isOffersActive ? 'page' : undefined}
              href={{ pathname: '/products', query: { onSale: '1' } }}
              onClick={navigateFromHeader}
            >
              {t('offers')}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
