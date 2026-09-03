'use client';

import { useLocale, useTranslations } from 'next-intl';

import { CartIcon, MinusIcon, PlusIcon } from '@/components/ui/icons';
import type { CatalogProduct, StoreLocale } from '@/features/catalog/model/types';
import { useCart } from '@/features/cart/ui/cart-provider';
import { toCartProductSnapshot } from '@/features/cart/model/cart';
import { formatMoney } from '@/lib/format-money';
import { formatNetContent } from '@/lib/format-net-content';
import { Link } from '@/i18n/navigation';
import {
  cn,
  iconButtonClass,
  outBadgeClass,
  quantityButtonClass,
  quantityControlClass,
  quantityOutputClass,
  saleBadgeClass,
  warningBadgeClass,
} from '@/components/ui/styles';

import { ProductImage } from './product-image';

function normalizeProductText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, ' ')
    .trim();
}

function productNameIncludesDetail(product: CatalogProduct, detail: string) {
  const normalizedName = normalizeProductText(product.name);
  const normalizedDetail = normalizeProductText(detail);

  if (normalizedName.includes(normalizedDetail)) {
    return true;
  }

  if (product.netContent?.unit === 'UNIT') {
    return normalizedName.includes(String(product.netContent.value));
  }

  return (
    product.netContent === null &&
    product.saleUnit === 'KG' &&
    /(?:^|\s)(?:kg|kilo|kilogramo?s?|kilograms?)(?:$|\s)/u.test(normalizedName)
  );
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const locale = useLocale() as StoreLocale;
  const t = useTranslations('Product');
  const cartT = useTranslations('Cart');
  const cart = useCart();
  const cartItem = cart.state.items.find((item) => item.sku === product.sku);
  const unit = product.saleUnit === 'KG' ? t('perKilogram') : t('each');
  const packageDetail = product.netContent ? formatNetContent(product.netContent, locale) : unit;
  const details = [
    product.brand,
    productNameIncludesDetail(product, packageDetail) ? null : packageDetail,
  ]
    .filter(Boolean)
    .join(' · ');
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,box-shadow] duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-line-strong hover:shadow-[0_6px_18px_rgba(10,61,27,0.08)] motion-reduce:transition-none">
      <Link
        className="flex min-w-0 flex-1 flex-col focus-visible:outline-offset-[-3px]"
        href={{ pathname: '/products/[slug]', params: { slug: product.slug } }}
      >
        <div className="relative mt-3 mr-3 ml-3 aspect-[4/3] overflow-hidden bg-surface-muted max-[639px]:mt-2 max-[639px]:mr-2 max-[639px]:ml-2">
          <ProductImage decorative image={product.image} />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            {product.isOnSale ? <span className={saleBadgeClass}>{t('onSale')}</span> : null}
            {product.isLowStock ? <span className={warningBadgeClass}>{t('lowStock')}</span> : null}
            {product.isOutOfStock ? <span className={outBadgeClass}>{t('outOfStock')}</span> : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 max-[639px]:p-2.5">
          <h3 className="m-0 min-h-[43px] text-base leading-[1.35] font-[650] max-[639px]:min-h-[38px] max-[639px]:text-sm">
            {product.name}
          </h3>
          {details ? (
            <p className="mt-1.5 mb-0 text-[13px] text-ink-muted max-[639px]:text-xs">{details}</p>
          ) : null}
        </div>
      </Link>
      <div className="mt-auto grid flex-none grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 pb-4 max-[639px]:px-2 max-[639px]:pb-2">
        <div className="flex min-w-0 flex-col items-start">
          <strong className="text-xl tracking-[-0.015em] text-primary-700 max-[639px]:text-[17px]">
            {formatMoney(product.price, locale)}
          </strong>
          {product.compareAtPrice ? (
            <s className="mt-0.5 text-[13px] leading-4 text-ink-subtle max-[639px]:text-xs">
              {formatMoney(product.compareAtPrice, locale)}
            </s>
          ) : null}
        </div>
        {cart.state.hasHydrated && cartItem ? (
          <div
            aria-label={`${product.name}: ${t('quantity')}`}
            className={cn(
              quantityControlClass,
              'h-11 grid-cols-[44px_minmax(24px,1fr)_44px] [&_button]:h-full max-[639px]:col-span-2 max-[639px]:mt-1 max-[639px]:w-full',
            )}
            role="group"
          >
            <button
              aria-label={cartT('decrease', { product: product.name })}
              className={quantityButtonClass}
              onClick={() => cart.decrement(product.sku)}
              type="button"
            >
              <MinusIcon />
            </button>
            <output
              className={cn(quantityOutputClass, 'min-w-6 font-[650] text-ink')}
              key={cartItem.quantity}
            >
              {cartItem.quantity}
            </output>
            <button
              aria-label={cartT('increase', { product: product.name })}
              className={quantityButtonClass}
              disabled={cartItem.quantity >= product.stockQuantity}
              onClick={() => cart.increment(product.sku)}
              type="button"
            >
              <PlusIcon />
            </button>
          </div>
        ) : (
          <button
            aria-label={product.isOutOfStock ? t('outOfStock') : t('addToCart')}
            className={cn(
              iconButtonClass,
              'shrink-0 !border-primary-700 !bg-primary-700 !text-white hover:!border-primary-800 hover:!bg-primary-800 hover:!text-white disabled:cursor-not-allowed disabled:!border-line disabled:!bg-surface-strong disabled:!text-ink-muted',
            )}
            disabled={product.isOutOfStock}
            onClick={() => cart.addItem(toCartProductSnapshot(product))}
            title={product.isOutOfStock ? t('outOfStock') : t('addToCart')}
            type="button"
          >
            <CartIcon className="size-5 shrink-0" />
          </button>
        )}
      </div>
    </article>
  );
}
