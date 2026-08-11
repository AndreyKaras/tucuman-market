const DECIMAL_MONEY_PATTERN = /^(0|[1-9]\d{0,9})(?:\.(\d{1,2}))?$/;

export function moneyToMinorUnits(value: string): bigint {
  const match = DECIMAL_MONEY_PATTERN.exec(value);

  if (!match) {
    throw new Error(`Invalid decimal money value: ${value}`);
  }

  const [, whole, fraction = ""] = match;
  return BigInt(whole) * BigInt(100) + BigInt(fraction.padEnd(2, "0"));
}

export function isDecimalMoney(value: unknown): value is string {
  return typeof value === "string" && DECIMAL_MONEY_PATTERN.test(value);
}
