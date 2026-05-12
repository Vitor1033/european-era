import { getTranslations } from "next-intl/server";
import { buildPageMetadata, organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/sections/hero";
import { PartnerStrip } from "@/components/sections/partner-strip";
import { StatsSection } from "@/components/sections/stats-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Categories } from "@/components/sections/categories";
import { FeaturedOpportunities } from "@/components/sections/featured-opportunities";
import { WhyUs } from "@/components/sections/why-us";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqPreview } from "@/components/sections/faq-preview";
import { FinalCta } from "@/components/sections/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return buildPageMetadata(locale, "", {
    title: t("title"),
    description: t("description"),
  });
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <PartnerStrip />
      <StatsSection />
      <HowItWorks />
      <Categories />
      <FeaturedOpportunities />
      <WhyUs />
      <TestimonialsSection />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
