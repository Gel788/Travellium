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
    const onScroll = () => setScrolled(window.scrollY > 16);
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
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-surface/95 shadow-sm backdrop-blur-xl"
          : "border-b border-border/40 bg-surface/60 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
        <Link href="/" className="cursor-pointer shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative cursor-pointer px-3 py-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors duration-200 hover:text-navy"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <MobileNav />
          <Link
            href="/login"
            className="hidden cursor-pointer px-2 py-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors duration-200 hover:text-navy lg:inline"
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className={cn(
              "hidden cursor-pointer rounded-full bg-navy px-3.5 py-2 text-[0.8125rem] font-semibold text-white sm:inline-flex sm:px-4",
              "transition-all duration-200 hover:bg-ink hover:shadow-lg hover:shadow-navy/20",
            )}
          >
            {t("signUp")}
          </Link>
        </div>
      </div>
    </header>
  );
}
