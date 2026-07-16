"use client";

import Link from "next/link";

import { JournalCardCanvas } from "@/components/journal/JournalCardCanvas";
import { JournalIndexIntro } from "@/components/journal/JournalIndexIntro";
import { JournalPageAmbient } from "@/components/journal/JournalPageAmbient";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getJournalPosts } from "@/content/journal";

export default function JournalPage() {
  const { dict, routes, locale } = useLocale();
  const posts = getJournalPosts(locale);
  const [featured, ...rest] = posts;
  const j = dict.journalIndex;

  return (
    <div className="ww-journal-page">
      <JournalPageAmbient />

      <div className="ww-journal-page__content">
        <JournalIndexIntro />

        <section
          className="ww-container"
          style={{ paddingBottom: "clamp(90px, 14vh, 150px)" }}
        >
          <Link href={routes.article(featured.slug)} className="ww-journal-featured-link">
            <div className="ww-journal-featured-art">
              <JournalCardCanvas motif={featured.motif} accent={featured.accent} />
              <div className="ww-journal-art-overlay" />
              <span
                className="ww-journal-cat-badge ww-journal-featured-badge"
                style={{ color: featured.accent }}
              >
                {j.featured} · {featured.cat}
              </span>
            </div>
            <div className="ww-journal-featured-body">
              <h2>{featured.title}</h2>
              <p>{featured.dek}</p>
              <div className="ww-mono ww-journal-featured-meta">
                <span>{featured.date}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>
                  {featured.read}
                  {j.readingSuffix}
                </span>
                <span className="ww-journal-featured-read" style={{ color: featured.accent }}>
                  {j.read}
                </span>
              </div>
            </div>
          </Link>

          <div className="ww-journal-cards">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={routes.article(post.slug)}
                className="ww-journal-post-link"
              >
                <div className="ww-journal-card-thumb">
                  <JournalCardCanvas motif={post.motif} accent={post.accent} />
                  <span
                    className="ww-journal-cat-badge ww-journal-card-badge"
                    style={{ color: post.accent }}
                  >
                    {post.cat}
                  </span>
                </div>
                <div className="ww-journal-post-body">
                  <h3>{post.title}</h3>
                  <p>{post.dek}</p>
                  <div className="ww-mono ww-journal-post-meta">
                    <span>{post.date}</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{post.read}</span>
                    <span style={{ marginLeft: "auto", color: post.accent }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
