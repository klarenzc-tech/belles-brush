import type { Metadata } from "next";
import { ArrowRight, Quote } from "lucide-react";
import { PageIntro } from "@/components/ui/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { PaintedScene } from "@/components/art/painted-scene";
import { Reveal } from "@/components/ui/reveal";
import { DemoNotice } from "@/components/ui/demo-badge";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Belle's Brush: a self-taught painter inspired by nature and Bob Ross, sharing his passion for painting with his daughter, Belle.",
  alternates: { canonical: "/our-story" },
  openGraph: { title: "Our Story | Belle's Brush", url: "/our-story" },
};

/**
 * Every statement on this page is drawn from the founder's own words.
 * Expand each chapter with the artist before launch — do not add invented details.
 */
const chapters = [
  {
    id: "the-artist",
    question: "Who is the artist?",
    title: "A self-taught painter",
    body: [
      "Behind Belle's Brush is a self-taught artist — someone who learned to paint not in a classroom, but at the easel, one canvas at a time.",
      "That authenticity is at the heart of everything here. Each painting is part of an ongoing journey of learning, practising and discovering what a brush can do.",
    ],
  },
  {
    id: "beginnings",
    question: "What inspired him to begin painting?",
    title: "Nature, creativity — and a gentle teacher",
    body: [
      "His inspiration comes from three places: the natural world, the simple joy of creating, and the teachings of Bob Ross.",
      "Over time, painting became a genuine passion — and, now, a passion he wants to share.",
    ],
  },
  {
    id: "bob-ross",
    question: "How did Bob Ross influence his journey?",
    title: "Learning from Bob Ross",
    body: [
      "Like many self-taught painters, he found inspiration in the teachings of Bob Ross — teachings known for their calm encouragement and the belief that anyone can learn to paint.",
      "Belle's Brush honours Bob Ross as an influence. It is an independent, personal project with no affiliation with, or endorsement from, Bob Ross or Bob Ross Inc.",
    ],
  },
  {
    id: "nature",
    question: "Why is nature important to his art?",
    title: "Where every painting begins",
    body: [
      "Nature is the source of his inspiration. Mountains, forests, still lakes and open skies give his paintings their subjects, their colours and their sense of peace.",
      "Painting the natural world is also a way of slowing down — of looking closely and appreciating the beauty that is always around us.",
    ],
  },
  {
    id: "belle",
    question: "Who is Belle?",
    title: "Belle — the inspiration",
    body: [
      "Belle is his daughter, and the reason behind the name. She is the inspiration for this project and the person he most wants to share his love of painting with.",
    ],
  },
  {
    id: "why",
    question: "Why was Belle's Brush created?",
    title: "More than just art",
    body: [
      "Belle's Brush was created because painting had become a passion — and a passion is meant to be shared.",
      "For him, it is about more than just art. It is about creating, exploring, and spending meaningful creative time together.",
    ],
  },
  {
    id: "legacy",
    question: "What does he hope to pass on?",
    title: "The joy of painting",
    body: [
      "Above all, he hopes to pass on the joy of painting to his daughter — the fun of creating, the excitement of exploring, and the happiness of making something with your own hands.",
    ],
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Story"
        title="A father, a daughter, and a shared love of painting"
        intro="Belle's Brush began with a simple wish: to take a personal passion for painting and pass it on to the next generation."
        scene="sunrise-valley"
        seed={21}
      />

      {/* In his own words */}
      <section aria-labelledby="own-words" className="py-16 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 id="own-words" className="eyebrow">In his own words</h2>
            <blockquote className="mt-6 border-l-4 border-gold pl-6 font-serif text-2xl leading-relaxed text-ink md:text-[1.85rem]">
              <p>
                &ldquo;I&rsquo;m a self-taught artist inspired by nature, creativity, and the teachings of Bob Ross. Painting
                has become a passion of mine, and now I want to share that passion with my daughter, Belle.
              </p>
              <p className="mt-5">
                For me, Belle&rsquo;s Brush is about more than just art. It&rsquo;s about creating, exploring, and passing on
                the joy of painting to my daughter.&rdquo;
              </p>
            </blockquote>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <PhotoPlaceholder className="mx-auto max-w-sm -rotate-2" label="A photograph of the artist at his easel will appear here." />
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      <section aria-label="The story, chapter by chapter" className="canvas-texture bg-paper py-16 md:py-24">
        <div className="container-page">
          <ol className="mx-auto max-w-3xl space-y-16 md:space-y-20">
            {chapters.map((c, i) => (
              <li key={c.id} id={c.id}>
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="font-brush text-5xl leading-none text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="eyebrow">{c.question}</p>
                      <h2 className="mt-2 text-3xl font-medium md:text-4xl">{c.title}</h2>
                    </div>
                  </div>
                  <div className="prose-story mt-6 text-lg md:pl-16">
                    {c.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </Reveal>

                {c.id === "nature" && (
                  <Reveal className="mt-12">
                    <figure className="overflow-hidden rounded-[var(--radius-organic)] shadow-[0_30px_60px_-35px_rgba(6,58,60,0.6)]">
                      <div className="aspect-[16/8]">
                        <PaintedScene variant="alpine-lake" seed={17} label="Illustration of snow-capped mountains reflected in a calm lake." />
                      </div>
                      <figcaption className="bg-white px-5 py-3 text-sm text-stone">
                        Illustration created for the website — not an original painting by the artist.
                      </figcaption>
                    </figure>
                  </Reveal>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured quotation */}
      <section aria-label="Featured quotation" className="relative isolate overflow-hidden bg-ink py-20 text-canvas md:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25">
          <PaintedScene variant="evening-reflections" seed={4} label="" decorative />
        </div>
        <div className="container-page text-center">
          <Reveal>
            <Quote aria-hidden="true" className="mx-auto size-10 text-gold" />
            <blockquote className="mx-auto mt-6 max-w-3xl">
              <p className="font-serif text-3xl leading-snug text-canvas md:text-5xl">
                It&rsquo;s more than painting. It&rsquo;s about creating memories, sharing inspiration, and discovering the joy
                of art together.
              </p>
            </blockquote>
            <p className="mt-8 font-brush text-3xl text-sunrise">My passion. Her inspiration. Our journey.</p>
          </Reveal>
        </div>
      </section>

      {/* Together */}
      <section aria-labelledby="together" className="py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Creative time together</p>
            <h2 id="together" className="mt-3 text-3xl font-medium md:text-4xl">Moments at the easel</h2>
            <p className="mt-4 text-lg text-stone">
              This space is reserved for real photographs of painting sessions with Belle, shared with the family&rsquo;s permission.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PhotoPlaceholder label="Painting together at the easel." />
            <PhotoPlaceholder label="Belle's own brushstrokes." className="sm:translate-y-6" />
            <PhotoPlaceholder label="Exploring nature for inspiration." className="hidden lg:flex" />
          </div>
          <DemoNotice className="mt-14 max-w-3xl">
            This page is built from the artist&rsquo;s own statement. More of the story — in his words — will be added as the
            journey continues.
          </DemoNotice>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/gallery">
              See the paintings <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/journey" variant="outline">Read the journal</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
