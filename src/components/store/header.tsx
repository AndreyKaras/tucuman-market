'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Brand } from '@/components/store/brand';
import { HeaderSearch } from '@/components/store/header-search';
import { LocaleSwitcher } from '@/components/store/locale-switcher';
import { MobileNavigation } from '@/components/store/mobile-navigation';
import { useScrollToPageTopAfterNavigation } from '@/components/store/scroll-to-top-link';
import { CartIcon } from '@/components/ui/icons';
import { cn, containerClass } from '@/components/ui/styles';
import { useCart } from '@/features/cart/ui/cart-provider';
import { Link, usePathname } from '@/i18n/navigation';

const subscribeToClient = () => () => undefined;
const desktopNavLinkClass =
  'min-h-11 border-b-2 pt-[13px] text-sm font-semibold transition-[border-color,color] duration-[140ms] hover:border-primary-700 hover:text-primary-700';
const activeNavLinkClass = 'border-primary-700 text-primary-700';
const inactiveNavLinkClass = 'border-transparent text-ink';

export function Header() {
  const t = useTranslations('Navigation');
  const common = useTranslations('Common');
  const cartT = useTranslations('Cart');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cart = useCart();
  const scrollToTop = useScrollToPageTopAfterNavigation();
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const displayedCartCount = isClient ? cart.count : 0;
  const cartBadgeCount = displayedCartCount > 99 ? '99+' : displayedCartCount;
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
          <MobileNavigation
            isCatalogActive={isCatalogActive}
            isOffersActive={isOffersActive}
            pathname={pathname}
            scrollToTop={scrollToTop}
          />
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
              onClick={scrollToTop}
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
              onClick={scrollToTop}
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
              onClick={scrollToTop}
            >
              {t('offers')}
            </Link>
          </nav>

          <HeaderSearch onNavigate={scrollToTop} />
          <LocaleSwitcher />

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
    </>
  );
}
