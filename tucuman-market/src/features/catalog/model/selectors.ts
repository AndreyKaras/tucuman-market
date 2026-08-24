import type { CatalogProduct, CatalogQuery } from './types';
import { moneyToMinorUnits } from '../../../lib/money';

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();

const PRICE_PATTERN = /^\d{1,12}$/;

export function normalizePriceFilter(value?: string) {
  const normalized = value?.trim();

  if (!normalized || !PRICE_PATTERN.test(normalized)) {
    return undefined;
  }

  return BigInt(normalized).toString();
}

export function getDiscountPercentage(product: CatalogProduct) {
  if (!product.compareAtPrice) return null;

  const price = moneyToMinorUnits(product.price);
  const compareAtPrice = moneyToMinorUnits(product.compareAtPrice);
  if (compareAtPrice <= price || compareAtPrice === BigInt(0)) return null;

  return Number(
    ((compareAtPrice - price) * BigInt(100) + compareAtPrice / BigInt(2)) / compareAtPrice,
  );
}

export function selectProducts(
  products: readonly CatalogProduct[],
  query: CatalogQuery,
): CatalogProduct[] {
  const search = normalize(query.query?.trim() ?? '');
  const minPrice = normalizePriceFilter(query.minPrice);
  const maxPrice = normalizePriceFilter(query.maxPrice);

  return products
    .filter((product) => {
      if (query.category && product.categoryKey !== query.category) {
        return false;
      }

      if (query.inStock && product.isOutOfStock) {
        return false;
      }

      if (query.onSale && !product.isOnSale) {
        return false;
      }

      const price = moneyToMinorUnits(product.price);
      if (minPrice && price < moneyToMinorUnits(minPrice)) return false;
      if (maxPrice && price > moneyToMinorUnits(maxPrice)) return false;

      if (!search) {
        return true;
      }

      return normalize(
        [product.name, product.brand, product.description, product.sku].filter(Boolean).join(' '),
      ).includes(search);
    })
    .sort((left, right) => {
      switch (query.sort) {
        case 'name':
          return left.name.localeCompare(right.name);
        case 'price-asc': {
          const leftPrice = moneyToMinorUnits(left.price);
          const rightPrice = moneyToMinorUnits(right.price);
          return leftPrice === rightPrice ? 0 : leftPrice < rightPrice ? -1 : 1;
        }
        case 'price-desc': {
          const leftPrice = moneyToMinorUnits(left.price);
          const rightPrice = moneyToMinorUnits(right.price);
          return leftPrice === rightPrice ? 0 : leftPrice > rightPrice ? -1 : 1;
        }
        default:
          return Number(right.isFeatured) - Number(left.isFeatured);
      }
    });
}
