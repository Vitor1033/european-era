import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.opportunities" });
  return buildPageMetadata(locale, "/apply", {
    title: `Apply · ${t("title")}`,
    description: t("description"),
  });
}

export default async function ApplyPage() {
  const nav = await getTranslations("nav");
  const hero = await getTranslations("home.hero");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
      <FadeIn>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0F172A]">
          {nav("apply")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{hero("subtitle")}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/opportunities">{hero("primaryCta")}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">{hero("secondaryCta")}</Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
