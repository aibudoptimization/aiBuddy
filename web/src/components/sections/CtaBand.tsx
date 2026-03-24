import { homeContent } from "@/content/home";
import { getContactHref, getScheduleAuditUrl } from "@/lib/public-urls";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function CtaBand() {
  const scheduleHref = getScheduleAuditUrl();
  const contactHref = getContactHref();

  return (
    <section
      id="book-audit"
      className="scroll-mt-24 border-t border-[var(--border)] py-20 sm:py-24"
      aria-labelledby="cta-heading"
    >
      <Container>
        <div className="rounded-2xl border border-[var(--border-strong)] bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface)] px-8 py-12 sm:px-12 sm:py-14">
          <h2
            id="cta-heading"
            className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            {homeContent.cta.title}
          </h2>
          <p className="mt-4 max-w-xl text-[var(--muted)]">
            {homeContent.cta.sub}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={scheduleHref} variant="primary" className="min-h-12 px-6 py-3">
              Schedule an audit
            </ButtonLink>
            <ButtonLink href={contactHref} variant="secondary" className="min-h-12 px-6 py-3">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
