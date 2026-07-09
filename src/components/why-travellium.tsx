import { getTranslations } from "next-intl/server";
import { Layers, ShieldCheck, Headphones, Gift } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PageSection } from "@/components/ui/page-section";

const featureKeys = ["unified", "secure", "support", "referral"] as const;
const icons = [Layers, ShieldCheck, Headphones, Gift];

export async function WhyTravellium() {
  const t = await getTranslations("features");

  return (
    <PageSection id="about" className="py-12 sm:py-16 lg:py-20">
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      </ScrollReveal>

      <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
        {featureKeys.map((key, index) => {
          const Icon = icons[index];
          return (
            <ScrollReveal key={key} delay={index * 0.05}>
              <article className="h-full rounded-2xl border border-border/70 bg-surface p-5 transition-shadow hover:shadow-[var(--shadow-premium)] sm:p-6">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                </span>
                <h3 className="text-base font-semibold text-navy">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </PageSection>
  );
}
