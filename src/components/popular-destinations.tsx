import { getTranslations } from "next-intl/server";
import { DestinationCard } from "@/components/destination-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { PageSection } from "@/components/ui/page-section";
import { siteImages, type DestinationKey } from "@/lib/site-images";

const destinationKeys: DestinationKey[] = [
  "sochi",
  "istanbul",
  "dubai",
  "spb",
  "kazan",
  "tbilisi",
];

export async function PopularDestinations() {
  const t = await getTranslations("destinations");

  return (
    <PageSection id="destinations" className="py-12 sm:py-16 lg:py-20">
      <ScrollReveal>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      </ScrollReveal>

      <div className="scroll-row mt-8 sm:hidden">
        {destinationKeys.map((key) => (
          <div key={key} className="w-[78vw] max-w-[300px]">
            <DestinationCard
              city={t(`items.${key}.city`)}
              country={t(`items.${key}.country`)}
              priceLabel={t("from", { price: t(`items.${key}.price`) })}
              image={siteImages.destinations[key]}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 hidden gap-4 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {destinationKeys.map((key, index) => (
          <ScrollReveal key={key} delay={index * 0.04}>
            <DestinationCard
              city={t(`items.${key}.city`)}
              country={t(`items.${key}.country`)}
              priceLabel={t("from", { price: t(`items.${key}.price`) })}
              image={siteImages.destinations[key]}
            />
          </ScrollReveal>
        ))}
      </div>
    </PageSection>
  );
}
