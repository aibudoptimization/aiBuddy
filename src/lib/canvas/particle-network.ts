import { driftColor, repelFromPointer } from "./ambient";

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export type ParticleNetworkOptions = {
  /** Second color + current time; when both set, the palette slowly drifts. */
  rgb2?: string;
  t?: number;
  /** Cursor position in canvas coordinates; particles gently yield around it. */
  pointer?: { x: number; y: number } | null;
};

export function particleCount(width: number, height: number): number {
  return Math.min(72, Math.max(26, Math.floor((width * height) / 15000)));
}

export function makeParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    r: Math.random() * 1.4 + 0.6,
  };
}

export function initParticles(width: number, height: number): Particle[] {
  return Array.from({ length: particleCount(width, height) }, () =>
    makeParticle(width, height),
  );
}

export function drawParticleNetwork(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  rgb: string,
  lineAlpha = 0.26,
  opts?: ParticleNetworkOptions,
) {
  ctx.clearRect(0, 0, width, height);

  const pointer = opts?.pointer ?? null;
  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    repelFromPointer(particle, pointer);
    if (particle.x < -6) particle.x += width + 12;
    else if (particle.x > width + 6) particle.x -= width + 12;
    if (particle.y < -6) particle.y += height + 12;
    else if (particle.y > height + 6) particle.y -= height + 12;
  }

  const color =
    opts?.rgb2 && opts.t !== undefined ? driftColor(rgb, opts.rgb2, opts.t) : rgb;
  const maxDist = Math.min(150, width * 0.12);
  ctx.lineWidth = 1;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < maxDist) {
        ctx.strokeStyle = `rgba(${color},${(1 - dist / maxDist) * lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const particle of particles) {
    ctx.fillStyle = `rgba(${color},0.5)`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
