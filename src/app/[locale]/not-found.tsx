import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteShell } from "@/components/site-shell";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <SiteShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-6xl font-bold text-navy/20">404</p>
        <h1 className="mt-4 font-display text-3xl text-navy">{t("title")}</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">{t("text")}</p>
        <Link
          href="/"
          className="mt-8 cursor-pointer rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
        >
          {t("back")}
        </Link>
      </div>
    </SiteShell>
  );
}
