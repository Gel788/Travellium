"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Clock, Plane, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageSection } from "@/components/ui/page-section";
import { cn } from "@/lib/utils";
import type { SearchTab } from "@/lib/site-images";

const mockPrices = [4890, 5200, 6100, 7350, 8900];

export function SearchResults() {
  const t = useTranslations("searchResults");
  const params = useSearchParams();

  const type = (params.get("type") || "flights") as SearchTab;
  const from = params.get("from") || params.get("city") || "—";
  const to = params.get("to") || "—";
  const depart = params.get("depart") || "—";
  const ret = params.get("return");
  const passengers = params.get("passengers") || "1";

  const routeLabel =
    type === "hotels"
      ? `${from} · ${depart}`
      : ret
        ? `${from} → ${to} · ${depart} — ${ret}`
        : `${from} → ${to} · ${depart}`;

  return (
    <PageSection className="py-10 sm:py-14">
      <div className="mb-8">
        <p className="eyebrow mb-3">{t(`types.${type}`)}</p>
        <h1 className="font-display text-3xl tracking-[-0.02em] text-navy sm:text-4xl">
          {routeLabel}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("passengers", { count: passengers })}
        </p>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{t("widgetNotice")}</p>
      </div>

      <ul className="space-y-3">
        {mockPrices.map((price, i) => (
          <li
            key={price}
            className={cn(
              "flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface p-5 sm:flex-row sm:items-center sm:justify-between",
            )}
            style={{ boxShadow: "var(--shadow-premium)" }}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-subtle text-navy">
                <Plane className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-semibold text-navy">
                  {t("option", { n: i + 1 })} · {t(`carriers.${type}`)}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {t("duration", { hours: 2 + i, mins: i * 10 })}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <p className="text-xl font-bold text-navy">
                {t("price", { price: price.toLocaleString() })}
              </p>
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-full bg-navy/40 px-5 py-2.5 text-sm font-semibold text-white"
              >
                {t("select")}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center">
        <Link href="/" className="cursor-pointer text-sm font-medium text-accent hover:underline">
          ← {t("back")}
        </Link>
      </p>
    </PageSection>
  );
}
