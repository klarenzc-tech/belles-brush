import { NextResponse } from "next/server";
import { contactSchema, type ContactField, type ContactResponse } from "@/lib/contact-schema";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

const json = (body: ContactResponse, status: number) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ status: "error", message: "We couldn't read your message. Please try again." }, 400);
  }

  // Server-side validation (the same rules the browser uses).
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const errors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if ((field === "name" || field === "email" || field === "subject" || field === "message") && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    if (Object.keys(errors).length === 0) {
      // Only the hidden honeypot failed — likely an automated submission.
      return json({ status: "error", message: "Your message could not be accepted." }, 400);
    }
    return json({ status: "invalid", errors }, 422);
  }

  // Honest behaviour: never claim delivery unless a real provider confirms it.
  if (!isEmailConfigured()) {
    return json(
      {
        status: "not_configured",
        message:
          "This contact form is in demonstration mode, so your message has NOT been sent. Email delivery will be switched on before the site launches.",
      },
      503,
    );
  }

  try {
    const { ok } = await sendContactEmail(parsed.data);
    if (!ok) {
      return json({ status: "error", message: "Sorry — your message couldn't be delivered just now. Please try again later." }, 502);
    }
    return json({ status: "sent" }, 200);
  } catch {
    return json({ status: "error", message: "Sorry — something went wrong while sending. Please try again later." }, 500);
  }
}
