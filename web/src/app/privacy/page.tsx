import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getScheduleAuditUrl } from "@/lib/public-urls";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How WorkflowWonder handles booking and contact data.",
};

export default function PrivacyPage() {
  const scheduleHref = getScheduleAuditUrl();

  return (
    <>
      <header className="border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            <BrandMark />
          </Link>
          <ButtonLink href={scheduleHref} variant="primary" className="px-4 py-2 text-sm">
            Schedule audit
          </ButtonLink>
        </Container>
      </header>

      <main className="flex-1 border-t border-[var(--border)] py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-[var(--muted)]">Last updated: March 2026</p>

          <section className="mt-10 space-y-4 text-[var(--muted)]">
            <h2 className="text-2xl font-medium text-[var(--foreground)]">What we collect</h2>
            <p>
              We collect information you choose to provide when you contact us or book an audit,
              such as name, email address, selected meeting time, and any details you include in
              booking questions.
            </p>
          </section>

          <section className="mt-8 space-y-4 text-[var(--muted)]">
            <h2 className="text-2xl font-medium text-[var(--foreground)]">How booking works</h2>
            <p>
              Scheduling is powered by Cal.com. When you use the Schedule audit flow, booking data
              is submitted to Cal.com to process your appointment.
            </p>
            <p>
              Cal.com acts as a service provider/processor for scheduling functionality. You can
              read their privacy information here:{" "}
              <a
                href="https://cal.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                cal.com/privacy
              </a>
              .
            </p>
          </section>

          <section className="mt-8 space-y-4 text-[var(--muted)]">
            <h2 className="text-2xl font-medium text-[var(--foreground)]">
              Cookies and similar tech
            </h2>
            <p>
              Our scheduling embed is used to provide a service you explicitly request (booking an
              audit). It may use cookies or local storage necessary to render and complete
              scheduling interactions.
            </p>
          </section>

          <section className="mt-8 space-y-4 text-[var(--muted)]">
            <h2 className="text-2xl font-medium text-[var(--foreground)]">Contact</h2>
            <p>
              For privacy questions, contact us via the website contact options. We will update
              this policy as needed when tools or processing activities change.
            </p>
            <p>
              <Link href="/" className="underline underline-offset-4">
                Return to home
              </Link>
            </p>
          </section>
        </Container>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-8">
        <Container className="text-sm text-[var(--muted)]">
          <p>WorkflowWonder privacy information for booking and contact workflows.</p>
        </Container>
      </footer>
    </>
  );
}
