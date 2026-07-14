"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";

import { BrandMark } from "@/components/layout/BrandMark";
import { NAV_ITEMS, ROUTES } from "@/lib/routes";

type SiteHeaderProps = {
  fixed?: boolean;
};

function isJournalArticlePath(pathname: string) {
  return pathname.startsWith("/journal/") && pathname.length > "/journal/".length;
}

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function SiteHeader({ fixed = true }: SiteHeaderProps) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const isJournalArticle = isJournalArticlePath(pathname);

  const handleHomeHashClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname !== "/") return;
    event.preventDefault();
    scrollToHash(hash);
  };

  return (
    <header
      style={{
        position: fixed ? "fixed" : "relative",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 6,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "30px clamp(28px, 5vw, 72px)",
      }}
    >
      <BrandMark />

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(18px, 2.4vw, 38px)",
          fontSize: "14.5px",
          color: "rgba(244,243,247,0.66)",
        }}
      >
        {isJournalArticle ? (
          <Link
            href={ROUTES.journal}
            className="ww-mono"
            style={{
              fontSize: "12.5px",
              letterSpacing: "0.04em",
              color: "rgba(244,243,247,0.7)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span aria-hidden>←</span> Tous les articles
          </Link>
        ) : (
          <>
            <div
              className={`ww-nav-wrap${navOpen ? " is-open" : ""}`}
              style={{ position: "relative" }}
              onMouseEnter={() => setNavOpen(true)}
              onMouseLeave={() => setNavOpen(false)}
            >
              <button
                type="button"
                onClick={() => setNavOpen((open) => !open)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "inherit",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  font: "inherit",
                  padding: 0,
                }}
                aria-expanded={navOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown size={10} strokeWidth={2.6} className="ww-nav-chev" />
              </button>

              <div className={`ww-nav-panel${navOpen ? " is-open" : ""}`}>
                <div
                  style={{
                    minWidth: 312,
                    background: "rgba(12,12,18,0.97)",
                    border: "1px solid rgba(244,243,247,0.1)",
                    borderRadius: 16,
                    padding: 8,
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="ww-nav-dropdown-item"
                      style={{ ["--nav-hover-bg" as string]: item.hoverBg }}
                      onClick={() => setNavOpen(false)}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                          fontSize: "14.5px",
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        <span
                          style={{
                            flex: "none",
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            background: item.accent,
                            boxShadow: `0 0 9px ${item.accent}cc`,
                          }}
                          aria-hidden
                        />
                        {item.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "rgba(244,243,247,0.45)",
                          paddingLeft: 15,
                        }}
                      >
                        {item.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/#approche"
              style={{ color: "inherit", textDecoration: "none" }}
              onClick={(event) => handleHomeHashClick(event, "#approche")}
            >
              Approche
            </Link>
            <Link
              href={ROUTES.contact}
              style={{
                color: "var(--snow)",
                textDecoration: "none",
                border: "1px solid rgba(244,243,247,0.18)",
                padding: "9px 18px",
                borderRadius: 999,
              }}
            >
              Discutons
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
