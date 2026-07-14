import type { ReactNode } from "react";

import { IconPaths } from "@/components/services/agents-ia/IconPaths";
import { hexToRgb } from "@/lib/accents";

import { SITE_ICONS, type HeroDef, type SiteIconKey } from "./data";

function rgba(rgb: string, a: number) {
  return `rgba(${rgb},${a})`;
}

function Bar({ w, h, o }: { w: string; h: number; o: number }) {
  return (
    <span
      style={{
        display: "block",
        width: w,
        height: h,
        borderRadius: 5,
        background: `rgba(244,243,247,${o})`,
      }}
      aria-hidden
    />
  );
}

export function BuildNav({ color }: { color: string }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ width: 13, height: 13, borderRadius: 5, background: color }} aria-hidden />
        <Bar w="78px" h={9} o={0.32} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Bar w="42px" h={7} o={0.18} />
        <Bar w="42px" h={7} o={0.18} />
        <Bar w="42px" h={7} o={0.18} />
        <span
          style={{
            width: 92,
            height: 28,
            borderRadius: 999,
            background: color,
            opacity: 0.9,
          }}
          aria-hidden
        />
      </div>
    </>
  );
}

export function BuildHeroText({ hero, rgb }: { hero: HeroDef; rgb: string }) {
  return (
    <>
      <span
        style={{
          display: "block",
          width: 96,
          height: 9,
          borderRadius: 5,
          background: rgba(rgb, 0.55),
        }}
        aria-hidden
      />
      <div className="ww-sites-build__hl">{hero.hl}</div>
      <Bar w="88%" h={10} o={0.16} />
      <Bar w="62%" h={10} o={0.16} />
      <span
        style={{
          display: "block",
          marginTop: 6,
          width: 148,
          height: 42,
          borderRadius: 999,
          background: hero.color,
          boxShadow: `0 10px 26px ${rgba(rgb, 0.3)}`,
        }}
        aria-hidden
      />
    </>
  );
}

export function BuildHeroImage({ hero, rgb }: { hero: HeroDef; rgb: string }) {
  return (
    <span style={{ color: rgba(rgb, 0.85), display: "inline-flex" }}>
      <IconPaths paths={SITE_ICONS[hero.icon]} size={58} strokeWidth={1.4} />
    </span>
  );
}

export function BuildHeroForm({ hero, rgb }: { hero: HeroDef; rgb: string }) {
  const input = (
    <div
      style={{
        height: 30,
        borderRadius: 8,
        border: "1px solid rgba(244,243,247,0.12)",
        background: "rgba(244,243,247,0.03)",
      }}
      aria-hidden
    />
  );
  return (
    <>
      <Bar w="62%" h={10} o={0.6} />
      {input}
      {input}
      {input}
      <div
        style={{
          height: 34,
          borderRadius: 8,
          background: hero.color,
          marginTop: "auto",
        }}
        aria-hidden
      />
    </>
  );
}

export function BuildCardsMenu({ rgb }: { rgb: string }) {
  const row = (last?: boolean) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "9px 2px",
        borderBottom: last ? undefined : "1px solid rgba(244,243,247,0.07)",
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          flex: "none",
          background: `linear-gradient(135deg,${rgba(rgb, 0.32)},${rgba(rgb, 0.08)})`,
        }}
        aria-hidden
      />
      <Bar w="100%" h={9} o={0.2} />
      <span
        style={{
          width: 42,
          height: 15,
          borderRadius: 5,
          background: rgba(rgb, 0.5),
          flex: "none",
        }}
        aria-hidden
      />
    </div>
  );
  return (
    <>
      {row()}
      {row()}
      {row(true)}
    </>
  );
}

export function BuildCardsShop({ rgb }: { rgb: string }) {
  const tile = (
    <div
      style={{
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(244,243,247,0.09)",
        background: "rgba(244,243,247,0.02)",
      }}
    >
      <div
        style={{
          height: 48,
          background: `linear-gradient(135deg,${rgba(rgb, 0.22)},${rgba(rgb, 0.05)})`,
        }}
        aria-hidden
      />
      <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <Bar w="80%" h={7} o={0.2} />
        <span
          style={{
            display: "block",
            width: 34,
            height: 13,
            borderRadius: 4,
            background: rgba(rgb, 0.5),
          }}
          aria-hidden
        />
      </div>
    </div>
  );
  return (
    <>
      {tile}
      {tile}
      {tile}
      {tile}
    </>
  );
}

export function BuildCardsBooking({ color, rgb }: { color: string; rgb: string }) {
  const pill = (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: 13,
        borderRadius: 11,
        border: `1px solid ${rgba(rgb, 0.22)}`,
        background: rgba(rgb, 0.07),
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: 999,
          flex: "none",
          background: color,
          boxShadow: `0 0 8px ${rgba(rgb, 0.7)}`,
        }}
        aria-hidden
      />
      <Bar w="100%" h={8} o={0.2} />
    </div>
  );
  return (
    <>
      {pill}
      {pill}
      {pill}
    </>
  );
}

