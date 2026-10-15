import type { MetadataRoute } from "next";
import { getArtworks, getPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [artworks, posts] = await Promise.all([getArtworks(), getPosts()]);
  const now = new Date();

  const pages = ["", "/our-story", "/gallery", "/journey", "/contact", "/privacy", "/accessibility"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  return [
    ...pages,
    ...artworks.map((a) => ({ url: `${base}/gallery/${a.slug}`, lastModified: new Date(a.publishedAt), priority: 0.6 })),
    ...posts.map((p) => ({ url: `${base}/journey/${p.slug}`, lastModified: new Date(p.publishedAt), priority: 0.6 })),
  ];
}
