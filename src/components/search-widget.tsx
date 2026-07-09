"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Bus, Hotel, Plane, TrainFront, ArrowLeftRight, Users, Search } from "lucide-react";
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

  const swapCities = () => {
    setFrom(to);
    setTo(from);
    setErrors((e) => ({ ...e, from: undefined, to: undefined }));
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
    const params = new URLSearchParams({ type: activeTab, depart, passengers });
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn("search-widget w-full", shake && "animate-[shake_0.4s_ease-in-out]")}
    >
      <div
        className="search-widget-tabs t-tabs w-full overflow-x-auto scrollbar-none"
        role="tablist"
        aria-label="Search type"
      >
        <span ref={pillRef} className="t-tabs-pill !rounded-[0.625rem] !shadow-sm" aria-hidden />
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
            className="t-tab flex flex-1 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[0.625rem] px-3 py-2.5 text-xs font-semibold sm:flex-none sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden strokeWidth={2} />
            <span className="whitespace-nowrap">{t(`tabs.${id}`)}</span>
          </button>
        ))}
      </div>

      <div className="search-widget-body">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-3 px-0.5 text-xs leading-relaxed text-muted-foreground sm:text-[13px]"
          >
            {t(`hints.${activeTab}`)}
          </motion.p>
        </AnimatePresence>

        {!isHotel && (
          <div className="trip-toggle" role="group" aria-label="Trip type">
            {(["round", "one"] as const).map((type) => (
              <button
                key={type}
                type="button"
                data-active={tripType === type}
                onClick={() => setTripType(type)}
                className="trip-toggle-btn"
              >
                {type === "round" ? t("roundTrip") : t("oneWay")}
              </button>
            ))}
          </div>
        )}

        <div
          className={cn(
            "search-field-grid",
            !isHotel && "search-field-grid--four-cols",
            isHotel && "hotel-grid",
          )}
        >
          {isHotel ? (
            <>
              <CityAutocomplete
                id="hotel-city"
                label={t("to")}
                value={city}
                onChange={setCity}
                placeholder={t("toPlaceholder")}
                error={errors.city}
                className="hotel-city"
              />
              <DateField
                id="hotel-depart"
                label={t("dates")}
                value={depart}
                min={today}
                onChange={setDepart}
                error={errors.depart}
              />
              <PassengersField label={t("guests")} value={passengers} onChange={setPassengers} />
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
              />
              <div className="relative">
                <CityAutocomplete
                  id="to"
                  label={t("to")}
                  value={to}
                  onChange={setTo}
                  placeholder={t("toPlaceholder")}
                  error={errors.to}
                />
                <button
                  type="button"
                  onClick={swapCities}
                  className="swap-cities-btn"
                  aria-label="Swap cities"
                >
                  <ArrowLeftRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
              <DateField
                id="depart"
                label={tripType === "round" ? t("departDate") : t("dates")}
                value={depart}
                min={today}
                onChange={setDepart}
                error={errors.depart}
              />
              {tripType === "round" ? (
                <DateField
                  id="return"
                  label={t("returnDate")}
                  value={ret}
                  min={depart || today}
                  onChange={setRet}
                />
              ) : (
                <PassengersField label={t("passengers")} value={passengers} onChange={setPassengers} />
              )}
            </>
          )}
        </div>

        {!isHotel && tripType === "round" && (
          <div className="round-trip-passengers mt-2.5 max-w-xs">
            <PassengersField label={t("passengers")} value={passengers} onChange={setPassengers} />
          </div>
        )}

        <button type="button" onClick={handleSubmit} className="search-widget-submit">
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
        className={cn("search-field cursor-pointer rounded-2xl border border-border/70 sm:rounded-none sm:border-0", error && "ring-2 ring-red-400/60 ring-inset")}
      >
        <span className="search-field-label">{label}</span>
        <input
          id={id}
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="search-field-input cursor-pointer [color-scheme:light]"
        />
      </label>
      {error && <p className="mt-1 px-1 text-[11px] font-medium text-red-600">{error}</p>}
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
    <div className={className}>
      <label className="search-field cursor-pointer rounded-2xl border border-border/70 sm:rounded-none sm:border-0">
        <span className="search-field-label">{label}</span>
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 shrink-0 text-muted-foreground/70" strokeWidth={1.75} />
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-field-input cursor-pointer appearance-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={String(n)}>
                {n}
              </option>
            ))}
          </select>
        </span>
      </label>
    </div>
  );
}
