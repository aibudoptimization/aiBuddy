import type { ReactNode } from "react";

type HeroWordsProps = {
  /** Plain text; each word gets its own masked wrapper. */
  text: string;
  /** ms before the first word starts. */
  startMs?: number;
  /** ms between consecutive words. */
  stepMs?: number;
  /** Rendered after the words, on the same line, at the next slot. */
  trailing?: ReactNode;
  /** Delay handed to `trailing` (defaults to the slot after the last word). */
  trailingDelayMs?: number;
  /** Emitted between the words and `trailing` — e.g. a responsive <br>. */
  beforeTrailing?: ReactNode;
};

/**
 * Headline text revealed word by word: each word rises from behind its own
 * mask at full opacity, a beat after the one before it. Reads more crafted
 * than a whole line moving as a block, and it's the motion itself doing the
 * work — no overlays or decoration.
 *
 * `trailing` exists for the home hero, where the last slot is the rotating
 * gradient word rather than static text.
 */
export function HeroWords({
  text,
  startMs = 0,
  stepMs = 55,
  trailing,
  trailingDelayMs,
  beforeTrailing,
}: HeroWordsProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const trailingDelay = trailingDelayMs ?? startMs + words.length * stepMs;

  return (
    <span className="ww-hero-words">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="ww-hero-word"
          style={{ ["--hero-delay" as string]: `${startMs + i * stepMs}ms` }}
        >
          <span>{word}</span>
        </span>
      ))}
      {beforeTrailing}
      {trailing ? (
        <span
          className="ww-hero-word ww-hero-word--last"
          style={{ ["--hero-delay" as string]: `${trailingDelay}ms` }}
        >
          <span>{trailing}</span>
        </span>
      ) : null}
    </span>
  );
}
