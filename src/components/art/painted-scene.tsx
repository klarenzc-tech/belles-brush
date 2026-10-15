import { useId } from "react";
import type { SceneVariant } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * PaintedScene
 * ------------
 * Generates soft, painterly landscape illustrations in pure SVG.
 * Used for the hero and as clearly labelled PLACEHOLDER artwork until real
 * photographs of the artist's paintings are supplied. Renders on the server,
 * weighs a few KB and needs no network requests.
 */

type Range = {
  /** Peak points [x, y] across a 1200-wide canvas. */
  peaks: [number, number][];
  base: number;
  color: string;
  shadow: string;
  snow?: { line: number; color: string };
  opacity?: number;
};

type SceneConfig = {
  sky: [string, string, string];
  sun?: { x: number; y: number; r: number; color: string; glow: string };
  clouds?: { color: string; items: [number, number, number, number][] };
  ranges: Range[];
  mist?: { y: number; color: string }[];
  treeline?: { y: number; color: string; count: number; minH: number; maxH: number };
  water?: { top: number; colors: [string, string]; shape: "lake" | "river"; reflect: number };
  ground?: { y: number; colors: [string, string]; path?: string };
  foreground?: { color: string; sides: ("left" | "right")[]; scale?: number };
  birds?: { x: number; y: number; color: string };
  waterfall?: { x: number; y: number; h: number };
};

const W = 1200;
const H = 800;

