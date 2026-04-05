import { ArrowRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 left-1/2 h-96 w-[min(90vw,42rem)] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <Badge
          variant="secondary"
          className="glass mb-6 border-white/10 bg-white/5 text-muted-foreground"
        >
          <Sparkles className="mr-1 size-3 text-primary" aria-hidden />
          Web design & automation
        </Badge>

        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
          Design that converts.{" "}
          <span className="text-gradient">Automation that lasts.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
          Premium digital experiences and a connected stack—so your business
          runs calmer, faster, with less manual glue work.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href="#contact" />}
            className="gap-2 px-6"
          >
            Get started
            <ArrowRight className="size-4" aria-hidden />
          </Button>
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<a href="#services" />}
            className="border-white/15 bg-white/5 backdrop-blur-sm"
          >
            Explore services
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Prefer email? Use{" "}
          <a href="#contact" className="text-primary underline-offset-4 hover:underline">
            Get in touch
          </a>
          —no forms required unless you want them later.
        </p>
      </div>
    </section>
  )
}
