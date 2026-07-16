import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePageView } from "@/components/journal/ArticlePageView";
import { getJournalPosts, getLocalizedArticle } from "@/content/journal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getJournalPosts("fr").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getLocalizedArticle(slug, "fr");
  if (!article) return {};
  return { title: article.title, description: article.dek };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!getLocalizedArticle(slug, "fr")) notFound();
  return <ArticlePageView slug={slug} locale="fr" />;
}
