"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const KEY = "travellium-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-lg rounded-2xl border border-border/80 bg-surface p-4 shadow-[var(--shadow-premium-lg)] sm:p-5",
      )}
      role="dialog"
      aria-label={t("title")}
    >
      <p className="text-sm font-semibold text-navy">{t("title")}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{t("text")}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(KEY, "accepted");
            setVisible(false);
          }}
          className="cursor-pointer rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-ink"
        >
          {t("accept")}
        </button>
        <Link href="/privacy" className="cursor-pointer rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-navy">
          {t("learnMore")}
        </Link>
      </div>
    </div>
  );
}
