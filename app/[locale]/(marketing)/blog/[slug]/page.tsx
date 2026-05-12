import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { blogPosts } from "@/content/blog";
import type { Locale } from "@/types/content";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    routing.locales.map((locale) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return buildPageMetadata(locale, `/blog/${slug}`, {
    title: `${post.title[loc]} · ${t("title")}`,
    description: post.excerpt[loc],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const locale = (await getLocale()) as Locale;
  const common = await getTranslations("common");

  const bodyKeys: Record<string, Record<Locale, string>> = {
    "mapping-your-first-mobility": {
      en: "Start with constraints: budget, language comfort, and credit requirements. European Era helps you translate those constraints into a short list of destinations with realistic timelines.",
      pt: "Começa pelas restrições: orçamento, conforto linguístico e créditos académicos. A European Era ajuda a traduzir isso numa lista curta de destinos com prazos realistas.",
      es: "Parte de restricciones: presupuesto, comodidad idiomática y créditos. European Era ayuda a traducir eso en una lista corta de destinos con plazos realistas.",
    },
    "what-host-organizations-look-for": {
      en: "Hosts reward clarity: specific skills, proof of collaboration, and evidence you understand their context—not generic enthusiasm.",
      pt: "Os anfitriões valorizam clareza: competências específicas, prova de colaboração e evidência de que percebes o contexto deles—não entusiasmo genérico.",
      es: "Los anfitriones premian la claridad: habilidades concretas, prueba de colaboración y evidencia de que entiendes su contexto—no entusiasmo genérico.",
    },
    "from-application-to-arrival": {
      en: "Expect parallel tracks: host interviews, learning agreements, and mobility paperwork. Build buffer weeks for each—calm teams ship fewer mistakes.",
      pt: "Espera percursos em paralelo: entrevistas, contratos de aprendizagem e mobilidade. Reserva semanas de margem—equipas calmas cometem menos erros.",
      es: "Espera procesos en paralelo: entrevistas, convenios y trámites de movilidad. Añade semanas de margen: equipos serenos cometen menos errores.",
    },
  };

  const body = bodyKeys[slug]?.[locale] ?? "";

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Link
        href="/blog"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← {common("viewAll")}
      </Link>
      <header className="mt-8 space-y-4">
        <p className="text-sm text-muted-foreground">
          {post.date} · {post.readMinutes} min
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0F172A]">
          {post.title[locale]}
        </h1>
        <p className="text-lg text-muted-foreground">{post.excerpt[locale]}</p>
      </header>
      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-soft">
        <Image
          src={post.coverImage}
          alt={post.title[locale]}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>
      <div className="prose prose-slate mt-10 max-w-none text-base leading-relaxed text-muted-foreground">
        <p>{body}</p>
        <p>
          {locale === "en" &&
            "This article is part of our structured content layer—swap the body for MDX or a CMS field when you connect your source."}
          {locale === "pt" &&
            "Este artigo faz parte da nossa camada de conteúdo estruturado—substitui o corpo por MDX ou um campo de CMS quando ligares a tua fonte."}
          {locale === "es" &&
            "Este artículo forma parte de nuestra capa de contenido estructurado: sustituye el cuerpo por MDX o un campo del CMS cuando conectes tu fuente."}
        </p>
      </div>
    </article>
  );
}
