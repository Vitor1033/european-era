import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/animations/fade-in";

export async function StatsSection() {
  const t = await getTranslations("home.stats");

  const items = ["stat1", "stat2", "stat3"] as const;

  return (
    <section className="border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("label")}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {items.map((key, i) => (
              <div
                key={key}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-sm"
              >
                <p className="text-4xl font-semibold tracking-tight text-[#0F172A]">
                  {t(`${key}.value`)}
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">
                  {t(`${key}.label`)}
                </p>
                <div
                  className="mt-4 h-1 w-12 rounded-full bg-accent-gradient"
                  aria-hidden
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
