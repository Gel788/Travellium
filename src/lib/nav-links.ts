export const mainNavLinks = [
  { href: "/#search" as const, labelKey: "search" as const },
  { href: "/#destinations" as const, labelKey: "destinations" as const },
  { href: "/#how-it-works" as const, labelKey: "howItWorks" as const },
  { href: "/about" as const, labelKey: "about" as const },
  { href: "/faq" as const, labelKey: "faq" as const },
] as const;

export type MainNavLabelKey = (typeof mainNavLinks)[number]["labelKey"];

export function isNavLinkActive(pathname: string, hash: string, href: string) {
  if (href.includes("#")) {
    const anchor = href.split("#")[1];
    return pathname === "/" && hash === `#${anchor}`;
  }
  return pathname === href;
}