export function BuildCardsRealty({ rgb }: { rgb: string }) {
  const card = (
    <div
      style={{
        flex: 1,
        display: "flex",
        gap: 11,
        borderRadius: 11,
        overflow: "hidden",
        border: "1px solid rgba(244,243,247,0.09)",
        background: "rgba(244,243,247,0.02)",
        padding: 10,
      }}
    >
      <span
        style={{
          width: 72,
          height: 58,
          borderRadius: 8,
          flex: "none",
          background: `linear-gradient(135deg,${rgba(rgb, 0.28)},${rgba(rgb, 0.06)})`,
        }}
        aria-hidden
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 7,
          justifyContent: "center",
        }}
      >
        <Bar w="80%" h={8} o={0.2} />
        <Bar w="55%" h={7} o={0.12} />
        <span
          style={{
            display: "block",
            width: 46,
            height: 15,
            borderRadius: 5,
            background: rgba(rgb, 0.5),
            marginTop: 2,
          }}
          aria-hidden
        />
      </div>
    </div>
  );
  return (
    <>
      {card}
      {card}
    </>
  );
}

export function BuildFooter({ rgb }: { rgb: string }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: 3,
            background: rgba(rgb, 0.7),
          }}
          aria-hidden
        />
        <Bar w="52px" h={7} o={0.16} />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Bar w="30px" h={6} o={0.1} />
        <Bar w="30px" h={6} o={0.1} />
        <Bar w="30px" h={6} o={0.1} />
      </div>
    </>
  );
}

export function BuildPhone({ hero }: { hero: HeroDef }) {
  const rgb = hexToRgb(hero.color);
  const c = hero.color;
  const head = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ width: 9, height: 9, borderRadius: 3, background: c }} aria-hidden />
      <Bar w="30px" h={6} o={0.2} />
    </div>
  );
  const btn = (mt: string) => (
    <span
      style={{
        display: "block",
        width: "100%",
        height: 28,
        borderRadius: 999,
        background: c,
        marginTop: mt,
      }}
      aria-hidden
    />
  );
  const img = (h: number) => (
    <div
      style={{
        height: h,
        borderRadius: 10,
        border: `1px solid ${rgba(rgb, 0.2)}`,
        background: `linear-gradient(150deg,${rgba(rgb, 0.16)},rgba(18,16,26,0.4) 60%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: rgba(rgb, 0.85), display: "inline-flex" }}>
        <IconPaths paths={SITE_ICONS[hero.icon]} size={26} strokeWidth={1.5} />
      </span>
    </div>
  );

  let body: ReactNode;
  if (hero.layout === "menu") {
    const r = (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            flex: "none",
            background: rgba(rgb, 0.2),
          }}
          aria-hidden
        />
        <Bar w="100%" h={7} o={0.12} />
      </div>
    );
    body = (
      <>
        {img(74)}
        <Bar w="80%" h={8} o={0.22} />
        <Bar w="55%" h={7} o={0.14} />
        {btn("2px")}
        {r}
        {r}
      </>
    );
  } else if (hero.layout === "shop") {
    const tile = (
      <div
        style={{
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid rgba(244,243,247,0.08)",
        }}
      >
        <div
          style={{
            height: 40,
            background: `linear-gradient(135deg,${rgba(rgb, 0.22)},${rgba(rgb, 0.05)})`,
          }}
          aria-hidden
        />
        <div style={{ padding: 5 }}>
          <span
            style={{
              display: "block",
              width: "60%",
              height: 6,
              borderRadius: 4,
              background: rgba(rgb, 0.5),
            }}
            aria-hidden
          />
        </div>
      </div>
    );
    body = (
      <>
        <Bar w="60%" h={8} o={0.22} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {tile}
          {tile}
          {tile}
          {tile}
        </div>
        {btn("auto")}
      </>
    );
  } else if (hero.layout === "booking") {
    const inp = (
      <div
        style={{
          height: 24,
          borderRadius: 7,
          border: "1px solid rgba(244,243,247,0.12)",
          background: "rgba(244,243,247,0.03)",
        }}
        aria-hidden
      />
    );
    body = (
      <>
        {img(54)}
        {inp}
        {inp}
        {inp}
        {btn("2px")}
      </>
    );
  } else {
    body = (
      <>
        {img(92)}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              width: 46,
              height: 14,
              borderRadius: 5,
              background: rgba(rgb, 0.5),
            }}
            aria-hidden
          />
          <Bar w="30px" h={7} o={0.14} />
        </div>
        <Bar w="80%" h={8} o={0.2} />
        <Bar w="60%" h={7} o={0.12} />
        {btn("auto")}
      </>
    );
  }

  return (
    <>
      {head}
      {body}
    </>
  );
}

export function SiteIcon({ icon, size = 22 }: { icon: SiteIconKey; size?: number }) {
  return <IconPaths paths={SITE_ICONS[icon]} size={size} strokeWidth={1.6} />;
}
