"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#search" as const, label: t("flights") },
    { href: "/#destinations" as const, label: t("hotels") },
    { href: "/#how-it-works" as const, label: t("howItWorks") },
    { href: "/about" as const, label: t("about") },
    { href: "/faq" as const, label: t("faq") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-200",
        scrolled
          ? "border-border/80 bg-surface/95 shadow-sm backdrop-blur-xl"
          : "border-white/10 bg-navy/10 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[3.75rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="cursor-pointer shrink-0">
          <Logo inverted={!scrolled} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-muted-foreground hover:bg-subtle hover:text-navy"
                  : "text-white/85 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitcher inverted={!scrolled} />
          <Link
            href="/login"
            className={cn(
              "hidden cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:inline",
              scrolled ? "text-muted-foreground hover:text-navy" : "text-white/85 hover:text-white",
            )}
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className={cn(
              "hidden cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:inline-flex",
              scrolled ? "bg-navy text-white hover:bg-ink" : "bg-white text-navy hover:bg-white/90",
            )}
          >
            {t("signUp")}
          </Link>
          <MobileNav light={!scrolled} />
        </div>
      </div>
    </header>
  );
}
