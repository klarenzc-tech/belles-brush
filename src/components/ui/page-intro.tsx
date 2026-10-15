import { PaintedScene } from "@/components/art/painted-scene";
import { BrushDivider, PaintedEdge } from "@/components/ui/brush-divider";
import type { SceneVariant } from "@/types/content";

/** Shared header band for inner pages: a soft painted strip behind the title. */
export function PageIntro({
  eyebrow,
  title,
  intro,
  scene = "misty-peaks",
  seed = 3,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  scene?: SceneVariant;
  seed?: number;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-35">
        <PaintedScene variant={scene} seed={seed} label="" decorative />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas/30 via-canvas/70 to-canvas" />
      <div className="container-page pb-20 pt-16 md:pb-28 md:pt-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-medium md:text-6xl">{title}</h1>
        <BrushDivider className="mt-5" />
        {intro && <div className="mt-6 max-w-2xl text-lg text-charcoal/85 md:text-xl">{intro}</div>}
      </div>
      <PaintedEdge className="absolute -bottom-px left-0" />
    </section>
  );
}
