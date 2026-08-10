import type { StoreLocale } from "@/features/catalog/model/types";

export function formatMoney(amount: bigint | string, locale: StoreLocale) {
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    currency: "ARS",
    currencyDisplay: locale === "es" ? "narrowSymbol" : "code",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(typeof amount === "bigint" ? amount : BigInt(amount));
}
