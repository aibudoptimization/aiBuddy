import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function TrustStrip() {
  return (
    <section
      className="border-b border-[var(--border)] bg-[var(--surface)] py-10"
      aria-label={homeContent.trust.title}
    >
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {homeContent.trust.title}
        </p>
        <ul className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-12">
          {homeContent.trust.items.map((item) => (
            <li
              key={item}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
