"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import { ChevronDownIcon, CloseIcon, SlidersIcon } from "@/components/ui/icons";
import {
  getActiveFilterCount,
  toCatalogSearchParams,
} from "@/features/catalog/model/catalog-query";
import type { CatalogCategory, CatalogQuery } from "@/features/catalog/model/types";
import { useRouter } from "@/i18n/navigation";
import {
  cn,
  iconButtonClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui/styles";

const fieldsetClass =
  "m-0 flex flex-col gap-0.5 border-0 px-0 py-[18px]";
const legendClass = "mb-2 text-sm font-bold";
const optionClass =
  "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-2 py-[7px] text-sm text-ink-muted transition-[background-color,color] duration-[140ms] hover:bg-primary-50 hover:text-primary-800 has-checked:bg-primary-50 has-checked:font-[650] has-checked:text-primary-800 [&_input]:size-[18px] [&_input]:accent-primary-700";

type CatalogControlsProps = {
  categories: readonly CatalogCategory[];
  categorySlug?: string;
  query: CatalogQuery;
};

export function CatalogControls({
  categories,
  categorySlug,
  query,
}: CatalogControlsProps) {
  const t = useTranslations("Catalog");
  const common = useTranslations("Common");
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const activeFilterCount = getActiveFilterCount(query, !categorySlug);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isDialogOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDialogOpen]);

  const closeDialog = () => {
    dialogRef.current?.close();
    setDialogOpen(false);
  };

  const pushQuery = (next: CatalogQuery) => {
    const cleaned = { ...next, page: 1 };

    if (categorySlug) {
      const selectedCategory = categories.find(
        (category) => category.key === cleaned.category,
      );
      const queryParams = toCatalogSearchParams(cleaned, {
        includeCategory: false,
      });

      if (selectedCategory) {
        router.push({
          pathname: "/categories/[slug]",
          params: { slug: selectedCategory.slug },
          query: queryParams,
        });
      } else {
        router.push({ pathname: "/products", query: queryParams });
      }
      closeDialog();
      return;
    }

    router.push({
      pathname: "/products",
      query: toCatalogSearchParams(cleaned),
    });
    closeDialog();
  };

  const reset = () => {
    const next = {
      category: categorySlug ? query.category : undefined,
      query: query.query,
      sort: query.sort,
    } satisfies CatalogQuery;
    pushQuery(next);
  };

  const submitFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    pushQuery({
      ...query,
      category: String(form.get("category") ?? "") || undefined,
      inStock: form.get("inStock") === "1",
      maxPrice: String(form.get("maxPrice") ?? "").trim() || undefined,
      minPrice: String(form.get("minPrice") ?? "").trim() || undefined,
      onSale: form.get("onSale") === "1",
    });
  };

  const filterPanel = (id: string) => (
    <form onSubmit={submitFilters}>
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>{t("categories")}</legend>
        <label className={optionClass}>
          <input defaultChecked={!query.category} key={`${id}-all-${query.category}`} name="category" type="radio" value="" />
          <span>{t("allCategories")}</span>
        </label>
        {categories.map((category) => (
          <label className={optionClass} key={category.key}>
            <input
              defaultChecked={query.category === category.key}
              key={`${id}-${category.key}-${query.category}`}
              name="category"
              type="radio"
              value={category.key}
            />
            <span>{category.name}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>{t("availability")}</legend>
        <label className={optionClass}>
          <input defaultChecked={query.inStock} key={`${id}-stock-${query.inStock}`} name="inStock" type="checkbox" value="1" />
          <span>{t("inStock")}</span>
        </label>
        <label className={optionClass}>
          <input defaultChecked={query.onSale} key={`${id}-sale-${query.onSale}`} name="onSale" type="checkbox" value="1" />
          <span>{t("onSale")}</span>
        </label>
      </fieldset>
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>{t("priceRange")}</legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-ink-muted">
            <span>{t("priceFrom")}</span>
            <input className="mt-1.5 h-11 w-full min-w-0 rounded-[7px] border border-line px-2.5 focus:border-primary-700 focus:shadow-[0_0_0_2px_rgba(20,108,46,0.14)] focus:outline-0" defaultValue={query.minPrice} inputMode="numeric" key={`${id}-min-${query.minPrice}`} min="0" name="minPrice" placeholder="0" step="1" type="number" />
          </label>
          <label className="text-xs text-ink-muted">
            <span>{t("priceTo")}</span>
            <input className="mt-1.5 h-11 w-full min-w-0 rounded-[7px] border border-line px-2.5 focus:border-primary-700 focus:shadow-[0_0_0_2px_rgba(20,108,46,0.14)] focus:outline-0" defaultValue={query.maxPrice} inputMode="numeric" key={`${id}-max-${query.maxPrice}`} min="0" name="maxPrice" placeholder="9999" step="1" type="number" />
          </label>
        </div>
      </fieldset>
      <div className="grid gap-2 [&_button]:w-full">
        <button className={primaryButtonClass} type="submit">{t("apply")}</button>
        <button className={secondaryButtonClass} onClick={reset} type="button">{t("clearFilters")}</button>
      </div>
    </form>
  );

  return (
    <div className="contents">
      <aside className="col-start-1 row-start-1 min-w-0 self-start rounded-xl border border-line p-[18px] motion-safe:animate-[filters-in_220ms_cubic-bezier(0.2,0.8,0.2,1)_both] max-[900px]:hidden" aria-labelledby="desktop-filters-title">
        <h2 className="mt-0 mb-5 flex items-center gap-2 text-lg [&_svg]:size-5" id="desktop-filters-title"><SlidersIcon />{t("filters")}</h2>
        {filterPanel("desktop")}
      </aside>

      <div
        className="absolute right-0 flex min-h-12 items-center justify-end max-[900px]:static max-[900px]:col-start-1 max-[900px]:row-start-1 max-[900px]:justify-between max-[639px]:grid max-[639px]:w-full max-[639px]:grid-cols-1 max-[639px]:items-stretch max-[639px]:gap-2.5"
        style={{ top: "-64px" }}
      >
        <button
          className={cn(secondaryButtonClass, "min-[901px]:hidden max-[639px]:w-full [&_span]:inline-flex [&_span]:h-[22px] [&_span]:min-w-[22px] [&_span]:items-center [&_span]:justify-center [&_span]:rounded-full [&_span]:bg-primary-700 [&_span]:text-[11px] [&_span]:text-white")}
          onClick={() => {
            dialogRef.current?.showModal();
            setDialogOpen(true);
          }}
          type="button"
        >
          <SlidersIcon />
          {t("filters")}
          {activeFilterCount ? <span>{activeFilterCount}</span> : null}
        </button>
        <label className="flex min-w-0 items-center gap-2.5 max-[639px]:w-full max-[639px]:justify-between">
          <span className="text-sm font-[650]">{t("sort")}</span>
          <span className="relative inline-flex max-[639px]:flex-1">
            <select
              className="h-11 min-w-[190px] appearance-none rounded-lg border border-line bg-white py-0 pr-[42px] pl-3.5 font-semibold transition-[border-color,box-shadow] duration-[140ms] hover:border-primary-700 focus:border-primary-700 focus:shadow-[0_0_0_3px_rgba(20,108,46,0.14)] focus:outline-0 max-[639px]:w-full max-[639px]:min-w-0"
              aria-label={t("sort")}
              id="catalog-sort"
              name="sort"
              onChange={(event) => pushQuery({ ...query, sort: event.target.value as CatalogQuery["sort"] })}
              value={query.sort}
            >
              <option value="featured">{t("sortFeatured")}</option>
              <option value="name">{t("sortName")}</option>
              <option value="price-asc">{t("sortPriceAsc")}</option>
              <option value="price-desc">{t("sortPriceDesc")}</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-[13px] right-[13px] size-[18px] text-primary-700" />
          </span>
        </label>
      </div>

      <dialog
        aria-labelledby="mobile-filters-title"
        className="filter-dialog opacity-0 transition-[display,opacity,overlay] duration-[220ms]"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        ref={dialogRef}
      >
        <section className="filter-dialog__panel ml-auto grid h-dvh w-[min(420px,calc(100%-48px))] max-w-[420px] translate-x-full grid-rows-[auto_minmax(0,1fr)] bg-surface shadow-[-12px_0_32px_rgba(23,32,26,0.18)] transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] max-[639px]:mt-auto max-[639px]:ml-0 max-[639px]:h-[min(86dvh,720px)] max-[639px]:w-full max-[639px]:max-w-none max-[639px]:translate-x-0 max-[639px]:translate-y-full max-[639px]:rounded-t-2xl">
          <header className="flex items-center justify-between border-b border-line px-[22px] py-[18px]">
            <div>
              <span className="text-xs font-bold text-primary-700">{activeFilterCount ? t("activeFilters", { count: activeFilterCount }) : t("allProducts")}</span>
              <h2 className="mt-0.5 mb-0 text-2xl" id="mobile-filters-title">{t("filters")}</h2>
            </div>
            <button aria-label={common("close")} className={iconButtonClass} onClick={closeDialog} ref={closeButtonRef} type="button"><CloseIcon /></button>
          </header>
          <div className="min-h-0 overflow-y-auto px-[22px] pt-1 pb-6">{filterPanel("mobile")}</div>
        </section>
      </dialog>
    </div>
  );
}
