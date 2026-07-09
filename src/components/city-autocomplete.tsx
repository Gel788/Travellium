"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { cities, filterCities, cityLabel, type City } from "@/lib/cities";
import { cn } from "@/lib/utils";

type CityAutocompleteProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  className?: string;
};

export function CityAutocomplete({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
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
    const labelText = cityLabel(city, locale);
    setQuery(labelText);
    onChange(labelText);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <label
        htmlFor={id}
        className={cn("search-field cursor-pointer", error && "search-field--error")}
      >
        <span className="search-field-label">{label}</span>
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
          className="search-field-input"
        />
      </label>
      {error && <p className="mt-1 px-1 text-[11px] font-medium text-red-600">{error}</p>}
      {open && results.length > 0 && (
        <ul
          className="absolute left-0 right-0 top-[calc(100%-0.25rem)] z-30 max-h-52 overflow-auto rounded-xl border border-border/80 bg-surface py-1 shadow-[var(--shadow-premium-lg)]"
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
                <span className="text-sm font-semibold text-navy">{cityLabel(city, locale)}</span>
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
