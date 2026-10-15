import type { Artwork, CategoryInfo } from "@/types/content";

/**
 * DEMONSTRATION DATA
 * ------------------
 * Every entry below is a placeholder (isDemo: true). The images are
 * code-generated painterly scenes, NOT paintings by the artist, and the
 * text describes the placeholder rather than speaking for the artist.
 *
 * Replace these with real artworks (or load them from Supabase in Phase 2).
 * Leave medium / dimensions / availability out until the artist confirms them.
 */

export const categories: CategoryInfo[] = [
  {
    slug: "landscapes",
    label: "Landscapes",
    description: "Wide open views — valleys, meadows and the light that moves across them.",
  },
  {
    slug: "mountains-forests",
    label: "Mountains & Forests",
    description: "Snow-capped peaks, quiet pines and the stillness of high places.",
  },
  {
    slug: "water-reflections",
    label: "Water & Reflections",
    description: "Lakes, rivers and the sky mirrored in calm water.",
  },
  {
    slug: "creative-explorations",
    label: "Creative Explorations",
    description: "Experiments with colour, texture and new ideas on the canvas.",
  },
];

const demoNote =
  "This is a demonstration entry used to preview the gallery layout. The image is a placeholder generated for the website, not a painting by the artist. When a real painting is added, this space will hold its story — where the idea came from, what the artist was feeling, and what he learned along the way.";

export const artworks: Artwork[] = [
  {
    id: "demo-01",
    slug: "sunrise-over-the-valley",
    title: "Sunrise over the Valley",
    category: "landscapes",
    excerpt: "Golden morning light spilling over a mountain valley and its quiet lake.",
    story: [
      "A sunrise scene with warm gold sky, a blue mountain range and a still lake below — the kind of view that echoes the Belle's Brush logo.",
      demoNote,
    ],
    scene: "sunrise-valley",
    alt: "Placeholder painting: golden sunrise over blue mountains and a calm lake framed by pine trees.",
    featured: true,
    isDemo: true,
    publishedAt: "2026-09-20",
  },
  {
    id: "demo-02",
    slug: "alpine-lake-morning",
    title: "Alpine Lake Morning",
    category: "water-reflections",
    excerpt: "Snowy peaks reflected in clear, cool water on a bright morning.",
    story: [
      "Cool blues and crisp whites: a snow-capped range doubled in the surface of an alpine lake.",
      demoNote,
    ],
    scene: "alpine-lake",
    alt: "Placeholder painting: snow-capped mountains reflected in a clear blue alpine lake.",
    featured: true,
    isDemo: true,
    publishedAt: "2026-09-14",
  },
  {
    id: "demo-03",
    slug: "through-the-pines",
    title: "Through the Pines",
    category: "mountains-forests",
    excerpt: "A winding path through tall evergreens, lit by soft afternoon sun.",
    story: [
      "Tall evergreens line a winding path, with warm light breaking through towards distant hills.",
      demoNote,
    ],
    scene: "forest-path",
    alt: "Placeholder painting: a winding path between tall pine trees in warm afternoon light.",
    featured: true,
    isDemo: true,
    publishedAt: "2026-09-02",
  },
  {
    id: "demo-04",
    slug: "misty-peaks",
    title: "Misty Peaks",
    category: "mountains-forests",
    excerpt: "Layer upon layer of mountains fading softly into the morning mist.",
    story: [
      "Mountain ridges stacked into the distance, each one paler than the last as the mist rises.",
      demoNote,
    ],
    scene: "misty-peaks",
    alt: "Placeholder painting: layered blue mountain ridges fading into pale morning mist.",
    featured: true,
    isDemo: true,
    publishedAt: "2026-08-25",
  },
  {
    id: "demo-05",
    slug: "golden-river-bend",
    title: "Golden River Bend",
    category: "landscapes",
    excerpt: "A river winding towards the hills beneath a glowing evening sky.",
    story: [
      "A river curves through a valley towards low hills, catching the last gold of the evening.",
      demoNote,
    ],
    scene: "golden-river",
    alt: "Placeholder painting: a winding river under a glowing orange and gold evening sky.",
    featured: true,
    isDemo: true,
    publishedAt: "2026-08-11",
  },
  {
    id: "demo-06",
    slug: "evening-reflections",
    title: "Evening Reflections",
    category: "water-reflections",
    excerpt: "Dusk settles over the lake, turning the water to violet and rose.",
    story: [
      "As dusk falls, the lake holds the last colours of the sky — violet, rose and deep blue.",
      demoNote,
    ],
    scene: "evening-reflections",
    alt: "Placeholder painting: a lake at dusk reflecting violet and rose colours from the sky.",
    featured: true,
    isDemo: true,
    publishedAt: "2026-07-30",
  },
  {
    id: "demo-07",
    slug: "colour-study-no-1",
    title: "Colour Study No. 1",
    category: "creative-explorations",
    excerpt: "Loose, joyful brushstrokes exploring the colours of a mountain morning.",
    story: [
      "An abstract play of brushstrokes in the palette of the brand — lake teal, sky blue, sunrise gold and a touch of plum.",
      demoNote,
    ],
    scene: "colour-study",
    alt: "Placeholder artwork: loose abstract brushstrokes in teal, blue, gold and plum.",
    isDemo: true,
    publishedAt: "2026-07-18",
  },
  {
    id: "demo-08",
    slug: "quiet-shoreline",
    title: "Quiet Shoreline",
    category: "creative-explorations",
    excerpt: "A simplified, dreamlike take on a lake shore at first light.",
    story: [
      "A softer, more experimental lake scene where shapes are simplified and the colour does the talking.",
      demoNote,
    ],
    scene: "evening-reflections",
    alt: "Placeholder artwork: a simplified, dreamlike lake shoreline in soft colours.",
    isDemo: true,
    publishedAt: "2026-07-05",
  },
];
