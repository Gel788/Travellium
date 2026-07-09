"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { isNavLinkActive, mainNavLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    const onScroll = () => setScrolled(window.scrollY > 4);
    syncHash();
    onScroll();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-surface/95 backdrop-blur-xl transition-shadow duration-200",
        scrolled || menuOpen
          ? "border-border/80 shadow-[var(--shadow-header)]"
          : "border-border/50",
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="min-w-0 shrink-0 cursor-pointer">
          <Logo compact />
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {mainNavLinks.map((link) => {
            const active = isNavLinkActive(pathname, hash, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                  active
                    ? "bg-subtle text-navy"
                    : "text-muted-foreground hover:bg-subtle/80 hover:text-navy",
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitcher className="hidden lg:inline-flex" />
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden lg:inline-flex")}
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "hidden rounded-full lg:inline-flex")}
          >
            {t("signUp")}
          </Link>
          <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </div>
    </header>
  );
}
