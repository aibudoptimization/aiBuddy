import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore WorkflowWonder services for web design, development, and automation.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <ServicesPageContent />
      <Footer />
    </>
  );
}
