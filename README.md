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
npm run build
```

If the local environment requires an HTTP proxy, start the application with `NODE_USE_ENV_PROXY=1` so server-side Sanity requests use the configured proxy.

## Vercel

Import or deploy the branch as usual. `vercel.json` selects Next.js and overrides the former Nuxt build settings. Add the Mailgun environment variables to Preview and Production environments. `PROD_DOMAIN` is optional; if absent, metadata uses the Vercel deployment URL.

Sanity Studio stays a separate application with the same schema and configuration. Run its existing commands from `studio/`.

See [migration notes](docs/nextjs-rewrite.md) for implementation and deployment details.
