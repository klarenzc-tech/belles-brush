# Before Launch — Content Needed from the Artist

Everything below is currently placeholder or draft. Version 1 deliberately invents **no** biography, prices, testimonials, exhibitions or family details.

## 1. Artwork (highest priority)
- [ ] High-quality photographs of real paintings (at least 6 to start), ideally 2000px or more on the long edge, evenly lit, cropped to the canvas.
- [ ] For each painting: title, category, a one-line description, and the story or inspiration behind it.
- [ ] Optional, only where known: medium (acrylic or oil), dimensions, year, availability.
- [ ] Choose which pieces should be **featured** on the homepage.
- [ ] Remove the 8 demonstration entries in `src/data/artworks.ts`.
- [ ] Optional: a real painting to replace the illustrated hero landscape.

## 2. Story and words
- [ ] Approve or adjust the first-person welcome text on the homepage (`src/components/home/welcome.tsx`). It expands slightly on the founder's statement, including the "Pull up a chair — let's paint." line.
- [ ] Approve the "Heart Behind the Brush" lines (`src/components/home/heart-behind-brush.tsx`).
- [ ] Review the Our Story page. Add any personal details the artist is happy to share, such as when he started painting, a first painting, or a favourite place in nature.
- [ ] Decide how Belle is presented: name only (current), age, photos or her own artwork. Please consider her privacy.
- [ ] Approve the use of the featured quotation as the artist's words.

## 3. Photographs
- [ ] The artist at the easel (Our Story page).
- [ ] The artist and Belle painting together (homepage and Our Story page, three spots).
- [ ] Get family consent for any image of Belle.

## 4. Journal
- [ ] Replace or rewrite the 5 demonstration articles in `src/data/posts.ts`. These are not the artist's words.
- [ ] The "Painting Together" article is reserved for the artist's own account.

## 5. Contact and social
- [ ] Email address that should receive enquiries (`CONTACT_TO_EMAIL`).
- [ ] Sending domain plus a Resend account (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`).
- [ ] Approved social media links (Instagram, Facebook, YouTube or others) in `src/lib/site.ts`.

## 6. Legal and domain (owner review)
- [ ] Review the Privacy Policy (`/privacy`): owner name, contact email for privacy requests, applicable data-protection law, and the "last updated" date.
- [ ] Review the Accessibility statement (`/accessibility`), and update its date.
- [ ] Confirm wording on the Bob Ross reference. The site states there is no affiliation or endorsement.
- [ ] Register a domain and set `NEXT_PUBLIC_SITE_URL`.

## 7. Brand
- [ ] Ideally, a high-resolution or vector version of the logo (SVG, or PNG with a transparent background). The current file was converted from the supplied JPEG.
- [ ] Confirm the colour palette, which is sampled from the logo (see the top of `src/app/globals.css`).
