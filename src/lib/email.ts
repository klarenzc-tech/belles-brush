import "server-only";
import { contactSubjects, type ContactInput } from "@/lib/contact-schema";

/**
 * Email delivery for the contact form.
 *
 * Uses the Resend REST API directly (no SDK needed). Delivery is only
 * attempted when RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL
 * are all set. To use a different provider, replace `sendContactEmail`.
 */

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContactEmail(input: ContactInput): Promise<{ ok: boolean }> {
  const subjectLabel = contactSubjects.find((s) => s.value === input.subject)?.label ?? "Enquiry";
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${subjectLabel}`,
    input.artwork ? `Artwork: ${input.artwork}` : null,
    "",
    input.message,
  ].filter((l) => l !== null) as string[];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: input.email,
      subject: `Belle's Brush — ${subjectLabel} from ${input.name}`,
      text: lines.join("\n"),
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6">${lines
        .map((l) => (l ? `<p style="margin:0 0 8px">${escapeHtml(l)}</p>` : "<br/>"))
        .join("")}</div>`,
    }),
    cache: "no-store",
  });

  return { ok: res.ok };
}
