"use client";

import { useTranslations } from "next-intl";

import { AlertIcon } from "@/components/ui/icons";
import {
  cn,
  containerClass,
  emptyStateClass,
  primaryButtonClass,
} from "@/components/ui/styles";

export default function StoreError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Errors");

  return (
    <main className={cn(containerClass, "min-h-[64vh] pt-16 pb-[72px]")} id="main-content">
      <div className={cn(emptyStateClass, "mx-auto my-10")} role="alert">
        <span className="inline-flex size-[72px] items-center justify-center rounded-full bg-[#fff1f0] text-danger">
          <AlertIcon className="size-9" />
        </span>
        <h1 className="mt-5 mb-0">{t("title")}</h1>
        <p className="mt-2.5 mb-6 max-w-[460px] leading-6 text-ink-muted">{t("generic")}</p>
        <button className={primaryButtonClass} onClick={reset} type="button">
          {t("retry")}
        </button>
      </div>
    </main>
  );
}
