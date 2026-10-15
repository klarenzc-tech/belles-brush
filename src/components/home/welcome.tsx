import { LogoImage } from "@/components/layout/logo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Welcome() {
  return (
    <section aria-labelledby="welcome-title" className="py-20 md:py-28">
      <div className="container-page grid items-center gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div aria-hidden="true" className="absolute -inset-4 -rotate-3 rounded-[var(--radius-organic)] bg-paper" />
            <div className="relative rounded-[var(--radius-organic)] bg-white p-6 shadow-[0_30px_60px_-35px_rgba(6,58,60,0.6)]">
              <LogoImage sizes="(min-width: 768px) 360px, 80vw" />
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-7" delay={0.1}>
          <SectionHeading id="welcome-title" eyebrow="Welcome" title={<>Welcome to Belle&rsquo;s Brush</>} />
          <div className="prose-story mt-8 max-w-2xl text-lg">
            <p>
              Hello, and thank you for stopping by. I&rsquo;m a self-taught artist inspired by nature, creativity, and the
              teachings of Bob Ross. Painting has become a passion of mine — and now I want to share that passion with my
              daughter, Belle.
            </p>
            <p>
              For me, Belle&rsquo;s Brush is about more than just art. It&rsquo;s about creating, exploring, and passing on the
              joy of painting to my daughter. This little corner of the internet is where I&rsquo;ll share the paintings, the
              lessons, and the moments that make up our journey.
            </p>
          </div>
          <p className="mt-8 font-brush text-3xl text-teal">Pull up a chair — let&rsquo;s paint.</p>
        </Reveal>
      </div>
    </section>
  );
}
