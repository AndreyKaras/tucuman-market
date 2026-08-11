import type { StoreLocale } from "./types";

const STORAGE_VERSION = 1;
const MAX_RECENT_SEARCHES = 5;

type StoredSearches = {
  queries: string[];
  version: typeof STORAGE_VERSION;
};

export function getRecentSearchesStorageKey(locale: StoreLocale) {
  return `tucuman-market:recent-searches:${locale}:v1`;
}

export function parseRecentSearches(raw: string | null): string[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return [];

    const candidate = parsed as Partial<StoredSearches>;
    if (
      candidate.version !== STORAGE_VERSION ||
      !Array.isArray(candidate.queries) ||
      !candidate.queries.every((query) => typeof query === "string")
    ) {
      return [];
    }

    return candidate.queries
      .map((query) => query.trim())
      .filter(Boolean)
      .slice(0, MAX_RECENT_SEARCHES);
  } catch {
    return [];
  }
}

export function addRecentSearch(
  searches: readonly string[],
  value: string,
  locale: StoreLocale,
) {
  const query = value.trim();
  if (!query) return [...searches];

  const normalized = query.toLocaleLowerCase(locale);
  return [
    query,
    ...searches.filter(
      (search) => search.toLocaleLowerCase(locale) !== normalized,
    ),
  ].slice(0, MAX_RECENT_SEARCHES);
}

export function serializeRecentSearches(searches: readonly string[]) {
  const value: StoredSearches = {
    queries: searches.slice(0, MAX_RECENT_SEARCHES),
    version: STORAGE_VERSION,
  };
  return JSON.stringify(value);
}
