"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeLabels: Record<string, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const [pending, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size={compact ? "icon" : "sm"}
          className={compact ? "shrink-0" : "gap-2"}
          aria-label={t("switch")}
          disabled={pending}
        >
          <Globe className="h-4 w-4" aria-hidden />
          {!compact && (
            <>
              <span className="hidden sm:inline">
                {localeLabels[locale] ?? locale.toUpperCase()}
              </span>
              <span className="sm:hidden uppercase">{locale}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[11rem]">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          {t("current")}
        </div>
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() =>
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              })
            }
            className={loc === locale ? "bg-muted font-medium" : ""}
          >
            {localeLabels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
