import { homeContent } from "@/content/home";
import { getContactHref } from "@/lib/public-urls";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CalScheduleAuditButton } from "@/components/cal/CalScheduleAuditButton";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const contactHref = getContactHref();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--border)] pb-20 pt-16 sm:pb-28 sm:pt-20"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="hero-glow-orb absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-[var(--glow-1)] opacity-[0.32] blur-3xl motion-reduce:opacity-20" />
        <div className="hero-glow-orb-alt absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--glow-2)] opacity-[0.28] blur-3xl motion-reduce:opacity-20" />
      </div>

      <Container className="relative">
        <p className="hero-in mb-4 max-w-2xl text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {homeContent.tagline}
        </p>
        <h1
          id="hero-heading"
          className="hero-in hero-in-delay-1 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl sm:leading-[1.06]"
        >
          {homeContent.hero.headline}
        </h1>
        <p className="hero-in hero-in-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          {homeContent.hero.sub}
        </p>
        <div className="hero-in hero-in-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CalScheduleAuditButton variant="primary" className="min-h-12 px-6 py-3 text-sm">
            Schedule an audit
          </CalScheduleAuditButton>
          <ButtonLink href={contactHref} variant="secondary" className="min-h-12 px-6 py-3 text-sm">
            Get in touch
          </ButtonLink>
        </div>
        <p className="hero-in hero-in-delay-4 mt-6 text-sm text-[var(--muted)]">
          Prefer email? Use Get in touch—no forms required unless you want them later.
        </p>
      </Container>
    </section>
  );
}
