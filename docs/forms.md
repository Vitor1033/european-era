# Contact form

## Behavior

- Client component: `components/forms/contact-form.tsx`
- Validates with **Zod** (name, email, subject, message).
- `POST` body as JSON to `/api/contact`.
- States: idle, loading, success, error (accessible `role` attributes on status messages).

## Production wiring

`app/api/contact/route.ts` currently validates and returns `{ ok: true }`. Connect to:

- Resend, SendGrid, Postmark, or SES for transactional email
- HubSpot / Salesforce / Airtable for lead capture
- Slack or Discord webhooks for internal alerts

Keep secrets in server-only environment variables (no `NEXT_PUBLIC_` prefix).
