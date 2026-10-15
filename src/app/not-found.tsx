import { PaintedScene } from "@/components/art/painted-scene";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
      <div className="overflow-hidden rounded-[var(--radius-organic)] shadow-xl">
        <div className="aspect-[4/3]">
          <PaintedScene variant="misty-peaks" seed={31} label="" decorative />
        </div>
      </div>
      <div>
        <p className="font-brush text-3xl text-teal">A happy little detour</p>
        <h1 className="mt-2 text-4xl font-medium md:text-5xl">This page wandered off into the mist</h1>
        <p className="mt-4 text-lg text-stone">The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/gallery" variant="outline">Visit the gallery</ButtonLink>
        </div>
      </div>
    </section>
  );
}
