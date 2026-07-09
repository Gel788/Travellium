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
          : "border-transparent bg-background/90 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[3.75rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="cursor-pointer shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-subtle hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitcher />
          <Link
            href="/login"
            className="hidden cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy sm:inline"
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="hidden cursor-pointer rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink sm:inline-flex"
          >
            {t("signUp")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
