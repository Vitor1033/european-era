"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const t = useTranslations("home.cta");

  return (
    <section className="bg-[#0F172A] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1d4ed8] p-10 shadow-card sm:p-14"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-[#7c3aed]/35 blur-3xl" />
          <div className="relative max-w-2xl space-y-6">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-pretty text-lg text-slate-200">{t("subtitle")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#0F172A] hover:bg-slate-100"
              >
                <Link href="/opportunities">{t("primary")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-white/30 bg-white/10 text-white hover:bg-white/15"
              >
                <Link href="/partners">{t("secondary")}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
