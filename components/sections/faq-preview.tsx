import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/layout/section-header";
import { FadeIn } from "@/components/animations/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/content/faq";
import type { Locale } from "@/types/content";

export async function FaqPreview() {
  const t = await getTranslations("home.faq");
  const locale = (await getLocale()) as Locale;
  const preview = faqItems.slice(0, 3);

  return (
    <section className="border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow={t("label")}
            title={t("title")}
            align="center"
            className="mx-auto"
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <Accordion type="single" collapsible className="w-full">
            {preview.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left text-base">
                  {item.question[locale]}
                </AccordionTrigger>
                <AccordionContent>{item.answer[locale]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="secondary">
              <Link href="/faq">{t("cta")}</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
