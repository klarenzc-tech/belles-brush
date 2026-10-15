"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mainNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LogoLink } from "./logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled || open ? "bg-canvas/92 shadow-[0_6px_30px_-18px_rgba(6,58,60,0.45)] backdrop-blur-md" : "bg-canvas/70 backdrop-blur-sm",
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between md:h-20">
        <LogoLink />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.98rem] font-semibold transition-colors",
                      active ? "text-ink" : "text-stone hover:text-ink",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-[3px] rounded-full bg-gradient-to-r from-teal to-lake" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="canvas-texture h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-ink/10 bg-canvas lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="container-page flex flex-col gap-1 py-6">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-2xl px-4 py-4 font-serif text-2xl",
                        active ? "bg-ink text-canvas" : "text-ink hover:bg-ink/5",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="container-page pb-10 font-brush text-2xl text-teal">{siteConfig.tagline}</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
