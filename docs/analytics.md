# Analytics

## Environment variables

Set any of these in `.env.local` (or your host’s dashboard). Scripts load only when values are present.

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag |

Implementation: `components/providers/analytics-scripts.tsx` (injected from `app/[locale]/layout.tsx`).

## Programmatic events

Use helpers in `lib/analytics.ts` for custom `gtag` events when the GA script is loaded.

## Privacy

Review cookie consent requirements for your jurisdictions before enabling pixels in production. The GA snippet includes `anonymize_ip` as a sensible default; extend with Consent Mode as needed.
