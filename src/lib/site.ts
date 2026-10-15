/**
 * Central site configuration. Update names, links and social profiles here.
 */

export const siteConfig = {
  name: "Belle's Brush",
  tagline: "My passion. Her inspiration. Our journey.",
  description:
    "Belle's Brush is the creative journey of a self-taught painter inspired by nature, the teachings of Bob Ross, and his daughter, Belle.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_GB",
  ogImage: "/brand/og-image.jpg",
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/journey", label: "The Journey" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Social profiles. Leave `href` empty until the artist approves a link —
 * empty entries are shown as "coming soon" rather than as dead links.
 */
export type SocialLink = { label: string; href: string; handle?: string };

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "YouTube", href: "" },
];

export const activeSocialLinks = socialLinks.filter((s) => s.href.trim() !== "");
