import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function TrustStrip() {
  const { comparison } = homeContent.trust;

  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-[var(--border)] bg-[var(--background)] py-24 sm:py-32"
      aria-labelledby="trust-comparison-heading"
    >
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {homeContent.trust.title}
        </p>
        <h2
          id="trust-comparison-heading"
          className="mx-auto mt-4 max-w-2xl text-center text-2xl font-medium tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          {comparison.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--muted)]">
          {comparison.subtitle}
        </p>

        <div className="mt-12 grid min-w-0 gap-6 sm:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--background)]/40 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {comparison.otherLabel}
            </p>
            <ul className="mt-6 space-y-4">
              {comparison.other.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-[var(--muted)]">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]/50"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)]/60 p-6 shadow-[0_0_0_1px_var(--glow-1)] sm:p-8">
            <p className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)]">
              {comparison.usLabel}
            </p>
            <ul className="mt-6 space-y-4">
              {comparison.us.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-[var(--foreground)]">
                  <span
                    className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)]"
                    aria-hidden
                  >
                    <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
