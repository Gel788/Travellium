import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageSection } from "@/components/ui/page-section";
import { SectionHeader } from "@/components/ui/section-header";

export default async function ReferralPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("referral");

  return (
    <PageSection className="py-14 sm:py-20">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="mb-10" />
      <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-subtle/50 p-8 text-center sm:p-12">
        <p className="text-sm leading-relaxed text-muted-foreground">{t("comingSoon")}</p>
        <Link href="/register" className="mt-6 inline-flex cursor-pointer rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-ink">
          {t("cta")}
        </Link>
      </div>
    </PageSection>
  );
}
