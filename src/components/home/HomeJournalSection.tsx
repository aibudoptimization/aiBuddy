import Link from "next/link";

import { JOURNAL_PREVIEW } from "@/content/home";
import { ROUTES } from "@/lib/routes";

export function HomeJournalSection() {
  return (
    <section
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(40px, 7vh, 90px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 38 }}>
        <h2 className="ww-section-title">Le Journal</h2>
        <Link href={ROUTES.journal} className="ww-mono ww-link-muted">
          Tous les articles <span>→</span>
        </Link>
      </div>
      <div className="ww-journal-grid">
        {JOURNAL_PREVIEW.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="ww-journal-card"
            style={{ ["--journal-accent" as string]: post.accent, ["--journal-hover-border" as string]: post.borderHover }}
          >
            <span className="ww-mono ww-journal-card__tag">{post.tag}</span>
            <h3>{post.title}</h3>
            <p>{post.dek}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
