import Link from "next/link";
import { primaryNavLinkClass } from "@/lib/primary-nav-link-class";
import {
  AUTOMATED_WORKFLOWS_TAB_ID,
  servicesPageDeepLink,
} from "@/lib/services-page-deep-link";

type ServicePoint = { readonly title: string; readonly body?: string };

type Pillar = {
  readonly name: string;
  readonly description?: string;
  readonly points: readonly ServicePoint[];
};

type AutomatedWorkflowsServiceCardProps = {
  pillar: Pillar;
};

export function AutomatedWorkflowsServiceCard({ pillar }: AutomatedWorkflowsServiceCardProps) {
  return (
    <article className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm shadow-black/10">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <h3 className="min-w-0 flex-1 text-2xl font-medium text-[var(--foreground)]">{pillar.name}</h3>
        <Link
          href={servicesPageDeepLink(AUTOMATED_WORKFLOWS_TAB_ID)}
          className={`${primaryNavLinkClass} shrink-0`}
        >
          View service
        </Link>
      </div>
      {pillar.description ? (
        <p className="mt-4 text-[var(--muted)] leading-relaxed">{pillar.description}</p>
      ) : null}
      <div className="mt-6 space-y-8">
        {pillar.points.map((point) => (
          <div key={point.title}>
            <h4 className="flex gap-2 text-sm font-semibold text-[var(--foreground)]">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                aria-hidden
              />
              <span>{point.title}</span>
            </h4>
            {typeof point.body === "string" ? (
              <p className="mt-2 pl-3.5 text-sm leading-relaxed text-[var(--muted)] sm:pl-4">
                {point.body}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
}
