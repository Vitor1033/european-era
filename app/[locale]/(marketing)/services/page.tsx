import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";

const keys = ["s1", "s2", "s3", "s4"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  return buildPageMetadata(locale, "/services", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeIn>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0F172A]">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
      </FadeIn>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {keys.map((key, i) => (
          <FadeIn key={key} delay={0.05 * i}>
            <article className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#0F172A]">{t(`${key}.title`)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}.body`)}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
