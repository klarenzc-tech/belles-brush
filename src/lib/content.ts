/**
 * Content access layer.
 *
 * Pages ONLY read content through these functions. In Phase 2, swap the
 * bodies for Supabase queries (e.g. `supabase.from("artworks").select()`)
 * and every page keeps working unchanged. They are async for that reason.
 */
import { artworks, categories } from "@/data/artworks";
import { posts } from "@/data/posts";
import type { Artwork, ArtworkCategory, CategoryInfo, Post } from "@/types/content";

const byNewest = <T extends { publishedAt: string }>(a: T, b: T) =>
  b.publishedAt.localeCompare(a.publishedAt);

export async function getCategories(): Promise<CategoryInfo[]> {
  return categories;
}

export async function getCategory(slug: ArtworkCategory): Promise<CategoryInfo | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getArtworks(): Promise<Artwork[]> {
  return [...artworks].sort(byNewest);
}

export async function getFeaturedArtworks(limit = 6): Promise<Artwork[]> {
  return (await getArtworks()).filter((a) => a.featured).slice(0, limit);
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | undefined> {
  return artworks.find((a) => a.slug === slug);
}

export async function getRelatedArtworks(artwork: Artwork, limit = 3): Promise<Artwork[]> {
  const all = await getArtworks();
  const same = all.filter((a) => a.slug !== artwork.slug && a.category === artwork.category);
  const others = all.filter((a) => a.slug !== artwork.slug && a.category !== artwork.category);
  return [...same, ...others].slice(0, limit);
}

export async function getPosts(): Promise<Post[]> {
  return [...posts].sort(byNewest);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}

export async function getAdjacentPosts(slug: string) {
  const all = await getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  return { newer: i > 0 ? all[i - 1] : undefined, older: i >= 0 ? all[i + 1] : undefined };
}
