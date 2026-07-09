# Travellium — Design Context

## Продукт

**Travellium** — платформа для покупки авиабилетов, ЖД-билетов, автобусных билетов и бронирования отелей. Реферальная программа — на следующем этапе. Сейчас — публичный сайт с сильным UX; позже — встраиваемые виджеты.

## Целевая аудитория

- Путешественники 22–45, ищут билеты и отели в одном месте
- Мобильные пользователи (60%+ трафика ожидается с телефона)
- Рефералы — позже; пока фокус на доверии и простоте поиска

## Page Archetype (Stage 0)

| Параметр | Значение |
|----------|----------|
| **Primary** | Landing / marketing + search-first consumer surface |
| **Secondary** | E-commerce catalog (направления, deals) |
| **Density** | Medium — hero с виджетом поиска + секции доверия/направлений |
| **Interaction** | Быстрый поиск → сравнение → бронь (виджеты позже) |
| **Motion** | Умеренная: spring на табах, плавные переходы, `prefers-reduced-motion` |

## Design Consequences

- **Hero = единый поисковый виджет** с табами: Авиа · ЖД · Автобус · Отели
- Не перегружать форму на MVP-сайте — placeholder UI, реальные виджеты позже
- Один primary accent на экран; структура через grayscale
- Доверие: партнёры, отзывы, безопасность оплаты
- Anti-slop: без gradient hero + pill buttons + generic card grid

## Три направления (на выбор)

1. **Horizon** — премиальный trust-first (Kiwi/Booking vibe)
2. **Atlas** — editorial travel magazine
3. **Pulse** — быстрый mobile-first aggregator

## Статус

- [x] Выбрано направление — Horizon (clean, premium)
- [x] Next.js + Tailwind + next-intl (RU/EN)
- [x] Landing page implemented
- [ ] Design system formalized in Figma
- [ ] Embed-виджеты бронирования
