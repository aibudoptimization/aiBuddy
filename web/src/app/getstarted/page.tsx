import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Get started",
  description: "Thank you for submitting your WorkflowWonder form.",
};

export default function GetStartedPage() {
  return (
    <>
      <header className="border-b border-[var(--border)] bg-[var(--background)]/52 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl backdrop-saturate-[1.55]">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            <BrandMark />
          </Link>
        </Container>
      </header>

      <main className="flex-1 border-t border-[var(--border)] py-20 sm:py-28">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-8 text-center shadow-[0_0_0_1px_var(--glow-1)] sm:p-12">
            <h1 className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
              Thank you
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              We will reach out soon.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--muted)]">
              Your details were received and our team is preparing the next steps.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-semibold tracking-wide text-[var(--accent-foreground)] shadow-sm shadow-black/20 transition-[color,background-color,box-shadow] motion-safe:duration-200 hover:bg-[var(--accent-hover)] hover:shadow-md hover:shadow-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
              >
                Back to home
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
