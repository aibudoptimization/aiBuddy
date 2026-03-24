import { homeContent } from "@/content/home";
import { getContactHref, getScheduleAuditUrl } from "@/lib/public-urls";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const scheduleHref = getScheduleAuditUrl();
  const contactHref = getContactHref();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--border)] pb-20 pt-16 sm:pb-28 sm:pt-20"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-[var(--glow-1)] blur-3xl motion-reduce:opacity-20" />
        <div className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--glow-2)] blur-3xl motion-reduce:opacity-20" />
      </div>

      <Container className="relative">
        <p className="mb-4 max-w-2xl text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {homeContent.tagline}
        </p>
        <h1
          id="hero-heading"
          className="max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl sm:leading-[1.06]"
        >
          {homeContent.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          {homeContent.hero.sub}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={scheduleHref} variant="primary" className="min-h-12 px-6 py-3 text-sm">
            Schedule an audit
          </ButtonLink>
          <ButtonLink href={contactHref} variant="secondary" className="min-h-12 px-6 py-3 text-sm">
            Get in touch
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-[var(--muted)]">
          Prefer email? Use Get in touch—no forms required unless you want them later.
        </p>
      </Container>
    </section>
  );
}
