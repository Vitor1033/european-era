# European Era

Production-ready marketing site for an international internships and mobility platform. Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **shadcn/ui-style primitives**, **lucide-react**, and **next-intl** for **English, Portuguese, and Spanish**.

## Quick start

```bash
npm install
npm run dev
```

Open the localized home page, for example: `http://localhost:3000/en`, `http://localhost:3000/pt`, or `http://localhost:3000/es`.

## Language switcher

The header includes a **globe button** (desktop and mobile) that opens a menu for **English**, **Português**, and **Español**. It keeps the current path and swaps the locale via `next-intl` navigation (`router.replace`).

## Documentation

- [Project structure & architecture](docs/architecture.md)
- [Editing content](docs/content.md)
- [Forms](docs/forms.md)
- [Analytics](docs/analytics.md)
- [CMS integration notes](docs/cms.md)
- [Deployment](docs/deployment.md)

## Scripts

| Command        | Description        |
| -------------- | ------------------ |
| `npm run dev`  | Dev server (Turbopack) |
| `npm run build`| Production build   |
| `npm run start`| Start production server |
| `npm run lint` | ESLint             |

Copy `.env.example` to `.env.local` and adjust values before deploying.
