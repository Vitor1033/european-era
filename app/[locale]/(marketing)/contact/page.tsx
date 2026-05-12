import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { ContactForm } from "@/components/forms/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return buildPageMetadata(locale, "/contact", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0F172A]">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
            <h2 className="text-sm font-semibold text-[#0F172A]">{t("sideTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("sideBody")}</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-soft sm:p-8">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
