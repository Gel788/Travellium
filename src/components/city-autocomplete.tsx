"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { cities, cityLabel, filterCities, type City } from "@/lib/cities";
import { cn } from "@/lib/utils";

type CityAutocompleteProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
};

export function CityAutocomplete({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  icon,
  className,
}: CityAutocompleteProps) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(value), [value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const results = filterCities(query, locale);

  const pick = (city: City) => {
    const label = cityLabel(city, locale);
    setQuery(label);
    onChange(label);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <label
        htmlFor={id}
        className={cn(
          "group block cursor-pointer bg-surface px-4 py-3.5 transition-colors duration-200",
          "hover:bg-subtle/80 focus-within:bg-subtle/80",
          error && "ring-1 ring-red-400 ring-inset",
        )}
      >
        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <span className="flex items-center justify-between gap-2">
          <input
            id={id}
            type="text"
            value={query}
            placeholder={placeholder}
            autoComplete="off"
            onChange={(e) => {
              setQuery(e.target.value);
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="w-full bg-transparent text-[0.9375rem] font-medium text-navy outline-none placeholder:text-muted-foreground/50"
          />
          {icon}
        </span>
      </label>
      {error && <p className="px-4 py-1 text-[11px] text-red-600">{error}</p>}
      {open && results.length > 0 && (
        <ul
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-auto rounded-xl border border-border/80 bg-surface py-1 shadow-[var(--shadow-premium-lg)]"
          role="listbox"
        >
          {results.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                role="option"
                onClick={() => pick(city)}
                className="flex w-full cursor-pointer flex-col px-4 py-2.5 text-left transition-colors hover:bg-subtle"
              >
                <span className="text-sm font-medium text-navy">{cityLabel(city, locale)}</span>
                <span className="text-xs text-muted-foreground">
                  {locale === "ru" ? city.countryRu : city.countryEn}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function getDefaultCity(locale: string) {
  return cityLabel(cities[0], locale);
}

export function getDefaultCityDest(locale: string) {
  return cityLabel(cities[1], locale);
}
