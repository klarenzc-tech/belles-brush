import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ArtworkMedia } from "@/components/art/artwork-media";
import type { Post } from "@/types/content";
import { cn, formatDate } from "@/lib/utils";

export function PostCard({ post, featured = false, className }: { post: Post; featured?: boolean; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-[var(--radius-organic)] bg-white shadow-[0_18px_40px_-28px_rgba(6,58,60,0.55)] ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-lake",
        featured ? "flex-col md:flex-row" : "flex-col",
        className,
      )}
    >
      <ArtworkMedia
        image={post.coverImage}
        scene={post.coverScene}
        alt={post.coverAlt}
        seedKey={post.slug}
        isDemo={post.isDemo}
        badgeLabel="Demonstration article"
        sizes={featured ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        className={featured ? "aspect-[4/3] md:aspect-auto md:w-[55%] md:min-h-[24rem]" : "aspect-[16/10]"}
      />
      <div className={cn("flex flex-1 flex-col p-6", featured && "md:p-10 md:justify-center")}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" className="size-3.5" /> {post.readingMinutes} min read
          </span>
        </div>
        <h3 className={cn("mt-3 font-medium", featured ? "text-3xl md:text-4xl" : "text-2xl")}>
          <Link href={`/journey/${post.slug}`} className="after:absolute after:inset-0 focus:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-stone">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-2" aria-label="Topics">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">{t}</li>
            ))}
          </ul>
          <span aria-hidden="true" className="inline-flex items-center gap-2 font-semibold text-teal transition-all group-hover:gap-3">
            Read <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
