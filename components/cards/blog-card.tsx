"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPost, Locale } from "@/types/content";
import { Card, CardContent } from "@/components/ui/card";

export function BlogCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  const common = useTranslations("common");

  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-card">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title[locale]}
            fill
            className="object-cover transition duration-500 hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <CardContent className="space-y-3 pt-6">
          <p className="text-xs font-medium text-muted-foreground">
            {post.date} · {post.readMinutes} min
          </p>
          <h2 className="text-lg font-semibold text-[#0F172A]">
            {post.title[locale]}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {post.excerpt[locale]}
          </p>
          <span className="inline-flex text-sm font-medium text-primary">
            {common("readMore")} →
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}
