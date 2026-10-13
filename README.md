# Marko Obradović — Next.js portfolio

The existing portfolio rewritten from Nuxt to Next.js App Router, with English and Serbian content, Sanity projects, dark mode, and the Mailgun contact form.

## Development

Use Node.js 24 (also pinned in `.nvmrc` and `package.json` for Vercel).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

English routes: `/`, `/contact`, `/projects`, `/projects/:slug`.
Serbian routes use `/sr`. Project slugs remain the existing English Sanity slugs in both languages.

The public Sanity project/dataset defaults match `studio/`; change `SANITY_PROJECT_ID` and `SANITY_DATASET` to override them. Contact delivery requires the four `MAILGUN_*` values documented in [.env.example](.env.example). Secrets remain server-only.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests run against the production build on port 3100 and a mock Mailgun server on port 3101. They read the existing public Sanity dataset and never send real emails. Set `NODE_USE_ENV_PROXY=1` if the local environment requires an HTTP proxy. For Chromium behind the same proxy, set `PLAYWRIGHT_PROXY_SERVER` to its address; the tests fetch real CDN images through Node with TLS verification. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` can select an installed system Chromium.

## Vercel

Import or deploy the branch as usual. `vercel.json` selects Next.js and overrides the former Nuxt build settings. Add the Mailgun environment variables to Preview and Production environments. `PROD_DOMAIN` is optional; if absent, metadata uses the Vercel deployment URL.

Sanity Studio stays a separate application with the same schema and configuration. Run its existing commands from `studio/`.

See [migration notes](docs/nextjs-rewrite.md) for implementation and deployment details.
