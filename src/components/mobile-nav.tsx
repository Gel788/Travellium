"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#search", label: t("flights"), onClick: () => setOpen(false) },
    { href: "/#destinations", label: t("hotels"), onClick: () => setOpen(false) },
    { href: "/#how-it-works", label: t("howItWorks"), onClick: () => setOpen(false) },
    { href: "/about", label: t("about"), onClick: () => setOpen(false) },
    { href: "/faq", label: t("faq"), onClick: () => setOpen(false) },
  ];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-navy transition-colors hover:bg-subtle"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-pointer bg-navy/20 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            className="fixed right-3 top-[3.75rem] z-50 w-[min(calc(100vw-1.5rem),280px)] overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[var(--shadow-premium-lg)]"
            aria-label="Mobile navigation"
          >
            <ul className="p-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={link.onClick}
                    className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-navy transition-colors hover:bg-subtle"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border/80 p-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-subtle"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className={cn(
                  "mt-1 block cursor-pointer rounded-xl bg-navy px-4 py-3 text-center text-sm font-semibold text-white",
                )}
              >
                {t("signUp")}
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
