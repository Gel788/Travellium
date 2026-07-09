import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/ui/page-section";

export async function CtaBanner() {
  const t = await getTranslations("cta");

  return (
    <PageSection className="pb-16 sm:pb-20 lg:pb-24">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy px-6 py-14 text-center sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 15% 50%, rgba(234,88,12,0.3) 0%, transparent 50%), radial-gradient(circle at 85% 50%, rgba(59,130,246,0.2) 0%, transparent 45%)",
          }}
        />

        <div className="relative">
          <h2 className="font-display mx-auto max-w-lg text-2xl leading-[1.12] tracking-[-0.025em] text-white sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
            {t("subtitle")}
          </p>
          <a
            href="#search"
            className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-all duration-250 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-9 sm:px-8 sm:py-4"
          >
            {t("button")}
            <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={2} />
          </a>
        </div>
      </div>
    </PageSection>
  );
}
