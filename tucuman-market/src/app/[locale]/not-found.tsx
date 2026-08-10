"use client";

import { useTranslations } from "next-intl";

import { HomeIcon } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <main className="container state-page" id="main-content">
      <div className="empty-state state-page__content">
        <strong className="not-found-code">404</strong>
        <span className="empty-state__icon" aria-hidden="true">
          <HomeIcon />
        </span>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <Link className="button button--primary" href="/">
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
