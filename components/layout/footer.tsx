import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const product = [
    { href: "/opportunities", label: nav("opportunities") },
    { href: "/services", label: nav("services") },
    { href: "/partners", label: nav("partners") },
    { href: "/blog", label: nav("blog") },
  ];

  const company = [
    { href: "/about", label: nav("about") },
    { href: "/faq", label: nav("faq") },
    { href: "/contact", label: nav("contact") },
  ];

  const metadata = await getTranslations("metadata");

  const legal = [
    { href: "/privacy", label: metadata("privacy.title") },
    { href: "/terms", label: metadata("terms.title") },
  ];

  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3 lg:col-span-2">
          <div className="flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gradient text-xs font-bold text-white shadow-sm">
              EE
            </span>
            European Era
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("tagline")}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("product")}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {product.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[#475569] transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("company")}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {company.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[#475569] transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("legal")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[#475569] transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[#E2E8F0] py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} European Era. {t("rights")}
      </div>
    </footer>
  );
}
