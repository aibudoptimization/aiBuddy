import { ARTICLES, type Article } from "@/content/articles";
import { ROUTES } from "@/lib/routes";
import type { CanvasMotif } from "@/lib/canvas/types";

export type JournalPost = {
  slug: string;
  cat: string;
  motif: CanvasMotif;
  accent: string;
  title: string;
  dek: string;
  date: string;
  read: string;
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "generer-des-leads",
    cat: "Automatisation",
    motif: "flow",
    accent: "#4bfac8",
    title:
      "L'automatisation et l'IA pour générer des leads : qui en bénéficie le plus ?",
    dek: "Le piège du « tout-à-la-main » et comment l'automatisation génère des leads, même quand vous dormez.",
    date: "12 mars 2026",
    read: "5 min",
  },
  {
    slug: "support-24-7",
    cat: "Agents IA",
    motif: "aurora",
    accent: "#8b7cff",
    title: "Le support 24/7 : l'avantage concurrentiel que vos concurrents n'ont pas",
    dek: "Pourquoi un assistant disponible en permanence capture les leads que vous perdez chaque soir.",
    date: "4 février 2026",
    read: "5 min",
  },
  {
    slug: "seo-geo-aeo",
    cat: "Visibilité",
    motif: "grid",
    accent: "#6aa8ff",
    title: "Votre site web, le SEO, le GEO et l'AEO : la fondation invisible de votre croissance",
    dek: "Trois couches d'une même stratégie de visibilité, des résultats Google aux réponses de ChatGPT.",
    date: "21 janvier 2026",
    read: "7 min",
  },
];

export function getJournalPosts(): JournalPost[] {
  return JOURNAL_POSTS;
}

export function getJournalPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES[slug];
}

export function journalPostHref(slug: string): string {
  return ROUTES.article(slug);
}
