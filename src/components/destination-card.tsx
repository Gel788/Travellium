"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function DestinationCard({
  city,
  country,
  priceLabel,
  image,
}: {
  city: string;
  country: string;
  priceLabel: string;
  image: string;
}) {
  return (
    <a
      href="#search"
      className="group relative block h-full cursor-pointer overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-premium)] transition-shadow duration-300 hover:shadow-[var(--shadow-premium-lg)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
        <Image
          src={image}
          alt={city}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="font-display text-xl leading-none tracking-[-0.02em] text-white sm:text-2xl">{city}</p>
          <p className="mt-1 text-xs text-white/75 sm:text-sm">{country}</p>
        </div>
        <span className="shrink-0 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-bold text-navy sm:text-xs">
          {priceLabel}
        </span>
      </div>
      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-navy opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" aria-hidden strokeWidth={2} />
      </span>
    </a>
  );
}
