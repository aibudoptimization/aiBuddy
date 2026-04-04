import { Container } from "@/components/ui/Container";

export function ServicesPageFallback() {
  return (
    <main id="main-content" className="flex-1">
      <section
        className="border-b border-[var(--border)] py-20 sm:py-24"
        aria-label="Services"
        aria-busy="true"
      >
        <Container>
          <div className="mx-auto w-full max-w-4xl animate-pulse">
            <div className="h-3 w-20 rounded bg-[var(--border-strong)] sm:h-3.5" />
            <div className="mt-4 h-10 w-[min(100%,20rem)] rounded-lg bg-[var(--border-strong)] sm:h-12" />
            <div className="mt-3 h-3 w-full max-w-xl rounded bg-[var(--border)] sm:h-3.5" />
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="h-12 rounded-lg bg-[var(--surface-elevated)]" />
              <div className="h-12 rounded-lg bg-[var(--surface-elevated)]" />
            </div>
            <div className="mt-8 min-h-[28rem] rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/60" />
          </div>
        </Container>
      </section>
    </main>
  );
}
