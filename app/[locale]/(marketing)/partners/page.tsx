import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { partners } from "@/content/partners";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.partners" });
  return buildPageMetadata(locale, "/partners", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function PartnersPage() {
  const t = await getTranslations("partnersPage");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeIn>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0F172A]">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/contact">{t("cta")}</Link>
        </Button>
      </FadeIn>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p, i) => (
          <FadeIn key={p.id} delay={0.05 * i}>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
              <Image
                src={p.logo}
                alt={p.name}
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
              <p className="mt-4 text-sm font-medium text-[#0F172A]">{p.name}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
