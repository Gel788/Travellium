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
    <PageSection id="how-it-works" className="border-y border-border/60 bg-surface py-12 sm:py-16 lg:py-20">
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      </ScrollReveal>

      <ol className="mt-8 space-y-4 sm:mt-10 md:grid md:grid-cols-3 md:gap-5 md:space-y-0 lg:gap-6">
        {stepKeys.map((key, index) => {
          const Icon = icons[index];
          return (
            <ScrollReveal key={key} delay={index * 0.06}>
              <li className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5 md:flex-col md:gap-0 md:border-0 md:bg-transparent md:p-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white md:mb-4 md:h-12 md:w-12 md:rounded-2xl">
                  <Icon className="h-5 w-5 md:hidden" aria-hidden strokeWidth={1.75} />
                  <span className="hidden md:inline">{index + 1}</span>
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy">{t(`items.${key}.title`)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </li>
            </ScrollReveal>
          );
        })}
      </ol>
    </PageSection>
  );
}
