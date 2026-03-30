import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Get started",
  description: "Start your WorkflowWonder project by sharing your details.",
};

export default function GetStartedPage() {
  const formUrl = process.env.NEXT_PUBLIC_N8N_FORM_URL?.trim();

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
        </Container>
      </header>

      <main className="flex-1 border-t border-[var(--border)] py-14 sm:py-20">
        <Container className="max-w-4xl">
          <h1 className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
            Get started
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Tell us about your goals and current workflow setup. We will use this to prepare the
            right next steps.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_0_0_1px_var(--glow-1)]">
            {formUrl ? (
              <iframe
                src={formUrl}
                title="Get started form"
                className="mx-auto block w-full"
                style={{ minHeight: "800px" }}
              />
            ) : (
              <div className="p-8 text-sm text-[var(--muted)]">
                The form is currently unavailable. Set `NEXT_PUBLIC_N8N_FORM_URL` to enable the
                embed.
              </div>
            )}
          </div>
        </Container>
      </main>
    </>
  );
}