const scenes: Record<Exclude<SceneVariant, "colour-study">, SceneConfig> = {
  "sunrise-valley": {
    sky: ["#7fb0d6", "#f3d7a6", "#f7c983"],
    sun: { x: 860, y: 300, r: 46, color: "#fff2cf", glow: "#ffd98f" },
    clouds: { color: "#fff6e3", items: [[320, 150, 170, 26], [930, 120, 210, 30], [620, 210, 140, 18], [150, 250, 120, 16]] },
    ranges: [
      { peaks: [[0, 420], [160, 360], [330, 400], [470, 330], [620, 390], [760, 350], [980, 380], [1200, 340]], base: 520, color: "#8ea2c8", shadow: "#6f7fae", opacity: 0.8 },
      { peaks: [[0, 470], [170, 420], [320, 360], [440, 260], [540, 165], [600, 220], [670, 150], [770, 250], [880, 330], [1000, 300], [1200, 380]], base: 540, color: "#5f74a8", shadow: "#33437a", snow: { line: 285, color: "#f6efe6" } },
    ],
    mist: [{ y: 470, color: "#f7e3c0" }],
    treeline: { y: 545, color: "#1f4a3a", count: 70, minH: 26, maxH: 64 },
    water: { top: 545, colors: ["#5d9fc6", "#2f6f8f"], shape: "lake", reflect: 0.32 },
    foreground: { color: "#183b30", sides: ["left", "right"] },
    birds: { x: 900, y: 190, color: "#3a3a3a" },
    waterfall: { x: 1010, y: 505, h: 46 },
  },
  "alpine-lake": {
    sky: ["#5f9ccf", "#a9d0ea", "#e6f1f4"],
    clouds: { color: "#ffffff", items: [[260, 140, 200, 28], [820, 110, 240, 32], [1040, 210, 150, 20]] },
    ranges: [
      { peaks: [[0, 430], [180, 300], [300, 340], [460, 210], [600, 300], [740, 240], [900, 320], [1050, 260], [1200, 360]], base: 520, color: "#6f8db8", shadow: "#4b6796", snow: { line: 320, color: "#ffffff" } },
    ],
    treeline: { y: 520, color: "#1c4637", count: 80, minH: 20, maxH: 52 },
    water: { top: 520, colors: ["#4f97c4", "#1f5f86"], shape: "lake", reflect: 0.42 },
    foreground: { color: "#173a2f", sides: ["right"] },
  },
  "misty-peaks": {
    sky: ["#b7c8d8", "#dbe3e6", "#f1ede4"],
    sun: { x: 300, y: 250, r: 38, color: "#fbf3e4", glow: "#f1e5cc" },
    ranges: [
      { peaks: [[0, 330], [200, 260], [380, 300], [560, 220], [760, 290], [980, 240], [1200, 300]], base: 800, color: "#a9b9cb", shadow: "#97a8bd" },
      { peaks: [[0, 420], [160, 360], [340, 410], [520, 330], [720, 400], [920, 350], [1200, 410]], base: 800, color: "#8399b3", shadow: "#71879f" },
      { peaks: [[0, 510], [240, 440], [430, 500], [650, 430], [880, 500], [1060, 450], [1200, 500]], base: 800, color: "#5d7590", shadow: "#4d6580" },
      { peaks: [[0, 600], [180, 560], [400, 610], [620, 550], [860, 610], [1200, 570]], base: 800, color: "#34506a", shadow: "#2b4560" },
    ],
    mist: [{ y: 380, color: "#eef0ee" }, { y: 480, color: "#e9ece9" }, { y: 580, color: "#e3e8e6" }],
    treeline: { y: 700, color: "#1d3a3a", count: 50, minH: 30, maxH: 80 },
  },
  "forest-path": {
    sky: ["#9ec4dc", "#e8dfc4", "#f5d9a0"],
    sun: { x: 640, y: 420, r: 60, color: "#fff4d6", glow: "#ffe2a3" },
    ranges: [
      { peaks: [[0, 470], [250, 430], [520, 460], [800, 420], [1200, 460]], base: 600, color: "#8aa0a8", shadow: "#77909a", opacity: 0.85 },
    ],
    mist: [{ y: 470, color: "#f6e7c4" }],
    treeline: { y: 560, color: "#2d5a45", count: 60, minH: 50, maxH: 120 },
    ground: { y: 560, colors: ["#7c9a55", "#3f6435"], path: "#d9bf8a" },
    foreground: { color: "#173a2f", sides: ["left", "right"], scale: 1.5 },
  },
  "golden-river": {
    sky: ["#e98b5a", "#f2b467", "#f8dc9c"],
    sun: { x: 600, y: 470, r: 70, color: "#fff0c4", glow: "#ffcf7a" },
    clouds: { color: "#f7c38a", items: [[250, 200, 230, 24], [900, 170, 260, 26], [620, 280, 180, 16]] },
    ranges: [
      { peaks: [[0, 470], [200, 420], [420, 460], [600, 430], [820, 470], [1000, 410], [1200, 450]], base: 560, color: "#a66a6a", shadow: "#8c5560" },
    ],
    treeline: { y: 540, color: "#3b3a33", count: 60, minH: 16, maxH: 42 },
    ground: { y: 540, colors: ["#8a7a3e", "#3e4a2b"] },
    water: { top: 540, colors: ["#f2c27a", "#a8774d"], shape: "river", reflect: 0.3 },
    foreground: { color: "#2a2b24", sides: ["left"] },
    birds: { x: 420, y: 260, color: "#5a3a2e" },
  },
  "evening-reflections": {
    sky: ["#3d4f7d", "#9b6e95", "#efb38f"],
    sun: { x: 760, y: 470, r: 34, color: "#ffe1c2", glow: "#f6a98a" },
    clouds: { color: "#c98da0", items: [[300, 220, 240, 20], [880, 260, 200, 16], [560, 160, 180, 18]] },
    ranges: [
      { peaks: [[0, 460], [220, 380], [380, 430], [560, 340], [720, 420], [900, 370], [1200, 440]], base: 500, color: "#4a4f78", shadow: "#383c63" },
    ],
    treeline: { y: 500, color: "#1d2440", count: 70, minH: 18, maxH: 46 },
    water: { top: 500, colors: ["#a7779a", "#2e3a63"], shape: "lake", reflect: 0.45 },
    foreground: { color: "#141b30", sides: ["left"] },
  },
};

/* ── helpers ───────────────────────────────────────────── */

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function rangePath(peaks: [number, number][], base: number) {
  const pts = peaks.map(([x, y]) => `${r1(x)},${r1(y)}`).join(" L");
  return `M0,${base} L${pts} L${W},${base} Z`;
}

function pinePath(x: number, base: number, h: number) {
  const top = base - h;
  const w = h * 0.3;
  const tiers = 4;
  const right: string[] = [];
  for (let i = 1; i <= tiers; i++) {
    const y = top + (h * 0.88 * i) / tiers;
    const ww = (w * i) / tiers;
    right.push(`${r1(x + ww)},${r1(y)}`);
    if (i < tiers) right.push(`${r1(x + ww * 0.45)},${r1(y - h * 0.02)}`);
  }
  const left = right
    .map((p) => {
      const [px, py] = p.split(",").map(Number);
      return `${r1(2 * x - px)},${py}`;
    })
    .reverse();
  const trunkY = top + h * 0.88;
  const tw = Math.max(1.5, h * 0.035);
  return `M${r1(x)},${r1(top)} L${right.join(" L")} L${r1(x + tw)},${r1(trunkY)} L${r1(x + tw)},${r1(base)} L${r1(x - tw)},${r1(base)} L${r1(x - tw)},${r1(trunkY)} L${left.join(" L")} Z`;
}

