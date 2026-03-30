"use client";

import { useMemo, useState } from "react";
import { homeContent } from "@/content/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

const WEEKS_PER_MONTH = 4.33;

export function ValueCalculator() {
  const c = homeContent.calculator;
  const [team, setTeam] = useState(2);
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(40);

  const { monthlyHours, monthlyCost } = useMemo(() => {
    const mh = team * hours * WEEKS_PER_MONTH;
    const mc = mh * rate;
    return { monthlyHours: Math.round(mh), monthlyCost: mc };
  }, [team, hours, rate]);

  const formattedCost = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(monthlyCost),
    [monthlyCost],
  );

  return (
    <section
      id="calculator"
      className="scroll-mt-24 border-b border-[var(--border)] bg-[var(--background)] py-24 sm:py-32"
      aria-labelledby="calculator-heading"
    >
      <Container>
        <h2
          id="calculator-heading"
          className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          {c.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">{c.sub}</p>

        <div className="mt-12 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]/90 p-6 shadow-[0_0_0_1px_var(--glow-1)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0 space-y-8">
              <label className="block">
                <span className="text-sm font-medium text-[var(--foreground)]">{c.teamLabel}</span>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={team}
                    onChange={(e) => setTeam(Number(e.target.value))}
                    className="h-2 w-full min-w-0 cursor-pointer accent-[var(--accent)]"
                  />
                  <span className="min-w-[2.5rem] text-right text-sm tabular-nums text-[var(--muted)]">
                    {team}
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--foreground)]">{c.hoursLabel}</span>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="h-2 w-full min-w-0 cursor-pointer accent-[var(--accent)]"
                  />
                  <span className="min-w-[2.5rem] text-right text-sm tabular-nums text-[var(--muted)]">
                    {hours}
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--foreground)]">{c.rateLabel}</span>
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-sm text-[var(--muted)]" aria-hidden>
                    {c.currency}
                  </span>
                  <input
                    type="range"
                    min={15}
                    max={250}
                    step={5}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="h-2 w-full min-w-0 cursor-pointer accent-[var(--accent)]"
                  />
                  <span className="min-w-[3rem] text-right text-sm tabular-nums text-[var(--muted)]">
                    {rate}
                  </span>
                </div>
              </label>
            </div>

            <div className="flex min-w-0 flex-col justify-center rounded-xl border border-[var(--border)] bg-[var(--background)]/50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {c.resultIntro}
              </p>
              <p className="mt-2 text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
                ~{monthlyHours}{" "}
                <span className="text-lg font-normal text-[var(--muted)] sm:text-xl">hrs / mo</span>
              </p>
              <p className="mt-4 text-2xl font-semibold tabular-nums text-[var(--foreground)] sm:text-3xl">
                {formattedCost}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">{c.reclaimLine}</p>
              <p className="mt-3 text-xs text-[var(--muted)]">{c.footnote}</p>
              <div className="mt-8">
                <ButtonLink href="/getstarted" variant="primary" className="min-h-12 w-full px-6 py-3 text-sm sm:w-auto">
                  Get started
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
