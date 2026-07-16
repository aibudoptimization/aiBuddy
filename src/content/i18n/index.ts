import type { Locale } from "@/lib/locale";

import { en } from "./en";
import { fr } from "./fr";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
