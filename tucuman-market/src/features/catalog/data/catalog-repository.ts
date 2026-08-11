import categoriesSeed from "../../../../data/catalog/categories.json";
import productsSeed from "../../../../data/catalog/products.json";
import { moneyToMinorUnits } from "../../../lib/money";

import type {
  CatalogCategory,
  CatalogProduct,
  CatalogSnapshot,
  StoreLocale,
} from "../model/types";

type Translation = {
  description?: string;
  name: string;
  slug: string;
};

type CategorySeed = {
  displayOrder: number;
  isActive: boolean;
  key: string;
  translations: Record<StoreLocale, Translation>;
};

type ProductSeed = {
  brand: string | null;
  categoryKey: string;
  compareAtPrice: string | null;
  images: Array<{
    height: number;
    sortOrder: number;
    src: string;
    translations: Record<StoreLocale, { alt: string }>;
    width: number;
  }>;
  isActive: boolean;
  isFeatured: boolean;
  lowStockThreshold: number;
  netContent: { unit: string; value: number } | null;
  price: string;
  quantityStep: number;
  saleUnit: "KG" | "UNIT";
  sku: string;
  stockQuantity: number;
  translations: Record<StoreLocale, Translation>;
};

const categorySeeds = categoriesSeed.categories as CategorySeed[];
const productSeeds = productsSeed.products as ProductSeed[];

const getPlaceholderImage = (
  product: ProductSeed,
  index: number,
  alt: string,
): CatalogProduct["image"] => ({
  alt,
  height: 240,
  sortOrder: 0,
  spritePosition: index % 10,
  src:
    product.categoryKey === "fruit-vegetables"
      ? "/images/storefront/products-fresh.png"
      : "/images/storefront/products-pantry.png",
  width: 320,
});

const getImages = (
  product: ProductSeed,
  index: number,
  locale: StoreLocale,
  fallbackAlt: string,
): CatalogProduct["images"] => {
  const images = product.images
    .map((image) => ({
      alt: image.translations[locale].alt,
      height: image.height,
      sortOrder: image.sortOrder,
      src: image.src,
      width: image.width,
    }))
    .sort((left, right) => left.sortOrder - right.sortOrder);

  return images.length > 0
    ? images
    : [getPlaceholderImage(product, index, fallbackAlt)];
};

const activeCategoryKeys = new Set(
  categorySeeds
    .filter((category) => category.isActive)
    .map((category) => category.key),
);

function createCatalog(locale: StoreLocale): CatalogSnapshot {
  const categories = categorySeeds
    .filter((category) => category.isActive)
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map<CatalogCategory>((category) => ({
      key: category.key,
      name: category.translations[locale].name,
      slug: category.translations[locale].slug,
    }));

  const products = productSeeds
    .filter(
      (product) => product.isActive && activeCategoryKeys.has(product.categoryKey),
    )
    .map<CatalogProduct>((product, index) => {
      const translation = product.translations[locale];
      const images = getImages(product, index, locale, translation.name);

      return {
        brand: product.brand,
        categoryKey: product.categoryKey,
        compareAtPrice: product.compareAtPrice,
        currency: "ARS",
        description: translation.description ?? "",
        image: images[0],
        images,
        isFeatured: product.isFeatured,
        isLowStock:
          product.stockQuantity > 0 &&
          product.stockQuantity <= product.lowStockThreshold,
        isOnSale:
          product.compareAtPrice !== null &&
          moneyToMinorUnits(product.compareAtPrice) >
            moneyToMinorUnits(product.price),
        isOutOfStock: product.stockQuantity <= 0,
        name: translation.name,
        netContent: product.netContent,
        price: product.price,
        quantityStep: product.quantityStep,
        saleUnit: product.saleUnit,
        sku: product.sku,
        slug: translation.slug,
        stockQuantity: product.stockQuantity,
      };
    });

  return { categories, products };
}

const catalogs: Record<StoreLocale, CatalogSnapshot> = {
  en: createCatalog("en"),
  es: createCatalog("es"),
};

const productsBySku: Record<StoreLocale, Map<string, CatalogProduct>> = {
  en: new Map(catalogs.en.products.map((product) => [product.sku, product])),
  es: new Map(catalogs.es.products.map((product) => [product.sku, product])),
};

const productsBySlug: Record<StoreLocale, Map<string, CatalogProduct>> = {
  en: new Map(catalogs.en.products.map((product) => [product.slug, product])),
  es: new Map(catalogs.es.products.map((product) => [product.slug, product])),
};

const categoriesBySlug: Record<StoreLocale, Map<string, CatalogCategory>> = {
  en: new Map(catalogs.en.categories.map((category) => [category.slug, category])),
  es: new Map(catalogs.es.categories.map((category) => [category.slug, category])),
};

export function getCatalog(locale: StoreLocale): CatalogSnapshot {
  return catalogs[locale];
}

export function getProductBySlug(
  locale: StoreLocale,
  slug: string,
): CatalogProduct | undefined {
  return productsBySlug[locale].get(slug);
}

export function getProductBySku(
  locale: StoreLocale,
  sku: string,
): CatalogProduct | undefined {
  return productsBySku[locale].get(sku);
}

export function getCategoryBySlug(
  locale: StoreLocale,
  slug: string,
): CatalogCategory | undefined {
  return categoriesBySlug[locale].get(slug);
}

export function getLocalizedProductSlugs(
  sku: string,
): { en: string | undefined; es: string | undefined } {
  return {
    en: getProductBySku("en", sku)?.slug,
    es: getProductBySku("es", sku)?.slug,
  };
}

export function getLocalizedCategorySlugs(
  key: string,
): { en: string | undefined; es: string | undefined } {
  return {
    en: getCatalog("en").categories.find((category) => category.key === key)?.slug,
    es: getCatalog("es").categories.find((category) => category.key === key)?.slug,
  };
}
