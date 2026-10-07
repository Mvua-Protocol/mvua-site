# Contributing

Thanks for your interest in Mvua Protocol. This repository holds the public
showcase and documentation site, a Next.js 15 App Router application with the
docs authored in MDX.

## Running the site locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`.

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

## Adding or editing documentation

Documentation lives in `content/docs/` as `.mdx` files. A file's path under
that directory becomes its URL: `content/docs/guide/how-mvua-works.mdx` is
served at `/docs/guide/how-mvua-works`.

Frontmatter is required:

```mdx
---
title: How Mvua works
description: A short summary shown in the hub and the sidebar.
section: Getting started
sectionOrder: 1
order: 1
---

Body content in Markdown.
```

`section` groups the page in the sidebar, `sectionOrder` orders the groups and
`order` orders pages within a group.

## Conventions

Commit messages follow Conventional Commits: `type(scope): imperative subject`,
at most 72 characters, no trailing period. Examples:

```
feat(docs): add oracle challenge window reference
fix(site): correct payout flow diagram labels
docs(readme): clarify local dev instructions
```

Other standards this project follows:

- No em dashes anywhere in written content. Use commas, colons, or restructure.
- No comma before the word "and". Write "a, b and c", never "a, b, and c". The
  same applies when "and" joins two clauses: drop the comma.
- Work happens on a branch and lands through a pull request to `main`. No direct
  pushes to `main`.
- Keep dependencies pinned exactly. Do not add a floating range; a version bump
  needs a decision record.
- When you change colors or type, change the tokens in `src/app/globals.css`
  rather than hardcoding values in a page.

## Writing style

Write from the reader's point of view. Prefer plain words over jargon. A farmer
reading the home page should understand what the protocol does before they
understand how it works. Save the precise mechanism for the docs.
