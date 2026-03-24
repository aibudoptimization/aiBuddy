import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="services-heading"
    >
      <Container>
        <h2
          id="services-heading"
          className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          {homeContent.services.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          {homeContent.services.intro}
        </p>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {homeContent.services.pillars.map((pillar) => (
            <article
              key={pillar.name}
              className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm shadow-black/10"
            >
              <h3 className="text-2xl font-medium text-[var(--foreground)]">
                {pillar.name}
              </h3>
              <p className="mt-4 text-[var(--muted)] leading-relaxed">
                {pillar.description}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-[var(--foreground)]">
                {pillar.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
