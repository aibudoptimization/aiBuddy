import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

type HeroRevealProps = {
  children: ReactNode;
  /** Extra delay before the first child starts, ms. */
  startMs?: number;
  /** Gap between consecutive children, ms. Defaults to --hero-step. */
  stepMs?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "header" | "section";
};

/**
 * Staggers the entrance of a hero's direct children. Each child keeps its
 * own reveal class (.ww-hero-line for masked headline lines, .ww-hero-fade
 * for supporting copy); this only assigns the delays, so the visual
 * character lives entirely in CSS (see the hero tokens in globals.css).
 *
 * Server component by design: the animation is CSS-only and replays on
 * navigation because RouteChangeShell remounts the tree per pathname.
 */
export function HeroReveal({
  children,
  startMs = 0,
  stepMs = 90,
  className = "",
  style,
  as: Tag = "div",
}: HeroRevealProps) {
  const staggered = Children.toArray(children)
    .filter(isValidElement)
    .map((child, i) => {
      const el = child as ReactElement<{ style?: React.CSSProperties }>;
      return cloneElement(el, {
        style: {
          ...(el.props.style ?? {}),
          ["--hero-delay" as string]: `${startMs + i * stepMs}ms`,
        },
      });
    });

  return (
    <Tag className={className} style={style}>
      {staggered}
    </Tag>
  );
}
