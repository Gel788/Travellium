"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const locales: { code: Locale; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export function LocaleSwitcher({ inverted = false }: { inverted?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex rounded-full p-0.5",
        inverted
          ? "bg-white/15 ring-1 ring-white/25"
          : "bg-subtle/80 ring-1 ring-border/60",
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={cn(
            "cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide transition-all duration-200",
            locale === code
              ? inverted
                ? "bg-white text-navy shadow-sm"
                : "bg-surface text-navy shadow-sm"
              : inverted
                ? "text-white/75 hover:text-white"
                : "text-muted-foreground hover:text-navy",
          )}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
