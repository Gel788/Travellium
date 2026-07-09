"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/#search", label: t("flights") },
    { href: "/#destinations", label: t("hotels") },
    { href: "/#how-it-works", label: t("howItWorks") },
    { href: "/about", label: t("about") },
    { href: "/faq", label: t("faq") },
  ];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border/70 bg-surface text-navy transition-colors hover:bg-subtle"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-navy/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-[1.5rem] bg-surface px-4 pb-8 pt-3 shadow-[0_-16px_48px_rgba(15,23,42,0.12)]"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" aria-hidden />
            <ul className="space-y-1 overflow-y-auto">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 cursor-pointer items-center rounded-xl px-4 text-base font-medium text-navy transition-colors active:bg-subtle"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/80 pt-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-border/80 text-sm font-semibold text-navy"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-navy text-sm font-semibold text-white"
              >
                {t("signUp")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
