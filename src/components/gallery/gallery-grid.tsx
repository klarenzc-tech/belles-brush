"use client";

import { useEffect, useMemo, useState } from "react";
import { Palette } from "lucide-react";
import { ArtworkCard } from "./artwork-card";
import { Button } from "@/components/ui/button";
import type { Artwork, ArtworkCategory, CategoryInfo } from "@/types/content";
import { cn } from "@/lib/utils";

type Filter = "all" | ArtworkCategory;

export function GalleryGrid({ artworks, categories }: { artworks: Artwork[]; categories: CategoryInfo[] }) {
  // Server renders "All Artwork" (so every piece is in the HTML for SEO and no-JS visitors);
  // after hydration we honour a shareable ?category= link.
  const [active, setActive] = useState<Filter>("all");

  useEffect(() => {
    const read = () => {
      const requested = new URLSearchParams(window.location.search).get("category");
      setActive(categories.some((c) => c.slug === requested) ? (requested as ArtworkCategory) : "all");
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [categories]);

  const filters: { value: Filter; label: string; count: number }[] = useMemo(
    () => [
      { value: "all", label: "All Artwork", count: artworks.length },
      ...categories.map((c) => ({ value: c.slug, label: c.label, count: artworks.filter((a) => a.category === c.slug).length })),
    ],
    [artworks, categories],
  );

  const visible = active === "all" ? artworks : artworks.filter((a) => a.category === active);
  const activeInfo = categories.find((c) => c.slug === active);

  function select(value: Filter) {
    setActive(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.replaceState(window.history.state, "", url);
  }

  return (
    <div>
      <div role="group" aria-label="Filter artwork by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap">
        {filters.map((f) => {
          const isActive = f.value === active;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(f.value)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 px-5 text-[0.95rem] font-semibold transition-all",
                isActive ? "border-ink bg-ink text-canvas" : "border-ink/15 bg-white text-ink hover:border-ink/50",
              )}
            >
              {f.label}
              <span className={cn("rounded-full px-2 text-xs", isActive ? "bg-canvas/20" : "bg-paper text-stone")}>{f.count}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 min-h-7 text-stone" aria-live="polite">
        {activeInfo ? activeInfo.description + " " : ""}
        <span className="sr-only">
          Showing {visible.length} {visible.length === 1 ? "artwork" : "artworks"}
          {activeInfo ? ` in ${activeInfo.label}` : ""}.
        </span>
      </p>

      {visible.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-[var(--radius-organic)] border-2 border-dashed border-ink/20 bg-paper px-6 py-16 text-center">
          <Palette aria-hidden="true" className="size-10 text-teal" />
          <h2 className="mt-4 text-2xl font-medium">Nothing on the easel here yet</h2>
          <p className="mt-2 max-w-md text-stone">New paintings in this category are on their way. In the meantime, explore the rest of the collection.</p>
          <Button className="mt-6" onClick={() => select("all")}>
            Show all artwork
          </Button>
        </div>
      ) : (
        <ul className="mt-8 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {visible.map((artwork, i) => (
            <li key={artwork.id} className="mb-8 break-inside-avoid">
              <ArtworkCard artwork={artwork} tall={i % 3 === 1} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Skeleton for Phase 2, when artworks load from Supabase (use in a loading.tsx or <Suspense> fallback). */
export function GalleryGridSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-11 w-32 animate-pulse rounded-full bg-paper" />
        ))}
      </div>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-[var(--radius-organic)] bg-white ring-1 ring-ink/5">
            <div className="aspect-[4/3] animate-pulse bg-paper" />
            <div className="space-y-3 p-6">
              <div className="h-3 w-24 animate-pulse rounded bg-paper" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-paper" />
              <div className="h-4 w-full animate-pulse rounded bg-paper" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
