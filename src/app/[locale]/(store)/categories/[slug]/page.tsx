import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { CatalogView } from '@/components/store/catalog-view';
import {
  getCategoryBySlug,
  getLocalizedCategorySlugs,
} from '@/features/catalog/data/catalog-repository';
import type { RawSearchParams } from '@/features/catalog/model/catalog-query';
import type { StoreLocale } from '@/features/catalog/model/types';

type CategoryPageProps = {
  params: Promise<{ locale: StoreLocale; slug: string }>;
  searchParams: Promise<RawSearchParams>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(locale, slug);
  if (!category) return {};

  const t = await getTranslations({ locale, namespace: 'Catalog' });
  const localizedSlugs = getLocalizedCategorySlugs(category.key);
  const description = t('categoryDescription', { category: category.name });

  return {
    title: category.name,
    description,
    alternates: {
      canonical: `/${locale}/${locale === 'es' ? 'categorias' : 'categories'}/${slug}`,
      languages: {
        en: `/en/categories/${localizedSlugs.en}`,
        es: `/es/categorias/${localizedSlugs.es}`,
      },
    },
    openGraph: { description, title: category.name, type: 'website' },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(locale, slug);
  if (!category) notFound();

  return <CatalogView category={category} searchParams={searchParams} />;
}
