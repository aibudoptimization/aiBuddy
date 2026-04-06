import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"

import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { HomePage } from "@/pages/HomePage"
import { ServicesPage } from "@/pages/ServicesPage"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ServicesLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <ServicesPage />
      <SiteFooter />
    </>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesLayout />} />
        <Route path="/services/web-design" element={<ServicesLayout />} />
        <Route path="/services/automation" element={<ServicesLayout />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="mesh-bg min-h-svh">
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
