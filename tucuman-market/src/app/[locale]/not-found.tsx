"use client";

import { useTranslations } from "next-intl";

import { HomeIcon } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";
import {
  cn,
  containerClass,
  emptyStateClass,
  emptyStateIconClass,
  primaryButtonClass,
} from "@/components/ui/styles";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <main className={cn(containerClass, "min-h-[64vh] pt-16 pb-[72px]")} id="main-content">
      <div className={cn(emptyStateClass, "mx-auto my-10")}>
        <strong className="text-[64px] leading-none tracking-[-0.04em] text-primary-700">404</strong>
        <span className={emptyStateIconClass} aria-hidden="true">
          <HomeIcon />
        </span>
        <h1 className="mt-5 mb-0">{t("title")}</h1>
        <p className="mt-2.5 mb-6 max-w-[460px] leading-6 text-ink-muted">{t("description")}</p>
        <Link className={primaryButtonClass} href="/">
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
