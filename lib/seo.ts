import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://european-era.com";

type MetaMessages = {
  title: string;
  description: string;
};

function normalizePath(pathSegment: string) {
  if (pathSegment === "" || pathSegment === "/") return "";
  return pathSegment.startsWith("/") ? pathSegment : `/${pathSegment}`;
}

export function buildPageMetadata(
  locale: string,
  pathSegment: string,
  meta: MetaMessages,
  ogImage = "/images/og-default.png",
): Metadata {
  const path = normalizePath(pathSegment);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
  );

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/${locale}${path}`,
      siteName: "European Era",
      locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "European Era" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "European Era",
    url: siteUrl,
    logo: `${siteUrl}/logos/european-era-mark.svg`,
    sameAs: [],
  };
}
