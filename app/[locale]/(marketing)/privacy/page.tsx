import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.privacy" });
  return buildPageMetadata(locale, "/privacy", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacyPage");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeIn>
        <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A]">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("updated")}</p>
      </FadeIn>
      <FadeIn delay={0.06} className="mt-8 space-y-4 text-muted-foreground">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
      </FadeIn>
    </div>
  );
}
