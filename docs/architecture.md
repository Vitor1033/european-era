# Architecture

## Top-level layout

- `app/layout.tsx` — passes through to localized layouts (see `next-intl` App Router setup).
- `app/[locale]/layout.tsx` — sets `<html lang>`, loads messages, wraps the tree in `NextIntlClientProvider`, and attaches analytics scripts.
- `app/[locale]/(marketing)/layout.tsx` — sticky `Navbar`, `main`, and `Footer` for all marketing pages.

## Internationalization

- Locales: `en`, `pt`, `es` (`i18n/routing.ts`, `localePrefix: "always"`).
- UI copy lives in `messages/{locale}.json`.
- Structured lists (blog posts, FAQs, opportunities, etc.) live in `content/*.ts` with `Localized` fields where needed.
- Shared locale-aware links and router helpers: `i18n/navigation.ts`.

## Components

- `components/ui/*` — primitives (button, card, accordion, sheet, dropdown, inputs).
- `components/layout/*` — `Navbar`, `Footer`, `LanguageSwitcher`, `SectionHeader`.
- `components/sections/*` — homepage and reusable marketing blocks.
- `components/forms/*` — contact form (client-side validation + API route).
- `components/animations/*` — subtle Framer Motion wrappers.

## SEO

- Per-page `generateMetadata` uses `lib/seo.ts` (`buildPageMetadata`) for titles, descriptions, Open Graph, and `hreflang` alternates.
- JSON-LD: organization on the home page; FAQ schema on `/faq`.

## API routes

- `POST /api/contact` — validates JSON with Zod; extend to email/CRM webhooks as needed.
