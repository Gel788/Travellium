"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

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
    <TiltCard>
      <a
        href="#search"
        className="group relative block h-full cursor-pointer overflow-hidden rounded-[1.35rem] bg-surface transition-shadow duration-400 hover:shadow-[var(--shadow-premium-lg)]"
        style={{ boxShadow: "var(--shadow-premium)" }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={city}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-navy/5" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-2xl leading-none tracking-[-0.02em] text-white">
                {city}
              </p>
              <p className="mt-1.5 text-sm text-white/70">{country}</p>
            </div>
            <span className="shrink-0 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-navy backdrop-blur-sm">
              {priceLabel}
            </span>
          </div>
        </div>
        <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-white text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden strokeWidth={2} />
        </span>
      </a>
    </TiltCard>
  );
}
