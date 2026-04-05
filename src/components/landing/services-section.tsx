import { Bot, LayoutTemplate, Rocket, Share2, Workflow } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const webPoints = [
  {
    title: "Easy-to-use visual design",
    body: "Clear journeys so visitors know what you offer the moment they land—no maze, no friction.",
  },
  {
    title: "Organized building blocks",
    body: "A shared component toolkit keeps every page consistent, maintainable, and faster to extend.",
  },
  {
    title: "Launch, visibility, growth",
    body: "Performance, SEO, and analytics baked in—iterate from real usage, not guesses.",
  },
]

const autoPoints = [
  {
    icon: Bot,
    title: "Agentic AI",
    body: "Systems that interpret context and act—not only fire when a single field changes.",
  },
  {
    icon: Workflow,
    title: "Custom workflows",
    body: "Your messy manual steps mapped into a private engine that matches how you operate.",
  },
  {
    icon: Share2,
    title: "Socials automation",
    body: "Consistent presence: scheduling, monitoring, and thoughtful responses at scale.",
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 px-4 py-20 sm:px-6"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="border-white/10 bg-white/5">
            Our services
          </Badge>
          <h2
            id="services-heading"
            className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Two disciplines, one accountable partner
          </h2>
          <p className="mt-4 text-muted-foreground">
            From first impression to repeatable workflows—strategy, build, and
            handoff in one thread.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Card className="glass border-white/10 bg-card/40">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <LayoutTemplate className="size-5" aria-hidden />
                  </span>
                  <div>
                    <CardTitle className="text-lg sm:text-xl">
                      Web design & development
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Brand sites, landing systems, and product marketing surfaces.
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" nativeButton={false} render={<a href="#contact" />}>
                  View
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6">
              {webPoints.map((p) => (
                <div key={p.title} className="border-t border-white/5 pt-6 first:border-0 first:pt-0">
                  <h3 className="font-medium text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass border-white/10 bg-card/40">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <Rocket className="size-5" aria-hidden />
                  </span>
                  <div>
                    <CardTitle className="text-lg sm:text-xl">
                      Automated workflows
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Integrations, agents, and ops glue—documented and ownable.
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" nativeButton={false} render={<a href="#contact" />}>
                  View
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6">
              {autoPoints.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="flex gap-4 border-t border-white/5 pt-6 first:border-0 first:pt-0"
                  >
                    <Icon
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <div>
                      <h3 className="font-medium text-foreground">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Trusted by operators who care about craft.
        </p>
      </div>
    </section>
  )
}
