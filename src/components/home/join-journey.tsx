import { ArrowRight, BookOpen } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function JoinJourney() {
  return (
    <section aria-labelledby="join-title" className="pb-28 pt-4">
      <div className="container-page">
        <Reveal>
          <div className="canvas-texture relative overflow-hidden rounded-[2.5rem_1.5rem_3rem_2rem] bg-sunrise/45 px-6 py-14 text-center ring-1 ring-gold/40 md:px-16 md:py-20">
            <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -left-10 -top-10 size-48 text-gold/30">
              <path fill="currentColor" d="M44 27c32-20 87-18 116 13s27 84-6 113-90 30-120-2S12 47 44 27z" />
            </svg>
            <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -bottom-16 -right-8 size-56 text-teal/15">
              <path fill="currentColor" d="M58 20c40-14 92 4 116 40s10 90-28 112-94 14-120-22S18 34 58 20z" />
            </svg>
            <div className="relative mx-auto max-w-2xl">
              <p className="font-brush text-3xl text-teal">Come along for the ride</p>
              <h2 id="join-title" className="mt-2 text-3xl font-medium md:text-5xl">Join the Journey</h2>
              <p className="mt-5 text-lg text-charcoal/85">
                New paintings, lessons learned and moments shared with Belle — there&rsquo;s always something new on the easel.
                Follow along, explore the journal, or simply say hello.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Get in touch <ArrowRight aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/journey" size="lg" variant="outline">
                  <BookOpen aria-hidden="true" /> Read the journal
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
