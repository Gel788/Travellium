import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/ui/page-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function CtaBanner() {
  const t = await getTranslations("cta");

  return (
    <PageSection className="pb-12 sm:pb-16 lg:pb-20">
      <div className="rounded-2xl bg-navy px-6 py-10 text-center sm:rounded-[1.25rem] sm:px-10 sm:py-14">
        <h2 className="font-display mx-auto max-w-lg text-2xl leading-[1.15] tracking-[-0.02em] text-white sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">
          {t("subtitle")}
        </p>
        <a
          href="#search"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-6 rounded-full bg-white text-navy hover:bg-white/92 sm:mt-8")}
        >
          {t("button")}
          <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={2} />
        </a>
      </div>
    </PageSection>
  );
}
