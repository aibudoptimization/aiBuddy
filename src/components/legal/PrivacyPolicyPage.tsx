"use client";

import { Fragment, type ReactNode } from "react";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { CookieCategoriesTable } from "@/components/legal/CookieCategoriesTable";
import { JournalPageAmbient } from "@/components/journal/JournalPageAmbient";
import { CONTACT_EMAIL } from "@/lib/routes";

/** Renders `**bold**` and `{{email}}` tokens found in dict.privacy content strings. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\{\{email\}\})/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part === "{{email}}") {
          return (
            <a key={i} href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
              {CONTACT_EMAIL}
            </a>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export function PrivacyPolicyPage() {
  const { dict } = useLocale();
  const p = dict.privacy;
  const c = dict.cookies;

  return (
    <div className="ww-journal-page">
      <JournalPageAmbient />

      <div className="ww-journal-page__content">
        <section
          className="ww-container"
          style={{
            maxWidth: 820,
            paddingTop: "clamp(104px, 13vh, 132px)",
            paddingBottom: "clamp(64px, 12vh, 120px)",
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
              marginBottom: 22,
            }}
          >
            <span className="ww-glow-dot" style={{ width: 6, height: 6 }} aria-hidden />
            {p.eyebrow}
          </div>

          <h1
            style={{
              margin: 0,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              fontSize: "clamp(32px, 5vw, 56px)",
            }}
          >
            {p.title}
          </h1>
          <p
            className="ww-mono"
            style={{
              marginTop: 16,
              fontSize: 12,
              letterSpacing: "0.06em",
              color: "rgba(244,243,247,0.46)",
            }}
          >
            {p.lastUpdatedLabel} {p.lastUpdated}
          </p>

          <div className="ww-article-body" style={{ marginTop: 40 }}>
            <p>
              <RichText text={p.intro} />
            </p>

            {p.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.blocks.map((block, i) =>
                  block.type === "p" ? (
                    <p key={i}>
                      <RichText text={block.text} />
                    </p>
                  ) : (
                    <ul key={i}>
                      {block.items.map((item, j) => (
                        <li key={j}>
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  ),
                )}
                {section.showCookieTable ? (
                  <CookieCategoriesTable
                    categories={c.categories}
                    alwaysOnLabel={c.modal.alwaysOn}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
