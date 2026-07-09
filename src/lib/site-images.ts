export type SearchTab = "flights" | "trains" | "buses" | "hotels";

export const searchTabs: SearchTab[] = [
  "flights",
  "trains",
  "buses",
  "hotels",
];

export const siteImages = {
  heroBackgrounds: {
    flights: "/images/hero-flights.png",
    trains: "/images/hero-trains.png",
    buses: "/images/hero-buses.png",
    hotels: "/images/hero-hotels.png",
  } satisfies Record<SearchTab, string>,
  destinations: {
    sochi: "/images/dest-sochi.png",
    istanbul: "/images/dest-istanbul.png",
    dubai: "/images/dest-dubai.png",
    spb: "/images/dest-spb.png",
    kazan: "/images/dest-kazan.png",
    tbilisi: "/images/dest-tbilisi.png",
  },
  promos: {
    summer: "/images/promo-summer.png",
    trains: "/images/promo-trains.png",
  },
} as const;

export type DestinationKey = keyof typeof siteImages.destinations;
