# Next.js rewrite

## Preserved content and behavior

- The contents of `data/`, `lang/`, public technology logos, flags, favicon, and the Sanity Studio schema/configuration are preserved.
- Original image assets moved byte-for-byte from `assets/images/` to `public/images/`.
- Home keeps the hero, social links, about copy, animated skills marquee, skill categories, and experience timeline.
- English URLs remain unprefixed; Serbian URLs keep `/sr`. Both use the existing English project slug, matching Nuxt behavior.
- Root language detection respects Accept-Language quality values. An explicit language selection is remembered to allow English selection even in a Serbian browser.
- Dark mode defaults to the system setting and preserves the existing `nuxt-color-mode` storage key. Project grid/list view preserves `resourceView`.
- Projects still read the published Sanity dataset and render localized descriptions, cover images, gallery images, website/code links, and Portable Text content.

## Implementation

Next.js App Router and React replace Nuxt/Vue. A `proxy.ts` rewrite resolves unprefixed English routes to the internal English route segment. Pages render their content and SEO metadata on the server; interactive controls are React client components. CMS reads are cached for 60 seconds. Fonts are bundled locally.

The mobile menu and image gallery use native modal dialogs, with focus handling, Escape dismissal, background scroll locking, gallery arrow navigation, and zoom. Reduced-motion preferences are respected.

The contact endpoint remains `POST /api/sendEmail`. It validates submissions on the server, escapes email HTML, uses Reply-To, and returns appropriate 400/413/502/503 status codes. The form reports provider failures instead of showing false success. Mailgun values are never included in client code.

Sanity failures show a retry boundary; missing project slugs return localized 404 pages. Invalid/absent project images and external URLs are handled safely.

## Deployment

Vercel builds the repository root using `npm ci` and `npm run build`; `vercel.json` selects the Next.js framework. Node 24 is selected by `package.json` and `.nvmrc`.

Reuse existing `SANITY_PROJECT_ID`, `SANITY_DATASET`, `PROD_DOMAIN`, `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_SENDER`, and `MAILGUN_EMAIL_TO` variables. Sanity defaults match the existing Studio. All four Mailgun variables must be available in the Vercel Preview environment for real delivery; set `MAILGUN_API_URL=https://api.eu.mailgun.net` only if the account uses EU infrastructure.

The old Mailjet/SendGrid public runtime values are removed because the contact endpoint uses Mailgun. Browser requests use the same-origin API, so previews do not depend on `DEV_DOMAIN`.

## Verification

Run the commands in README. The browser suite uses the real published Sanity content and a local Mailgun mock for delivery success/failure checks. Real provider delivery still depends on valid Vercel environment variables and the Mailgun account.

## Review results — 2026-10-13

- Next.js 16.4.0 and React 19.3.0 were resolved from the registry's latest stable tags and pinned.
- Production build, ESLint, and TypeScript checks passed.
- 8 unit tests passed, including missing Mailgun configuration handling.
- 16 Chromium browser tests passed against the production build: English/Serbian copy, every published Sanity project, metadata, gallery loading/zoom/navigation, locale selection, theme persistence, mobile navigation, localized 404 status codes, input validation, Mailgun success/failure, and responsive layouts at 1440/390/320px.
- Real Sanity CDN images were fetched with verified TLS through Node in the managed proxy environment; image bytes were passed unchanged to Chromium. Mailgun delivery was mocked locally, so no real emails were sent.
- Byte comparisons confirmed unchanged data, translations, Studio files, logos, flags, and all relocated original images.
- Package-lock consistency and a dry-run of `npm ci` passed. No Nuxt dependencies remain in the frontend lockfile, and no email configuration variables appear in the browser bundles.
