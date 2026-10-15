import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageIntro } from "@/components/ui/page-intro";
import { PostCard } from "@/components/journey/post-card";
import { DemoNotice } from "@/components/ui/demo-badge";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Creative Journey",
  description: "Reflections, lessons and stories from the easel — the Belle's Brush journal.",
  alternates: { canonical: "/journey" },
  openGraph: { title: "The Creative Journey | Belle's Brush", url: "/journey" },
};

export default async function JourneyPage() {
  const posts = await getPosts();
  const [first, ...rest] = posts;
  const hasDemo = posts.some((p) => p.isDemo);

  return (
    <>
      <PageIntro
        eyebrow="The Journal"
        title="The Creative Journey"
        intro="Reflections from the easel — learning to paint, finding inspiration in nature, and sharing it all with Belle."
        scene="forest-path"
        seed={13}
      />
      <section aria-label="Journal entries" className="pb-28">
        <div className="container-page">
          {hasDemo && (
            <DemoNotice className="mb-10 max-w-3xl">
              <strong>Preview only:</strong> these journal entries are sample articles written to show the layout. They are
              not the artist&rsquo;s own words and will be replaced with his approved writing.
            </DemoNotice>
          )}

          {!first ? (
            <div className="flex flex-col items-center rounded-[var(--radius-organic)] border-2 border-dashed border-ink/20 bg-paper px-6 py-16 text-center">
              <BookOpen aria-hidden="true" className="size-10 text-teal" />
              <h2 className="mt-4 text-2xl font-medium">The first entry is on its way</h2>
              <p className="mt-2 max-w-md text-stone">Check back soon for stories from the easel.</p>
            </div>
          ) : (
            <>
              <PostCard post={first} featured />
              {rest.length > 0 && (
                <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <li key={p.id} className="flex">
                      <PostCard post={p} className="w-full" />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
