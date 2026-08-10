import { Suspense, type ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { CartDrawer } from "@/components/store/cart-drawer";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { CartProvider } from "@/features/cart/ui/cart-provider";

export default async function StoreLayout({ children }: { children: ReactNode }) {
  const common = await getTranslations("Common");

  return (
    <CartProvider>
      <a className="skip-link" href="#main-content">
        {common("skipToContent")}
      </a>
      <Suspense fallback={<div className="header-shell-fallback" aria-hidden="true" />}>
        <Header />
      </Suspense>
      {children}
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
