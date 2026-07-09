import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travellium.com";

const paths = ["", "/about", "/faq", "/privacy", "/terms", "/login", "/register", "/referral", "/search"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of paths) {
      const url =
        locale === routing.defaultLocale
          ? `${baseUrl}${path || "/"}`
          : `${baseUrl}/${locale}${path}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "monthly",
        priority: path === "" ? 1 : 0.6,
      });
    }
  }

  return entries;
}
