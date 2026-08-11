"use client";

import { useLocale, useTranslations } from "next-intl";

import { CartIcon } from "@/components/ui/icons";
import {
  cn,
  containerClass,
  emptyStateClass,
  emptyStateIconClass,
  primaryButtonClass,
} from "@/components/ui/styles";
import { useCart } from "@/features/cart/ui/cart-provider";
import type { StoreLocale } from "@/features/catalog/model/types";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/format-money";

import { CartLineItem } from "./cart-line-item";

export function CartPage() {
  const locale = useLocale() as StoreLocale;
  const t = useTranslations("Cart");
  const cart = useCart();

  if (!cart.state.hasHydrated) {
    return (
      <main
        aria-busy="true"
        className={cn(containerClass, "py-14 max-[639px]:py-8")}
        id="main-content"
      >
        <h1 className="m-0 text-[42px] tracking-[-0.025em] max-[639px]:text-[34px]">
          {t("title")}
        </h1>
        <p className="mt-3 text-ink-muted" role="status">{t("loading")}</p>
        <div className="mt-8 h-56 animate-pulse rounded-xl bg-surface-muted motion-reduce:animate-none" aria-hidden="true" />
      </main>
    );
  }

  return (
    <main className={cn(containerClass, "py-14 max-[639px]:py-8")} id="main-content">
      <header className="max-w-[720px]">
        <h1 className="m-0 text-[42px] tracking-[-0.025em] max-[639px]:text-[34px]">
          {t("title")}
        </h1>
        <p className="mt-3 mb-0 leading-6 text-ink-muted">{t("pageDescription")}</p>
      </header>

      {cart.state.items.length === 0 ? (
        <section className={cn(emptyStateClass, "my-16 rounded-xl border border-line px-6 py-16 max-[639px]:my-10 max-[639px]:py-12")}>
          <span className={emptyStateIconClass} aria-hidden="true">
            <CartIcon />
          </span>
          <h2 className="mt-5 mb-0 text-2xl">{t("empty")}</h2>
          <p className="mt-2.5 mb-6 max-w-[460px] leading-6 text-ink-muted">{t("emptyHint")}</p>
          <Link className={primaryButtonClass} href="/products">
            {t("continueShopping")}
          </Link>
        </section>
      ) : (
        <div className="mt-9 grid grid-cols-[minmax(0,1fr)_360px] items-start gap-8 max-[900px]:grid-cols-1 max-[639px]:mt-7 max-[639px]:gap-6">
          <section aria-labelledby="cart-items-title" className="overflow-hidden rounded-xl border border-line bg-white">
            <div className="flex items-center justify-between border-b border-line px-6 py-5 max-[639px]:px-4">
              <h2 className="m-0 text-lg" id="cart-items-title">{t("items")}</h2>
              <span className="text-sm font-semibold text-primary-700">
                {t("itemCount", { count: cart.count })}
              </span>
            </div>
            <ul className="m-0 list-none p-0">
              {cart.state.items.map((item) => (
                <CartLineItem item={item} key={item.sku} variant="page" />
              ))}
            </ul>
          </section>

          <aside className="sticky top-[116px] rounded-xl border border-line bg-white p-6 max-[900px]:static max-[639px]:p-5" aria-labelledby="cart-summary-title">
            <h2 className="mt-0 mb-6 text-xl" id="cart-summary-title">{t("summary")}</h2>
            <div className="flex items-center justify-between border-y border-line py-5">
              <span>{t("subtotal")}</span>
              <strong className="text-2xl text-primary-700">{formatMoney(cart.subtotal, locale)}</strong>
            </div>
            <p className="mt-4 mb-5 text-sm leading-5 text-ink-muted">{t("visualOnly")}</p>
            <Link className={cn(primaryButtonClass, "w-full")} href="/products">
              {t("continueShopping")}
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
