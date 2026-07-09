import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProsePage } from "@/components/prose-page";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <ProsePage eyebrow={t("eyebrow")} title={t("title")}>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
    </ProsePage>
  );
}
