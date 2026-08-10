import { describe, expect, it } from "vitest";

import { getCatalog } from "../data/catalog-repository";
import { selectProducts } from "./selectors";

describe("catalog selectors", () => {
  it("adapts localized catalog data without mixing locales", () => {
    const spanish = getCatalog("es");
    const english = getCatalog("en");

    expect(spanish.products).toHaveLength(20);
    expect(english.products).toHaveLength(20);
    expect(spanish.products.find((product) => product.sku === "FV-002")?.name).toBe(
      "Manzana roja",
    );
    expect(english.products.find((product) => product.sku === "FV-002")?.name).toBe(
      "Red apple",
    );
  });

  it("searches accents, brands, and category filters", () => {
    const { products } = getCatalog("es");

    expect(selectProducts(products, { query: "pure" }).map((item) => item.sku)).toContain(
      "ALM-007",
    );
    expect(
      selectProducts(products, { category: "pantry", query: "vanguardia" }).every(
        (item) => item.categoryKey === "pantry" && item.brand === "Vanguardia",
      ),
    ).toBe(true);
  });

  it("uses exact integer values when sorting prices", () => {
    const { products } = getCatalog("en");
    const result = selectProducts(products, { sort: "price-asc" });

    expect(result[0]?.sku).toBe("ALM-010");
    expect(result.at(-1)?.sku).toBe("ALM-009");
  });
});
