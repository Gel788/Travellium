"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SearchTab } from "@/lib/site-images";
import { siteImages } from "@/lib/site-images";

export function HeroBackground({ activeTab }: { activeTab: SearchTab }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 texture-noise" aria-hidden>
      <AnimatePresence mode="sync">
        <motion.div
          key={activeTab}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={siteImages.heroBackgrounds[activeTab]}
            alt=""
            fill
            priority={activeTab === "flights"}
            sizes="100vw"
            className="object-cover object-[center_30%] lg:object-[70%_center]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Desktop — текст слева, фото справа */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(105deg, rgba(248,249,251,0.97) 0%, rgba(248,249,251,0.88) 38%, rgba(248,249,251,0.45) 58%, rgba(248,249,251,0.12) 78%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 hidden h-32 lg:block"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(248,249,251,0.85) 100%)",
        }}
      />

      {/* Mobile — мягкий fade в контент-панель */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,17,32,0.18) 0%, transparent 35%, transparent 72%, rgba(248,249,251,0.92) 100%)",
        }}
      />
    </div>
  );
}
