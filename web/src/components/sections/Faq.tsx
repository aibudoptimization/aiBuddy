import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--surface)] py-20 sm:py-28"
      aria-labelledby="faq-heading"
    >
      <Container>
        <h2
          id="faq-heading"
          className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          {homeContent.faq.title}
        </h2>
        <div className="mt-12 max-w-3xl divide-y divide-[var(--border)]">
          {homeContent.faq.items.map((item) => (
            <div key={item.q} className="py-6 first:pt-0">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
