import type { CatalogProduct } from '@/features/catalog/model/types';

import { ProductCard } from './product-card';

type CatalogProductGridProps = {
  products: CatalogProduct[];
};

export function CatalogProductGrid({ products }: CatalogProductGridProps) {
  return (
    <div
      className="grid grid-cols-4 gap-4 max-[1279px]:grid-cols-3 max-[639px]:grid-cols-2 max-[639px]:gap-2"
      id="catalog-product-grid"
    >
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  );
}
