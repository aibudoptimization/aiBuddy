"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

import { getDictionary, type Dictionary } from "@/content/i18n";
import { htmlLang, type Locale } from "@/lib/locale";
import { paths } from "@/lib/routes";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  routes: ReturnType<typeof paths>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value: LocaleContextValue = {
    locale,
    dict: getDictionary(locale),
    routes: paths(locale),
  };

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
