import type { Metadata } from "next";
import { Mail, MessageCircle, Palette, Sparkles } from "lucide-react";
import { PageIntro } from "@/components/ui/page-intro";
import { ContactForm } from "@/components/contact/contact-form";
import { getArtworkBySlug } from "@/lib/content";
import { contactSubjects, type ContactSubject } from "@/lib/contact-schema";
import { isEmailConfigured } from "@/lib/email";
import { socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Belle's Brush — general enquiries, artwork enquiries and collaborations.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Belle's Brush", url: "/contact" },
};

type Props = { searchParams: Promise<{ subject?: string; artwork?: string }> };

const reasons = [
  { icon: MessageCircle, title: "Say hello", text: "Questions, kind words or simply sharing your own creative journey." },
  { icon: Palette, title: "Artwork enquiries", text: "Curious about a particular painting? Use the button on any artwork page." },
  { icon: Sparkles, title: "Collaborations", text: "Ideas for creative projects, family art activities or community events." },
];

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const subject = contactSubjects.find((s) => s.value === sp.subject)?.value as ContactSubject | undefined;
  const art = sp.artwork ? await getArtworkBySlug(sp.artwork) : undefined;

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let's Create Something Beautiful."
        intro="Whether it's a question about a painting, an idea for a collaboration, or just a friendly hello — I'd love to hear from you."
        scene="golden-river"
        seed={2}
      />
      <section aria-label="Contact form" className="pb-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm
              emailConfigured={isEmailConfigured()}
              initialSubject={art ? "artwork" : subject}
              artwork={art ? { slug: art.slug, title: art.title } : undefined}
            />
          </div>
          <aside className="space-y-8 lg:col-span-5">
            <ul className="space-y-5">
              {reasons.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-paper text-teal">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-serif text-xl text-ink">{title}</h2>
                    <p className="text-stone">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="canvas-texture rounded-[var(--radius-organic)] bg-paper p-7">
              <h2 className="flex items-center gap-2 font-serif text-xl text-ink">
                <Mail aria-hidden="true" className="size-5 text-teal" /> Follow along
              </h2>
              <ul className="mt-4 space-y-2">
                {socialLinks.map((s) =>
                  s.href ? (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal hover:underline underline-offset-4">
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ) : (
                    <li key={s.label} className="text-stone">
                      {s.label} — <span className="text-sm">link coming soon</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <p className="font-brush text-3xl leading-snug text-teal">My passion. Her inspiration. Our journey.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
