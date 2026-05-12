# Editing content

## UI strings (non-developers friendly)

Edit the JSON files in `messages/`:

- `messages/en.json`
- `messages/pt.json`
- `messages/es.json`

Keep keys identical across locales. Nested keys match usage in components via `getTranslations` / `useTranslations` namespaces (for example `home.hero.title`).

## Structured content (TypeScript)

These files are easy to audit in Git and to later replace with CMS fetches:

| File | Purpose |
| ---- | ------- |
| `content/blog.ts` | Blog listing and slugs; localized titles and excerpts. |
| `content/faq.ts` | FAQ entries with localized Q&A. |
| `content/opportunities.ts` | Opportunity cards; localized fields. |
| `content/partners.ts` | Partner logos (paths under `public/logos`). |
| `content/testimonials.ts` | Quotes and roles per locale. |

## Images

- Partner marks: `public/logos/*.svg`
- Optional Open Graph asset: configure in `lib/seo.ts` (default references `/logos/european-era-mark.svg`)

Blog covers use remote Unsplash URLs; domains are allow-listed in `next.config.ts`.
