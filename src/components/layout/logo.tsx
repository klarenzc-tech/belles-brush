import Image from "next/image";
import Link from "next/link";
import logo from "@public/brand/belles-brush-logo.png";
import { cn } from "@/lib/utils";

/**
 * The supplied Belle's Brush logo, used as-is (proportions preserved —
 * only the white background has been made transparent).
 */
export function LogoImage({ className, priority = false, sizes = "160px" }: { className?: string; priority?: boolean; sizes?: string }) {
  return (
    <Image
      src={logo}
      alt="Belle's Brush logo: a father and daughter looking out over a mountain lake, with a paintbrush and the words Belle's Brush"
      className={cn("h-auto w-full", className)}
      priority={priority}
      sizes={sizes}
      placeholder="blur"
    />
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label="Belle's Brush — home">
      <span className="block w-12 shrink-0 transition-transform duration-500 group-hover:-rotate-3 md:w-14">
        <LogoImage priority sizes="56px" className="drop-shadow-sm" />
      </span>
      <span className="font-brush text-[1.65rem] leading-none text-ink md:text-3xl">Belle&rsquo;s Brush</span>
    </Link>
  );
}
