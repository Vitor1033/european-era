"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";

const navKeys = [
  { href: "/opportunities", labelKey: "opportunities" as const },
  { href: "/services", labelKey: "services" as const },
  { href: "/partners", labelKey: "partners" as const },
  { href: "/about", labelKey: "about" as const },
  { href: "/blog", labelKey: "blog" as const },
  { href: "/faq", labelKey: "faq" as const },
] as const;

export function Navbar({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-[#E2E8F0]/80 bg-white/80 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#0F172A]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gradient text-xs font-bold text-white shadow-sm">
            EE
          </span>
          <span className="hidden sm:inline">European Era</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navKeys.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-muted hover:text-[#0F172A]"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <Link href="/contact">{t("contact")}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="lg:hidden"
                aria-label={t("openMenu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <SheetHeader className="text-left">
                <SheetTitle>{t("menuTitle")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                {navKeys.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-[#0F172A] hover:bg-muted"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-primary hover:bg-muted"
                >
                  {t("contact")}
                </Link>
              </nav>
              <div className="mt-auto flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                <span className="text-sm text-muted-foreground">
                  {t("apply")}
                </span>
                <LanguageSwitcher compact />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
