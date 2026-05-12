import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/layout/section-header";
import { FadeIn } from "@/components/animations/fade-in";
import { testimonials } from "@/content/testimonials";
import type { Locale } from "@/types/content";

export async function TestimonialsSection() {
  const t = await getTranslations("home.testimonials");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="center"
            className="mx-auto"
          />
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <FadeIn key={item.id} delay={0.06 * i}>
              <figure className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <blockquote className="flex-1 text-sm leading-relaxed text-[#334155]">
                  “{item.quote[locale]}”
                </blockquote>
                <figcaption className="mt-6 border-t border-[#E2E8F0] pt-4">
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.role[locale]}
                  </p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
