import { CompareSection } from "@/components/landing/compare-section"
import { EstimatorSection } from "@/components/landing/estimator-section"
import { FaqSection } from "@/components/landing/faq-section"
import { HeroSection } from "@/components/landing/hero-section"
import { ProcessSection } from "@/components/landing/process-section"
import { ServicesSection } from "@/components/landing/services-section"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { WhySection } from "@/components/landing/why-section"

export function HomePage() {
  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <CompareSection />
        <EstimatorSection />
        <ProcessSection />
        <WhySection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  )
}
