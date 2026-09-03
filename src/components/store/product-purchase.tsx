'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { CartIcon, MinusIcon, PlusIcon } from '@/components/ui/icons';
import { toCartProductSnapshot } from '@/features/cart/model/cart';
import { useCart } from '@/features/cart/ui/cart-provider';
import type { CatalogProduct } from '@/features/catalog/model/types';
import {
  cn,
  primaryButtonClass,
  quantityButtonClass,
  quantityControlClass,
  quantityOutputClass,
} from '@/components/ui/styles';

export function ProductPurchase({ product }: { product: CatalogProduct }) {
  const t = useTranslations('Product');
  const cart = useCart();
  const [quantity, setQuantity] = useState(product.quantityStep);

  return (
    <div className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-3.5 max-[639px]:grid-cols-1 max-[639px]:items-stretch">
      <div>
        <span className="mb-[7px] block text-[13px] font-[650]" id="product-quantity-label">
          {t('quantity')}
        </span>
        <div
          className={cn(quantityControlClass, 'max-[639px]:w-max')}
          aria-labelledby="product-quantity-label"
        >
          <button
            aria-label={t('decreaseQuantity')}
            className={quantityButtonClass}
            disabled={quantity <= product.quantityStep}
            onClick={() =>
              setQuantity((value) =>
                Math.max(product.quantityStep, Number((value - product.quantityStep).toFixed(3))),
              )
            }
            type="button"
          >
            <MinusIcon />
          </button>
          <output aria-live="polite" className={quantityOutputClass} key={quantity}>
            {quantity}
          </output>
          <button
            aria-label={t('increaseQuantity')}
            className={quantityButtonClass}
            disabled={quantity >= product.stockQuantity}
            onClick={() =>
              setQuantity((value) =>
                Math.min(product.stockQuantity, Number((value + product.quantityStep).toFixed(3))),
              )
            }
            type="button"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <button
        className={cn(primaryButtonClass, 'w-full')}
        disabled={product.isOutOfStock}
        onClick={() => cart.addItem(toCartProductSnapshot(product), quantity)}
        type="button"
      >
        <CartIcon />
        {product.isOutOfStock ? t('outOfStock') : t('addSelectedToCart', { count: quantity })}
      </button>
    </div>
  );
}
