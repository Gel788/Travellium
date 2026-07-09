import { cn } from "@/lib/utils";

type PageSectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div";
};

export function PageSection({
  id,
  children,
  className,
  innerClassName,
  as: Tag = "section",
}: PageSectionProps) {
  return (
    <Tag id={id} className={cn("px-4 sm:px-6 lg:px-10", className)}>
      <div className={cn("mx-auto max-w-7xl", innerClassName)}>{children}</div>
    </Tag>
  );
}
