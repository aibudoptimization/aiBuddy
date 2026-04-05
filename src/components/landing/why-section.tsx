import { BookOpen, Gem, LineChart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const pillars = [
  {
    icon: Gem,
    title: "Premium execution",
    body: "Restrained aesthetics, sharp typography, and interfaces that feel intentional—not template-driven.",
  },
  {
    icon: LineChart,
    title: "Business fluency",
    body: "We speak outcomes: leads, margin, time saved—not only tickets and widgets.",
  },
  {
    icon: BookOpen,
    title: "Long-term clarity",
    body: "Automation and design decisions are documented so you’re not locked into one person’s head.",
  },
] as const

export function WhySection() {
  return (
    <section className="px-4 py-20 sm:px-6" aria-labelledby="why-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="why-heading"
          className="font-heading text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Why WorkflowWonder
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon
            return (
              <Card
                key={p.title}
                className="glass border-white/10 bg-white/[0.04]"
              >
                <CardHeader>
                  <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
