import { Compass, Globe2, Microscope, Rocket } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/layout/section-header";
import { FadeIn } from "@/components/animations/fade-in";

const icons = [Compass, Globe2, Microscope, Rocket] as const;
const keys = ["c1", "c2", "c3", "c4"] as const;

export async function Categories() {
  const t = await getTranslations("home.categories");

  return (
    <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow={t("label")}
            title={t("title")}
            align="center"
            className="mx-auto"
          />
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={key} delay={0.06 * i}>
                <article className="group h-full rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-[#0F172A]">
                      {t(`${key}.title`)}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {t(`${key}.body`)}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
