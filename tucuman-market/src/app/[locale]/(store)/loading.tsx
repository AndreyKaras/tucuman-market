import { getTranslations } from "next-intl/server";

export default async function StoreLoading() {
  const t = await getTranslations("Common");

  return (
    <main className="container state-page" id="main-content">
      <p className="sr-only" role="status">
        {t("loading")}
      </p>
      <div className="skeleton skeleton--heading" />
      <div className="skeleton-grid" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton skeleton--media" />
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--line-short" />
            <div className="skeleton skeleton--button" />
          </div>
        ))}
      </div>
    </main>
  );
}
