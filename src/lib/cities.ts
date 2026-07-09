export type City = {
  id: string;
  ru: string;
  en: string;
  countryRu: string;
  countryEn: string;
};

export const cities: City[] = [
  { id: "mow", ru: "Москва", en: "Moscow", countryRu: "Россия", countryEn: "Russia" },
  { id: "led", ru: "Санкт-Петербург", en: "Saint Petersburg", countryRu: "Россия", countryEn: "Russia" },
  { id: "svo", ru: "Сочи", en: "Sochi", countryRu: "Россия", countryEn: "Russia" },
  { id: "kzn", ru: "Казань", en: "Kazan", countryRu: "Россия", countryEn: "Russia" },
  { id: "ekb", ru: "Екатеринбург", en: "Yekaterinburg", countryRu: "Россия", countryEn: "Russia" },
  { id: "ovb", ru: "Новосибирск", en: "Novosibirsk", countryRu: "Россия", countryEn: "Russia" },
  { id: "ist", ru: "Стамбул", en: "Istanbul", countryRu: "Турция", countryEn: "Turkey" },
  { id: "dxb", ru: "Дубай", en: "Dubai", countryRu: "ОАЭ", countryEn: "UAE" },
  { id: "tbil", ru: "Тбилиси", en: "Tbilisi", countryRu: "Грузия", countryEn: "Georgia" },
  { id: "ere", ru: "Ереван", en: "Yerevan", countryRu: "Армения", countryEn: "Armenia" },
  { id: "ala", ru: "Алматы", en: "Almaty", countryRu: "Казахстан", countryEn: "Kazakhstan" },
  { id: "min", ru: "Минск", en: "Minsk", countryRu: "Беларусь", countryEn: "Belarus" },
];

export function cityLabel(city: City, locale: string) {
  return locale === "ru" ? city.ru : city.en;
}

export function filterCities(query: string, locale: string) {
  const q = query.trim().toLowerCase();
  if (!q) return cities.slice(0, 6);
  return cities.filter((c) => {
    const label = cityLabel(c, locale).toLowerCase();
    return label.includes(q) || c.ru.toLowerCase().includes(q) || c.en.toLowerCase().includes(q);
  }).slice(0, 8);
}
