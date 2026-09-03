'use client';

import { useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { SearchIcon } from '@/components/ui/icons';
import {
  addRecentSearch,
  getRecentSearchesStorageKey,
  parseRecentSearches,
  serializeRecentSearches,
} from '@/features/catalog/model/recent-searches';
import type { StoreLocale } from '@/features/catalog/model/types';
import { useRouter } from '@/i18n/navigation';

export function HeaderSearch({ onNavigate }: { onNavigate: () => void }) {
  const t = useTranslations('Catalog');
  const locale = useLocale() as StoreLocale;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFocused, setFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return parseRecentSearches(window.localStorage.getItem(getRecentSearchesStorageKey(locale)));
    } catch {
      return [];
    }
  });

  function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get('q') ?? '').trim();

    if (value) {
      const next = addRecentSearch(recentSearches, value, locale);
      setRecentSearches(next);
      try {
        window.localStorage.setItem(
          getRecentSearchesStorageKey(locale),
          serializeRecentSearches(next),
        );
      } catch {
        // Search remains available when storage is unavailable.
      }
    }

    router.push({ pathname: '/products', query: value ? { q: value } : {} });
    onNavigate();
    setFocused(false);
  }

  function clearRecentSearches() {
    setRecentSearches([]);
    try {
      window.localStorage.removeItem(getRecentSearchesStorageKey(locale));
    } catch {
      // Local clearing still succeeds when storage is unavailable.
    }
  }

  return (
    <form
      className="relative z-35 min-w-0 max-[900px]:col-span-full max-[900px]:row-start-2"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onFocus={() => setFocused(true)}
      onSubmit={runSearch}
      role="search"
    >
      <label className="sr-only" htmlFor="site-search">
        {t('searchLabel')}
      </label>
      <div
        className="grid h-12 grid-cols-[auto_minmax(0,1fr)_auto] items-center overflow-hidden rounded-lg border border-line transition-[border-color,box-shadow] duration-[140ms]"
        style={
          isFocused
            ? { borderColor: 'var(--primary-700)', boxShadow: '0 0 0 2px var(--primary-100)' }
            : undefined
        }
      >
        <SearchIcon className="ml-3.5 size-5 text-ink-muted" />
        <input
          className="h-[46px] min-w-0 border-0 px-3 outline-0"
          defaultValue={searchParams.get('q') ?? ''}
          id="site-search"
          key={searchParams.get('q') ?? ''}
          name="q"
          placeholder={t('searchPlaceholder')}
          type="search"
        />
        <button
          className="self-stretch border-0 bg-primary-700 px-4 text-sm font-[650] text-white transition-colors duration-[140ms] hover:bg-primary-800 max-[639px]:px-[13px] max-[380px]:w-12 max-[380px]:px-0"
          type="submit"
        >
          <span className="max-[380px]:sr-only">{t('searchAction')}</span>
          <span className="hidden text-lg max-[380px]:inline" aria-hidden="true">
            →
          </span>
        </button>
      </div>

      {isFocused && recentSearches.length ? (
        <div className="absolute top-full right-0 left-0 mt-1.5 overflow-hidden rounded-[10px] border border-line bg-surface shadow-[0_12px_28px_rgba(23,32,26,0.14)]">
          <div className="flex items-center justify-between px-3.5 pt-2.5 pb-1.5">
            <strong className="text-xs text-ink-muted uppercase">{t('recentSearches')}</strong>
            <button
              className="min-h-9 bg-transparent px-1.5 text-xs text-primary-700"
              onClick={clearRecentSearches}
              type="button"
            >
              {t('clearRecentSearches')}
            </button>
          </div>
          <ul className="m-0 list-none px-2 pb-2">
            {recentSearches.map((search) => (
              <li key={search}>
                <button
                  className="flex min-h-11 w-full items-center gap-2.5 rounded-[7px] bg-transparent px-2.5 text-left text-ink transition-colors hover:bg-primary-50 hover:text-primary-800 [&_svg]:size-[17px] [&_svg]:text-ink-muted"
                  onClick={() => {
                    router.push({ pathname: '/products', query: { q: search } });
                    onNavigate();
                    setFocused(false);
                  }}
                  type="button"
                >
                  <SearchIcon />
                  {search}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
}
