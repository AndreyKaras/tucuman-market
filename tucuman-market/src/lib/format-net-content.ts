import type { StoreLocale } from "@/features/catalog/model/types";

const unitLabels = {
  G: { en: "g", es: "g" },
  KG: { en: "kg", es: "kg" },
  L: { en: "L", es: "L" },
  ML: { en: "ml", es: "ml" },
} as const;

export function formatNetContent(
  content: { unit: string; value: number },
  locale: StoreLocale,
) {
  const value = new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    maximumFractionDigits: 3,
  }).format(content.value);

  if (content.unit === "UNIT") {
    const label = locale === "es"
      ? content.value === 1 ? "unidad" : "unidades"
      : content.value === 1 ? "unit" : "units";

    return `${value} ${label}`;
  }

  const label = unitLabels[content.unit as keyof typeof unitLabels]?.[locale]
    ?? content.unit.toLocaleLowerCase(locale);

  return `${value} ${label}`;
}
