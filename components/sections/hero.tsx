"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-4 shadow-card sm:p-6"
    >
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Mobility dashboard
            </p>
            <p className="text-sm font-semibold text-[#0F172A]">
              Your European pipeline
            </p>
          </div>
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-[#E2E8F0]">
            Live
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Applications", value: "12", trend: "+3 this week" },
            { label: "Matches", value: "86%", trend: "Strong fit" },
            { label: "Destinations", value: "5", trend: "EU-wide" },
            { label: "Next step", value: "Berlin", trend: "Interview" },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-2xl border border-[#E2E8F0] bg-white/90 p-3 shadow-sm backdrop-blur"
            >
              <p className="text-xs text-muted-foreground">{row.label}</p>
              <p className="text-lg font-semibold text-[#0F172A]">{row.value}</p>
              <p className="text-xs text-primary">{row.trend}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[#0F172A]">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            Guided checklist · visas · housing intro
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
            <div className="h-full w-2/3 rounded-full bg-accent-gradient" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            {t("eyebrow")}
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              {t("title")}
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="shadow-card">
              <Link href="/opportunities" className="gap-2">
                {t("primaryCta")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/partners">{t("secondaryCta")}</Link>
            </Button>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            {(["trust1", "trust2", "trust3"] as const).map((key, i) => (
              <div
                key={key}
                className="rounded-2xl border border-[#E2E8F0] bg-white/80 p-3 text-sm font-medium text-[#475569] shadow-sm backdrop-blur"
              >
                <dt className="sr-only">Trust {i + 1}</dt>
                <dd>{t(key)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
