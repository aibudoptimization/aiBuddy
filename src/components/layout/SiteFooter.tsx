"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/layout/BrandMark";
import { CONTACT_EMAIL, NAV_ITEMS, ROUTES } from "@/lib/routes";

const FAQ_ITEMS = [
  {
    q: "Combien de temps prend un projet ?",
    a: "La plupart des projets sont livrés en 2 à 6 semaines selon leur ampleur. Vous recevez un échéancier clair dès la consultation.",
    open: true,
  },
  {
    q: "Est-ce que je reste propriétaire de mes systèmes ?",
    a: "Oui, à 100 %. Tout est bâti sur vos propres comptes et vous est transféré, code, accès et documentation compris.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Chaque projet est unique. On part d'une consultation gratuite, puis vous recevez un devis détaillé sous 24\u00a0h, sans engagement.",
  },
  {
    q: "Faut-il des connaissances techniques de notre côté ?",
    a: "Aucune. On s'occupe de la mise en place et on vous forme à l'essentiel pour que vous restiez autonome.",
  },
  {
    q: "Avec quels outils travaillez-vous ?",
    a: "On se connecte à vos outils existants si possible, CRM, courriel, e-commerce, etc., plutôt que de tout remplacer.",
  },
];

export function SiteFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "clamp(24px, 2.4vw, 36px)",
              alignItems: "stretch",
              paddingBottom: "clamp(48px, 6vh, 70px)",
              marginBottom: "clamp(48px, 6vh, 70px)",
              borderBottom: "1px solid rgba(244,243,247,0.08)",
            }}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(139,124,255,0.28)",
                borderRadius: 24,
                padding: "clamp(34px, 3.4vw, 48px)",
                display: "flex",
                flexDirection: "column",
                background:
                  "linear-gradient(165deg, rgba(139,124,255,0.12), rgba(18,16,26,0.4) 52%)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  gap: 9,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(244,243,247,0.7)",
                  padding: "7px 13px",
                  border: "1px solid rgba(244,243,247,0.16)",
                  borderRadius: 999,
                  marginBottom: 26,
                }}
              >
                <span className="ww-glow-dot" style={{ width: 6, height: 6 }} aria-hidden />
                Consultation gratuite · sans engagement
              </div>
              <h2
                style={{
                  position: "relative",
                  margin: 0,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  fontSize: "clamp(30px, 3.4vw, 46px)",
                }}
              >
                Prêt à gagner
                <br />
                du temps ?
              </h2>
              <p
                style={{
                  position: "relative",
                  margin: "18px 0 0",
                  maxWidth: 400,
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "rgba(244,243,247,0.7)",
                }}
              >
                Parlons de votre activité. On revient vers vous sous 24&nbsp;h avec une première
                piste d&apos;automatisation concrète.
              </p>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "14px 22px",
                  marginTop: "auto",
                  paddingTop: 32,
                }}
              >
                <Link href={ROUTES.contact} className="ww-cta-fill">
                  Parlons-en
                </Link>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 15,
                    color: "var(--iris)",
                    textDecoration: "none",
                  }}
                >
                  ou écrivez-nous
                </a>
              </div>
            </div>

            <div className="ww-faq" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                  className="ww-mono"
                  style={{ fontSize: "11.5px", letterSpacing: "0.18em", color: "var(--teal)" }}
                >
                  FAQ
                </span>
                <span style={{ flex: 1, height: 1, background: "rgba(244,243,247,0.1)" }} />
              </div>
              {FAQ_ITEMS.map((item) => (
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
                      gap: 18,
                      padding: "19px 2px",
                    }}
                  >
                    <span
                      className="ww-q"
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: "rgba(244,243,247,0.86)",
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="ww-chev ww-accent-text"
                      style={{ flex: "none", fontSize: 20, lineHeight: 1, fontWeight: 300 }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="ww-a"
                    style={{
                      margin: 0,
                      padding: "0 2px 22px",
                      fontSize: "14.5px",
                      lineHeight: 1.6,
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
              Automatisations IA et systèmes sur mesure pour les entrepreneurs qui veulent gagner du
              temps et développer leur activité.
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
                Services
              </span>
              {NAV_ITEMS.map((item) => (
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
                Ressources
              </span>
              <Link
                href={ROUTES.journal}
                style={{
                  fontSize: "14.5px",
                  color: "rgba(244,243,247,0.64)",
                  textDecoration: "none",
                }}
              >
                Blog
              </Link>
              <Link
                href={ROUTES.contact}
                style={{
                  fontSize: "14.5px",
                  color: "rgba(244,243,247,0.64)",
                  textDecoration: "none",
                }}
              >
                Contact
              </Link>
              <Link
                href={ROUTES.privacy}
                style={{
                  fontSize: "14.5px",
                  color: "rgba(244,243,247,0.64)",
                  textDecoration: "none",
                }}
              >
                Confidentialité
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
          <span
            className="ww-mono"
            style={{ fontSize: 12, color: "rgba(244,243,247,0.4)" }}
          >
            © 2026 Workflow Wonder. Tous droits réservés.
          </span>
        </div>
      </div>
    </footer>
  );
}
