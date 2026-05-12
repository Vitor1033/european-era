import { getLocale, getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { BlogCard } from "@/components/cards/blog-card";
import { blogPosts } from "@/content/blog";
import type { Locale } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return buildPageMetadata(locale, "/blog", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function BlogPage() {
  const t = await getTranslations("blogPage");
  const locale = (await getLocale()) as Locale;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeIn>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0F172A]">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
      </FadeIn>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <FadeIn key={post.slug} delay={0.06 * i}>
            <BlogCard post={post} locale={locale} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
