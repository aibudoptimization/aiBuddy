"use client";

import { createContext, useContext, type ReactNode } from "react";

import { getDictionary, type Dictionary } from "@/content/i18n";
import { paths } from "@/lib/routes";

type LocaleContextValue = {
  dict: Dictionary;
  routes: ReturnType<typeof paths>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const value: LocaleContextValue = {
    dict: getDictionary(),
    routes: paths(),
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
