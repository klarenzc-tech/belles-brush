import Link from "next/link";
import { mainNav, siteConfig, socialLinks } from "@/lib/site";
import { PaintedEdge } from "@/components/ui/brush-divider";
import { LogoImage } from "./logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto bg-ink text-canvas/85">
      <PaintedEdge fill="var(--color-ink)" className="absolute -top-9 md:-top-15" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="w-40 rounded-[var(--radius-organic)] bg-canvas p-3 shadow-lg">
            <LogoImage sizes="160px" />
          </div>
          <p className="mt-6 font-brush text-3xl leading-tight text-sunrise">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-sm text-sm text-canvas/70">
            A father, his daughter, and a shared journey of creativity — one brushstroke at a time.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-gold">Explore</h2>
          <ul className="mt-4 space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-sunrise hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-gold">Follow the journey</h2>
          <ul className="mt-4 space-y-2">
            {socialLinks.map((s) =>
              s.href ? (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-sunrise hover:underline underline-offset-4">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : (
                <li key={s.label} className="text-canvas/70">
                  {s.label} <span className="text-xs">— coming soon</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-canvas/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-canvas/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="hover:text-sunrise hover:underline underline-offset-4">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-sunrise hover:underline underline-offset-4">Accessibility</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
