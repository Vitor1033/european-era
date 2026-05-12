# Deployment

## Build

```bash
npm run build
npm run start
```

## Hosting

Compatible with **Vercel**, **Netlify**, **Node** Docker images, or any platform that supports Next.js 15.

## Environment

- Set `NEXT_PUBLIC_SITE_URL` to the production origin (used for canonical URLs and JSON-LD).
- Add analytics IDs if needed (see [analytics.md](./analytics.md)).

## Middleware

`middleware.ts` delegates locale detection and redirects to `next-intl`. Ensure your host forwards the `Accept-Language` header if you rely on automatic locale negotiation.

## Images

Remote patterns for Unsplash are configured in `next.config.ts`. Add domains for your CMS or CDN as you introduce them.
