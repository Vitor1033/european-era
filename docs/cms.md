# CMS integration

The codebase is structured so you can swap local `content/*.ts` and `messages/*.json` for remote data without rewriting layouts.

## Suggested approach

1. **Keep `next-intl`** for UI strings, or move messages to a TMS/CMS that exports JSON by locale.
2. **Map CMS collections** to existing types in `types/content.ts` (`BlogPost`, `Opportunity`, `FaqItem`, etc.).
3. **Fetch in server components** (`async` pages/sections) with `fetch` + `next: { revalidate }` or `unstable_cache`.
4. **MDX** — optional for long-form blog bodies; replace the placeholder body in `app/[locale]/(marketing)/blog/[slug]/page.tsx`.

## Webhooks

On publish, call a revalidation route (Route Handler with a secret header) to purge cached pages when using ISR.
