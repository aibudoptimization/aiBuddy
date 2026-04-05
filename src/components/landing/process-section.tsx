import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Goals, constraints, and what “done” means for your audit.",
  },
  {
    n: "02",
    title: "Shape",
    body: "Scope, sequence, risks, and what you’ll have at each milestone.",
  },
  {
    n: "03",
    title: "Build & ship",
    body: "Measured execution with visible progress—no black-box weeks.",
  },
  {
    n: "04",
    title: "Hand off",
    body: "Working systems plus the context your team needs to own them.",
  },
] as const

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-24 px-4 py-20 sm:px-6"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="process-heading"
          className="font-heading text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          How we work
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Ready to map your next milestone? Start with a short audit—we’ll
          outline scope and sequencing.
        </p>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n}>
              <Card className="glass h-full border-white/10 bg-card/30">
                <CardContent className="flex flex-col gap-3 pt-6">
                  <span className="font-heading text-xs font-semibold tracking-widest text-primary">
                    {s.n}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            Get started
          </Button>
        </div>
      </div>
    </section>
  )
}
