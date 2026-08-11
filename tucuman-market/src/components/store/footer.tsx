import { getTranslations } from "next-intl/server";

import { businessInfo } from "@/features/store/data/business-info";
import { cn, containerClass } from "@/components/ui/styles";

import { Brand } from "./brand";
import { ScrollToTopLink } from "./scroll-to-top-link";

export async function Footer() {
  const [t, nav, business] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Navigation"),
    getTranslations("Business"),
  ]);

  return (
    <footer className="mt-auto border-t-4 border-primary-700 bg-surface-muted text-ink">
      <div
        className={cn(
          containerClass,
          "grid grid-cols-[minmax(220px,1.3fr)_0.7fr_1fr_1.15fr] gap-10 py-8 max-[900px]:grid-cols-2 max-[639px]:grid-cols-1 max-[639px]:gap-0 max-[639px]:py-6",
        )}
      >
        <div className="pr-4 max-[900px]:pr-8 max-[639px]:pr-0 max-[639px]:pb-6">
          <Brand />
        </div>
        <nav
          aria-label={t("shopLinks")}
          className="flex flex-col items-start max-[639px]:py-4 [&_a]:flex [&_a]:min-h-11 [&_a]:min-w-11 [&_a]:items-center [&_a]:text-sm [&_a]:text-ink-muted [&_a]:transition-colors [&_a]:duration-150 [&_a:hover]:text-primary-700 [&_a:hover]:underline [&_a:hover]:underline-offset-4"
        >
          <h2 className="mb-3 text-sm font-bold text-primary-900">{t("shop")}</h2>
          <ScrollToTopLink href="/">{nav("home")}</ScrollToTopLink>
          <ScrollToTopLink href="/products">{nav("catalog")}</ScrollToTopLink>
          <ScrollToTopLink href={{ pathname: "/products", query: { onSale: "1" } }}>
            {nav("offers")}
          </ScrollToTopLink>
          <ScrollToTopLink href="/cart">{nav("cart")}</ScrollToTopLink>
        </nav>
        <div className="max-[639px]:py-4">
          <h2 className="mb-3 text-sm font-bold text-primary-900">{business("contact")}</h2>
          <ul className="m-0 list-none p-0 text-sm text-ink-muted [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:transition-colors [&_a]:duration-150 [&_a:hover]:text-primary-700 [&_a:hover]:underline [&_a:hover]:underline-offset-4">
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
        <div className="max-[639px]:pt-4">
          <h2 className="mb-3 text-sm font-bold text-primary-900">{business("address")}</h2>
          <address className="max-w-[320px] text-sm leading-6 text-ink-muted not-italic">
            {businessInfo.address}
          </address>
          <h2 className="mt-4 mb-2 text-sm font-bold text-primary-900">{business("hours")}</h2>
          <ul className="m-0 list-none space-y-1 p-0 text-xs leading-5 text-ink-muted">
            {businessInfo.hours.map((entry) => (
              <li className="flex items-start justify-between gap-4" key={entry.key}>
                <span>{business(entry.key)}</span>
                <strong className="text-right font-semibold text-ink">
                  {entry.value ?? business("closed")}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line bg-white py-3 text-xs text-ink-muted">
        <div className={containerClass}>
          <p className="m-0">{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
