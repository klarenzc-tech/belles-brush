# Belle's Brush — Website (Version 1)

> *My passion. Her inspiration. Our journey.*

The website for **Belle's Brush**: the creative journey of a self-taught painter, inspired by nature and the teachings of Bob Ross, sharing his love of painting with his daughter, Belle.

Version 1 is a complete, responsive, accessible site with five pages, a filterable gallery, a journal, and an honest contact form. It runs on demonstration content until the artist's real paintings and words are added — see **[CONTENT-CHECKLIST.md](./CONTENT-CHECKLIST.md)**.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (design tokens in `src/app/globals.css`) |
| UI | shadcn/ui-style components (`cva` + `cn`) in `src/components/ui` |
| Icons | Lucide |
| Motion | Motion (`motion/react`) — respects *reduce motion* |
| Validation | Zod (shared by the browser and the API) |
| Fonts | Fraunces (headings), Source Sans 3 (body), Caveat (brush accents) — self-hosted via Fontsource, so no requests to Google |
| Images | `next/image` for the logo and real artwork photos |

## Getting started

Requirements: **Node.js 20.9 or newer** (22 LTS recommended) and npm.

```bash
npm install
cp .env.example .env.local   # optional for local development
npm run dev
```

Open <http://localhost:3000>.

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | Check TypeScript types |

## Project structure

```
src/
├─ app/                      Routes (App Router)
│  ├─ page.tsx               Home
│  ├─ our-story/             Our Story
│  ├─ gallery/               Gallery + gallery/[slug] artwork pages
│  ├─ journey/               Journal + journey/[slug] articles
│  ├─ contact/               Contact page
│  ├─ privacy/, accessibility/
│  ├─ api/contact/route.ts   Contact form handler
│  ├─ sitemap.ts, robots.ts  SEO
│  ├─ not-found.tsx, error.tsx
│  └─ icon.png, apple-icon.png
├─ components/
│  ├─ layout/                Header, mobile menu, footer, logo
│  ├─ home/                  The six homepage sections
│  ├─ gallery/               Artwork card, filterable grid
│  ├─ journey/               Journal card
│  ├─ contact/               Contact form
│  ├─ art/                   PaintedScene (placeholder art), ArtworkMedia
│  └─ ui/                    Button, dividers, notices, Reveal, etc.
├─ data/                     Demonstration artworks + journal entries
├─ lib/                      site config, content layer, schema, email
└─ types/                    Content types (Supabase-ready)
public/
├─ brand/                    Logo (original + transparent), social image
├─ artwork/                  Put real painting photos here
└─ images/                   Put photos of the artist and Belle here
```

## Editing content

- **Site name, tagline, social links:** `src/lib/site.ts`. Social links with an empty `href` show as "coming soon" instead of becoming dead links.
- **Artworks:** `src/data/artworks.ts`. To add a real painting, save the photo in `public/artwork/` and add an entry with an `image`:

  ```ts
  {
    id: "art-001",
    slug: "my-first-mountain",
    title: "My First Mountain",
    category: "mountains-forests",
    excerpt: "One or two sentences for the card.",
    story: ["Paragraph one…", "Paragraph two…"],
    medium: "Oil on canvas",          // only if known
    dimensions: "40 × 50 cm",         // only if known
    image: { src: "/artwork/my-first-mountain.jpg", width: 2000, height: 1600, alt: "Describe the painting" },
    alt: "Describe the painting",
    featured: true,                   // show on the homepage
    isDemo: false,
    publishedAt: "2026-11-01",
  }
  ```

  Delete the demonstration entries (`isDemo: true`) once real pieces are in. Their placeholder labels disappear automatically.
- **Journal:** `src/data/posts.ts`. Each article is a list of `paragraph`, `heading` and `quote` blocks.
- **Story page:** `src/app/our-story/page.tsx`. Every statement is drawn from the founder's own words; expand it only with details the artist provides.

Pages never import data files directly; they go through `src/lib/content.ts`. That is the one file to change when content moves to a database.

## Contact form and email

The form validates in the browser and again on the server (`src/lib/contact-schema.ts`), includes a hidden spam trap, and **never claims a message was sent unless the email provider confirms it.**

Until email is configured the form is clearly labelled as a demonstration and responds with "Message not sent".

To switch on delivery with [Resend](https://resend.com):

1. Create a Resend account and verify the sending domain.
2. Add to `.env.local` (and to your Vercel project settings):

   ```bash
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=artist@example.com
   CONTACT_FROM_EMAIL="Belle's Brush <hello@yourdomain.com>"
   ```

3. Restart the server. The demonstration notice disappears and messages are delivered, with *reply-to* set to the visitor's address.

To use a different provider, replace `sendContactEmail()` in `src/lib/email.ts`.

## Accessibility and performance

- Keyboard-friendly throughout, with a skip link, visible focus outlines, `aria-current` navigation and an Escape-to-close mobile menu.
- Gallery filters are toggle buttons (`aria-pressed`) with a polite live region announcing results. Filters update a shareable `?category=` URL.
- Form errors are announced in words, linked to their fields, and focus moves to the first problem.
- All animation is gentle and switched off for users who prefer reduced motion.
- Every page is statically pre-rendered except `/contact`, which reads the artwork being enquired about.

### About the placeholder artwork

The demonstration paintings and the hero landscape are drawn in code by `src/components/art/painted-scene.tsx` (SVG). They are clearly labelled and are **not** the artist's work. Once real photographs are added, artwork pages switch to optimised `next/image` photos automatically. The hero can be swapped for a real painting in `src/components/home/hero.tsx`.

## Deploying to Vercel

When the time comes:

1. Push the project to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository. The framework is detected as Next.js, so no build settings need to change.
3. Under **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`, set to the final address (for example `https://bellesbrush.com`). The sitemap, robots file and social previews use it.
   - the three `RESEND_*` / `CONTACT_*` variables, once email is ready.
4. Deploy, then add the custom domain under **Settings → Domains**.
5. Re-deploy after changing environment variables.

## Roadmap — designed in, not yet built

**Phase 2: Content management (Supabase)**
- The types in `src/types/content.ts` map directly onto `artworks` and `posts` tables. A starter schema is in [`docs/supabase-schema.sql`](./docs/supabase-schema.sql).
- Replace the function bodies in `src/lib/content.ts` with Supabase queries. Pages stay untouched.
- Add the Supabase Storage hostname to `images.remotePatterns` in `next.config.ts`.
- An admin area would live under `src/app/(admin)/…` with Supabase Auth and role checks.
- Once content is fetched at request time, add `loading.tsx` files (a ready-made `GalleryGridSkeleton` is exported from `src/components/gallery/gallery-grid.tsx`).

**Phase 3: Commerce.** The optional `availability` field already exists. Prices, prints, variants, commissions and checkout would be added as new fields and routes.

**Phase 4: Community and learning.** Tutorials, videos, newsletter, workshops and events would slot in as new route groups and content types.
