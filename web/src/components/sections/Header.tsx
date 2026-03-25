"use client";

import Link from "next/link";
import { useState } from "react";
import { getContactHref, getScheduleAuditUrl } from "@/lib/public-urls";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Container";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const scheduleHref = getScheduleAuditUrl();
  const contactHref = getContactHref();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="#top"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
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
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href={contactHref} variant="ghost" className="px-3 py-2 text-sm">
            Get in touch
          </ButtonLink>
          <ButtonLink href={scheduleHref} variant="primary" className="px-4 py-2 text-sm">
            Schedule audit
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-[var(--border-strong)] p-2 text-[var(--foreground)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="h-5 w-5"
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

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--border)] bg-[var(--background)] md:hidden"
        >
          <Container className="flex flex-col gap-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--foreground)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <ButtonLink
                href={contactHref}
                variant="secondary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Get in touch
              </ButtonLink>
              <ButtonLink
                href={scheduleHref}
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Schedule audit
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
