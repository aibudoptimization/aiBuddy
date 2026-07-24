import type { Metadata } from "next";

import { HomePage } from "@/components/home/HomePage";
import { getDictionary } from "@/content/i18n";

const dict = getDictionary();

export const metadata: Metadata = {
  title: { absolute: dict.meta.titleDefault },
  description: dict.meta.description,
};

export default function Page() {
  return <HomePage />;
}
