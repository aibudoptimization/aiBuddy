import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const faqs = [
  {
    q: "What happens on the audit call?",
    a: "We review your goals, current site or stack, and quick wins vs. deeper investments. You leave with a concise next-step recommendation—even if we’re not a fit.",
  },
  {
    q: "Do you work with existing tools?",
    a: "Yes. We’ll meet you where you are (CMS, CRM, data warehouse, SaaS APIs) and propose the smallest reliable integration path.",
  },
  {
    q: "Typical timelines?",
    a: "Landing experiences often move in weeks, not months. Automation depth depends on systems and governance; we’ll quote a phased plan after discovery.",
  },
  {
    q: "How do we get started?",
    a: "Book an audit or send a note with what you’re trying to fix. We reply with two or three concrete options.",
  },
] as const

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 px-4 py-20 sm:px-6"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Badge variant="outline" className="border-white/10 bg-white/5">
            FAQ
          </Badge>
          <h2
            id="faq-heading"
            className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Frequently asked questions
          </h2>
        </div>

        <Accordion
          defaultValue={["faq-0"]}
          className="glass-strong mt-12 rounded-2xl border border-white/10 px-4 py-2"
        >
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-foreground hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
