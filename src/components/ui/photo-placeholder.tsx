import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/** Reserved space for a real photograph supplied by the artist. Never filled with invented images. */
export function PhotoPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <figure
      className={cn(
        "canvas-texture flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[var(--radius-organic)] border-2 border-dashed border-ink/25 bg-paper p-6 text-center",
        className,
      )}
    >
      <Camera aria-hidden="true" className="size-8 text-teal" />
      <figcaption className="max-w-[16rem] text-sm text-stone">
        <span className="block font-semibold text-ink">Photo coming soon</span>
        {label}
      </figcaption>
    </figure>
  );
}
