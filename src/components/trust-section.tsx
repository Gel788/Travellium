import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { PageSection } from "@/components/ui/page-section";
import { Link } from "@/i18n/navigation";

const partnerKeys = ["aeroflot", "s7", "rzd", "ostrovok", "flixbus", "booking"] as const;
const reviewKeys = ["anna", "dmitry", "elena"] as const;

export async function TrustSection() {
  const t = await getTranslations("trust");

  return (
    <PageSection className="border-y border-border/60 bg-subtle/50 py-16 sm:py-20">
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} align="center" className="mx-auto" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {partnerKeys.map((key) => (
            <span
              key={key}
              className="rounded-full border border-border/80 bg-surface px-4 py-2 text-xs font-semibold tracking-wide text-muted-foreground sm:text-sm"
            >
              {t(`partners.${key}`)}
            </span>
          ))}
        </div>
      </ScrollReveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {reviewKeys.map((key, i) => (
          <ScrollReveal key={key} delay={i * 0.06}>
            <blockquote
              className="h-full rounded-[1.25rem] border border-border/70 bg-surface p-6"
              style={{ boxShadow: "var(--shadow-premium)" }}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t(`reviews.${key}.text`)}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-semibold text-navy">{t(`reviews.${key}.name`)}</p>
                <p className="text-xs text-muted-foreground">{t(`reviews.${key}.route`)}</p>
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
