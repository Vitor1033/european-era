import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/layout/section-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { opportunities } from "@/content/opportunities";
import type { Locale } from "@/types/content";
import { MapPin, Timer } from "lucide-react";

export async function FeaturedOpportunities() {
  const t = await getTranslations("home.featured");
  const common = await getTranslations("common");
  const locale = (await getLocale()) as Locale;
  const featured = opportunities.slice(0, 3);

  return (
    <section className="border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader title={t("title")} subtitle={t("subtitle")} />
            <Button asChild variant="secondary" className="shrink-0 self-start">
              <Link href="/opportunities">{common("viewAll")}</Link>
            </Button>
          </div>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((o, i) => (
            <FadeIn key={o.id} delay={0.06 * i}>
              <article className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {o.category[locale]}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">
                  {o.title[locale]}
                </h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden />
                    {o.location[locale]}
                  </p>
                  <p className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-primary" aria-hidden />
                    {o.duration[locale]}
                  </p>
                </div>
                <div className="mt-6">
                  <Button asChild variant="ghost" className="px-0 text-primary">
                    <Link href="/opportunities">{common("learnMore")}</Link>
                  </Button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
