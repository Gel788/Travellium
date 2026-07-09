"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const MAX_TILT = 10;

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    const tilt = tiltRef.current;
    const card = cardRef.current;
    if (!tilt || !card) return;

    tilt.classList.remove("is-hover");
    card.classList.remove("is-tilting");
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  }, []);

  const track = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tilt = tiltRef.current;
      const card = cardRef.current;
      if (!tilt || !card) return;

      const rect = tilt.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));

      tilt.classList.add("is-hover");
      card.classList.add("is-tilting");
      card.style.setProperty("--tilt-ry", `${((px - 0.5) * MAX_TILT).toFixed(2)}deg`);
      card.style.setProperty("--tilt-rx", `${((0.5 - py) * MAX_TILT).toFixed(2)}deg`);
      card.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
    },
    [],
  );

  return (
    <div
      ref={tiltRef}
      className={cn("t-tilt h-full", className)}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            /* noop */
          }
        }
      }}
      onPointerMove={track}
      onPointerUp={reset}
      onPointerCancel={reset}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") reset();
      }}
    >
      <div ref={cardRef} className="t-tilt-card h-full rounded-2xl">
        {children}
        <div className="t-tilt-glare" aria-hidden />
      </div>
    </div>
  );
}
