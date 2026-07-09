import { setRequestLocale } from "next-intl/server";
import { FaqAccordion } from "@/components/faq-accordion";

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FaqAccordion />;
}
