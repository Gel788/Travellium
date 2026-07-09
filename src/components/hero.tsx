"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { SearchWidget } from "@/components/search-widget";
import { HeroBackground } from "@/components/hero-background";
import { searchTabs, siteImages, type SearchTab } from "@/lib/site-images";

export function Hero() {
  const t = useTranslations("hero");
  const [activeTab, setActiveTab] = useState<SearchTab>("flights");

  useEffect(() => {
    searchTabs.forEach((tab) => {
      const img = new window.Image();
      img.src = siteImages.heroBackgrounds[tab];
    });
  }, []);

  const stats = [t("stats.routes"), t("stats.partners"), t("stats.support")];

  return (
    <section className="relative min-h-[min(100svh,820px)] overflow-hidden lg:min-h-[min(92vh,760px)]">
      <HeroBackground activeTab={activeTab} className="absolute inset-0" />

      <div className="relative z-10 mx-auto flex min-h-[min(100svh,820px)] max-w-7xl flex-col px-4 pb-10 pt-[4.75rem] sm:px-6 sm:pb-12 sm:pt-24 lg:min-h-[min(92vh,760px)] lg:justify-center lg:px-10 lg:pb-16 lg:pt-28">
        <div className="w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hero-eyebrow mb-3 sm:mb-4"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="hero-title font-display max-w-2xl text-[1.875rem] leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[3.25rem]"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-subtitle mt-3 max-w-xl text-[0.9375rem] leading-relaxed sm:mt-4 sm:text-base"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="hero-widget mt-6 sm:mt-8"
          >
            <SearchWidget activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="mt-5 flex flex-wrap gap-x-4 gap-y-2 sm:mt-6 sm:gap-x-6"
          >
            {stats.map((stat) => (
              <li key={stat} className="hero-stat flex items-center gap-2 text-xs font-medium sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {stat}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
