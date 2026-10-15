import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { ArtworkMedia } from "@/components/art/artwork-media";
import { BrushDivider } from "@/components/ui/brush-divider";
import { DemoNotice } from "@/components/ui/demo-badge";
import { getAdjacentPosts, getPostBySlug, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journey/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | Belle's Brush`,
      description: post.excerpt,
      url: `/journey/${post.slug}`,
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const { newer, older } = await getAdjacentPosts(slug);

  return (
    <article className="pb-24">
      <header className="container-page max-w-4xl pt-10 md:pt-14">
        <nav aria-label="Breadcrumb">
          <Link href="/journey" className="inline-flex items-center gap-2 font-semibold text-teal hover:underline underline-offset-4">
            <ArrowLeft aria-hidden="true" className="size-4" /> All journal entries
          </Link>
        </nav>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Topics">
          {post.tags.map((t) => (
            <li key={t} className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">{t}</li>
          ))}
        </ul>
        <h1 className="mt-4 text-4xl font-medium md:text-6xl">{post.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-stone">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-4" /> {post.readingMinutes} min read
          </span>
        </div>
        <BrushDivider className="mt-5" />
      </header>

      <div className="container-page mt-10 max-w-5xl">
        <ArtworkMedia
          image={post.coverImage}
          scene={post.coverScene}
          alt={post.coverAlt}
          seedKey={post.slug}
          isDemo={post.isDemo}
          badgeLabel="Placeholder image"
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="aspect-[16/8] rounded-[var(--radius-organic)] shadow-[0_40px_70px_-45px_rgba(6,58,60,0.7)]"
        />
      </div>

      <div className="container-page mt-12 max-w-3xl">
        {post.isDemo && (
          <DemoNotice className="mb-10">
            <strong>Demonstration article.</strong> This sample text previews the journal layout. It is not written by the
            artist and describes no real events.
          </DemoNotice>
        )}

        <div className="text-lg leading-relaxed md:text-[1.2rem]">
          {post.body.map((block, i) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2 key={i} className="mt-12 text-3xl font-medium">
                    {block.text}
                  </h2>
                );
              case "quote":
                return (
                  <figure key={i} className="my-10 border-l-4 border-gold pl-6">
                    <blockquote className="font-serif text-2xl leading-snug text-ink md:text-3xl">
                      <p>&ldquo;{block.text}&rdquo;</p>
                    </blockquote>
                    {block.cite && <figcaption className="mt-3 text-base text-stone">— {block.cite}</figcaption>}
                  </figure>
                );
              default:
                return (
                  <p key={i} className="mt-5 first:mt-0">
                    {block.text}
                  </p>
                );
            }
          })}
        </div>

        <nav aria-label="More journal entries" className="mt-16 grid gap-4 border-t border-ink/10 pt-10 sm:grid-cols-2">
          {older ? (
            <Link href={`/journey/${older.slug}`} className="group rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-teal">
              <span className="inline-flex items-center gap-1.5 text-sm text-stone">
                <ArrowLeft aria-hidden="true" className="size-4" /> Previous entry
              </span>
              <span className="mt-1 block font-serif text-xl text-ink">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/journey/${newer.slug}`} className="group rounded-2xl border border-ink/10 bg-white p-5 text-right transition-colors hover:border-teal">
              <span className="inline-flex items-center gap-1.5 text-sm text-stone">
                Next entry <ArrowRight aria-hidden="true" className="size-4" />
              </span>
              <span className="mt-1 block font-serif text-xl text-ink">{newer.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
