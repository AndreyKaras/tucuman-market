"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import { CloseIcon } from "@/components/ui/icons";
import type { StoreLocale } from "@/features/catalog/model/types";
import { useCart } from "@/features/cart/ui/cart-provider";
import { formatMoney } from "@/lib/format-money";
import {
  cn,
  emptyStateClass,
  emptyStateIconClass,
  iconButtonClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";

import { CartLineItem } from "./cart-line-item";

export function CartDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const locale = useLocale() as StoreLocale;
  const t = useTranslations("Cart");
  const common = useTranslations("Common");
  const cart = useCart();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (cart.state.isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!cart.state.isOpen && dialog.open) {
      dialog.close();
    }
  }, [cart.state.isOpen]);

  return (
    <dialog
      aria-labelledby="cart-title"
      className="cart-drawer"
      onCancel={(event) => {
        event.preventDefault();
        cart.closeCart();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) cart.closeCart();
      }}
      onClose={cart.closeCart}
      ref={dialogRef}
    >
      <section className="cart-drawer__panel ml-auto grid h-full w-full max-w-[460px] translate-x-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-white shadow-[0_12px_32px_rgba(23,32,26,0.18)] transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] max-[639px]:max-w-[calc(100%-16px)]">
        <header className="flex items-center justify-between border-b border-line px-6 py-5 max-[639px]:px-[18px]">
          <div>
            <p className="m-0 text-xs font-bold text-primary-700 uppercase">{t("itemCount", { count: cart.count })}</p>
            <h2 className="mt-0.5 mb-0 text-2xl" id="cart-title">{t("title")}</h2>
          </div>
          <button
            aria-label={common("close")}
            className={iconButtonClass}
            onClick={cart.closeCart}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>

        {cart.state.items.length === 0 ? (
          <div className={cn(emptyStateClass, "m-auto p-8")}>
            <span className={emptyStateIconClass} aria-hidden="true">
              <CartIconForEmpty />
            </span>
            <h3 className="mt-5 mb-0">{t("empty")}</h3>
            <p className="mt-2.5 mb-6 max-w-[460px] leading-6 text-ink-muted">{t("emptyHint")}</p>
            <Link
              className={primaryButtonClass}
              href="/products"
              onClick={cart.closeCart}
            >
              {t("continueShopping")}
            </Link>
          </div>
        ) : (
          <>
            <ul className="m-0 min-h-0 list-none overflow-y-auto px-6 max-[639px]:px-[18px]">
              {cart.state.items.map((item) => (
                <CartLineItem item={item} key={item.sku} />
              ))}
            </ul>

            <footer className="border-t border-line px-6 pt-5 pb-6 max-[639px]:px-[18px]">
              <div className="flex items-center justify-between">
                <span>{t("subtotal")}</span>
                <strong className="text-[22px] text-primary-700">{formatMoney(cart.subtotal, locale)}</strong>
              </div>
              <p className="mt-2.5 mb-4 text-xs leading-[1.45] text-ink-muted">{t("visualOnly")}</p>
              <div className="grid gap-2.5">
                <Link
                  className={cn(primaryButtonClass, "w-full")}
                  href="/cart"
                  onClick={cart.closeCart}
                >
                  {t("viewCart")}
                </Link>
                <button
                  className={cn(secondaryButtonClass, "w-full")}
                  onClick={cart.closeCart}
                  type="button"
                >
                  {t("continueShopping")}
                </button>
              </div>
            </footer>
          </>
        )}
      </section>
    </dialog>
  );
}

function CartIconForEmpty() {
  return (
    <svg fill="none" viewBox="0 0 48 48">
      <path d="M8 9h5l4 22h20l4-15H15" />
      <circle cx="20" cy="39" r="2" />
      <circle cx="35" cy="39" r="2" />
    </svg>
  );
}
