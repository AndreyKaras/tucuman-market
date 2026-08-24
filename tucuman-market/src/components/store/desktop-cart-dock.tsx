'use client';

import { useTranslations } from 'next-intl';

import { CartIcon } from '@/components/ui/icons';
import { useCart } from '@/features/cart/ui/cart-provider';

export function DesktopCartDock() {
  const t = useTranslations('Cart');
  const cart = useCart();
  const count = cart.state.hasHydrated ? cart.count : 0;
  const badgeCount = count > 99 ? '99+' : count;

  return (
    <button
      aria-label={`${t('title')}: ${count}`}
      className="fixed top-1/2 right-[max(0.5rem,calc((100vw-1280px)/2-4.5rem))] z-20 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-white text-primary-800 shadow-[0_8px_24px_rgba(23,32,26,0.14)] transition-[background-color,border-color,color,box-shadow,transform] duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] min-[1440px]:inline-flex hover:border-primary-700 hover:bg-primary-50 hover:shadow-[0_10px_28px_rgba(23,32,26,0.18)] active:scale-[0.96] motion-reduce:transition-none"
      onClick={cart.openCart}
      type="button"
    >
      <CartIcon className="size-6" />
      <span className="absolute -top-1 -right-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary-700 px-1.5 text-[11px] leading-none font-bold text-white tabular-nums">
        {badgeCount}
      </span>
    </button>
  );
}
