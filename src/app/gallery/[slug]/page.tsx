import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { ArtworkMedia } from "@/components/art/artwork-media";
import { ArtworkCard, categoryLabel } from "@/components/gallery/artwork-card";
import { ButtonLink } from "@/components/ui/button";
import { BrushDivider } from "@/components/ui/brush-divider";
import { DemoNotice } from "@/components/ui/demo-badge";
import { getArtworkBySlug, getArtworks, getRelatedArtworks } from "@/lib/content";
import type { Availability } from "@/types/content";

type Props = { params: Promise<{ slug: string }> };

const availabilityLabel: Record<Availability, string> = {
  available: "Available",
  sold: "Sold",
  "not-for-sale": "Not for sale",
  "private-collection": "In a private collection",
};

export async function generateStaticParams() {
  return (await getArtworks()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artwork = await getArtworkBySlug((await params).slug);
  if (!artwork) return { title: "Artwork not found" };
  return {
    title: artwork.title,
    description: artwork.excerpt,
    alternates: { canonical: `/gallery/${artwork.slug}` },
    openGraph: {
      title: `${artwork.title} | Belle's Brush`,
      description: artwork.excerpt,
      url: `/gallery/${artwork.slug}`,
      ...(artwork.image ? { images: [{ url: artwork.image.src, alt: artwork.image.alt }] } : {}),
    },
  };
}

export default async function ArtworkPage({ params }: Props) {
  const artwork = await getArtworkBySlug((await params).slug);
  if (!artwork) notFound();
  const related = await getRelatedArtworks(artwork, 3);

  const details: { term: string; value: string }[] = [
    { term: "Category", value: categoryLabel(artwork.category) },
    { term: "Medium", value: artwork.medium ?? "To be confirmed" },
    { term: "Dimensions", value: artwork.dimensions ?? "To be confirmed" },
    ...(artwork.year ? [{ term: "Year", value: String(artwork.year) }] : []),
    ...(artwork.availability ? [{ term: "Availability", value: availabilityLabel[artwork.availability] }] : []),
  ];

  const enquireHref = `/contact?subject=artwork&artwork=${encodeURIComponent(artwork.slug)}`;

  return (
    <>
      <article className="container-page pb-20 pt-10 md:pt-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link href="/gallery" className="inline-flex items-center gap-2 font-semibold text-teal hover:underline underline-offset-4">
            <ArrowLeft aria-hidden="true" className="size-4" /> Back to the gallery
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-organic)] bg-white p-3 shadow-[0_40px_70px_-40px_rgba(6,58,60,0.7)] ring-1 ring-ink/5 md:p-4">
              <ArtworkMedia
                image={artwork.image}
                scene={artwork.scene}
                alt={artwork.alt}
                seedKey={artwork.slug}
                isDemo={artwork.isDemo}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[4/3] rounded-[1.75rem_1rem_2rem_1.25rem]"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow">{categoryLabel(artwork.category)}</p>
            <h1 className="mt-3 text-4xl font-medium md:text-5xl">{artwork.title}</h1>
            <BrushDivider className="mt-4" />

            {artwork.isDemo && (
              <DemoNotice className="mt-6">
                This is a <strong>demonstration entry</strong>. The image is a placeholder, not a painting by the artist.
              </DemoNotice>
            )}

            <dl className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
              {details.map((d) => (
                <div key={d.term} className="flex justify-between gap-6 px-5 py-3.5">
                  <dt className="text-stone">{d.term}</dt>
                  <dd className="text-right font-semibold text-ink">{d.value}</dd>
                </div>
              ))}
            </dl>

            <section aria-labelledby="story-title" className="mt-10">
              <h2 id="story-title" className="text-2xl font-medium">The story behind the piece</h2>
              <div className="prose-story mt-4 text-lg">
                {artwork.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <ButtonLink href={enquireHref} size="lg" className="mt-10 w-full sm:w-auto">
              <Mail aria-hidden="true" /> Enquire About This Artwork
            </ButtonLink>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="canvas-texture bg-paper py-20">
          <div className="container-page">
            <h2 id="related-title" className="text-3xl font-medium">More from the gallery</h2>
            <BrushDivider className="mt-4" />
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={a.id} className="flex">
                  <ArtworkCard artwork={a} className="w-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
