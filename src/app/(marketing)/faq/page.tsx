import type { Metadata } from "next";

import { FaqPage } from "@/components/faq/FaqPage";
import { getDictionary } from "@/content/i18n";

export function generateMetadata(): Metadata {
  const { faqPage } = getDictionary();
  return { title: faqPage.metaTitle, description: faqPage.metaDescription };
}

export default function Page() {
  return <FaqPage />;
}
