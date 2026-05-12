import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { partners } from "@/content/partners";
import { FadeIn } from "@/components/animations/fade-in";

export async function PartnerStrip() {
  const t = await getTranslations("home.partners");

  return (
    <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t("label")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80">
            {partners.map((p) => (
              <div
                key={p.id}
                className="flex h-10 w-28 items-center justify-center grayscale transition hover:grayscale-0"
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={112}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
