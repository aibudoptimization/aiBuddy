import type { Metadata } from "next";

import { PrivacyPolicyPage } from "@/components/legal/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Workflow Wonder recueille, utilise et protège vos renseignements personnels, conformément à la Loi 25 du Québec.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
