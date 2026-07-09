import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-subtle text-navy",
        accent: "border-transparent bg-accent text-white",
        outline: "border-border/80 bg-surface text-muted-foreground",
        glass: "border-white/20 bg-white/10 text-white backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
