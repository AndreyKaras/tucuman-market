"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import {
  CartIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { useCart } from "@/features/cart/ui/cart-provider";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

import { Brand } from "./brand";

export function Header() {
  const t = useTranslations("Navigation");
  const catalog = useTranslations("Catalog");
  const common = useTranslations("Common");
  const cartT = useTranslations("Cart");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cart = useCart();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuCloseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const desktopQuery = window.matchMedia("(min-width: 901px)");

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    desktopQuery.addEventListener("change", closeOnDesktop);
    menuCloseButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      desktopQuery.removeEventListener("change", closeOnDesktop);
      if (!desktopQuery.matches) previousFocus?.focus();
    };
  }, [isMenuOpen]);

  const switchLocale = (nextLocale: "es" | "en") => {
    router.replace(
      {
        pathname,
        query: Object.fromEntries(searchParams.entries()),
      },
      { locale: nextLocale },
    );
  };

  const runSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    router.push({
      pathname: "/products",
      query: value ? { q: value } : {},
    });
    setMenuOpen(false);
  };

  return (
    <>
      <div className="service-strip">
        <div className="container service-strip__inner">
          <span>{common("serviceArea")}</span>
          <span>{common("deliveryPickup")}</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__main">
          <button
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={t("openMenu")}
            className="icon-button site-header__menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <MenuIcon />
          </button>
          <Brand />

          <nav aria-label={t("primary")} className="desktop-nav">
            <Link aria-current={pathname === "/" ? "page" : undefined} href="/">
              {t("home")}
            </Link>
            <Link
              aria-current={pathname === "/products" ? "page" : undefined}
              href="/products"
            >
              {t("catalog")}
            </Link>
            <Link href={{ pathname: "/products", query: { onSale: "1" } }}>
              {t("offers")}
            </Link>
          </nav>

          <form className="header-search" onSubmit={runSearch} role="search">
            <label htmlFor="site-search">{catalog("searchLabel")}</label>
            <div className="header-search__field">
              <SearchIcon />
              <input
                defaultValue={searchParams.get("q") ?? ""}
                id="site-search"
                key={searchParams.get("q") ?? ""}
                name="q"
                placeholder={catalog("searchPlaceholder")}
                type="search"
              />
              <button type="submit">{catalog("searchAction")}</button>
            </div>
          </form>

          <nav aria-label={common("language")} className="locale-switcher">
            <button
              aria-current={locale === "es" ? "page" : undefined}
              onClick={() => switchLocale("es")}
              type="button"
            >
              ES
            </button>
            <span aria-hidden="true">/</span>
            <button
              aria-current={locale === "en" ? "page" : undefined}
              onClick={() => switchLocale("en")}
              type="button"
            >
              EN
            </button>
          </nav>

          <button
            aria-label={cartT("title")}
            className="cart-button"
            onClick={cart.openCart}
            type="button"
          >
            <CartIcon />
            <span>{t("cart")}</span>
            <strong>{cart.count}</strong>
          </button>
        </div>

      </header>

      {isMenuOpen ? (
        <div
          aria-label={t("mobile")}
          aria-modal="true"
          className="mobile-nav-layer"
          role="dialog"
        >
          <button
            aria-label={common("close")}
            className="mobile-nav__backdrop"
            onClick={() => setMenuOpen(false)}
            tabIndex={-1}
            type="button"
          />
          <nav
            aria-label={t("mobile")}
            className="mobile-nav"
            id="mobile-navigation"
          >
            <div className="mobile-nav__header">
              <strong>{t("mobile")}</strong>
              <button
                aria-label={common("close")}
                className="icon-button"
                onClick={() => setMenuOpen(false)}
                ref={menuCloseButtonRef}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="mobile-nav__inner">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                {t("home")}
              </Link>
              <Link href="/products" onClick={() => setMenuOpen(false)}>
                {t("catalog")}
              </Link>
              <Link
                href={{ pathname: "/products", query: { onSale: "1" } }}
                onClick={() => setMenuOpen(false)}
              >
                {t("offers")}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
