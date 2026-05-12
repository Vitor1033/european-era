import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/layout/section-header";
import { FadeIn } from "@/components/animations/fade-in";

const keys = ["b1", "b2", "b3", "b4"] as const;

export async function WhyUs() {
  const t = await getTranslations("home.why");

  return (
    <section className="border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader eyebrow={t("label")} title={t("title")} />
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          {keys.map((key, i) => (
            <FadeIn key={key} delay={0.05 * i}>
              <article className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] p-6 shadow-sm">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl" />
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}.body`)}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
