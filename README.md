# Mvua Protocol site

The public showcase and documentation site for [Mvua Protocol](https://github.com/Mvua-Protocol),
parametric climate insurance on Stellar.

Mvua ("rain" in Swahili) pays smallholder farmers automatically when on chain
weather data shows the season failed. No claims adjusters, no paperwork: a
failed season becomes a payout in minutes, not months.

This repository is the marketing and docs surface. It is separate from the
product repositories:

- **[mvua-contract](https://github.com/Mvua-Protocol/mvua-contract)**: the on
  chain core, where funds are held and payouts are decided.
- **[mvua-app](https://github.com/Mvua-Protocol/mvua-app)**: the user interface.
  It reads state and submits transactions; it never holds funds.

## What is in here

A Next.js 15 App Router application. The marketing pages are React server
components; the documentation is authored in MDX and rendered through a
catch-all route with a sidebar and a table of contents.

Pages:

- `/`: home. What Mvua is, the problem it solves, how parametric insurance
  works and the five contract architecture at a glance.
- `/architecture`: the five contracts, the purchase and payout flows, the
  trust model, the oracle and the index science with a worked example.
- `/roadmap`: where the project is and what comes next.
- `/docs`: the documentation hub.
- `/docs/guide/how-mvua-works`: concepts, the lifecycle of a policy.
- `/docs/reference/protocol`: the protocol reference.
- `/docs/faq`: frequently asked questions.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`.

To build and serve a production bundle:

```bash
npm run build
npm start
```

## Project layout

```
mvua-site/
  content/docs/            MDX documentation
    guide/how-mvua-works.mdx
    reference/protocol.mdx
    faq.mdx
  src/
    app/                   App Router routes
      page.tsx             home
      architecture/page.tsx
      roadmap/page.tsx
      docs/
        page.tsx           docs hub
        [...slug]/page.tsx catch-all MDX route
      layout.tsx           root layout, fonts, theme bootstrap
      globals.css          design tokens and component classes
    components/
      layout/              Navbar, Footer, SiteShell
      docs/                DocsLayoutShell, DocsSidebar, TableOfContents, mdx-components
      providers/           ThemeProvider
      ui/                  ThemeToggle, Reveal
    constants/             site, nav, storage constants
    lib/                   cn, mdx, slug helpers
  public/                  brand assets
```

## Writing docs

Add an `.mdx` file under `content/docs/`. Frontmatter drives the sidebar:

```mdx
---
title: How Mvua works
description: A short summary shown in the hub and the sidebar.
section: Getting started
sectionOrder: 1
order: 1
---

Body content in Markdown. Custom components: `<Callout type="note|warn|clay" title="...">`.
```

Headings at the `##` and `###` levels are collected into the on-page table of
contents automatically.

## Deploy

The app deploys as a standard Next.js project. On Vercel, import the repository
and accept the detected defaults (framework: Next.js, build: `npm run build`).

## Design

The design system lives in `src/app/globals.css` as CSS variables and component
classes: sand paper, navy ink and the rain blue drop gradient as the signature
accent, with terracotta used sparingly. Tailwind reads these tokens through
`tailwind.config.ts`. Light and dark themes are both first class. If you change
a color or a typeface, change the token, not the page.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE).
