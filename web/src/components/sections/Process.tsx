import { homeContent } from "@/content/home";
import { getN8nFormUrl } from "@/lib/public-urls";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function Process() {
  const formHref = getN8nFormUrl();

  return (
    <section
      id="process"
      className="scroll-mt-24 border-b border-[var(--border)] bg-[var(--background)] py-24 sm:py-32"
      aria-labelledby="process-heading"
    >
      <Container>
        <h2
          id="process-heading"
          className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          {homeContent.process.title}
        </h2>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {homeContent.process.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-[var(--border)] pt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-[var(--muted)]">{homeContent.process.ctaSub}</p>
          <ButtonLink href={formHref} variant="primary" className="min-h-12 rounded-full px-6 py-3 text-sm">
            Get started
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
