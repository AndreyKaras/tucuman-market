import type { StoreLocale } from '@/features/catalog/model/types';
import { moneyToMinorUnits } from './money';

export function formatMoney(amount: bigint | string, locale: StoreLocale) {
  const minorUnits = typeof amount === 'bigint' ? amount : moneyToMinorUnits(amount);

  return new Intl.NumberFormat(locale === 'es' ? 'es-AR' : 'en-US', {
    currency: 'ARS',
    currencyDisplay: locale === 'es' ? 'narrowSymbol' : 'code',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: 'currency',
  }).format(Number(minorUnits) / 100);
}
