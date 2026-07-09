import { getTranslations } from "next-intl/server";
import { Layers, ShieldCheck, Headphones, Gift } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PageSection } from "@/components/ui/page-section";
import { cn } from "@/lib/utils";

const featureKeys = ["unified", "secure", "support", "referral"] as const;
const icons = [Layers, ShieldCheck, Headphones, Gift];

const layout: Record<(typeof featureKeys)[number], string> = {
  unified: "md:col-span-2",
  secure: "",
  support: "",
  referral: "md:col-span-2",
};

export async function WhyTravellium() {
  const t = await getTranslations("features");

  return (
    <PageSection id="about" className="py-16 sm:py-20 lg:py-24">
      <ScrollReveal>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </ScrollReveal>

      <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4">
        {featureKeys.map((key, index) => {
          const Icon = icons[index];
          const featured = key === "unified";

          return (
            <ScrollReveal key={key} delay={index * 0.06}>
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-[1.35rem] border border-border/70 p-6 transition-all duration-300 sm:p-7",
                  "hover:border-border hover:shadow-[var(--shadow-premium-lg)]",
                  layout[key],
                  featured
                    ? "bg-gradient-to-br from-navy to-ink text-white"
                    : "bg-surface",
                )}
                style={!featured ? { boxShadow: "var(--shadow-premium)" } : undefined}
              >
                {featured && (
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "relative mb-4 flex h-11 w-11 items-center justify-center rounded-2xl sm:mb-5 sm:h-12 sm:w-12",
                    featured ? "bg-white/10 text-white" : "bg-subtle text-navy",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                </span>
                <h3
                  className={cn(
                    "relative text-base font-semibold tracking-[-0.01em] sm:text-lg",
                    featured ? "text-white" : "text-navy",
                  )}
                >
                  {t(`items.${key}.title`)}
                </h3>
                <p
                  className={cn(
                    "relative mt-2 text-sm leading-relaxed sm:mt-2.5",
                    featured ? "text-white/70" : "text-muted-foreground",
                  )}
                >
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
