import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { SearchResults } from "@/components/search-results";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">…</div>}>
      <SearchResults />
    </Suspense>
  );
}
