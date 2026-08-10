"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { CartIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
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
            className="cart-button"
            onClick={cart.openCart}
            type="button"
          >
            <span className="sr-only">{cartT("openAction")}</span>
            <CartIcon />
            <span>{t("cart")}</span>
            <strong>{cart.count}</strong>
          </button>
        </div>

        <nav
          aria-label={t("mobile")}
          className="mobile-nav"
          data-open={isMenuOpen}
        >
          <div className="container mobile-nav__inner">
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
      </header>
    </>
  );
}
