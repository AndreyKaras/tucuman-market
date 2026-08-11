import { getTranslations } from "next-intl/server";

import { businessInfo } from "@/features/store/data/business-info";
import { Link } from "@/i18n/navigation";
import { cn, containerClass } from "@/components/ui/styles";

import { Brand } from "./brand";

export async function Footer() {
  const [t, nav, business] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Navigation"),
    getTranslations("Business"),
  ]);

  return (
    <footer className="mt-auto border-t border-line">
      <div
        className={cn(
          containerClass,
          "grid grid-cols-[minmax(220px,1.3fr)_0.7fr_1fr_1.15fr] gap-12 py-11 max-[900px]:grid-cols-2 max-[639px]:grid-cols-1 max-[639px]:gap-8 max-[639px]:py-9",
        )}
      >
        <div className="[&_p]:max-w-[380px] [&_p]:leading-6 [&_p]:text-ink-muted">
          <Brand />
          <p>{t("description")}</p>
        </div>
        <nav
          aria-label={t("shopLinks")}
          className="flex flex-col items-start [&_a]:flex [&_a]:min-h-11 [&_a]:min-w-11 [&_a]:items-center [&_a]:text-sm [&_a]:text-ink-muted [&_a:hover]:text-primary-700 [&_a:hover]:underline"
        >
          <h2 className="mb-3 text-sm font-bold">{t("shop")}</h2>
          <Link href="/">{nav("home")}</Link>
          <Link href="/products">{nav("catalog")}</Link>
          <Link href={{ pathname: "/products", query: { onSale: "1" } }}>
            {nav("offers")}
          </Link>
          <Link href="/cart">{nav("cart")}</Link>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-bold">{business("contact")}</h2>
          <ul className="m-0 list-none space-y-2 p-0 text-sm text-ink-muted [&_a:hover]:text-primary-700 [&_a:hover]:underline [&_a:hover]:underline-offset-4">
            <li>
              <a href={businessInfo.contact.whatsapp.href} rel="noreferrer" target="_blank">
                {business("whatsapp")}: {businessInfo.contact.whatsapp.display}
              </a>
            </li>
            <li><a href={businessInfo.contact.phone.href}>{businessInfo.contact.phone.display}</a></li>
            <li><a className="break-all" href={businessInfo.contact.email.href}>{businessInfo.contact.email.display}</a></li>
            <li>
              <a href={businessInfo.contact.instagram.href} rel="noreferrer" target="_blank">
                {businessInfo.contact.instagram.display}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold">{business("address")}</h2>
          <address className="text-sm leading-6 text-ink-muted not-italic">{businessInfo.address}</address>
          <h2 className="mt-5 mb-2 text-sm font-bold">{business("hours")}</h2>
          <ul className="m-0 list-none space-y-1.5 p-0 text-xs leading-5 text-ink-muted">
            {businessInfo.hours.map((entry) => (
              <li className="flex justify-between gap-4" key={entry.key}>
                <span>{business(entry.key)}</span>
                <strong className="text-right text-ink">{entry.value ?? business("closed")}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line bg-surface-muted py-3.5 text-xs text-ink-muted">
        <div className={cn(containerClass, "flex items-center justify-between gap-6 max-[639px]:flex-col max-[639px]:items-start max-[639px]:gap-1.5")}>
          <p className="m-0">{t("copyright", { year: new Date().getFullYear() })}</p>
          <p className="m-0">{t("languageList")} · {t("currency")}</p>
        </div>
      </div>
    </footer>
  );
}
