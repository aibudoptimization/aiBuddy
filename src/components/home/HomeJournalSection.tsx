"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { getJournalPosts } from "@/content/journal";
import { hexToRgb } from "@/lib/accents";

export function HomeJournalSection() {
  const { dict, routes } = useLocale();
  const j = dict.home.journal;
  const posts = getJournalPosts().slice(0, 3);

  return (
    <section
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(40px, 7vh, 90px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 38 }}>
        <h2 className="ww-section-title">{j.title}</h2>
        <Link href={routes.journal} className="ww-mono ww-link-muted">
          {j.allArticles}
        </Link>
      </div>
      <div className="ww-journal-grid">
        {posts.map((post) => (
          <div key={post.slug}>
            <Link
              href={routes.article(post.slug)}
              className="ww-journal-card"
              style={{
                // Each card carries its own article's accent. This used to be
                // a positional list, which is why the SEO piece read blue.
                ["--journal-accent" as string]: post.accent,
                ["--journal-hover-border" as string]: `rgba(${hexToRgb(post.accent)},0.45)`,
              }}
            >
              <span className="ww-mono ww-journal-card__tag">
                {post.cat} · {post.read}
              </span>
              <h3>{post.title}</h3>
              <p>{post.dek}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