function riverPath(top: number) {
  return `M560,${top} C620,${top + 40} 700,${top + 60} 640,${top + 110} C560,${top + 170} 420,${top + 190} 470,${H - 60} L${470 + 520},${H} L250,${H} C230,${top + 200} 520,${top + 150} 590,${top + 100} C640,${top + 60} 560,${top + 30} 540,${top} Z`;
}

/* ── component ─────────────────────────────────────────── */

export type PaintedSceneProps = {
  variant: SceneVariant;
  label: string;
  seed?: number;
  className?: string;
  /** "slice" fills and crops (default); "meet" letterboxes. */
  fit?: "slice" | "meet";
  decorative?: boolean;
  /** Fine paper grain. Costs extra rendering — use only on large hero images. */
  grain?: boolean;
};

export function PaintedScene({ variant, label, seed = 7, className, fit = "slice", decorative = false, grain = false }: PaintedSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (s: string) => `${s}-${uid}`;
  const rand = rng(seed * 9973 + variant.length * 131);

  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img" as const, "aria-label": label };

  const filters = (
    <defs>
      <filter id={id("paint")} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.011 0.028" numOctaves={2} seed={seed} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={16} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id={id("soft")} x="-30%" y="-80%" width="160%" height="260%">
        <feGaussianBlur stdDeviation={14} />
      </filter>
      <filter id={id("grain")}>
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed + 3} />
        <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.22  0 0 0 0.09 0" />
      </filter>
    </defs>
  );

  /* Abstract colour study */
  if (variant === "colour-study") {
    const palette = ["#063a3c", "#0b6b6e", "#2f78ae", "#d9a75f", "#f3cb8d", "#7b4a6e", "#1f4a3a"];
    const strokes = Array.from({ length: 16 }, (_, i) => {
      const x = rand() * W;
      const y = rand() * H;
      const dx = (rand() - 0.5) * 700;
      const dy = (rand() - 0.5) * 300;
      return {
        d: `M${r1(x)},${r1(y)} q${r1(dx / 2)},${r1(dy - 120)} ${r1(dx)},${r1(dy)}`,
        c: palette[i % palette.length],
        w: 30 + rand() * 90,
        o: 0.55 + rand() * 0.4,
      };
    });
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={`xMidYMid ${fit}`} className={cn("block h-full w-full", className)} {...a11y}>
        {filters}
        <rect width={W} height={H} fill="#f4ecdc" />
        <g filter={`url(#${id("paint")})`}>
          {strokes.map((s, i) => (
            <path key={i} d={s.d} stroke={s.c} strokeWidth={r1(s.w)} strokeLinecap="round" fill="none" opacity={r1(s.o)} />
          ))}
        </g>
        {grain && <rect width={W} height={H} filter={`url(#${id("grain")})`} />}
      </svg>
    );
  }

  const cfg = scenes[variant];
  const horizon = cfg.water?.top ?? cfg.treeline?.y ?? cfg.ground?.y ?? 560;

  const treelineTrees = cfg.treeline
    ? Array.from({ length: cfg.treeline.count }, (_, i) => {
        const t = cfg.treeline!;
        const x = (i / t.count) * W + rand() * (W / t.count);
        const h = t.minH + rand() * (t.maxH - t.minH);
        return pinePath(x, t.y + 4, h);
      })
    : [];

  const fgTrees: string[] = [];
  if (cfg.foreground) {
    const s = cfg.foreground.scale ?? 1;
    for (const side of cfg.foreground.sides) {
      const n = 4;
      for (let i = 0; i < n; i++) {
        const offset = i * 70 + rand() * 40;
        const x = side === "left" ? 20 + offset : W - 20 - offset;
        const h = (420 - i * 70 + rand() * 60) * s;
        fgTrees.push(pinePath(x, H + 10, h));
      }
    }
  }

  const ripples = cfg.water
    ? Array.from({ length: 26 }, () => {
        const y = cfg.water!.top + 12 + rand() * (H - cfg.water!.top - 20);
        const x = rand() * W;
        const len = 40 + rand() * 160;
        return { x, y, len, o: 0.15 + rand() * 0.3 };
      })
    : [];

  /* Precompute shading + snow so the reflection matches the mountains exactly. */
  const shaded = cfg.ranges.map((rg) => {
    // Triangular shadow facet on the right-hand slope of each peak (fades downwards via gradient)
    const faces = rg.peaks.slice(0, -1).flatMap(([px, py], j) => {
      const [vx, vy] = rg.peaks[j + 1];
      if (vy <= py) return [];
      const k = 0.2 + rand() * 0.15;
      const spineX = px + (vx - px) * k;
      const spineY = py + (rg.base - py) * (0.55 + rand() * 0.15);
      return [`M${px},${py} L${vx},${vy} L${r1(spineX + (vx - spineX) * 0.5)},${r1(vy + (spineY - vy) * 0.7)} L${r1(spineX)},${r1(spineY)} Z`];
    });
    // Snow caps that follow each peak's slopes, with ragged "drips" down the gullies
    const snow = rg.snow
      ? rg.peaks.flatMap(([px, py], j) => {
          const reach = rg.snow!.line - py;
          if (reach <= 10) return [];
          const left = rg.peaks[j - 1];
          const right = rg.peaks[j + 1];
          const slopeX = (n: [number, number] | undefined, dir: number, d: number) =>
            n ? px + ((n[0] - px) * Math.min(1, d / Math.max(1, n[1] - py))) : px + dir * d * 1.2;
          const steps = 8;
          const edge: string[] = [];
          for (let k = 0; k <= steps; k++) {
            const t = k / steps; // 0 = right end, 1 = left end
            const drip = k % 2 === 0 ? 1 : 0.55 + rand() * 0.25;
            const d = reach * (0.75 + rand() * 0.2) * drip;
            const xr = slopeX(right, 1, d);
            const xl = slopeX(left, -1, d);
            const x = xr + (xl - xr) * t;
            const centreBias = 1 - Math.abs(t - 0.5) * 0.9; // lower in the middle, higher at the sides
            edge.push(`L${r1(x)},${r1(py + d * centreBias)}`);
          }
          return [`M${px},${py} ${edge.join(" ")} Z`];
        })
      : [];
    return { faces, snow };
  });

  const renderMountains = (prefix: string) => (
    <g>
      {cfg.ranges.map((rg, i) => (
        <g key={i} opacity={rg.opacity ?? 1}>
          <clipPath id={id(`${prefix}clip${i}`)}>
            <path d={rangePath(rg.peaks, rg.base)} />
          </clipPath>
          <linearGradient id={id(`${prefix}shade${i}`)} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={Math.min(...rg.peaks.map((p) => p[1]))} y2={rg.base}>
            <stop offset="0" stopColor={rg.shadow} stopOpacity={0.7} />
            <stop offset="0.7" stopColor={rg.shadow} stopOpacity={0.1} />
            <stop offset="1" stopColor={rg.shadow} stopOpacity={0} />
          </linearGradient>
          <path d={rangePath(rg.peaks, rg.base)} fill={rg.color} />
          <g clipPath={`url(#${id(`${prefix}clip${i}`)})`}>
            {shaded[i].faces.map((d, j) => (
              <path key={j} d={d} fill={`url(#${id(`${prefix}shade${i}`)})`} />
            ))}
            {shaded[i].snow.map((d, j) => (
              <path key={`s${j}`} d={d} fill={rg.snow!.color} opacity={0.93} />
            ))}
          </g>
        </g>
      ))}
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={`xMidYMid ${fit}`} className={cn("block h-full w-full", className)} {...a11y}>
      {filters}
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={cfg.sky[0]} />
          <stop offset="0.55" stopColor={cfg.sky[1]} />
          <stop offset="1" stopColor={cfg.sky[2]} />
        </linearGradient>
        {cfg.sun && (
          <radialGradient id={id("glow")}>
            <stop offset="0" stopColor={cfg.sun.glow} stopOpacity={0.9} />
            <stop offset="1" stopColor={cfg.sun.glow} stopOpacity={0} />
          </radialGradient>
        )}
        {cfg.water && (
          <linearGradient id={id("water")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={cfg.water.colors[0]} />
            <stop offset="1" stopColor={cfg.water.colors[1]} />
          </linearGradient>
        )}
        {cfg.ground && (
          <linearGradient id={id("ground")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={cfg.ground.colors[0]} />
            <stop offset="1" stopColor={cfg.ground.colors[1]} />
          </linearGradient>
        )}
        {cfg.water && (
          <clipPath id={id("waterclip")}>
            {cfg.water.shape === "lake" ? (
              <rect x={0} y={cfg.water.top} width={W} height={H - cfg.water.top} />
            ) : (
              <path d={riverPath(cfg.water.top)} />
            )}
          </clipPath>
        )}
      </defs>

      <g filter={`url(#${id("paint")})`}>
        <rect x={-20} y={-20} width={W + 40} height={H + 40} fill={`url(#${id("sky")})`} />

        {cfg.sun && (
          <g>
            <circle cx={cfg.sun.x} cy={cfg.sun.y} r={cfg.sun.r * 4} fill={`url(#${id("glow")})`} />
            <circle cx={cfg.sun.x} cy={cfg.sun.y} r={cfg.sun.r} fill={cfg.sun.color} />
          </g>
        )}

        {cfg.clouds && (
          <g filter={`url(#${id("soft")})`} fill={cfg.clouds.color} opacity={0.85}>
            {cfg.clouds.items.map(([cx, cy, rx, ry], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />
            ))}
          </g>
        )}

        {renderMountains("m")}

        {cfg.mist?.map((m, i) => (
          <rect key={i} x={-50} y={m.y - 30} width={W + 100} height={60} fill={m.color} opacity={0.55} filter={`url(#${id("soft")})`} />
        ))}

        {cfg.ground && (
          <g>
            <rect x={-20} y={cfg.ground.y} width={W + 40} height={H - cfg.ground.y + 20} fill={`url(#${id("ground")})`} />
            {cfg.ground.path && (
              <path
                d={`M590,${cfg.ground.y} C640,${cfg.ground.y + 60} 520,${cfg.ground.y + 110} 560,${cfg.ground.y + 170} S760,${H - 40} 700,${H + 10} L420,${H + 10} C520,${H - 60} 470,${cfg.ground.y + 150} 540,${cfg.ground.y + 90} C590,${cfg.ground.y + 50} 570,${cfg.ground.y + 20} 575,${cfg.ground.y} Z`}
                fill={cfg.ground.path}
                opacity={0.9}
              />
            )}
          </g>
        )}

        {cfg.water && (
          <g>
            <g clipPath={`url(#${id("waterclip")})`}>
              <rect x={-20} y={cfg.water.top} width={W + 40} height={H - cfg.water.top + 20} fill={`url(#${id("water")})`} />
              <g transform={`translate(0 ${2 * horizon}) scale(1 -1)`} opacity={cfg.water.reflect}>
                {renderMountains("r")}
                {cfg.sun && <ellipse cx={cfg.sun.x} cy={cfg.sun.y} rx={cfg.sun.r * 0.5} ry={cfg.sun.r * 2.2} fill={cfg.sun.color} opacity={0.55} />}
              </g>
              {ripples.map((r, i) => (
                <line key={i} x1={r1(r.x)} y1={r1(r.y)} x2={r1(r.x + r.len)} y2={r1(r.y)} stroke="#ffffff" strokeWidth={2} opacity={r1(r.o)} strokeLinecap="round" />
              ))}
            </g>
          </g>
        )}

        {cfg.treeline && (
          <g fill={cfg.treeline.color}>
            {treelineTrees.map((d, i) => (
              <path key={i} d={d} />
            ))}
            {cfg.water && (
              <g transform={`translate(0 ${2 * (cfg.treeline.y + 4)}) scale(1 -1)`} opacity={0.35} clipPath={`url(#${id("waterclip")})`}>
                {treelineTrees.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
            )}
          </g>
        )}

        {cfg.waterfall && (
          <g>
            <rect x={cfg.waterfall.x} y={cfg.waterfall.y} width={14} height={cfg.waterfall.h} fill="#f4f8fa" opacity={0.9} />
            <ellipse cx={cfg.waterfall.x + 7} cy={cfg.waterfall.y + cfg.waterfall.h} rx={24} ry={6} fill="#ffffff" opacity={0.7} />
          </g>
        )}

        {fgTrees.length > 0 && (
          <g fill={cfg.foreground!.color}>
            {fgTrees.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        )}
      </g>

      {cfg.birds && (
        <g stroke={cfg.birds.color} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.7}>
          {[[0, 0, 1], [46, -18, 0.8], [90, 10, 0.65]].map(([dx, dy, s], i) => (
            <path
              key={i}
              d={`M${cfg.birds!.x + dx - 14 * s},${cfg.birds!.y + dy} q${7 * s},${-9 * s} ${14 * s},0 q${7 * s},${-9 * s} ${14 * s},0`}
            />
          ))}
        </g>
      )}

      {grain && <rect width={W} height={H} filter={`url(#${id("grain")})`} />}
    </svg>
  );
}
