"use client";

import { useRef, useState } from "react";
import { CircleAlert, CircleCheck, Info, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema, contactSubjects, type ContactField, type ContactResponse, type ContactSubject } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "not_configured" | "error";
type Values = { name: string; email: string; subject: ContactSubject | ""; message: string };

const fieldOrder: ContactField[] = ["name", "email", "subject", "message"];

export function ContactForm({
  emailConfigured,
  initialSubject,
  artwork,
}: {
  emailConfigured: boolean;
  initialSubject?: ContactSubject;
  artwork?: { slug: string; title: string };
}) {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    subject: initialSubject ?? "",
    message: artwork ? `Hello, I'd love to know more about "${artwork.title}".\n\n` : "",
  });
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function validate(v: Values) {
    const result = contactSchema.safeParse({ ...v, artwork: artwork?.slug });
    if (result.success) return {};
    const next: Partial<Record<ContactField, string>> = {};
    for (const issue of result.error.issues) {
      const f = issue.path[0] as ContactField;
      if (fieldOrder.includes(f) && !next[f]) next[f] = issue.message;
    }
    return next;
  }

  function focusFirstError(errs: Partial<Record<ContactField, string>>) {
    const first = fieldOrder.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // Re-validate a field live once it has shown an error.
    if (errors[key as ContactField]) {
      setErrors((prev) => ({ ...prev, [key]: validate(next)[key as ContactField] }));
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (new FormData(e.currentTarget).get("company") as string) ?? "";
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, artwork: artwork?.slug, company: honeypot }),
      });
      const data = (await res.json()) as ContactResponse;
      if (data.status === "sent") {
        setStatus("sent");
        setValues({ name: "", email: "", subject: "", message: "" });
      } else if (data.status === "invalid") {
        setErrors(data.errors);
        setStatus("idle");
        focusFirstError(data.errors);
        return;
      } else {
        setStatus(data.status === "not_configured" ? "not_configured" : "error");
        setServerMessage(data.message);
      }
    } catch {
      setStatus("error");
      setServerMessage("We couldn't reach the server. Please check your connection and try again.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const inputBase =
    "mt-2 block w-full rounded-2xl border-2 bg-white px-4 py-3 text-base text-charcoal placeholder:text-stone/60 transition-colors focus:border-lake focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-lake/15";
  const fieldClass = (f: ContactField) => cn(inputBase, errors[f] ? "border-red-700" : "border-ink/15 hover:border-ink/30");

  const errorText = (f: ContactField) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-red-800">
        <CircleAlert aria-hidden="true" className="size-4" /> {errors[f]}
      </p>
    ) : null;

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-organic)] bg-white p-8 text-center ring-1 ring-ink/10 md:p-12">
        <CircleCheck aria-hidden="true" className="mx-auto size-12 text-teal" />
        <h2 className="mt-4 text-3xl font-medium">Thank you — your message is on its way</h2>
        <p className="mt-3 text-stone">Your message was delivered successfully. You&rsquo;ll hear back as soon as possible.</p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative rounded-[var(--radius-organic)] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(6,58,60,0.6)] ring-1 ring-ink/5 md:p-10">
      {!emailConfigured && (
        <div role="note" className="mb-8 flex items-start gap-3 rounded-2xl border border-gold/50 bg-sunrise/25 px-4 py-3 text-sm">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-deep" />
          <p>
            <strong>Demonstration form.</strong> Email delivery hasn&rsquo;t been switched on yet, so messages sent here will
            not reach the artist. You can still try the form to see how it works.
          </p>
        </div>
      )}

      {artwork && (
        <p className="mb-6 rounded-2xl bg-paper px-4 py-3 text-sm">
          Enquiring about: <strong className="text-ink">{artwork.title}</strong>
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-semibold text-ink">
            Full name <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass("name")}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="email" className="font-semibold text-ink">
            Email address <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass("email")}
          />
          {errorText("email")}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="subject" className="font-semibold text-ink">
          Subject <span aria-hidden="true" className="text-red-800">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={values.subject}
          onChange={(e) => update("subject", e.target.value as ContactSubject)}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={cn(fieldClass("subject"), "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23063a3c%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-12")}
        >
          <option value="" disabled>
            Choose a subject…
          </option>
          {contactSubjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errorText("subject")}
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="font-semibold text-ink">
          Message <span aria-hidden="true" className="text-red-800">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error message-hint" : "message-hint"}
          className={cn(fieldClass("message"), "resize-y")}
        />
        <p id="message-hint" className="mt-2 text-sm text-stone">
          {values.message.trim().length} / 5,000 characters
        </p>
        {errorText("message")}
      </div>

      {/* Honeypot: hidden from people and assistive technology, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {status === "not_configured" && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/60 bg-sunrise/30 px-4 py-3">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-deep" />
            <p><strong>Message not sent.</strong> {serverMessage}</p>
          </div>
        )}
        {status === "error" && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-700/40 bg-red-50 px-4 py-3 text-red-900">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>{serverMessage}</p>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-stone">
        <span aria-hidden="true">*</span> Required fields. Your details are only used to reply to your message.
      </p>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden="true" className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" /> Send message
          </>
        )}
      </Button>
    </form>
  );
}
