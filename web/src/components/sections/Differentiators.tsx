import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function Differentiators() {
  return (
    <section
      className="py-20 sm:py-28"
      aria-labelledby="why-heading"
    >
      <Container>
        <h2
          id="why-heading"
          className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          {homeContent.differentiators.title}
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {homeContent.differentiators.points.map((point) => (
            <div key={point.title}>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
