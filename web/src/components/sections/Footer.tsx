import Link from "next/link";
import { homeContent } from "@/content/home";
import { getContactHref } from "@/lib/public-urls";
import { CalScheduleAuditButton } from "@/components/cal/CalScheduleAuditButton";
import { BrandMark } from "@/components/brand/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SmartLink } from "@/components/ui/SmartLink";

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export function Footer() {
  const year = new Date().getFullYear();
  const contactHref = getContactHref();

  return (
    <footer id="contact" className="scroll-mt-24 bg-[var(--background)]">
      <div className="bg-[var(--background)] py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
                {homeContent.footer.ctaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {homeContent.footer.ctaSub}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CalScheduleAuditButton variant="primary" className="min-h-12 rounded-full px-8 py-3 text-sm">
                Schedule an audit
              </CalScheduleAuditButton>
              <ButtonLink href="#about" variant="secondary" className="min-h-12 rounded-full px-8 py-3 text-sm">
                {homeContent.footer.aboutLabel}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div className="lg:col-span-1">
              <BrandMark className="align-middle" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
                {homeContent.tagline}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Pages</p>
              <ul className="mt-4 space-y-3 text-sm">
                {homeContent.footer.pages.map((item) => (
                  <li key={item.href + item.label}>
                    {isExternal(item.href) ? (
                      <a
                        href={item.href}
                        className="text-[var(--foreground)] underline-offset-4 transition-colors motion-safe:duration-200 hover:text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[var(--foreground)] underline-offset-4 transition-colors motion-safe:duration-200 hover:text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Start</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <CalScheduleAuditButton variant="link" className="text-[var(--foreground)]">
                    Schedule audit
                  </CalScheduleAuditButton>
                </li>
                <li>
                  <SmartLink href={contactHref}>Get in touch</SmartLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Legal & social</p>
              <ul className="mt-4 space-y-3 text-sm">
                {homeContent.footer.legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[var(--foreground)] underline-offset-4 transition-colors motion-safe:duration-200 hover:text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {homeContent.footer.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[var(--foreground)] underline-offset-4 transition-colors motion-safe:duration-200 hover:text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-14 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)]">
            © {year} {homeContent.brand}. {homeContent.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}
