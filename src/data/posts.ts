import type { Post } from "@/types/content";

/**
 * DEMONSTRATION JOURNAL ENTRIES
 * -----------------------------
 * These are sample articles written to preview the journal layout.
 * They are NOT the artist's own words and describe no real events.
 * Replace them with the artist's approved writing before launch
 * (or load from Supabase / a CMS in Phase 2).
 */

export const posts: Post[] = [
  {
    id: "post-demo-01",
    slug: "learning-to-paint",
    title: "Learning to Paint, One Canvas at a Time",
    excerpt:
      "Being self-taught means every painting is also a lesson. A sample reflection on patience, practice and starting before you feel ready.",
    publishedAt: "2026-09-28",
    readingMinutes: 3,
    tags: ["Learning", "Self-taught"],
    coverScene: "misty-peaks",
    coverAlt: "Placeholder painting of layered mountain ridges in morning mist.",
    isDemo: true,
    body: [
      { type: "paragraph", text: "There is no classroom when you teach yourself to paint. There is a blank canvas, a handful of brushes, and the quiet decision to begin anyway." },
      { type: "heading", text: "Every canvas teaches something" },
      { type: "paragraph", text: "Some paintings come together easily. Others fight back at every stroke. Both are useful. The ones that go wrong often teach the most — about mixing colour, about when to stop, about trusting the next layer to fix what the last one could not." },
      { type: "paragraph", text: "Being self-taught is not a weakness to hide. It is part of the story: a record of curiosity, patience and showing up to the easel again and again." },
      { type: "heading", text: "Starting before you feel ready" },
      { type: "paragraph", text: "Nobody feels ready to paint a mountain the first time. The only way to learn is to try, look honestly at the result, and try again." },
    ],
  },
  {
    id: "post-demo-02",
    slug: "inspired-by-bob-ross",
    title: "What Bob Ross Teaches About Painting — and Patience",
    excerpt:
      "A sample article on the gentle lessons many self-taught painters take from Bob Ross: calm, confidence and the freedom to experiment.",
    publishedAt: "2026-09-12",
    readingMinutes: 4,
    tags: ["Inspiration", "Technique"],
    coverScene: "alpine-lake",
    coverAlt: "Placeholder painting of snowy mountains reflected in an alpine lake.",
    isDemo: true,
    body: [
      { type: "paragraph", text: "For generations of painters, Bob Ross was the first teacher they ever had — a calm voice showing that a whole landscape could appear on a canvas in half an hour." },
      { type: "quote", text: "We don't make mistakes, just happy accidents.", cite: "Bob Ross" },
      { type: "heading", text: "Permission to begin" },
      { type: "paragraph", text: "His greatest gift may have been permission. Permission to paint without formal training, to enjoy the process, and to treat a stray brushstroke as the start of a new tree rather than a failure." },
      { type: "heading", text: "Techniques worth exploring" },
      { type: "paragraph", text: "Wet-on-wet blending, fan-brush trees and palette-knife mountains are all approaches many beginners first try because of him. They reward practice and make it possible to finish a painting in a single sitting." },
      { type: "paragraph", text: "Belle's Brush honours Bob Ross as an inspiration. It is an independent project and has no affiliation with, or endorsement from, Bob Ross Inc." },
    ],
  },
  {
    id: "post-demo-03",
    slug: "finding-inspiration-in-nature",
    title: "Finding Inspiration in Nature",
    excerpt:
      "Mountains, forests, rivers and skies — a sample piece on why the natural world makes such a patient and generous teacher.",
    publishedAt: "2026-08-30",
    readingMinutes: 3,
    tags: ["Nature", "Inspiration"],
    coverScene: "forest-path",
    coverAlt: "Placeholder painting of a sunlit path through tall pine trees.",
    isDemo: true,
    body: [
      { type: "paragraph", text: "Nature never asks you to hurry. A mountain will hold still while you study it. A lake will show you the same sky twice." },
      { type: "heading", text: "Learning to look" },
      { type: "paragraph", text: "Painting landscapes changes how you see the world. You start to notice that shadows are rarely black, that distant hills turn blue, and that the brightest light is often at the edge of a cloud." },
      { type: "paragraph", text: "Every walk becomes a quiet study — a chance to collect colours and shapes to bring back to the easel." },
    ],
  },
  {
    id: "post-demo-04",
    slug: "painting-with-belle",
    title: "Painting Together: Sharing a Passion",
    excerpt:
      "A placeholder for one of the most important stories on the site — what it means to share the joy of painting with a daughter.",
    publishedAt: "2026-08-14",
    readingMinutes: 2,
    tags: ["Family", "Belle"],
    coverScene: "sunrise-valley",
    coverAlt: "Placeholder painting of a golden sunrise over a mountain valley.",
    isDemo: true,
    body: [
      { type: "paragraph", text: "This article is a placeholder. It is reserved for the artist to share, in his own words, what it is like to paint alongside his daughter Belle." },
      { type: "paragraph", text: "Belle's Brush began with a simple wish: to pass on the joy of painting from one generation to the next. This space will hold the real moments, lessons and memories that come from that journey." },
      { type: "quote", text: "It's more than painting. It's about creating memories, sharing inspiration, and discovering the joy of art together." },
    ],
  },
  {
    id: "post-demo-05",
    slug: "lessons-from-the-canvas",
    title: "Lessons from the Canvas",
    excerpt:
      "Patience, courage and knowing when to stop — a sample reflection on the life lessons hidden in every painting.",
    publishedAt: "2026-07-26",
    readingMinutes: 3,
    tags: ["Reflection"],
    coverScene: "golden-river",
    coverAlt: "Placeholder painting of a river winding under an evening sky.",
    isDemo: true,
    body: [
      { type: "paragraph", text: "A canvas is a surprisingly honest teacher. It shows you exactly where you rushed, where you hesitated, and where you were brave." },
      { type: "heading", text: "Patience" },
      { type: "paragraph", text: "Some layers need to dry before the next can begin. Some ideas need time before they are ready to be painted." },
      { type: "heading", text: "Knowing when to stop" },
      { type: "paragraph", text: "One more brushstroke can bring a painting to life — or take something away. Learning to step back and look is part of the craft." },
    ],
  },
];
