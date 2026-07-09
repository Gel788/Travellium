"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageSection } from "@/components/ui/page-section";
import { cn } from "@/lib/utils";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSent(true);
  };

  if (sent) {
    return (
      <PageSection className="py-16 sm:py-24">
        <div className="mx-auto max-w-md rounded-2xl border border-border/80 bg-surface p-8 text-center" style={{ boxShadow: "var(--shadow-premium-lg)" }}>
          <p className="font-display text-2xl text-navy">{t("successTitle")}</p>
          <p className="mt-3 text-sm text-muted-foreground">{t("successText")}</p>
          <Link href="/" className="mt-6 inline-block cursor-pointer text-sm font-semibold text-accent hover:underline">
            {t("backHome")}
          </Link>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection className="py-14 sm:py-20">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-3xl tracking-[-0.02em] text-navy">
          {mode === "login" ? t("loginTitle") : t("registerTitle")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login" ? t("loginSubtitle") : t("registerSubtitle")}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-border/80 bg-surface p-6 sm:p-8" style={{ boxShadow: "var(--shadow-premium)" }}>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-subtle/50 px-4 py-3 text-sm outline-none focus:border-navy/30"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("password")}</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-subtle/50 px-4 py-3 text-sm outline-none focus:border-navy/30"
            />
          </label>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-navy py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            {mode === "login" ? t("loginButton") : t("registerButton")}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            {mode === "login" ? t("noAccount") : t("hasAccount")}{" "}
            <Link href={mode === "login" ? "/register" : "/login"} className="cursor-pointer font-semibold text-navy hover:underline">
              {mode === "login" ? t("registerLink") : t("loginLink")}
            </Link>
          </p>
        </form>
      </div>
    </PageSection>
  );
}
