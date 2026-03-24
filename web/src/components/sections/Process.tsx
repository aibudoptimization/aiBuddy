import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-y border-[var(--border)] bg-[var(--surface)] py-20 sm:py-28"
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
      </Container>
    </section>
  );
}
