import { ArrowRight } from "lucide-react";
import { ArtworkCard } from "@/components/gallery/artwork-card";
import { ButtonLink } from "@/components/ui/button";
import { DemoNotice } from "@/components/ui/demo-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Artwork } from "@/types/content";

export function FeaturedArtwork({ artworks }: { artworks: Artwork[] }) {
  const hasDemo = artworks.some((a) => a.isDemo);
  return (
    <section aria-labelledby="featured-title" className="canvas-texture bg-paper py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="featured-title"
            eyebrow="From the easel"
            title="Featured Artwork"
            intro="A small selection of pieces from the gallery — each one a moment of exploration on the canvas."
          />
          <ButtonLink href="/gallery" variant="outline" className="self-start md:self-auto">
            View the full gallery <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        {hasDemo && (
          <DemoNotice className="mt-8 max-w-3xl">
            The artwork shown here is <strong>demonstration content</strong> created to preview the design. These are not
            paintings by the artist and will be replaced with his real work.
          </DemoNotice>
        )}

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork, i) => (
            <li key={artwork.id} className="flex">
              <Reveal delay={(i % 3) * 0.08} className="flex w-full">
                <ArtworkCard artwork={artwork} className="w-full" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
