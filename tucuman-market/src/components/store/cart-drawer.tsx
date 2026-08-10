"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/ui/icons";
import type { StoreLocale } from "@/features/catalog/model/types";
import { useCart } from "@/features/cart/ui/cart-provider";
import { formatMoney } from "@/lib/format-money";

import { ProductImage } from "./product-image";

export function CartDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const locale = useLocale() as StoreLocale;
  const t = useTranslations("Cart");
  const productT = useTranslations("Product");
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
      <section className="cart-drawer__panel">
        <header className="cart-drawer__header">
          <div>
            <p className="cart-drawer__count">{t("itemCount", { count: cart.count })}</p>
            <h2 id="cart-title">{t("title")}</h2>
          </div>
          <button
            aria-label={common("close")}
            className="icon-button"
            onClick={cart.closeCart}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>

        {cart.state.items.length === 0 ? (
          <div className="empty-state cart-drawer__empty">
            <span className="empty-state__icon" aria-hidden="true">
              <CartIconForEmpty />
            </span>
            <h3>{t("empty")}</h3>
            <p>{t("emptyHint")}</p>
            <button
              className="button button--secondary"
              onClick={cart.closeCart}
              type="button"
            >
              {t("continueShopping")}
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.state.items.map((item) => (
                <li className="cart-row" key={item.sku}>
                  <ProductImage image={item.image} size="cart" />
                  <div className="cart-row__content">
                    <div className="cart-row__title">
                      <div>
                        <h3>{item.name}</h3>
                        <p>
                          {item.saleUnit === "KG"
                            ? productT("perKilogram")
                            : productT("each")}
                        </p>
                      </div>
                      <strong>{formatMoney(item.price, locale)}</strong>
                    </div>
                    <div className="cart-row__actions">
                      <div className="quantity-control">
                        <button
                          aria-label={t("decrease", { product: item.name })}
                          onClick={() => cart.decrement(item.sku)}
                          type="button"
                        >
                          <MinusIcon />
                        </button>
                        <output aria-label={productT("quantity")}>
                          {item.quantity}
                        </output>
                        <button
                          aria-label={t("increase", { product: item.name })}
                          onClick={() => cart.increment(item.sku)}
                          type="button"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <button
                        aria-label={t("removeProduct", { product: item.name })}
                        className="icon-button icon-button--danger"
                        onClick={() => cart.remove(item.sku)}
                        type="button"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>{t("subtotal")}</span>
                <strong>{formatMoney(cart.subtotal, locale)}</strong>
              </div>
              <p>{t("visualOnly")}</p>
              <button
                className="button button--primary"
                onClick={cart.closeCart}
                type="button"
              >
                {t("continueShopping")}
              </button>
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
