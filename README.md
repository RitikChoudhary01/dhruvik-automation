# Dhruvik Automation portfolio

Portfolio site for Ritik Choudhary, AI Automation Developer. Built with Next.js (App Router), TypeScript and Tailwind CSS v4. No animation library: motion is CSS only and respects `prefers-reduced-motion`.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in contact form delivery (see below)
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Vitest and Testing Library (validation, contact form, hero trace, navigation) |

## Project structure

```
src/
  app/
    layout.tsx                  metadata, JSON-LD, nav and footer
    page.tsx                    home page, sections in order
    projects/[slug]/page.tsx    case study template (statically generated)
    api/contact/route.ts        contact form endpoint (validation, rate limit, delivery)
    icon.svg, opengraph-image.tsx, sitemap.ts, robots.ts, not-found.tsx
    globals.css                 design tokens and component classes
  components/                   Hero, HeroTrace, Capabilities, Services, ProjectsSection,
                                Process, Approach, About, Contact, ContactForm, Nav, Footer,
                                ArchitectureDiagram, StepExplorer, JsonView, StatusBadge
  data/
    projects.ts                 ALL project content and status labels
    trace.ts                    sample data for the hero trace
  lib/
    site.ts                     name, email, links, nav
    validation.ts               contact form rules, shared by browser and server
tests/                          Vitest suites
```

## Editing content

- **Projects:** everything is in `src/data/projects.ts`. Each project has a `status` (`repo`, `prototype`, `concept`) and an `implemented` list with a state per item (`built`, `prototype`, `in-progress`, `planned`). Change a state only when it is true. Add a `repo` URL only for a public repository you have checked.
- **Contact details and links:** `src/lib/site.ts`.
- **Hero trace:** `src/data/trace.ts`. It is illustrative and labelled that way on the page.

## Contact form delivery

The form validates in the browser and again on the server. The server sends the message using one of two options, chosen by environment variables:

1. **Resend:** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. The sender must be a verified Resend sender.
2. **Webhook:** set `CONTACT_WEBHOOK_URL` to any endpoint that accepts a JSON POST, for example an n8n Webhook node. The payload has `name`, `email`, `company`, `service`, `budget`, `message`, `receivedAt` and `source`.

If neither is set, `/api/contact` returns 503 and the form tells the visitor the message was **not** sent, keeping their text and offering a prefilled email. It never reports success without delivery. Keys are read only on the server and never shipped to the browser.

Spam protection: a hidden honeypot field and a best-effort in-memory rate limit (5 requests per 10 minutes per IP). On serverless hosting the limit is per instance, so treat it as a speed bump, not a guarantee.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New, Project**, import the repository. The framework is detected as Next.js and no build settings need changing.
3. Under **Settings, Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: your final URL, for example `https://dhruvik-automation.vercel.app`
   - Either the three Resend variables or `CONTACT_WEBHOOK_URL`
4. Deploy. Then send a test inquiry from the live site to confirm delivery.
5. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URLs, sitemap, Open Graph |
| `RESEND_API_KEY` | One delivery option | Resend API key (server only) |
| `CONTACT_TO_EMAIL` | With Resend | Where inquiries go (defaults to the email in `site.ts`) |
| `CONTACT_FROM_EMAIL` | With Resend | Verified sender address |
| `CONTACT_WEBHOOK_URL` | One delivery option | Webhook that receives the inquiry JSON |

## Known gaps

- Contact delivery needs your credentials before it can send anything.
- No screenshots or hosted demos exist for the prototypes, so none are shown.
- Project status tables for the WhatsApp receptionist and lead management projects are conservative and should be checked against your actual n8n workflows before publishing.
- `npm audit` reports advisories in the ESLint toolchain (dev dependencies only, not shipped to visitors).
