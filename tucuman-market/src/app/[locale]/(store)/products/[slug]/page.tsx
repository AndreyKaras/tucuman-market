import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ProductGallery } from '@/components/store/product-gallery';
import { ProductPurchase } from '@/components/store/product-purchase';
import {
  getCatalog,
  getLocalizedProductSlugs,
  getProductBySlug,
} from '@/features/catalog/data/catalog-repository';
import { getDiscountPercentage } from '@/features/catalog/model/selectors';
import type { StoreLocale } from '@/features/catalog/model/types';
import { Link } from '@/i18n/navigation';
import { formatMoney } from '@/lib/format-money';
import { formatNetContent } from '@/lib/format-net-content';
import {
  cn,
  containerClass,
  outBadgeClass,
  saleBadgeClass,
  warningBadgeClass,
} from '@/components/ui/styles';

type ProductPageProps = {
  params: Promise<{ locale: StoreLocale; slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(locale, slug);
  if (!product) return {};

  const localizedSlugs = getLocalizedProductSlugs(product.sku);
  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/${locale}/${locale === 'es' ? 'productos' : 'products'}/${slug}`,
      languages: {
        en: `/en/products/${localizedSlugs.en}`,
        es: `/es/productos/${localizedSlugs.es}`,
      },
    },
    openGraph: {
      description: product.description,
      images: [{ alt: product.image.alt, url: product.image.src }],
      title: product.name,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  const product = getProductBySlug(locale, slug);
  if (!product) notFound();

  const [t, catalogT] = await Promise.all([
    getTranslations({ locale, namespace: 'Product' }),
    getTranslations({ locale, namespace: 'Catalog' }),
  ]);
  const category = getCatalog(locale).categories.find((item) => item.key === product.categoryKey);
  const discount = getDiscountPercentage(product);
  const unit = product.saleUnit === 'KG' ? t('perKilogram') : t('each');
  const netContent = product.netContent ? formatNetContent(product.netContent, locale) : unit;

  return (
    <main
      className={cn(containerClass, 'pt-7 pb-20 max-[639px]:pt-5 max-[639px]:pb-14')}
      id="main-content"
    >
      <p className="m-0 flex items-center gap-2 text-[13px] text-ink-muted [&_a]:inline-flex [&_a]:min-h-11 [&_a]:min-w-11 [&_a]:items-center [&_a:hover]:text-primary-700 [&_a:hover]:underline">
        <Link href="/">{catalogT('homeBreadcrumb')}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products">{catalogT('title')}</Link>
        {category ? (
          <>
            <span aria-hidden="true">/</span>
            <Link href={{ pathname: '/categories/[slug]', params: { slug: category.slug } }}>
              {category.name}
            </Link>
          </>
        ) : null}
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </p>

      <article className="mt-[26px] grid grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] gap-[clamp(32px,5vw,72px)] max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[639px]:mt-[18px]">
        <ProductGallery images={product.images} />
        <section className="self-start">
          <div className="flex min-h-[25px] flex-wrap gap-2">
            {discount ? (
              <span className={saleBadgeClass}>{t('discount', { discount })}</span>
            ) : null}
            {product.isLowStock ? <span className={warningBadgeClass}>{t('lowStock')}</span> : null}
            {product.isOutOfStock ? <span className={outBadgeClass}>{t('outOfStock')}</span> : null}
          </div>
          <h1 className="mt-3.5 mb-2.5 text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.035em] max-[639px]:text-[32px]">
            {product.name}
          </h1>
          <p className="m-0 flex flex-wrap gap-x-[18px] gap-y-2 text-[13px] text-ink-muted">
            {product.brand ? (
              <span>
                {t('brand')}: <strong>{product.brand}</strong>
              </span>
            ) : null}
            <span>
              {t('sku')}: <strong>{product.sku}</strong>
            </span>
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-2.5">
            <strong className="text-[34px] text-primary-700">
              {formatMoney(product.price, locale)}
            </strong>
            {product.compareAtPrice ? (
              <s className="text-ink-muted">{formatMoney(product.compareAtPrice, locale)}</s>
            ) : null}
            <span className="text-ink-muted">{unit}</span>
          </div>
          <p
            className={cn(
              'mt-2.5 mb-0 text-sm font-bold text-primary-700',
              product.isOutOfStock && 'text-danger',
            )}
          >
            {product.isOutOfStock
              ? t('outOfStock')
              : product.isLowStock
                ? t('lowStockCount', { count: product.stockQuantity })
                : t('inStock')}
          </p>
          <dl className="my-6 grid grid-cols-2 gap-3.5 border-y border-line py-[18px] [&_div]:min-w-0 [&_dt]:text-xs [&_dt]:text-ink-muted [&_dd]:mt-1.5 [&_dd]:mb-0 [&_dd]:text-sm [&_dd]:font-[650]">
            <div>
              <dt>{t('saleUnit')}</dt>
              <dd>{unit}</dd>
            </div>
            <div>
              <dt>{t('netContent')}</dt>
              <dd>{netContent}</dd>
            </div>
          </dl>
          <p className="m-0 leading-[1.65] text-ink-muted">{product.description}</p>
          <ProductPurchase product={product} />
        </section>
      </article>
    </main>
  );
}
