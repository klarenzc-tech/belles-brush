import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Visible label for placeholder content. Never remove while content is demonstration-only. */
export function DemoBadge({ children = "Demonstration artwork", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-canvas/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm ring-1 ring-ink/10",
        className,
      )}
    >
      <Info aria-hidden="true" className="size-3.5 text-teal" />
      {children}
    </span>
  );
}

export function DemoNotice({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-gold/50 bg-sunrise/25 px-4 py-3 text-sm text-charcoal",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-deep" />
      <div>{children}</div>
    </div>
  );
}
