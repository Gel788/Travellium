export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travellium.com";

  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Travellium",
    url: baseUrl,
    description: "Compare and book flights, trains, buses, and hotels",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
