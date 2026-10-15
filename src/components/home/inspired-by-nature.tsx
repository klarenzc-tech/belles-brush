"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Cloud, Mountain, Trees, Waves } from "lucide-react";
import { PaintedScene } from "@/components/art/painted-scene";
import { BrushDivider } from "@/components/ui/brush-divider";
import { Reveal } from "@/components/ui/reveal";

const elements = [
  {
    icon: Mountain,
    title: "Mountains",
    text: "Their strength and stillness invite patience — layer by layer, from distant blue ridges to the first touch of snow.",
  },
  {
    icon: Trees,
    title: "Forests",
    text: "Quiet pines and evergreens, built up stroke by stroke, bring depth, shadow and a sense of calm to the canvas.",
  },
  {
    icon: Waves,
    title: "Rivers & Lakes",
    text: "Water teaches reflection — how the sky and mountains are mirrored, softened and made new on the surface.",
  },
  {
    icon: Cloud,
    title: "Skies",
    text: "Sunrise gold, evening rose and soft clouds set the mood for every painting before a single tree is placed.",
  },
];

export function InspiredByNature() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} aria-labelledby="nature-title" className="relative isolate overflow-hidden bg-ink py-24 text-canvas md:py-32">
      <motion.div aria-hidden="true" className="absolute -inset-y-[12%] inset-x-0 -z-10 opacity-45" style={reduce ? undefined : { y }}>
        <PaintedScene variant="misty-peaks" seed={5} label="" decorative />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/95" />

      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-sunrise">The first teacher</p>
          <h2 id="nature-title" className="mt-3 text-3xl font-medium text-canvas md:text-5xl">
            Inspired by Nature
          </h2>
          <BrushDivider tone="gold" className="mt-4" />
          <p className="mt-6 text-lg text-canvas/85">
            Mountains, forests, rivers and wide open skies are at the heart of every painting. Nature never hurries — and
            learning to paint it is a lesson in slowing down, looking closely and finding beauty in the details.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {elements.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full rounded-[var(--radius-organic)] border border-canvas/15 bg-canvas/8 p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-canvas/12">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-gold/20 text-sunrise">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="mt-5 text-2xl font-medium text-canvas">{title}</h3>
                  <p className="mt-3 text-canvas/80">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
