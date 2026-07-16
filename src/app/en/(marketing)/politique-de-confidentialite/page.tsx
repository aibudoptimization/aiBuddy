import type { Metadata } from "next";

import { PrivacyPolicyPage } from "@/components/legal/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Workflow Wonder collects, uses, and protects your personal information under Québec’s Law 25.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
