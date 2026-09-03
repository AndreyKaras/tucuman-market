import { describe, expect, it } from 'vitest';

import { getCatalog } from '../data/catalog-repository';
import { getDiscountPercentage, normalizePriceFilter, selectProducts } from './selectors';

describe('catalog selectors', () => {
  it('adapts localized catalog data without mixing locales', () => {
    const spanish = getCatalog('es');
    const english = getCatalog('en');

    expect(spanish.products).toHaveLength(80);
    expect(english.products).toHaveLength(80);
    expect(spanish.products.find((product) => product.sku === 'FV-002')?.name).toBe(
      'Manzana roja por kg',
    );
    expect(english.products.find((product) => product.sku === 'FV-002')?.name).toBe(
      'Red apples per kg',
    );
  });

  it('searches accents and category filters', () => {
    const { products } = getCatalog('es');

    expect(selectProducts(products, { query: 'pure' }).map((item) => item.sku)).toContain(
      'ALM-007',
    );
    expect(
      selectProducts(products, { category: 'pantry', query: 'arroz' }).every(
        (item) => item.categoryKey === 'pantry',
      ),
    ).toBe(true);
  });

  it('uses exact integer values when sorting prices', () => {
    const { products } = getCatalog('en');
    const result = selectProducts(products, { sort: 'price-asc' });

    expect(result[0]?.sku).toBe('ALM-003');
    expect(result.at(-1)?.sku).toBe('FRE-004');
  });

  it('filters an exact price range and rejects malformed values', () => {
    const { products } = getCatalog('en');
    const result = selectProducts(products, { minPrice: '1500', maxPrice: '2000' });

    expect(result.map((item) => item.sku)).toContain('ALM-002');
    expect(result.every((item) => Number(item.price) >= 1500 && Number(item.price) <= 2000)).toBe(
      true,
    );
    expect(normalizePriceFilter('12.5')).toBeUndefined();
    expect(normalizePriceFilter('-1')).toBeUndefined();
    expect(normalizePriceFilter('1'.repeat(13))).toBeUndefined();
  });

  it('calculates the sale discount without floating-point money math', () => {
    const product = getCatalog('es').products.find((item) => item.sku === 'FV-002');

    expect(product && getDiscountPercentage(product)).toBe(14);
  });
});
