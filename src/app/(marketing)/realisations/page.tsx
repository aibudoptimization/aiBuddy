import type { Metadata } from "next";

import { RealisationsPage } from "@/components/realisations/RealisationsPage";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Sites, automatisations et agents IA livrés par Workflow Wonder pour des entrepreneurs du Québec.",
};

export default function Page() {
  return <RealisationsPage />;
}
