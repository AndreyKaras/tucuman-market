import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { CategoryTile } from "@/components/store/category-tile";
import { ProductCard } from "@/components/store/product-card";
import {
  ArrowIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  StoreIcon,
  TruckIcon,
} from "@/components/ui/icons";
import { getCatalog } from "@/features/catalog/data/catalog-repository";
import type { StoreLocale } from "@/features/catalog/model/types";
import { businessInfo } from "@/features/store/data/business-info";
import { Link } from "@/i18n/navigation";
import {
  cn,
  containerClass,
  primaryButtonClass,
  textLinkClass,
} from "@/components/ui/styles";

export default async function HomePage() {
  const [locale, home, business] = await Promise.all([
    getLocale() as Promise<StoreLocale>,
    getTranslations("Home"),
    getTranslations("Business"),
  ]);
  const catalog = getCatalog(locale);
  const featured = catalog.products.filter((product) => product.isFeatured);

  return (
    <main id="main-content">
      <section
        className={cn(
          containerClass,
          "mt-8 grid min-h-[430px] grid-cols-[0.88fr_1.12fr] max-[900px]:grid-cols-1 max-[900px]:min-h-0 max-[639px]:mt-4",
        )}
      >
        <div className="flex flex-col items-start justify-center rounded-l-2xl border border-r-0 border-line p-12 max-[900px]:rounded-t-2xl max-[900px]:rounded-b-none max-[900px]:border-r max-[900px]:border-b-0 max-[900px]:p-10 max-[639px]:p-6">
          <h1 className="m-0 max-w-[650px] text-[clamp(36px,4.2vw,58px)] leading-[1.04] tracking-[-0.035em] max-[639px]:text-4xl">
            {home("title")}
          </h1>
          <p className="my-6 max-w-[560px] text-lg leading-[1.55] text-ink-muted max-[639px]:my-[18px] max-[639px]:mb-6 max-[639px]:text-base">
            {home("subtitle")}
          </p>
          <Link className={primaryButtonClass} href="/products">
            {home("shopNow")}
            <ArrowIcon />
          </Link>
        </div>
        <div className="relative min-h-[430px] overflow-hidden rounded-r-2xl max-[900px]:min-h-[360px] max-[900px]:rounded-t-none max-[900px]:rounded-b-2xl max-[639px]:min-h-[280px]">
          <Image
            className="object-cover object-center max-[639px]:object-[66%_center]"
            alt={home("heroImageAlt")}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 55vw"
            src="/images/storefront/hero-groceries.png"
          />
        </div>
      </section>

      <section className={cn(containerClass, "mt-[72px] max-[639px]:mt-12")} aria-labelledby="categories-title">
        <div className="mb-6 flex items-end justify-between gap-6 max-[639px]:mb-[18px] max-[639px]:items-start">
          <div>
            <h2 className="m-0 text-[32px] leading-[1.2] tracking-[-0.02em] max-[639px]:text-[28px]" id="categories-title">{home("categories")}</h2>
            <p className="mt-2 mb-0 text-ink-muted max-[639px]:text-sm">{home("categoriesHint")}</p>
          </div>
          <Link className={textLinkClass} href="/products">
            {home("viewAll")}
            <ArrowIcon />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[639px]:-mx-4 max-[639px]:flex max-[639px]:snap-x max-[639px]:snap-mandatory max-[639px]:overflow-x-auto max-[639px]:px-4 max-[639px]:pt-0.5 max-[639px]:pb-3.5">
          {catalog.categories.map((category) => (
            <CategoryTile category={category} key={category.key} />
          ))}
        </div>
      </section>

      <section className={cn(containerClass, "mt-[72px] max-[639px]:mt-12")} aria-labelledby="featured-title">
        <div className="mb-6 flex items-end justify-between gap-6 max-[639px]:mb-[18px] max-[639px]:items-start">
          <div>
            <h2 className="m-0 text-[32px] leading-[1.2] tracking-[-0.02em] max-[639px]:text-[28px]" id="featured-title">{home("featured")}</h2>
            <p className="mt-2 mb-0 text-ink-muted max-[639px]:text-sm">{home("featuredHint")}</p>
          </div>
          <Link className={textLinkClass} href="/products">
            {home("viewAll")}
            <ArrowIcon />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4 max-[1120px]:grid-cols-3 max-[1120px]:[&>*:last-child]:hidden max-[639px]:grid-cols-1 max-[639px]:[&>*:last-child]:flex">
          {featured.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>

      <section className={cn(containerClass, "mt-[72px] grid grid-cols-2 rounded-2xl border border-primary-100 bg-primary-50 p-7 max-[639px]:mt-12 max-[639px]:grid-cols-1 max-[639px]:px-5 max-[639px]:py-2.5")}>
        <article className="flex items-center gap-[18px] px-7 py-1 max-[639px]:px-0 max-[639px]:py-5">
          <TruckIcon className="size-[38px] flex-none text-primary-700" />
          <div>
            <h2 className="m-0 text-lg">{home("deliveryTitle")}</h2>
            <p className="mt-1.5 mb-0 leading-6 text-ink-muted">{home("deliveryText")}</p>
          </div>
        </article>
        <article className="flex items-center gap-[18px] border-l border-line-strong px-7 py-1 max-[639px]:border-t max-[639px]:border-l-0 max-[639px]:px-0 max-[639px]:py-5">
          <StoreIcon className="size-[38px] flex-none text-primary-700" />
          <div>
            <h2 className="m-0 text-lg">{home("pickupTitle")}</h2>
            <p className="mt-1.5 mb-0 leading-6 text-ink-muted">{home("pickupText")}</p>
          </div>
        </article>
      </section>

      <section
        aria-labelledby="business-title"
        className={cn(containerClass, "my-[72px] max-[639px]:my-12")}
      >
        <div className="mb-8 max-w-[680px]">
          <h2 className="m-0 text-[32px] leading-[1.2] tracking-[-0.02em] max-[639px]:text-[28px]" id="business-title">
            {business("title")}
          </h2>
          <p className="mt-2 mb-0 leading-6 text-ink-muted">{business("intro")}</p>
        </div>
        <div className="grid grid-cols-[0.95fr_1.15fr_0.9fr] border-y border-line max-[900px]:grid-cols-1">
          <article className="flex gap-4 py-8 pr-8 max-[900px]:border-b max-[900px]:border-line max-[900px]:pr-0 max-[639px]:py-6">
            <MapPinIcon className="mt-0.5 size-7 flex-none text-primary-700" />
            <div>
              <h3 className="m-0 text-base">{business("address")}</h3>
              <address className="mt-2 leading-6 text-ink-muted not-italic">
                {businessInfo.address}
              </address>
            </div>
          </article>
          <article className="flex gap-4 border-x border-line px-8 py-8 max-[900px]:border-x-0 max-[900px]:border-b max-[900px]:px-0 max-[639px]:py-6">
            <ClockIcon className="mt-0.5 size-7 flex-none text-primary-700" />
            <div className="min-w-0 flex-1">
              <h3 className="m-0 text-base">{business("hours")}</h3>
              <dl className="mt-2 mb-0 grid gap-1.5 text-sm leading-5 text-ink-muted">
                {businessInfo.hours.map((entry) => (
                  <div className="flex justify-between gap-5" key={entry.key}>
                    <dt>{business(entry.key)}</dt>
                    <dd className="m-0 text-right font-semibold text-ink">
                      {entry.value ?? business("closed")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
          <article className="flex gap-4 py-8 pl-8 max-[900px]:pl-0 max-[639px]:py-6">
            <PhoneIcon className="mt-0.5 size-7 flex-none text-primary-700" />
            <div className="min-w-0">
              <h3 className="m-0 text-base">{business("contact")}</h3>
              <ul className="mt-2 mb-0 list-none space-y-1.5 p-0 text-sm">
                <li>
                  <a className="text-primary-800 hover:underline hover:underline-offset-4" href={businessInfo.contact.whatsapp.href} rel="noreferrer" target="_blank">
                    {business("whatsapp")}: {businessInfo.contact.whatsapp.display}
                  </a>
                </li>
                <li>
                  <a className="text-primary-800 hover:underline hover:underline-offset-4" href={businessInfo.contact.phone.href}>
                    {business("phone")}: {businessInfo.contact.phone.display}
                  </a>
                </li>
                <li>
                  <a className="break-all text-primary-800 hover:underline hover:underline-offset-4" href={businessInfo.contact.email.href}>
                    {businessInfo.contact.email.display}
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
