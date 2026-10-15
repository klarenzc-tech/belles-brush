import { TriangleAlert } from "lucide-react";
import { BrushDivider } from "./brush-divider";

/** Simple, readable layout for policy pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="container-page max-w-3xl py-16 md:py-24">
      <p className="eyebrow">Policies</p>
      <h1 className="mt-3 text-4xl font-medium md:text-5xl">{title}</h1>
      <BrushDivider className="mt-4" />
      <p className="mt-4 text-sm text-stone">Last updated: {updated}</p>
      <div
        role="note"
        className="mt-8 flex items-start gap-3 rounded-2xl border border-gold/60 bg-sunrise/25 px-4 py-3 text-sm"
      >
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-deep" />
        <p>
          <strong>Draft for owner review.</strong> This wording is a starting point based on how the site currently works. It
          is not legal advice — please have it reviewed before launch.
        </p>
      </div>
      <div className="mt-10 space-y-5 text-lg [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-medium [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </article>
  );
}
