export type StoreLocale = "es" | "en";

export type SaleUnit = "KG" | "UNIT";

export type ProductImage = {
  alt: string;
  position: number;
  src: string;
};

export type CatalogCategory = {
  key: string;
  name: string;
  slug: string;
};

export type CatalogProduct = {
  brand: string | null;
  categoryKey: string;
  compareAtPrice: string | null;
  currency: "ARS";
  description: string;
  image: ProductImage;
  isFeatured: boolean;
  isLowStock: boolean;
  isOnSale: boolean;
  isOutOfStock: boolean;
  name: string;
  netContent: { unit: string; value: number } | null;
  price: string;
  quantityStep: number;
  saleUnit: SaleUnit;
  sku: string;
  slug: string;
};

export type CatalogSnapshot = {
  categories: readonly CatalogCategory[];
  products: readonly CatalogProduct[];
};

export type CatalogQuery = {
  category?: string;
  inStock?: boolean;
  onSale?: boolean;
  query?: string;
  sort?: "featured" | "name" | "price-asc" | "price-desc";
};
