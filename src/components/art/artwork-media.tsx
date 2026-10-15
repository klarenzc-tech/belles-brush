import Image from "next/image";
import { PaintedScene } from "./painted-scene";
import { DemoBadge } from "@/components/ui/demo-badge";
import { cn, hashString } from "@/lib/utils";
import type { MediaImage, SceneVariant } from "@/types/content";

/**
 * Shows a real photograph when one exists (optimised with next/image),
 * otherwise a clearly labelled placeholder scene.
 */
export function ArtworkMedia({
  image,
  scene,
  alt,
  seedKey,
  isDemo,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  badgeLabel,
}: {
  image?: MediaImage;
  scene?: SceneVariant;
  alt: string;
  seedKey: string;
  isDemo: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  badgeLabel?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-paper", className)}>
      {image ? (
        <Image src={image.src} alt={image.alt || alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <PaintedScene variant={scene ?? "sunrise-valley"} label={alt} seed={(hashString(seedKey) % 97) + 1} />
      )}
      {isDemo && <DemoBadge className="absolute left-3 top-3">{badgeLabel}</DemoBadge>}
    </div>
  );
}
