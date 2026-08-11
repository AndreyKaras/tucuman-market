import { describe, expect, it } from "vitest";

import { isDecimalMoney, moneyToMinorUnits } from "./money";

describe("money", () => {
  it("parses decimal strings into exact minor units", () => {
    expect(moneyToMinorUnits("1990")).toBe(BigInt(199000));
    expect(moneyToMinorUnits("1990.5")).toBe(BigInt(199050));
    expect(moneyToMinorUnits("1990.05")).toBe(BigInt(199005));
  });

  it("rejects malformed or oversized decimal values", () => {
    expect(isDecimalMoney("1990.00")).toBe(true);
    expect(isDecimalMoney("19.999")).toBe(false);
    expect(isDecimalMoney("-1")).toBe(false);
    expect(isDecimalMoney("1".repeat(11))).toBe(false);
  });
});
