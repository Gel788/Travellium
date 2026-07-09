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
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-subtle to-transparent lg:h-80" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10 lg:px-10 lg:pb-20 lg:pt-12 xl:gap-14">
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-3 sm:mb-4"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="font-display max-w-xl text-[1.875rem] leading-[1.1] tracking-[-0.03em] text-navy sm:text-4xl lg:text-[2.75rem] xl:text-5xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base"
          >
            {t("subtitle")}
          </motion.p>

          <div className="mt-6 sm:mt-8">
            <SearchWidget activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mt-5 flex flex-wrap gap-x-4 gap-y-2 sm:mt-6 sm:gap-x-6"
          >
            {stats.map((stat) => (
              <li key={stat} className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {stat}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mt-8 hidden min-h-[420px] overflow-hidden rounded-[1.5rem] border border-border/60 shadow-[var(--shadow-premium-lg)] lg:mt-2 lg:block xl:min-h-[480px]"
        >
          <HeroBackground activeTab={activeTab} className="absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              {t("eyebrow")}
            </p>
            <p className="mt-1 font-display text-2xl text-white">{t("title")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
