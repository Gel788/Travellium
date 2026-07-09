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
    <div className={className}>
      <AnimatePresence mode="sync">
        <motion.div
          key={activeTab}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={siteImages.heroBackgrounds[activeTab]}
            alt=""
            fill
            priority={activeTab === "flights"}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent lg:from-navy/30 lg:via-transparent" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
