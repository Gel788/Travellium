"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SearchTab } from "@/lib/site-images";
import { siteImages } from "@/lib/site-images";

type HeroBackgroundProps = {
  activeTab: SearchTab;
  className?: string;
};

export function HeroBackground({ activeTab, className }: HeroBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className} aria-hidden>
      <AnimatePresence mode="sync">
        <motion.div
          key={activeTab}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={siteImages.heroBackgrounds[activeTab]}
            alt=""
            fill
            priority={activeTab === "flights"}
            sizes="100vw"
            className="object-cover object-[center_35%] lg:object-[center_30%]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Scrim — фото видно, текст и виджет читаемы */}
      <div className="hero-overlay" />
    </div>
  );
}
