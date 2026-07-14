import Link from "next/link";

import { JournalCardCanvas } from "@/components/journal/JournalCardCanvas";
import { JournalPageAmbient } from "@/components/journal/JournalPageAmbient";
import { JOURNAL_POSTS, journalPostHref } from "@/content/journal";

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL_POSTS;

  return (
    <div className="ww-journal-page">
      <JournalPageAmbient />

      <div className="ww-journal-page__content">
        <section
          className="ww-container"
          style={{
            paddingTop: "clamp(100px, 12vh, 120px)",
            paddingBottom: "clamp(30px, 5vh, 54px)",
          }}
        >
          <div
            className="ww-mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: "12.5px",
              letterSpacing: "0.22em",
              color: "rgba(244,243,247,0.62)",
              marginBottom: 26,
            }}
          >
            <span
              style={{
                flex: "none",
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#6aa8ff",
                boxShadow: "0 0 9px rgba(106,168,255,0.75)",
              }}
              aria-hidden
            />
            Le Journal
          </div>
          <h1
            style={{
              margin: 0,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              fontSize: "clamp(40px, 6.4vw, 84px)",
              maxWidth: "14ch",
              textWrap: "balance",
            }}
          >
            Idées, données et tactiques.
          </h1>
          <p
            style={{
              maxWidth: 560,
              margin: "26px 0 0",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.55,
              color: "rgba(244,243,247,0.66)",
            }}
          >
            Des analyses concrètes pour les PME du Québec qui veulent automatiser, gagner du temps et
            faire grandir leur activité.
          </p>
        </section>

        <section
          className="ww-container"
          style={{ paddingBottom: "clamp(90px, 14vh, 150px)" }}
        >
          <Link
            href={journalPostHref(featured.slug)}
            className="ww-journal-featured-link"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
              gap: 0,
              border: "1px solid rgba(244,243,247,0.1)",
              borderRadius: 24,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              marginBottom: 18,
              transition: "border-color 0.3s",
            }}
          >
            <div className="ww-journal-featured-art">
              <JournalCardCanvas motif={featured.motif} accent={featured.accent} />
              <div className="ww-journal-art-overlay" />
              <span
                className="ww-journal-cat-badge ww-journal-featured-badge"
                style={{ color: featured.accent }}
              >
                À la une · {featured.cat}
              </span>
            </div>
            <div
              style={{
                padding: "clamp(32px, 4vw, 52px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.12,
                  fontSize: "clamp(24px, 2.6vw, 34px)",
                  textWrap: "balance",
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "rgba(244,243,247,0.64)",
                }}
              >
                {featured.dek}
              </p>
              <div
                className="ww-mono"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 28,
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  color: "rgba(244,243,247,0.5)",
                }}
              >
                <span>{featured.date}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{featured.read} de lecture</span>
                <span
                  style={{
                    marginLeft: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: featured.accent,
                  }}
                >
                  Lire <span style={{ fontSize: 15 }}>→</span>
                </span>
              </div>
            </div>
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
              gap: 18,
            }}
          >
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={journalPostHref(post.slug)}
                className="ww-journal-post-link"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(244,243,247,0.1)",
                  borderRadius: 22,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color 0.3s",
                }}
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
                <div
                  style={{
                    padding: "26px 26px 28px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      fontSize: 20,
                      textWrap: "balance",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      margin: "14px 0 0",
                      fontSize: "14.5px",
                      lineHeight: 1.5,
                      color: "rgba(244,243,247,0.6)",
                    }}
                  >
                    {post.dek}
                  </p>
                  <div
                    className="ww-mono"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginTop: "auto",
                      paddingTop: 24,
                      fontSize: "11.5px",
                      letterSpacing: "0.06em",
                      color: "rgba(244,243,247,0.46)",
                    }}
                  >
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
