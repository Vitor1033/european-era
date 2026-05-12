import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/layout/section-header";
import { FadeIn } from "@/components/animations/fade-in";

const steps = ["step1", "step2", "step3", "step4"] as const;

export async function HowItWorks() {
  const t = await getTranslations("home.how");

  return (
    <section className="border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader eyebrow={t("label")} title={t("title")} />
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((key, i) => (
            <FadeIn key={key} delay={0.05 * i}>
              <article className="h-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-primary shadow-sm ring-1 ring-[#E2E8F0]">
                    {i + 1}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#0F172A]">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`${key}.body`)}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
