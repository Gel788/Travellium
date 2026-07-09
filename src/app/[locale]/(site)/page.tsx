import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { PopularDestinations } from "@/components/popular-destinations";
import { PromoBanners } from "@/components/promo-banners";
import { HowItWorks } from "@/components/how-it-works";
import { WhyTravellium } from "@/components/why-travellium";
import { CtaBanner } from "@/components/cta-banner";
import { TrustSection } from "@/components/trust-section";
import { JsonLd } from "@/components/json-ld";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd />
      <Hero />
      <TrustSection />
      <PopularDestinations />
      <PromoBanners />
      <HowItWorks />
      <WhyTravellium />
      <CtaBanner />
    </>
  );
}
