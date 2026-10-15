import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { DemoNotice } from "@/components/ui/demo-badge";
import { getArtworks, getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Art Gallery",
  description: "Explore landscapes, mountains and forests, water and reflections, and creative explorations from Belle's Brush.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Art Gallery | Belle's Brush", url: "/gallery" },
};

export default async function GalleryPage() {
  const [artworks, categories] = await Promise.all([getArtworks(), getCategories()]);
  const hasDemo = artworks.some((a) => a.isDemo);

  return (
    <>
      <PageIntro
        eyebrow="The Gallery"
        title="Paintings from the journey"
        intro="Mountains, forests, still water and the occasional experiment — every piece is a step along the way."
        scene="alpine-lake"
        seed={9}
      />
      <section aria-label="Artwork" className="pb-28">
        <div className="container-page">
          {hasDemo && (
            <DemoNotice className="mb-10 max-w-3xl">
              <strong>Preview only:</strong> the artworks below are demonstration placeholders created for the website
              design. They are not paintings by the artist and will be replaced with his real work.
            </DemoNotice>
          )}
          <GalleryGrid artworks={artworks} categories={categories} />
        </div>
      </section>
    </>
  );
}
