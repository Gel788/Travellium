import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PageSection } from "@/components/ui/page-section";
import { Badge } from "@/components/ui/badge";
import { siteImages } from "@/lib/site-images";

const banners = [
  { key: "summer" as const, featured: true },
  { key: "trains" as const, featured: false },
];

export async function PromoBanners() {
  const t = await getTranslations("promos");

  return (
    <PageSection className="py-8 sm:py-12">
      <ScrollReveal>
        <p className="eyebrow mb-6 sm:mb-8">{t("eyebrow")}</p>
      </ScrollReveal>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-5">
        {banners.map((banner, index) => {
          const featured = banner.featured;

          return (
            <ScrollReveal
              key={banner.key}
              delay={index * 0.08}
              className={featured ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <a
                href="#search"
                className="group relative flex min-h-[220px] cursor-pointer overflow-hidden rounded-[1.35rem] sm:min-h-[260px]"
                style={{ boxShadow: "var(--shadow-premium-lg)" }}
              >
                <Image
                  src={siteImages.promos[banner.key]}
                  alt={t(`items.${banner.key}.title`)}
                  fill
                  sizes={
                    featured
                      ? "(max-width: 1024px) 100vw, 60vw"
                      : "(max-width: 1024px) 100vw, 40vw"
                  }
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10 sm:bg-gradient-to-r sm:from-navy/90 sm:via-navy/55 sm:to-navy/15" />
                <div className="relative flex h-full min-h-[220px] flex-col justify-end p-6 sm:min-h-[260px] sm:p-8">
                  <Badge variant="accent" className="mb-3">
                    {t(`items.${banner.key}.badge`)}
                  </Badge>
                  <h3 className="font-display max-w-md text-xl leading-[1.15] tracking-[-0.02em] text-white sm:text-2xl lg:text-3xl">
                    {t(`items.${banner.key}.title`)}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                    {t(`items.${banner.key}.subtitle`)}
                  </p>
                  <span className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-transform duration-250 group-hover:translate-x-1 sm:mt-5">
                    {t(`items.${banner.key}.cta`)}
                    <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={2} />
                  </span>
                </div>
              </a>
            </ScrollReveal>
          );
        })}
      </div>
    </PageSection>
  );
}
