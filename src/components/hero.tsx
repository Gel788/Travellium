"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { SearchWidget } from "@/components/search-widget";
import { HeroBackground } from "@/components/hero-background";
import { Badge } from "@/components/ui/badge";
import { searchTabs, siteImages, type SearchTab } from "@/lib/site-images";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<SearchTab>("flights");

  useEffect(() => {
    searchTabs.forEach((tab) => {
      const img = new window.Image();
      img.src = siteImages.heroBackgrounds[tab];
    });
  }, []);

  const stats = [t("stats.routes"), t("stats.partners"), t("stats.support")];

  return (
    <section className="relative min-h-[min(100dvh,820px)] overflow-hidden lg:min-h-[720px]">
      <HeroBackground activeTab={activeTab} className="absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-[calc(var(--header-height)+1.25rem)] sm:px-6 sm:pb-14 sm:pt-[calc(var(--header-height)+1.75rem)] lg:px-10 lg:pb-16">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          <Badge variant="glass" className="mb-4 px-3 py-1 text-[11px] normal-case tracking-[0.08em]">
            {t("eyebrow")}
          </Badge>
          <h1 className="font-display text-[clamp(1.875rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-white [text-shadow:0_2px_32px_rgba(15,23,42,0.5)]">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/88 sm:text-base">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="hero-widget-shell mt-7 w-full max-w-5xl sm:mt-9"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.1 }}
        >
          <SearchWidget activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>

        <motion.ul
          className="mt-6 flex flex-wrap gap-2 sm:mt-8"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.18 }}
        >
          {stats.map((stat) => (
            <li key={stat}>
              <Badge variant="glass" className="gap-2 px-3 py-1.5 text-xs font-medium normal-case tracking-normal">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {stat}
              </Badge>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
