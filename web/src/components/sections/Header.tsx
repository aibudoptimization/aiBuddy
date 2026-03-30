"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getN8nFormUrl } from "@/lib/public-urls";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Container";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Estimate", href: "#calculator" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

const navLinkClass =
  "relative inline-flex py-1 text-sm text-[var(--muted)] transition-colors motion-safe:duration-200 hover:text-[var(--foreground)] after:pointer-events-none after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--accent)] after:opacity-80 after:transition-transform motion-safe:after:duration-300 motion-safe:after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] focus-visible:after:scale-x-100";

const SCROLL_HIDE_AFTER = 48;
const DELTA_THRESHOLD = 8;

export function Header() {
  const formHref = getN8nFormUrl();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      if (reduceMotion || open) {
        setHiddenByScroll(false);
        lastScrollY.current = y;
        return;
      }

      if (y < 16) {
        setHiddenByScroll(false);
        lastScrollY.current = y;
        return;
      }

      const delta = y - lastScrollY.current;
      if (y > SCROLL_HIDE_AFTER && delta > DELTA_THRESHOLD) {
        setHiddenByScroll(true);
      } else if (delta < -DELTA_THRESHOLD) {
        setHiddenByScroll(false);
      }
      lastScrollY.current = y;
    };

    lastScrollY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, reduceMotion]);

  const hideBar = hiddenByScroll && !open && !reduceMotion;

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b backdrop-saturate-150",
        "transition-[border-color,box-shadow,background-color,backdrop-filter,transform] motion-safe:duration-300 motion-safe:ease-out",
        hideBar ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "border-[var(--border-strong)] bg-[var(--background)]/78 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45),0_0_0_1px_var(--glow-1)] backdrop-blur-xl"
          : "border-[var(--border)] bg-[var(--background)]/88 shadow-none backdrop-blur-md",
      ].join(" ")}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="#top"
          className="rounded-sm transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-out hover:opacity-95 motion-safe:hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
        >
          <span className="hidden sm:inline-flex">
            <BrandMark />
          </span>
          <span className="inline-flex sm:hidden">
            <BrandMark compact />
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <ButtonLink href={formHref} variant="primary" className="rounded-full px-5 py-2.5 text-sm">
            Get started
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)]/40 p-2 text-[var(--foreground)] transition-[border-color,background-color,color,transform] motion-safe:duration-200 hover:border-[var(--accent)]/35 hover:bg-[var(--surface-elevated)]/80 active:scale-[0.97] md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            className="h-5 w-5 transition-transform motion-safe:duration-200 motion-safe:ease-out"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={[
          "grid overflow-hidden border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
        inert={!open}
        aria-hidden={!open}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--foreground)] transition-colors motion-safe:duration-150 hover:text-[var(--accent)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-[var(--border)] pt-4">
              <ButtonLink
                href={formHref}
                variant="primary"
                className="w-full rounded-full py-3 text-sm"
                onClick={() => setOpen(false)}
              >
                Get started
              </ButtonLink>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
