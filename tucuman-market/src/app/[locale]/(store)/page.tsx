import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const common = await getTranslations({ locale, namespace: "Common" });
  const home = await getTranslations({ locale, namespace: "Home" });

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <nav aria-label={common("language")} className="mb-12 flex gap-4">
          <Link
            href="/"
            locale="es"
            aria-current={locale === "es" ? "page" : undefined}
            className="font-medium text-zinc-700 underline-offset-4 hover:underline"
          >
            {common("spanish")}
          </Link>
          <Link
            href="/"
            locale="en"
            aria-current={locale === "en" ? "page" : undefined}
            className="font-medium text-zinc-700 underline-offset-4 hover:underline"
          >
            {common("english")}
          </Link>
        </nav>

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Tucumán Market
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          {home("title")}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
          {home("subtitle")}
        </p>
      </section>
    </main>
  );
}
