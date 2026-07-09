import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("product"),
      links: [
        { label: t("links.flights"), href: "/#search" as const },
        { label: t("links.trains"), href: "/#search" as const },
        { label: t("links.buses"), href: "/#search" as const },
        { label: t("links.hotels"), href: "/#search" as const },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("links.about"), href: "/about" as const },
        { label: t("links.faq"), href: "/faq" as const },
        { label: t("links.referral"), href: "/referral" as const },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("links.privacy"), href: "/privacy" as const },
        { label: t("links.terms"), href: "/terms" as const },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 10% 100%, rgba(234,88,12,0.2) 0%, transparent 45%), radial-gradient(circle at 90% 0%, rgba(59,130,246,0.15) 0%, transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="cursor-pointer">
              <Logo inverted />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/55">{t("tagline")}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">{col.title}</p>
                <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="cursor-pointer text-sm text-white/70 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-white/40 sm:mt-14">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
