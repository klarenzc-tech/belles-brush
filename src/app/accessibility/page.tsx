import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our commitment to making Belle's Brush accessible to everyone.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" updated="[Date to be confirmed before launch]">
      <p>
        Art is for everyone, and so is this website. Belle&rsquo;s Brush aims to meet the Web Content Accessibility Guidelines
        (WCAG) 2.2 at level AA.
      </p>

      <h2>What we have done</h2>
      <ul>
        <li>Every page can be used with a keyboard, with clearly visible focus outlines and a &ldquo;skip to main content&rdquo; link.</li>
        <li>Images have text descriptions, and decorative illustrations are hidden from screen readers.</li>
        <li>Animations are gentle and switch off automatically if your device is set to reduce motion.</li>
        <li>Text colours are chosen for strong contrast, and the layout adapts to any screen size and text zoom.</li>
        <li>The contact form has clear labels, explains errors in words and moves focus to the first problem.</li>
      </ul>

      <h2>Known limitations</h2>
      <p>
        Some artwork descriptions are still placeholders and will be rewritten when real paintings are added. <em>[Owner to
        update after an accessibility review.]</em>
      </p>

      <h2>Feedback</h2>
      <p>
        If anything on the site is difficult to use, please let us know through the{" "}
        <Link href="/contact" className="text-teal underline underline-offset-4">contact page</Link> and we will do our best to help.
      </p>
    </LegalPage>
  );
}
