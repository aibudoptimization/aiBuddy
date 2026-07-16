"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { getJournalPosts } from "@/content/journal";

export function HomeJournalSection() {
  const { dict, routes, locale } = useLocale();
  const j = dict.home.journal;
  const posts = getJournalPosts(locale).slice(0, 3);

  const accents = ["#4bfac8", "#8b7cff", "#6aa8ff"] as const;
  const hovers = [
    "rgba(75,250,200,0.4)",
    "rgba(139,124,255,0.45)",
    "rgba(106,168,255,0.45)",
  ] as const;

  return (
    <section
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(40px, 7vh, 90px)",
      }}
    >
      <Reveal className="ww-section-header" style={{ marginBottom: 38 }}>
        <h2 className="ww-section-title">{j.title}</h2>
        <Link href={routes.journal} className="ww-mono ww-link-muted">
          {j.allArticles}
        </Link>
      </Reveal>
      <div className="ww-journal-grid">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delayMs={60 + i * 70}>
            <Link
              href={routes.article(post.slug)}
              className="ww-journal-card"
              style={{
                ["--journal-accent" as string]: accents[i] ?? post.accent,
                ["--journal-hover-border" as string]: hovers[i] ?? "rgba(244,243,247,0.3)",
              }}
            >
              <span className="ww-mono ww-journal-card__tag">
                {post.cat} · {post.read}
              </span>
              <h3>{post.title}</h3>
              <p>{post.dek}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
