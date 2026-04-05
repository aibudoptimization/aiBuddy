import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const pages = [
  { to: "/services", label: "Services" },
  { to: "/#estimate", label: "Estimate" },
  { to: "/#process", label: "Process" },
  { to: "/#faq", label: "FAQ" },
  { to: "/#contact", label: "Contact" },
] as const

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-24 px-4 pb-12 pt-20 sm:px-6">
      <div className="glass-strong mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready for calmer, clearer operations?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Book a short audit or send a note—we’ll reply with practical next
            steps, not a generic pitch deck.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="mailto:hello@wfwonder.com" />}
            >
              Get started
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href="mailto:hello@wfwonder.com" />}
              className="border-white/15 bg-white/5"
            >
              Get in touch
            </Button>
          </div>
        </div>

        <Separator className="my-14 bg-white/10" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-heading text-lg font-semibold">
              Workflow<span className="text-primary">Wonder</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Web design & automation for teams that outgrow brittle tools.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Pages
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="text-foreground/80 hover:text-primary"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Legal & social
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 hover:text-primary"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 hover:text-primary"
                >
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} WorkflowWonder. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
