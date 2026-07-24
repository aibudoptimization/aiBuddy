import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePageView } from "@/components/journal/ArticlePageView";
import { getArticle, getJournalPosts } from "@/content/journal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getJournalPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.dek };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!getArticle(slug)) notFound();
  return <ArticlePageView slug={slug} />;
}
