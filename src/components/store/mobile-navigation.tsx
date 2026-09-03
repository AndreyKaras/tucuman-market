'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { CloseIcon, MenuIcon } from '@/components/ui/icons';
import { iconButtonClass } from '@/components/ui/styles';
import { Link } from '@/i18n/navigation';

type MobileNavigationProps = {
  isCatalogActive: boolean;
  isOffersActive: boolean;
  pathname: string;
  scrollToTop: () => void;
};

export function MobileNavigation({
  isCatalogActive,
  isOffersActive,
  pathname,
  scrollToTop,
}: MobileNavigationProps) {
  const t = useTranslations('Navigation');
  const common = useTranslations('Common');
  const [isOpen, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const desktopQuery = window.matchMedia('(min-width: 900px)');
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    desktopQuery.addEventListener('change', closeOnDesktop);
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
      desktopQuery.removeEventListener('change', closeOnDesktop);
      if (!desktopQuery.matches) previousFocus?.focus();
    };
  }, [isOpen]);

  function navigate() {
    setOpen(false);
    scrollToTop();
  }

  return (
    <>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={t('openMenu')}
        className={`${iconButtonClass} min-[900px]:hidden`}
        onClick={() => setOpen((open) => !open)}
        type="button"
      >
        <MenuIcon />
      </button>

      <div
        aria-hidden={!isOpen}
        aria-label={t('mobile')}
        aria-modal={isOpen ? 'true' : undefined}
        className="group invisible fixed inset-0 z-[80] block pointer-events-none opacity-0 transition-[opacity,visibility] duration-[140ms] ease-out data-[open=true]:visible data-[open=true]:pointer-events-auto data-[open=true]:opacity-100 min-[900px]:hidden"
        data-open={isOpen ? 'true' : 'false'}
        inert={!isOpen}
        role="dialog"
      >
        <button
          aria-label={common('close')}
          className="absolute inset-0 w-full border-0 bg-[rgba(23,32,26,0.48)] p-0 transition-opacity duration-[220ms] group-data-[open=false]:opacity-0"
          onClick={() => setOpen(false)}
          tabIndex={-1}
          type="button"
        />
        <nav
          aria-label={t('mobile')}
          className="absolute inset-y-0 left-0 flex h-dvh w-[360px] max-w-[calc(100%-48px)] -translate-x-full flex-col bg-surface shadow-[12px_0_32px_rgba(23,32,26,0.18)] transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-data-[open=true]:translate-x-0 max-[639px]:max-w-[calc(100%-32px)]"
          id="mobile-navigation"
          onTransitionEnd={() => {
            if (isOpen) closeButtonRef.current?.focus();
          }}
        >
          <div className="flex min-h-[76px] items-center justify-between border-b border-line px-6 py-3.5">
            <strong className="text-lg text-primary-900">{t('mobile')}</strong>
            <button
              aria-label={common('close')}
              className={iconButtonClass}
              onClick={() => setOpen(false)}
              ref={closeButtonRef}
              type="button"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex flex-col overflow-y-auto px-6 pt-4 pb-6 [&_a]:flex [&_a]:min-h-14 [&_a]:items-center [&_a]:border-b [&_a]:border-line [&_a]:font-semibold [&_a[aria-current=page]]:text-primary-700">
            <Link aria-current={pathname === '/' ? 'page' : undefined} href="/" onClick={navigate}>
              {t('home')}
            </Link>
            <Link
              aria-current={isCatalogActive ? 'page' : undefined}
              href="/products"
              onClick={navigate}
            >
              {t('catalog')}
            </Link>
            <Link
              aria-current={isOffersActive ? 'page' : undefined}
              href={{ pathname: '/products', query: { onSale: '1' } }}
              onClick={navigate}
            >
              {t('offers')}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
