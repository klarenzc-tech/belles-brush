import { cn } from "@/lib/utils";

/** A hand-painted brushstroke line, echoing the stroke under the logo wordmark. */
export function BrushDivider({ className, tone = "lake" }: { className?: string; tone?: "lake" | "gold" | "ink" | "canvas" }) {
  const colors = {
    lake: ["#0b6b6e", "#2f78ae"],
    gold: ["#d9a75f", "#f3cb8d"],
    ink: ["#063a3c", "#0b6b6e"],
    canvas: ["#faf8f2", "#f3cb8d"],
  }[tone];
  return (
    <svg viewBox="0 0 320 24" aria-hidden="true" className={cn("h-4 w-40", className)} preserveAspectRatio="none">
      <path
        d="M4 14 C 60 6, 120 18, 170 11 S 270 6, 316 12 L 314 16 C 260 13, 220 20, 160 17 S 50 18, 6 19 Z"
        fill={colors[0]}
        opacity="0.9"
      />
      <path d="M30 13 C 90 9, 160 15, 230 10 S 290 11, 300 12" stroke={colors[1]} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/** Soft painterly edge used between sections. */
export function PaintedEdge({ className, fill = "var(--color-canvas)", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-10 w-full md:h-16", flip && "rotate-180", className)}
    >
      <path
        d="M0 46 C 120 30, 220 58, 360 44 S 600 22, 760 40 S 1020 64, 1180 42 S 1380 30, 1440 38 L1440 80 L0 80 Z"
        fill={fill}
      />
      <path
        d="M0 56 C 160 44, 300 66, 460 52 S 760 40, 920 54 S 1200 70, 1440 50 L1440 80 L0 80 Z"
        fill={fill}
        opacity="0.6"
      />
    </svg>
  );
}
