"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/layout/BrandMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { stripLocalePrefix } from "@/lib/locale";
import { CONTACT_EMAIL, navItems } from "@/lib/routes";

export function SiteFooter() {
  const pathname = usePathname();
  const bare = stripLocalePrefix(pathname);
  const isHome = bare === "/";
  const { locale, dict, routes } = useLocale();
  const items = navItems(locale, dict.nav.services);
  const f = dict.footer;

  return (
    <footer
      id={isHome ? "contact" : undefined}
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid rgba(244,243,247,0.08)",
        background: "rgba(9,8,12,0.74)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div
        className="ww-container"
        style={{
          paddingTop: isHome ? "clamp(56px, 8vh, 88px)" : "clamp(40px, 6vh, 64px)",
          paddingBottom: 30,
        }}
      >
        {isHome ? (
          <div className="ww-footer-cta-grid">
            <div className="ww-footer-cta-card">
              <div className="ww-footer-cta-card__badge ww-mono">
                <span className="ww-glow-dot" style={{ width: 6, height: 6 }} aria-hidden />
                {f.homeCtaEyebrow}
              </div>
              <h2 className="ww-footer-cta-card__title">{f.homeCtaTitle}</h2>
              <p className="ww-footer-cta-card__lead">{f.homeCtaLead}</p>
              <div className="ww-footer-cta-card__actions">
                <Link href={routes.contact} className="ww-cta-fill">
                  {f.homeCtaButton}
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className="ww-footer-cta-card__alt">
                  {f.homeCtaAlt}
                </a>
              </div>
            </div>

            <div className="ww-faq" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                  className="ww-mono"
                  style={{ fontSize: "11.5px", letterSpacing: "0.18em", color: "var(--teal)" }}
                >
                  {f.faqLabel}
                </span>
                <span style={{ flex: 1, height: 1, background: "rgba(244,243,247,0.1)" }} />
              </div>
              {f.faq.map((item) => (
                <details
                  key={item.q}
                  open={item.open}
                  style={{ borderBottom: "1px solid rgba(244,243,247,0.08)" }}
                >
                  <summary
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "16px 0",
                      cursor: "pointer",
                      listStyle: "none",
                      fontSize: 15.5,
                      fontWeight: 500,
                    }}
                  >
                    {item.q}
                    <span className="ww-chev" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p
                    className="ww-a"
                    style={{
                      margin: "0 0 16px",
                      fontSize: 14.5,
                      lineHeight: 1.55,
                      color: "rgba(244,243,247,0.62)",
                    }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 48 }}>
          <div style={{ maxWidth: 330 }}>
            <BrandMark asLink={false} />
            <p
              style={{
                margin: "18px 0 20px",
                fontSize: "14.5px",
                lineHeight: 1.6,
                color: "rgba(244,243,247,0.55)",
              }}
            >
              {f.blurb}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{ fontSize: "14.5px", color: "var(--iris)", textDecoration: "none" }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(36px, 5vw, 68px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <span
                className="ww-mono"
                style={{
                  fontSize: "11.5px",
                  letterSpacing: "0.16em",
                  color: "rgba(244,243,247,0.4)",
                  marginBottom: 4,
                }}
              >
                {f.servicesHeading}
              </span>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: "14.5px",
                    color: "rgba(244,243,247,0.64)",
                    textDecoration: "none",
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <span
                className="ww-mono"
                style={{
                  fontSize: "11.5px",
                  letterSpacing: "0.16em",
                  color: "rgba(244,243,247,0.4)",
                  marginBottom: 4,
                }}
              >
                {f.exploreHeading}
              </span>
              <Link
                href={routes.journal}
                style={{
                  fontSize: "14.5px",
                  color: "rgba(244,243,247,0.64)",
                  textDecoration: "none",
                }}
              >
                {f.blog}
              </Link>
              <Link
                href={routes.contact}
                style={{
                  fontSize: "14.5px",
                  color: "rgba(244,243,247,0.64)",
                  textDecoration: "none",
                }}
              >
                {f.contact}
              </Link>
              <Link
                href={routes.privacy}
                style={{
                  fontSize: "14.5px",
                  color: "rgba(244,243,247,0.64)",
                  textDecoration: "none",
                }}
              >
                {f.privacy}
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginTop: "clamp(48px, 7vh, 72px)",
            paddingTop: 26,
            borderTop: "1px solid rgba(244,243,247,0.07)",
          }}
        >
          <span className="ww-mono" style={{ fontSize: 12, color: "rgba(244,243,247,0.4)" }}>
            © 2026 Workflow Wonder. {f.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
