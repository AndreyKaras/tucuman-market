import categoriesSeed from "../../../../data/catalog/categories.json";
import productsSeed from "../../../../data/catalog/products.json";

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
  compareAtPrice: number | null;
  isActive: boolean;
  isFeatured: boolean;
  lowStockThreshold: number;
  netContent: { unit: string; value: number } | null;
  price: number;
  quantityStep: number;
  saleUnit: "KG" | "UNIT";
  sku: string;
  stockQuantity: number;
  translations: Record<StoreLocale, Translation>;
};

const categorySeeds = categoriesSeed.categories as CategorySeed[];
const productSeeds = productsSeed.products as ProductSeed[];

const getImage = (
  product: ProductSeed,
  index: number,
  alt: string,
): CatalogProduct["image"] => ({
  alt,
  position: index % 10,
  src:
    product.categoryKey === "fruit-vegetables"
      ? "/images/storefront/products-fresh.png"
      : "/images/storefront/products-pantry.png",
});

export function getCatalog(locale: StoreLocale): CatalogSnapshot {
  const categories = categorySeeds
    .filter((category) => category.isActive)
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map<CatalogCategory>((category) => ({
      key: category.key,
      name: category.translations[locale].name,
      slug: category.translations[locale].slug,
    }));

  const products = productSeeds
    .filter((product) => product.isActive)
    .map<CatalogProduct>((product, index) => {
      const translation = product.translations[locale];

      return {
        brand: product.brand,
        categoryKey: product.categoryKey,
        compareAtPrice:
          product.compareAtPrice === null
            ? null
            : String(product.compareAtPrice),
        currency: "ARS",
        description: translation.description ?? "",
        image: getImage(product, index, translation.name),
        isFeatured: product.isFeatured,
        isLowStock:
          product.stockQuantity > 0 &&
          product.stockQuantity <= product.lowStockThreshold,
        isOnSale:
          product.compareAtPrice !== null &&
          product.compareAtPrice > product.price,
        isOutOfStock: product.stockQuantity === 0,
        name: translation.name,
        netContent: product.netContent,
        price: String(product.price),
        quantityStep: product.quantityStep,
        saleUnit: product.saleUnit,
        sku: product.sku,
        slug: translation.slug,
      };
    });

  return { categories, products };
}
