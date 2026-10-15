import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Belle's Brush handles personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="[Date to be confirmed before launch]">
      <p>
        Belle&rsquo;s Brush is a personal art website. We respect your privacy and collect as little personal information as
        possible. This policy explains what the site does — and does not — do with your information.
      </p>

      <h2>Who we are</h2>
      <p>
        This website is run by the artist behind Belle&rsquo;s Brush. <em>[Owner to add their name and contact email for
        privacy questions.]</em>
      </p>

      <h2>Information you choose to send</h2>
      <p>
        If you use the <Link href="/contact" className="text-teal underline underline-offset-4">contact form</Link>, we receive the
        name, email address, subject and message you enter. We use these details only to read and reply to your message.
      </p>
      <ul>
        <li>Messages are delivered by email through a transactional email provider (currently planned: Resend).</li>
        <li>We do not sell, rent or share your details for marketing.</li>
        <li>We keep messages only as long as needed to respond, unless you ask us to keep in touch.</li>
      </ul>

      <h2>Cookies and tracking</h2>
      <p>
        This version of the site does not use advertising, analytics or tracking cookies. Fonts are served from this website
        itself, so no third-party font service receives your visit.
      </p>

      <h2>Hosting</h2>
      <p>
        Like all websites, our hosting provider (planned: Vercel) may automatically record basic technical information such as
        IP addresses and browser type in server logs, for security and reliability.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete any personal information you have sent us. <em>[Owner to confirm applicable data
        protection law and contact method.]</em>
      </p>

      <h2>Changes</h2>
      <p>If the site adds new features — such as a newsletter, accounts or online purchases — this policy will be updated first.</p>
    </LegalPage>
  );
}
