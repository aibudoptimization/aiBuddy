import { Check, X } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const typical = [
  "Scope drifts as deadlines tighten",
  "Knowledge stuck in chats and one person’s head",
  "Launch-day support, then radio silence",
]

const wonder = [
  "Written plan with milestones you can track",
  "Documentation-first so your team can operate it",
  "Senior-led collaboration without the theater",
]

export function CompareSection() {
  return (
    <section className="px-4 py-20 sm:px-6" aria-labelledby="compare-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="compare-heading"
          className="font-heading text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Why teams choose a different kind of partner
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Same budget window, different outcomes—clarity, ownership, and systems
          that survive the handoff.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card className="glass border-white/10 bg-white/[0.03]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium text-muted-foreground">
                <span className="flex size-8 items-center justify-center rounded-lg bg-white/5">
                  <X className="size-4 text-destructive" aria-hidden />
                </span>
                Typical project flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {typical.map((line) => (
                  <li key={line} className="flex gap-3 text-muted-foreground">
                    <X
                      className="mt-0.5 size-4 shrink-0 text-destructive/80"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-strong border-primary/25 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Check className="size-4" aria-hidden />
                </span>
                WorkflowWonder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {wonder.map((line) => (
                  <li key={line} className="flex gap-3 text-foreground/90">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator className="mx-auto mt-16 max-w-md bg-white/10" />
      </div>
    </section>
  )
}
