import { describe, expect, it } from "vitest";

import { formatNetContent } from "./format-net-content";

describe("formatNetContent", () => {
  it("localizes counts and unit labels", () => {
    expect(formatNetContent({ unit: "UNIT", value: 6 }, "es")).toBe("6 unidades");
    expect(formatNetContent({ unit: "UNIT", value: 1 }, "en")).toBe("1 unit");
    expect(formatNetContent({ unit: "L", value: 1.5 }, "es")).toBe("1,5 L");
  });
});
