import { cn } from "@/lib/utils";
import { BrushDivider } from "./brush-divider";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag id={id} className={cn(Tag === "h1" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl", "font-medium")}>
        {title}
      </Tag>
      <BrushDivider className={cn("mt-4", align === "center" && "mx-auto")} />
      {intro && <div className="mt-5 text-lg text-stone">{intro}</div>}
    </div>
  );
}
