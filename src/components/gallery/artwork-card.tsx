import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArtworkMedia } from "@/components/art/artwork-media";
import { categories } from "@/data/artworks";
import type { Artwork } from "@/types/content";
import { cn } from "@/lib/utils";

export function categoryLabel(slug: Artwork["category"]) {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

export function ArtworkCard({ artwork, className, tall = false }: { artwork: Artwork; className?: string; tall?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-organic)] bg-white shadow-[0_18px_40px_-28px_rgba(6,58,60,0.55)] ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgba(6,58,60,0.6)] focus-within:ring-2 focus-within:ring-lake",
        className,
      )}
    >
      <ArtworkMedia
        scene={artwork.scene}
        image={artwork.image}
        alt={artwork.alt}
        seedKey={artwork.slug}
        isDemo={artwork.isDemo}
        className={cn("transition-transform duration-700", tall ? "aspect-[4/5]" : "aspect-[4/3]")}
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-[0.72rem]">{categoryLabel(artwork.category)}</p>
        <h3 className="mt-2 text-2xl font-medium">
          <Link href={`/gallery/${artwork.slug}`} className="after:absolute after:inset-0 focus:outline-none">
            {artwork.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.98rem] text-stone">{artwork.excerpt}</p>
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-2 font-semibold text-teal transition-all group-hover:gap-3">
          View Artwork <ArrowRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
