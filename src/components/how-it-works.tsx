import { getTranslations } from "next-intl/server";
import { Search, GitCompare, CreditCard } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PageSection } from "@/components/ui/page-section";

const stepKeys = ["search", "compare", "book"] as const;
const icons = [Search, GitCompare, CreditCard];

export async function HowItWorks() {
  const t = await getTranslations("steps");

  return (
    <PageSection
      id="how-it-works"
      className="border-y border-border/60 bg-surface py-16 sm:py-20 lg:py-24"
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute -right-32 top-0 hidden h-64 w-64 rounded-full bg-accent/5 blur-3xl lg:block"
          aria-hidden
        />

        <ScrollReveal>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </ScrollReveal>

        <ol className="relative mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8">
          <div
            className="absolute left-[16.666%] right-[16.666%] top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
            aria-hidden
          />

          {stepKeys.map((key, index) => {
            const Icon = icons[index];
            return (
              <ScrollReveal key={key} delay={index * 0.08}>
                <li className="relative text-center md:text-left">
                  <span
                    className="font-display pointer-events-none absolute -top-3 left-1/2 hidden -translate-x-1/2 select-none text-[4.5rem] leading-none text-subtle md:left-0 md:block md:translate-x-0 lg:text-[5rem]"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/20 md:mx-0">
                    <Icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                  </span>
                  <h3 className="relative text-base font-semibold tracking-[-0.01em] text-navy sm:text-lg">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="relative mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground md:mx-0">
                    {t(`items.${key}.description`)}
                  </p>
                </li>
              </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </PageSection>
  );
}
