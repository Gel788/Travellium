import { cn } from "@/lib/utils";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl text-sm font-bold shadow-md",
          inverted ? "bg-white text-navy" : "bg-navy text-white",
        )}
        aria-hidden
      >
        {!inverted && (
          <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        )}
        T
      </span>
      <span
        className={cn(
          "text-[1.05rem] font-semibold tracking-[-0.03em]",
          inverted ? "text-white" : "text-navy",
        )}
      >
        Travellium
      </span>
    </span>
  );
}
