"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";

import { BrandMark } from "@/components/layout/BrandMark";
import { NavGlobeButton } from "@/components/layout/NavGlobeButton";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { saveLangPref } from "@/lib/langPref";
import { switchLocalePath, stripLocalePrefix } from "@/lib/locale";
import { navItems } from "@/lib/routes";

type SiteHeaderProps = {
  fixed?: boolean;
};

function isJournalArticlePath(barePath: string) {
  return barePath.startsWith("/journal/") && barePath.length > "/journal/".length;
}

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function SiteHeader({ fixed = true }: SiteHeaderProps) {
  const pathname = usePathname();
  const bare = stripLocalePrefix(pathname);
  const { locale, dict, routes } = useLocale();
  const items = navItems(locale, dict.nav.services);
  const [navOpen, setNavOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isJournalArticle = isJournalArticlePath(bare);
  const homePath = routes.home;

  // Close any open menus when the route changes (state adjustment during render,
  // so the closed menus and the new page paint together).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setNavOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const handleHomeHashClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (bare !== "/") return;
    event.preventDefault();
    scrollToHash(hash);
    setMobileOpen(false);
  };

  const otherLocale = locale === "fr" ? "en" : "fr";
  const langHref = switchLocalePath(pathname, otherLocale);

  return (
    <header className={`ww-header${fixed ? " ww-header--fixed" : ""}`}>
      <BrandMark />

      <nav className="ww-header__nav ww-header__nav--desktop" aria-label={dict.chrome.primaryNav}>
        {isJournalArticle ? (
          <Link href={routes.journal} className="ww-mono ww-header__back">
            <span aria-hidden>←</span> {dict.chrome.allArticles}
          </Link>
        ) : (
          <>
            <div
              className={`ww-nav-wrap${navOpen ? " is-open" : ""}`}
              onMouseEnter={() => setNavOpen(true)}
              onMouseLeave={() => setNavOpen(false)}
            >
              <button
                type="button"
                onClick={() => setNavOpen((open) => !open)}
                className="ww-header__link-btn"
                aria-expanded={navOpen}
                aria-haspopup="true"
              >
                {dict.chrome.services}
                <ChevronDown size={10} strokeWidth={2.6} className="ww-nav-chev" />
              </button>

              <div className={`ww-nav-panel${navOpen ? " is-open" : ""}`} role="menu">
                <div className="ww-nav-panel__inner">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="ww-nav-dropdown-item"
                      role="menuitem"
                      style={{ ["--nav-hover-bg" as string]: item.hoverBg }}
                      onClick={() => setNavOpen(false)}
                    >
                      <span className="ww-nav-dropdown-item__title">
                        <span
                          className="ww-nav-dropdown-item__dot"
                          style={{
                            background: item.accent,
                            boxShadow: `0 0 9px ${item.accent}cc`,
                          }}
                          aria-hidden
                        />
                        {item.title}
                      </span>
                      <span className="ww-nav-dropdown-item__tag">{item.tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href={routes.realisations} className="ww-header__link">
              {dict.chrome.realisations}
            </Link>
            <Link
              href={`${homePath}#approche`}
              className="ww-header__link"
              onClick={(event) => handleHomeHashClick(event, "#approche")}
            >
              {dict.chrome.approach}
            </Link>
            <Link href={routes.contact} className="ww-header__cta">
              <span className="ww-header__cta-full">{dict.chrome.consultCta}</span>
              <span className="ww-header__cta-short">
                {locale === "en" ? "Consult" : "Consultation"}
              </span>
            </Link>
            <Link
              href={langHref}
              className="ww-header__lang ww-mono"
              aria-label={dict.chrome.langSwitchLabel}
              onClick={() => saveLangPref(otherLocale)}
            >
              {otherLocale === "en" ? dict.chrome.langEn : dict.chrome.langFr}
            </Link>
          </>
        )}
      </nav>

      {!isJournalArticle ? (
        <div className="ww-header__mobile-bar">
          <Link
            href={langHref}
            className="ww-header__lang ww-mono"
            aria-label={dict.chrome.langSwitchLabel}
            onClick={() => saveLangPref(otherLocale)}
          >
            {otherLocale === "en" ? dict.chrome.langEn : dict.chrome.langFr}
          </Link>
          <NavGlobeButton
            open={mobileOpen}
            onToggle={() => setMobileOpen((o) => !o)}
            ariaControls="ww-mobile-drawer"
            ariaLabel={mobileOpen ? dict.chrome.closeMenu : dict.chrome.openMenu}
          />
        </div>
      ) : (
        <Link href={routes.journal} className="ww-mono ww-header__back ww-header__back--mobile">
          <span aria-hidden>←</span> {dict.chrome.allArticles}
        </Link>
      )}

      <div
        id="ww-mobile-drawer"
        className={`ww-mobile-drawer${mobileOpen ? " is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="ww-mobile-drawer__panel">
          <p className="ww-mono ww-mobile-drawer__label">{dict.chrome.services}</p>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="ww-mobile-drawer__link"
              onClick={() => setMobileOpen(false)}
            >
              <span
                className="ww-nav-dropdown-item__dot"
                style={{ background: item.accent, boxShadow: `0 0 9px ${item.accent}cc` }}
                aria-hidden
              />
              {item.title}
            </Link>
          ))}
          <Link
            href={routes.realisations}
            className="ww-mobile-drawer__link"
            onClick={() => setMobileOpen(false)}
          >
            {dict.chrome.realisations}
          </Link>
          <Link
            href={`${homePath}#approche`}
            className="ww-mobile-drawer__link"
            onClick={(event) => handleHomeHashClick(event, "#approche")}
          >
            {dict.chrome.approach}
          </Link>
          <Link
            href={routes.contact}
            className="ww-cta-fill ww-mobile-drawer__cta"
            onClick={() => setMobileOpen(false)}
          >
            {dict.chrome.consultCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
