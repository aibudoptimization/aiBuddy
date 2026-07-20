import type { Metadata } from "next";

import { RealisationsPage } from "@/components/realisations/RealisationsPage";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites, automations, and AI agents delivered by Workflow Wonder for Québec entrepreneurs.",
};

export default function Page() {
  return <RealisationsPage />;
}
