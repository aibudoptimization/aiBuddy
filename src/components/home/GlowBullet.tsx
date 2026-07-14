export function GlowBullet() {
  return (
    <span
      style={{
        flex: "none",
        width: 5,
        height: 5,
        borderRadius: 999,
        background: "var(--teal)",
        boxShadow: "0 0 8px rgba(75,250,200,0.7)",
      }}
      aria-hidden
    />
  );
}
