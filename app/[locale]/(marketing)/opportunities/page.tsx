import { getLocale, getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { opportunities } from "@/content/opportunities";
import type { Locale } from "@/types/content";
import { MapPin, Timer } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.opportunities" });
  return buildPageMetadata(locale, "/opportunities", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function OpportunitiesPage() {
  const t = await getTranslations("opportunitiesPage");
  const locale = (await getLocale()) as Locale;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeIn>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {t("badge")}
          </span>
        </div>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-[#0F172A]">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
      </FadeIn>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((o, i) => (
          <FadeIn key={o.id} delay={0.05 * i}>
            <article className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {o.category[locale]}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-[#0F172A]">
                {o.title[locale]}
              </h2>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {o.location[locale]}
                </p>
                <p className="flex items-center gap-2">
                  <Timer className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {o.duration[locale]}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
