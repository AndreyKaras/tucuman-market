"use client";

import { useTranslations } from "next-intl";

import { AlertIcon } from "@/components/ui/icons";

export default function StoreError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Errors");

  return (
    <main className="container state-page" id="main-content">
      <div className="empty-state state-page__content" role="alert">
        <span className="empty-state__icon empty-state__icon--error">
          <AlertIcon />
        </span>
        <h1>{t("title")}</h1>
        <p>{t("generic")}</p>
        <button className="button button--primary" onClick={reset} type="button">
          {t("retry")}
        </button>
      </div>
    </main>
  );
}
