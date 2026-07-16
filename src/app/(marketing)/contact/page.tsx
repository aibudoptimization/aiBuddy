import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage";
import { getDictionary } from "@/content/i18n";

const dict = getDictionary("fr");

export const metadata: Metadata = {
  title: "Contact",
  description: dict.contact.lead,
};

export default function Page() {
  return <ContactPage />;
}
