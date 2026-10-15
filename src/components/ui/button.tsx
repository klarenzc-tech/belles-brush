import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button styles in the shadcn/ui pattern (cva variants + cn), tuned to the
 * Belle's Brush palette. `Button` renders a <button>; `ButtonLink` a Next.js <Link>.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.1em] [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-canvas shadow-[0_8px_24px_-12px_rgba(6,58,60,0.7)] hover:bg-teal hover:-translate-y-0.5",
        gold: "bg-gold text-ink shadow-[0_8px_24px_-12px_rgba(138,93,28,0.8)] hover:bg-sunrise hover:-translate-y-0.5",
        outline: "border-2 border-ink/80 text-ink hover:bg-ink hover:text-canvas",
        light: "border-2 border-canvas/80 text-canvas backdrop-blur-sm bg-ink/20 hover:bg-canvas hover:text-ink",
        ghost: "text-ink hover:bg-ink/5",
        link: "text-teal underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-10 px-4 text-sm rounded-full",
        md: "h-12 px-6 text-base rounded-full",
        lg: "h-14 px-8 text-lg rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
