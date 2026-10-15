/**
 * Content types for Belle's Brush.
 *
 * These shapes are deliberately database-friendly so that, in Phase 2,
 * rows from Supabase tables (`artworks`, `posts`) can be mapped onto them
 * without touching any page or component.
 */

export type ArtworkCategory =
  | "landscapes"
  | "mountains-forests"
  | "water-reflections"
  | "creative-explorations";

/** Optional — only shown when the artist has confirmed it. */
export type Availability = "available" | "sold" | "not-for-sale" | "private-collection";

/** Placeholder painted scenes used while real photographs are not yet supplied. */
export type SceneVariant =
  | "sunrise-valley"
  | "alpine-lake"
  | "misty-peaks"
  | "forest-path"
  | "golden-river"
  | "evening-reflections"
  | "colour-study";

/** A real photograph of a painting (Phase 2: Supabase Storage URL). */
export interface MediaImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  category: ArtworkCategory;
  /** One or two sentences for cards. */
  excerpt: string;
  /** The story or inspiration behind the piece, one paragraph per entry. */
  story: string[];
  medium?: string;
  dimensions?: string;
  year?: number;
  availability?: Availability;
  /** Real photograph. When present it replaces the placeholder scene. */
  image?: MediaImage;
  /** Placeholder scene for demonstration entries. */
  scene?: SceneVariant;
  /** Short description of the image for screen readers. */
  alt: string;
  featured?: boolean;
  /** Demonstration entries are always labelled as such in the UI. */
  isDemo: boolean;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
}

export interface CategoryInfo {
  slug: ArtworkCategory;
  label: string;
  description: string;
}

export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string };

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  coverImage?: MediaImage;
  coverScene?: SceneVariant;
  coverAlt: string;
  body: PostBlock[];
  isDemo: boolean;
}
