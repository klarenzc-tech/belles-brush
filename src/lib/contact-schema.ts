import { z } from "zod";

export const contactSubjects = [
  { value: "general", label: "General Enquiry" },
  { value: "artwork", label: "Artwork Enquiry" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Other" },
] as const;

export type ContactSubject = (typeof contactSubjects)[number]["value"];

/** Shared by the browser form and the API route, so rules never drift apart. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "Please keep your name under 100 characters."),
  email: z.string().trim().max(200, "That email address is too long.").pipe(z.email("Please enter a valid email address.")),
  subject: z.enum(["general", "artwork", "collaboration", "other"], { message: "Please choose a subject." }),
  message: z
    .string()
    .trim()
    .min(10, "Please write a message of at least 10 characters.")
    .max(5000, "Please keep your message under 5,000 characters."),
  artwork: z.string().trim().max(120).optional(),
  /** Honeypot — real visitors never fill this in. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "subject" | "message";

export type ContactResponse =
  | { status: "sent" }
  | { status: "not_configured"; message: string }
  | { status: "invalid"; errors: Partial<Record<ContactField, string>> }
  | { status: "error"; message: string };
