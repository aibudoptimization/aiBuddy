import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/journal/ArticleBody";
import { ArticleHeroCanvas } from "@/components/journal/ArticleHeroCanvas";
import { getArticle } from "@/content/articles";
import { JOURNAL_POSTS } from "@/content/journal";
import { accentStyle } from "@/lib/accents";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.dek };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = JOURNAL_POSTS.filter((item) => item.slug !== slug).map((item) => ({
    slug: item.slug,
    cat: item.cat,
    title: item.title,
  }));

  return (
    <div style={accentStyle(article.accent)}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#07070b",
          color: "#f4f3f7",
          borderBottom: "1px solid rgba(244,243,247,0.08)",
        }}
      >
        <ArticleHeroCanvas motif={article.motif} accent={article.accent} />
        <div className="ww-article-hero-overlay" />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 980,
            margin: "0 auto",
            padding:
              "clamp(100px, 12vh, 120px) clamp(22px, 5vw, 64px) clamp(40px, 7vh, 72px)",
          }}
        >
          <div
            className="ww-mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontSize: 12,
              letterSpacing: "0.18em",
              color: "rgba(244,243,247,0.66)",
              marginBottom: 26,
            }}
          >
            <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
            {article.cat}
          </div>
          <h1
            style={{
              margin: 0,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              fontSize: "clamp(32px, 5.4vw, 58px)",
              maxWidth: "17ch",
              textWrap: "balance",
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              margin: "22px 0 0",
              maxWidth: 560,
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.55,
              color: "rgba(244,243,247,0.72)",
            }}
          >
            {article.dek}
          </p>
          <div
            className="ww-mono"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginTop: 30,
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "rgba(244,243,247,0.52)",
            }}
          >
            <span>{article.date}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{article.read} de lecture</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{article.author}</span>
          </div>
        </div>
      </section>

      <main
        style={{
          position: "relative",
          zIndex: 2,
          background: "var(--ink)",
          minHeight: "60vh",
          padding:
            "clamp(38px, 6vh, 66px) clamp(22px, 5vw, 64px) clamp(60px, 10vh, 112px)",
        }}
      >
        <ArticleBody blocks={article.blocks} related={related} />
      </main>
    </div>
  );
}
