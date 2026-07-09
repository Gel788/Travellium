"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const faqKeys = ["booking", "payment", "refund", "support", "referral"] as const;

export function FaqAccordion() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<string | null>(faqKeys[0]);

  return (
    <PageSection className="py-14 sm:py-20">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="mb-10" />

      <div className="mx-auto max-w-3xl divide-y divide-border/80 rounded-2xl border border-border/80 bg-surface" style={{ boxShadow: "var(--shadow-premium)" }}>
        {faqKeys.map((key) => {
          const isOpen = open === key;
          return (
            <div key={key}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : key)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-navy sm:text-base">{t(`items.${key}.q`)}</span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6">{t(`items.${key}.a`)}</p>
              )}
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}
