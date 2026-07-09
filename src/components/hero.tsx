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
      <div className="relative z-0 h-[38vh] min-h-[200px] max-h-[340px] overflow-hidden sm:h-[40vh] sm:max-h-[380px] lg:absolute lg:inset-0 lg:h-auto lg:max-h-none">
        <HeroBackground activeTab={activeTab} />
      </div>

      <div className="relative z-10 pb-16 sm:pb-20 lg:mx-auto lg:max-w-7xl lg:px-10 lg:pb-24 lg:pt-16">
        <div className="hero-content-sheet">
          <div className="mx-auto max-w-3xl px-4 pt-7 sm:px-6 sm:pt-8 lg:max-w-none lg:px-0 lg:pt-0">
            <div className="lg:max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="eyebrow mb-4 sm:mb-5"
              >
                {t("eyebrow")}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="font-display text-[2rem] leading-[1.08] tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.75rem]"
              >
                {t("title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-5 sm:text-[1.05rem] sm:leading-[1.65]"
              >
                {t("subtitle")}
              </motion.p>
            </div>

            <div className="mt-7 w-full sm:mt-10">
              <SearchWidget activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-7 flex flex-wrap gap-2 sm:mt-10"
            >
              {stats.map((stat) => (
                <span
                  key={stat}
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-subtle/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                  {stat}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
