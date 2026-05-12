import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return buildPageMetadata(locale, "/about", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeIn>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0F172A]">
          {t("title")}
        </h1>
      </FadeIn>
      <FadeIn delay={0.06}>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
      </FadeIn>
    </div>
  );
}
