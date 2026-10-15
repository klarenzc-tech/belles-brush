import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { Reveal } from "@/components/ui/reveal";

const parts = [
  { phrase: "My passion.", text: "A love of painting that grew one canvas at a time — self-taught, patient and joyful." },
  { phrase: "Her inspiration.", text: "Belle — the reason the brush keeps moving, and the person this passion is meant for." },
  { phrase: "Our journey.", text: "Creating, exploring and learning together, and passing on the joy of art." },
];

export function HeartBehindBrush() {
  return (
    <section aria-labelledby="heart-title" className="py-20 md:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">A father &amp; daughter</p>
            <h2 id="heart-title" className="mt-3 text-3xl font-medium md:text-5xl">
              The Heart Behind the Brush
            </h2>
          </Reveal>

          <ol className="mt-10 space-y-8">
            {parts.map((p, i) => (
              <li key={p.phrase}>
                <Reveal delay={i * 0.12} className="flex gap-5">
                  <span aria-hidden="true" className="mt-1 h-auto w-1.5 shrink-0 rounded-full bg-gradient-to-b from-gold to-teal" />
                  <div>
                    <p className="font-brush text-4xl leading-none text-ink md:text-5xl">{p.phrase}</p>
                    <p className="mt-2 text-lg text-stone">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.3}>
            <ButtonLink href="/our-story" className="mt-10" variant="primary">
              Read the full story <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5" delay={0.15}>
          <PhotoPlaceholder
            className="mx-auto max-w-sm rotate-2"
            label="A photograph of the artist and Belle painting together will appear here."
          />
        </Reveal>
      </div>
    </section>
  );
}
