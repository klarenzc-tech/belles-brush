import { ArrowRight } from "lucide-react";
import { PaintedScene } from "@/components/art/painted-scene";
import { ButtonLink } from "@/components/ui/button";
import { PaintedEdge } from "@/components/ui/brush-divider";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Painted landscape — slowly drifting, paused for reduced-motion users */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[60svh] md:inset-0 md:h-auto">
        <div className="h-full w-[106%] animate-drift">
          <PaintedScene variant="sunrise-valley" seed={11} label="" decorative grain />
        </div>
        {/* Soft wash only on the text side so the mountains and lake stay clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent via-30% to-transparent md:bg-gradient-to-r md:from-canvas/85 md:via-canvas/30 md:via-50% md:to-transparent" />
      </div>

      <div className="container-page flex min-h-[calc(100svh-4.5rem)] items-end pb-24 pt-[54svh] md:min-h-[46rem] md:items-center md:pb-28 md:pt-16">
        <div className="max-w-xl">
          <p className="font-brush text-2xl text-teal md:text-3xl">{siteConfig.tagline}</p>
          <h1 id="hero-title" className="mt-3 text-[2.6rem] font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
            Every Brushstroke Tells a Story.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-charcoal/85 md:text-xl">
            Born from a love of nature and painting, inspired by a daughter named Belle. A journey of creativity,
            discovery, and the joy of making something beautiful.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/gallery" size="lg">
              Explore the Gallery <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/our-story" size="lg" variant="outline" className="bg-canvas/60 backdrop-blur-sm">
              Discover Our Story
            </ButtonLink>
          </div>
        </div>
      </div>

      <p className="absolute bottom-14 right-4 hidden text-xs text-ink/60 md:block">Illustration created for the website</p>
      <PaintedEdge className="absolute -bottom-px left-0" />
    </section>
  );
}
