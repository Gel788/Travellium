import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { PageSection } from "@/components/ui/page-section";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

const partnerKeys = ["aeroflot", "s7", "rzd", "ostrovok", "flixbus", "booking"] as const;
const reviewKeys = ["anna", "dmitry", "elena"] as const;

export async function TrustSection() {
  const t = await getTranslations("trust");

  return (
    <PageSection className="border-y border-border/60 bg-subtle/40 py-12 sm:py-16">
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} align="center" className="mx-auto" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="scroll-row mt-8 justify-start sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible">
          {partnerKeys.map((key) => (
            <Badge key={key} variant="outline" className="shrink-0 px-4 py-2 text-xs normal-case tracking-normal sm:text-sm">
              {t(`partners.${key}`)}
            </Badge>
          ))}
        </div>
      </ScrollReveal>

      <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
        {reviewKeys.map((key, i) => (
          <ScrollReveal key={key} delay={i * 0.05}>
            <blockquote className="h-full rounded-2xl border border-border/70 bg-surface p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t(`reviews.${key}.text`)}&rdquo;
              </p>
              <footer className="mt-4 border-t border-border/60 pt-4">
                <p className="text-sm font-semibold text-navy">{t(`reviews.${key}.name`)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t(`reviews.${key}.route`)}</p>
              </footer>
            </blockquote>
          </ScrollReveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t("contact")}{" "}
        <a href="mailto:support@travellium.com" className="cursor-pointer font-medium text-navy underline-offset-2 hover:underline">
          support@travellium.com
        </a>
        {" · "}
        <Link href="/faq" className="cursor-pointer font-medium text-navy underline-offset-2 hover:underline">
          FAQ
        </Link>
      </p>
    </PageSection>
  );
}
