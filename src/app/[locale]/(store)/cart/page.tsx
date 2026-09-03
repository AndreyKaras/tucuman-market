import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CartPage } from '@/components/store/cart-page';
import type { StoreLocale } from '@/features/catalog/model/types';

type CartRouteProps = {
  params: Promise<{ locale: StoreLocale }>;
};

export async function generateMetadata({ params }: CartRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Cart' });

  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: {
      canonical: locale === 'es' ? '/es/carrito' : '/en/cart',
      languages: {
        en: '/en/cart',
        es: '/es/carrito',
      },
    },
  };
}

export default function CartRoute() {
  return <CartPage />;
}
