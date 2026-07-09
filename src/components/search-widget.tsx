"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import {
  Bus,
  Hotel,
  Plane,
  TrainFront,
  ArrowLeftRight,
  Users,
  Search,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import {
  CityAutocomplete,
  getDefaultCity,
  getDefaultCityDest,
} from "@/components/city-autocomplete";
import { cn } from "@/lib/utils";
import type { SearchTab } from "@/lib/site-images";

const tabs: { id: SearchTab; icon: typeof Plane }[] = [
  { id: "flights", icon: Plane },
  { id: "trains", icon: TrainFront },
  { id: "buses", icon: Bus },
  { id: "hotels", icon: Hotel },
];

type SearchWidgetProps = {
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
};

type FormErrors = {
  from?: string;
  to?: string;
  depart?: string;
  city?: string;
};

export function SearchWidget({ activeTab, onTabChange }: SearchWidgetProps) {
  const t = useTranslations("search");
  const locale = useLocale();
  const router = useRouter();
  const isHotel = activeTab === "hotels";
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [tripType, setTripType] = useState<"round" | "one">("round");
  const [from, setFrom] = useState(() => getDefaultCity(locale));
  const [to, setTo] = useState(() => getDefaultCityDest(locale));
  const [city, setCity] = useState(() => getDefaultCity(locale));
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [errors, setErrors] = useState<FormErrors>({});
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setFrom(getDefaultCity(locale));
    setTo(getDefaultCityDest(locale));
    setCity(getDefaultCity(locale));
  }, [locale]);

  const movePill = (index: number, animate: boolean) => {
    const tab = tabRefs.current[index];
    const pill = pillRef.current;
    if (!tab || !pill) return;
    if (!animate) {
      const prev = pill.style.transition;
      pill.style.transition = "none";
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
      void pill.offsetWidth;
      pill.style.transition = prev;
    } else {
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
    }
  };

  useEffect(() => {
    const activeIndex = tabs.findIndex(({ id }) => id === activeTab);
    requestAnimationFrame(() => movePill(activeIndex, false));
    const onResize = () => movePill(activeIndex, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab]);

  const handleTabChange = (id: SearchTab, index: number) => {
    onTabChange(id);
    setErrors({});
    requestAnimationFrame(() => movePill(index, true));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (isHotel) {
      if (!city.trim()) next.city = t("errors.cityRequired");
    } else {
      if (!from.trim()) next.from = t("errors.fromRequired");
      if (!to.trim()) next.to = t("errors.toRequired");
      if (from.trim() && to.trim() && from.trim().toLowerCase() === to.trim().toLowerCase()) {
        next.to = t("errors.sameCity");
      }
    }
    if (!depart) next.depart = t("errors.dateRequired");
    if (tripType === "round" && !isHotel && !ret) next.depart = t("errors.returnRequired");

    setErrors(next);
    if (Object.keys(next).length) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const params = new URLSearchParams({
      type: activeTab,
      depart,
      passengers,
    });
    if (isHotel) {
      params.set("city", city);
    } else {
      params.set("from", from);
      params.set("to", to);
      params.set("trip", tripType);
      if (tripType === "round" && ret) params.set("return", ret);
    }
    router.push(`/search?${params.toString()}`);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <motion.div
      id="search"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("glass-panel w-full rounded-[1.75rem] p-2 sm:p-2.5", shake && "animate-[shake_0.4s_ease-in-out]")}
    >
      <div
        className="t-tabs w-full overflow-x-auto rounded-2xl bg-subtle/80 p-1 scrollbar-none"
        role="tablist"
        aria-label="Search type"
      >
        <span ref={pillRef} className="t-tabs-pill" aria-hidden />
        {tabs.map(({ id, icon: Icon }, index) => (
          <button
            key={id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => handleTabChange(id, index)}
            className="t-tab flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold sm:px-5 sm:py-3"
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden strokeWidth={2} />
            <span className="whitespace-nowrap">{t(`tabs.${id}`)}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeTab}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mt-2.5 px-1 text-xs text-muted-foreground sm:text-[13px]"
        >
          {t(`hints.${activeTab}`)}
        </motion.p>
      </AnimatePresence>

      <div className="mt-2 rounded-2xl bg-subtle/50 p-4 sm:p-5">
        {!isHotel && (
          <div className="mb-4 inline-flex rounded-full bg-surface p-1 shadow-sm ring-1 ring-border/60">
            {(["round", "one"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTripType(type)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                  tripType === type
                    ? "bg-navy text-white shadow-sm"
                    : "text-muted-foreground hover:text-navy",
                )}
              >
                {type === "round" ? t("roundTrip") : t("oneWay")}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {isHotel ? (
            <>
              <CityAutocomplete
                id="hotel-city"
                label={t("to")}
                value={city}
                onChange={setCity}
                placeholder={t("toPlaceholder")}
                error={errors.city}
                className="sm:col-span-2 lg:col-span-2 rounded-none sm:rounded-tl-2xl lg:rounded-tl-2xl"
              />
              <DateField
                id="hotel-depart"
                label={t("dates")}
                value={depart}
                min={today}
                onChange={setDepart}
                error={errors.depart}
                className="rounded-none"
              />
              <PassengersField
                label={t("guests")}
                value={passengers}
                onChange={setPassengers}
                className="rounded-none sm:rounded-br-2xl lg:rounded-tr-2xl lg:rounded-br-2xl"
              />
            </>
          ) : (
            <>
              <CityAutocomplete
                id="from"
                label={t("from")}
                value={from}
                onChange={setFrom}
                placeholder={t("fromPlaceholder")}
                error={errors.from}
                className="rounded-none sm:rounded-tl-2xl lg:rounded-none lg:rounded-tl-2xl"
              />
              <CityAutocomplete
                id="to"
                label={t("to")}
                value={to}
                onChange={setTo}
                placeholder={t("toPlaceholder")}
                error={errors.to}
                icon={<ArrowLeftRight className="h-4 w-4 text-muted-foreground/70" strokeWidth={1.75} />}
                className="rounded-none"
              />
              <div className={cn("contents", tripType === "round" && "lg:contents")}>
                <DateField
                  id="depart"
                  label={tripType === "round" ? t("departDate") : t("dates")}
                  value={depart}
                  min={today}
                  onChange={setDepart}
                  error={errors.depart}
                  className="rounded-none"
                />
                {tripType === "round" ? (
                  <DateField
                    id="return"
                    label={t("returnDate")}
                    value={ret}
                    min={depart || today}
                    onChange={setRet}
                    className="rounded-none sm:rounded-bl-2xl lg:rounded-none"
                  />
                ) : (
                  <PassengersField
                    label={t("passengers")}
                    value={passengers}
                    onChange={setPassengers}
                    className="rounded-none sm:rounded-br-2xl lg:rounded-tr-2xl lg:rounded-br-2xl"
                  />
                )}
              </div>
              {tripType === "round" && (
                <PassengersField
                  label={t("passengers")}
                  value={passengers}
                  onChange={setPassengers}
                  className="rounded-none sm:col-span-2 sm:rounded-br-2xl lg:col-span-1 lg:rounded-none lg:rounded-br-2xl lg:rounded-tr-2xl"
                />
              )}
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className={cn(
            "mt-4 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-accent py-4 text-sm font-semibold text-white",
            "transition-all duration-250 hover:bg-[#dc4f0a] hover:shadow-[var(--shadow-glow-accent)]",
            "active:scale-[0.995]",
          )}
        >
          <Search className="h-4 w-4" aria-hidden strokeWidth={2.25} />
          {t("search")}
        </button>
      </div>
    </motion.div>
  );
}

function DateField({
  id,
  label,
  value,
  min,
  onChange,
  error,
  className,
}: {
  id: string;
  label: string;
  value: string;
  min: string;
  onChange: (v: string) => void;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={cn(
          "block cursor-pointer bg-surface px-4 py-3.5 transition-colors hover:bg-subtle/80",
          error && "ring-1 ring-red-400 ring-inset",
        )}
      >
        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <input
          id={id}
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer bg-transparent text-[0.9375rem] font-medium text-navy outline-none [color-scheme:light]"
        />
      </label>
      {error && <p className="px-4 py-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

function PassengersField({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "block cursor-pointer bg-surface px-4 py-3.5 transition-colors hover:bg-subtle/80",
        className,
      )}
    >
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground/70" strokeWidth={1.75} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer bg-transparent text-[0.9375rem] font-medium text-navy outline-none"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={String(n)}>
              {n}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
