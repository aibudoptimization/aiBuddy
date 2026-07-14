import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre projet d'automatisation IA. Consultation gratuite, réponse sous 24 h, sans engagement.",
};

export default function Page() {
  return <ContactPage />;
}
