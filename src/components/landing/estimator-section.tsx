import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

function setFromSlider(
  v: number | readonly number[],
  setter: (n: number) => void
) {
  const n = Array.isArray(v) ? v[0] : v
  if (typeof n === "number" && !Number.isNaN(n)) setter(n)
}

export function EstimatorSection() {
  const [people, setPeople] = useState(2)
  const [hours, setHours] = useState(8)
  const [rate, setRate] = useState(40)

  const { monthlyHours, monthlyCost } = useMemo(() => {
    const monthlyHours = people * hours * 4.33
    const monthlyCost = Math.round(monthlyHours * rate)
    return { monthlyHours, monthlyCost }
  }, [people, hours, rate])

  return (
    <section
      id="estimate"
      className="scroll-mt-24 px-4 py-20 sm:px-6"
      aria-labelledby="estimate-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="estimate-heading"
          className="font-heading text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          What manual glue work may be costing you
        </h2>
        <p className="mt-4 text-center text-muted-foreground">
          Indicative only—adjust the sliders to reflect your reality.
        </p>

        <Card className="glass-strong mt-12 border-white/10">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Rough monthly time cost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  People in repetitive workflows
                </span>
                <span className="font-medium tabular-nums text-foreground">
                  {people}
                </span>
              </div>
              <Slider
                min={1}
                max={25}
                step={1}
                value={[people]}
                onValueChange={(v) => setFromSlider(v, setPeople)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Hours per person per week on manual steps
                </span>
                <span className="font-medium tabular-nums text-foreground">
                  {hours}
                </span>
              </div>
              <Slider
                min={1}
                max={40}
                step={1}
                value={[hours]}
                onValueChange={(v) => setFromSlider(v, setHours)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Average loaded hourly cost ($)
                </span>
                <span className="font-medium tabular-nums text-foreground">
                  {rate}
                </span>
              </div>
              <Slider
                min={15}
                max={200}
                step={5}
                value={[rate]}
                onValueChange={(v) => setFromSlider(v, setRate)}
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Rough monthly time cost
                  </p>
                  <p className="font-heading text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
                    ~{Math.round(monthlyHours)} hrs / mo
                  </p>
                </div>
                <p className="font-heading text-2xl font-semibold tabular-nums text-primary sm:text-3xl">
                  ${monthlyCost.toLocaleString()}
                </p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Well-designed automation and clearer handoffs often reclaim a
                large share of this over time—not as magic, but as momentum.
                Not financial advice; for discussion on a call.
              </p>
            </div>

            <Button
              nativeButton={false}
              render={<a href="#contact" />}
              className="w-full sm:w-auto"
            >
              Get started
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
