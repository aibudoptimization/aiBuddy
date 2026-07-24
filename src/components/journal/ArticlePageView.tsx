import { ArticleBody } from "@/components/journal/ArticleBody";
import { ArticleHeroCanvas } from "@/components/journal/ArticleHeroCanvas";
import { getDictionary } from "@/content/i18n";
import { getArticle, getJournalPosts } from "@/content/journal";
import { accentStyle } from "@/lib/accents";
import { notFound } from "next/navigation";

export function ArticlePageView({ slug }: { slug: string }) {
  const article = getArticle(slug);
  if (!article) notFound();

  const dict = getDictionary();
  const related = getJournalPosts()
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      slug: item.slug,
      cat: item.cat,
      title: item.title,
    }));

  return (
    <div style={accentStyle(article.accent)}>
      <section className="ww-article-hero">
        <ArticleHeroCanvas motif={article.motif} accent={article.accent} />
        <div className="ww-article-hero-overlay" />
        <div className="ww-article-hero__inner">
          <div className="ww-mono ww-article-hero__cat">
            <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
            {article.cat}
          </div>
          <h1 className="ww-article-hero__title">{article.title}</h1>
          <p className="ww-article-hero__dek">{article.dek}</p>
          <div className="ww-mono ww-article-hero__meta">
            <span>{article.date}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>
              {article.read}
              {dict.journalIndex.readingSuffix}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{article.author}</span>
          </div>
        </div>
      </section>

      <main className="ww-article-main">
        <ArticleBody
          blocks={article.blocks}
          related={related}
          tocLabel={dict.journalIndex.toc}
          readNextLabel={dict.journalIndex.readNext}
          sourcesLabel={dict.journalIndex.sources}
        />
      </main>
    </div>
  );
}
