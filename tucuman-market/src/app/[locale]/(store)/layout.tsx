import { Suspense, type ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";

import { CartDrawer } from "@/components/store/cart-drawer";
import { DesktopCartDock } from "@/components/store/desktop-cart-dock";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { CartProvider } from "@/features/cart/ui/cart-provider";
import { getCatalog } from "@/features/catalog/data/catalog-repository";
import type { StoreLocale } from "@/features/catalog/model/types";

export default async function StoreLayout({ children }: { children: ReactNode }) {
  const [common, locale] = await Promise.all([
    getTranslations("Common"),
    getLocale() as Promise<StoreLocale>,
  ]);
  const catalog = getCatalog(locale);

  return (
    <CartProvider products={catalog.products}>
      <a
        className="fixed top-3 left-4 z-[100] -translate-y-[150%] bg-primary-900 px-4 py-3 text-white transition-transform focus:translate-y-0"
        href="#main-content"
      >
        {common("skipToContent")}
      </a>
      <Suspense
        fallback={<div className="h-[120px] border-b border-line" aria-hidden="true" />}
      >
        <Header key={locale} />
      </Suspense>
      {children}
      <Footer />
      <DesktopCartDock />
      <CartDrawer />
    </CartProvider>
  );
}
