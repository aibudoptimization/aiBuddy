import Link from "next/link";
import { homeContent } from "@/content/home";
import { getContactHref } from "@/lib/public-urls";
import { CalScheduleAuditButton } from "@/components/cal/CalScheduleAuditButton";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Container";
import { SmartLink } from "@/components/ui/SmartLink";

export function Footer() {
  const year = new Date().getFullYear();
  const contactHref = getContactHref();
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--surface)] py-14"
    >
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <BrandMark className="align-middle" />
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
              {homeContent.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Start
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <CalScheduleAuditButton variant="link">Schedule audit</CalScheduleAuditButton>
                </li>
                <li>
                  <SmartLink href={contactHref}>Contact</SmartLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Legal
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {homeContent.footer.legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[var(--foreground)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Social
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {homeContent.footer.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[var(--foreground)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
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
        </div>
        <p className="mt-12 text-xs text-[var(--muted)]">
          © {year} {homeContent.brand}. {homeContent.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
