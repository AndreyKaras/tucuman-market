import { describe, expect, it } from "vitest";

import {
  addRecentSearch,
  parseRecentSearches,
  serializeRecentSearches,
} from "./recent-searches";

describe("recent searches", () => {
  it("keeps at most five locale-specific searches with the latest first", () => {
    const searches = ["uno", "dos", "tres", "cuatro", "cinco"];

    expect(addRecentSearch(searches, "seis", "es")).toEqual([
      "seis",
      "uno",
      "dos",
      "tres",
      "cuatro",
    ]);
  });

  it("deduplicates case-insensitively and moves the latest query first", () => {
    expect(addRecentSearch(["Banana", "Arroz"], "banana", "es")).toEqual([
      "banana",
      "Arroz",
    ]);
  });

  it("safely handles invalid and version-mismatched storage", () => {
    expect(parseRecentSearches("broken")).toEqual([]);
    expect(parseRecentSearches('{"version":2,"queries":[]}')).toEqual([]);
    expect(parseRecentSearches(serializeRecentSearches(["rice"]))).toEqual(["rice"]);
  });
});
