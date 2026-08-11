export type StoreLocale = "es" | "en";

export type SaleUnit = "KG" | "UNIT";

export type CatalogImage = {
  alt: string;
  height: number;
  spritePosition?: number;
  src: string;
  width: number;
};

export type ProductImage = CatalogImage & {
  sortOrder: number;
};

export type CatalogCategory = {
  image: CatalogImage;
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
  images: readonly ProductImage[];
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
  stockQuantity: number;
};

export type CatalogSnapshot = {
  categories: readonly CatalogCategory[];
  products: readonly CatalogProduct[];
};

export type CatalogQuery = {
  category?: string;
  inStock?: boolean;
  maxPrice?: string;
  minPrice?: string;
  onSale?: boolean;
  page?: number;
  query?: string;
  sort?: "featured" | "name" | "price-asc" | "price-desc";
};
