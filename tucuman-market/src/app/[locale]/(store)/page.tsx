import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { CategoryTile } from "@/components/store/category-tile";
import { ProductCard } from "@/components/store/product-card";
import { ArrowIcon, StoreIcon, TruckIcon } from "@/components/ui/icons";
import { getCatalog } from "@/features/catalog/data/catalog-repository";
import type { StoreLocale } from "@/features/catalog/model/types";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const [locale, home] = await Promise.all([
    getLocale() as Promise<StoreLocale>,
    getTranslations("Home"),
  ]);
  const catalog = getCatalog(locale);
  const featured = catalog.products.filter((product) => product.isFeatured);

  return (
    <main id="main-content">
      <section className="container hero">
        <div className="hero__content">
          <h1>{home("title")}</h1>
          <p>{home("subtitle")}</p>
          <Link className="button button--primary" href="/products">
            {home("shopNow")}
            <ArrowIcon />
          </Link>
        </div>
        <div className="hero__media">
          <Image
            alt={home("heroImageAlt")}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 55vw"
            src="/images/storefront/hero-groceries.png"
          />
        </div>
      </section>

      <section className="section container" aria-labelledby="categories-title">
        <div className="section-heading">
          <div>
            <h2 id="categories-title">{home("categories")}</h2>
            <p>{home("categoriesHint")}</p>
          </div>
          <Link className="text-link" href="/products">
            {home("viewAll")}
            <ArrowIcon />
          </Link>
        </div>
        <div className="category-rail">
          {catalog.categories.map((category) => (
            <CategoryTile category={category} key={category.key} />
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <h2 id="featured-title">{home("featured")}</h2>
            <p>{home("featuredHint")}</p>
          </div>
          <Link className="text-link" href="/products">
            {home("viewAll")}
            <ArrowIcon />
          </Link>
        </div>
        <div className="product-grid product-grid--featured">
          {featured.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>

      <section className="section container fulfillment-band">
        <article>
          <TruckIcon />
          <div>
            <h2>{home("deliveryTitle")}</h2>
            <p>{home("deliveryText")}</p>
          </div>
        </article>
        <article>
          <StoreIcon />
          <div>
            <h2>{home("pickupTitle")}</h2>
            <p>{home("pickupText")}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
