"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { buttonVariants } from "@/components/ui/button";
import { isNavLinkActive, mainNavLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const close = () => onOpenChange(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className={cn(buttonVariants({ variant: "outline", size: "icon" }), "border-border/80 bg-subtle/60")}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? t("closeMenu") : t("openMenu")}
      >
        {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-[55] cursor-pointer bg-navy/50 backdrop-blur-[3px]"
              aria-label={t("closeMenu")}
              onClick={close}
            />

            <motion.nav
              id="mobile-nav-panel"
              initial={reduceMotion ? false : { opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="fixed inset-x-0 top-[var(--header-height)] z-[56] max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-b border-border bg-surface shadow-[var(--shadow-premium-lg)]"
              aria-label="Mobile navigation"
            >
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                <ul className="space-y-1">
                  {mainNavLinks.map((link) => {
                    const active = isNavLinkActive(pathname, hash, link.href);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={close}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 cursor-pointer items-center rounded-xl px-4 text-base font-medium transition-colors duration-200",
                            active
                              ? "bg-subtle text-navy"
                              : "text-navy hover:bg-subtle/70",
                          )}
                        >
                          {t(link.labelKey)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 border-t border-border/70 pt-4">
                  <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {t("language")}
                  </p>
                  <div className="px-4">
                    <LocaleSwitcher />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={close}
                    className={cn(buttonVariants({ variant: "outline" }), "min-h-12 w-full")}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={close}
                    className={cn(buttonVariants({ variant: "default" }), "min-h-12 w-full rounded-xl")}
                  >
                    {t("signUp")}
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
