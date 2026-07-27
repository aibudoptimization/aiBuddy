"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type FaqAccordion = {
  openId: string | null;
  toggle: (id: string) => void;
};

const FaqAccordionContext = createContext<FaqAccordion | null>(null);

/**
 * Makes every accordion rendered inside it mutually exclusive. /faq stacks six
 * separate FAQ groups, and a visitor opening a question in one group should
 * still close whatever was open in another.
 */
export function FaqAccordionScope({ children }: { children: ReactNode }) {
  const value = useExclusiveOpen();
  return (
    <FaqAccordionContext.Provider value={value}>{children}</FaqAccordionContext.Provider>
  );
}

function useExclusiveOpen(): FaqAccordion {
  const [openId, setOpenId] = useState<string | null>(null);
  return useMemo(
    () => ({
      openId,
      toggle: (id: string) => setOpenId((current) => (current === id ? null : id)),
    }),
    [openId],
  );
}

/**
 * Joins the surrounding scope when there is one; otherwise the list is its own
 * scope, so a lone FAQ block still allows only one open item.
 */
export function useFaqAccordion(): FaqAccordion {
  const shared = useContext(FaqAccordionContext);
  const local = useExclusiveOpen();
  return shared ?? local;
}
