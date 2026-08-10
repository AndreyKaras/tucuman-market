import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Brand } from "./brand";

export async function Footer() {
  const [t, nav] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Navigation"),
  ]);

  return (
    <footer className="site-footer">
      <div className="container site-footer__main">
        <div className="site-footer__brand">
          <Brand />
          <p>{t("description")}</p>
        </div>
        <nav aria-label={t("shopLinks")}>
          <h2>{t("shop")}</h2>
          <Link href="/">{nav("home")}</Link>
          <Link href="/products">{nav("catalog")}</Link>
          <Link href={{ pathname: "/products", query: { onSale: "1" } }}>
            {nav("offers")}
          </Link>
        </nav>
        <div>
          <h2>{t("languages")}</h2>
          <p>{t("languageList")}</p>
          <p>{t("currency")}</p>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
