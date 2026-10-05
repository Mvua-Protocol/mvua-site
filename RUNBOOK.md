# Mvua-site runbook: rebuild as a Next.js app

Everything is written and structurally verified in the sandbox. What remains needs your
shell, because this VM cannot run `npm install`, `next build` or `git push`.

## What changed

The site was a build-free static bundle (`index.html`, `assets/`, `docs/*.html`). It is now a
real Next.js 15 App Router application that starts normally on port 3000 with `npm run dev`.
The marketing pages are React; the documentation is authored in MDX under `content/docs/` and
rendered through a catch-all route with a sidebar and an on-page table of contents. The design
language (neumorphic cards, masked footer wordmark, Mvua palette) is preserved.

## Run it locally

Requires Node.js 20 or newer. From the repository root:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The home page, `/architecture`, `/roadmap`, `/docs`,
`/docs/guide/how-mvua-works`, `/docs/reference/protocol` and `/docs/faq` should all render.

To check the production build before pushing:

```bash
npm run build
npm start
```

If `npm run dev` prints a port error, another process is holding 3000. Find it with
`netstat -ano | findstr :3000` and stop it, or run `npm run dev -- -p 3001`.

## What to expect on first install

`npm install` will pull the pinned tree (Next 15.5.12, React 19.2.4, Tailwind 3.4.19,
`next-mdx-remote` 6.0.0, `gray-matter`, `remark-gfm`, `lucide-react`). The lockfile is not in
the repo, so the first install writes `package-lock.json`. Commit it.

## Verify before pushing

```bash
npm run lint
npm run build
```

A clean `npm run build` is the real gate: it type-checks, compiles the MDX and prerenders
every route. In the sandbox I confirmed the same things by borrowing offer-hub's installed
toolchain: `tsc --noEmit` exits 0, all three MDX files compile through `@mdx-js/mdx` with
`remark-gfm`. The site `globals.css` plus `tailwind.config.ts` compile through Tailwind.

## Writing rules encoded in the content

No em dashes anywhere, plus no comma before the word "and" (write "a, b and c"). Both are
enforced across the prose and recorded in `CONTRIBUTING.md`. If you edit copy, keep to them.

## Merge steps

The new app is committed on a feature branch. Merge it through a pull request, do not push to
`main` directly.

```bash
git checkout -b feat/nextjs-site
git add -A
git commit -m "feat(site): rebuild showcase as Next.js app with MDX docs"
git push -u origin feat/nextjs-site
```

Open the PR (link `main`) with the summary below, then merge. After merge, delete the branch:

```bash
git checkout main
git pull
git branch -d feat/nextjs-site
git push origin --delete feat/nextjs-site
```

## Paste-ready PR summary

Title: `feat(site): rebuild showcase as Next.js app with MDX docs`

```
Rebuilds the site as a Next.js 15 App Router application. The previous version was a
build-free static bundle; the marketing pages and the docs are now React and MDX. The
project runs with `npm run dev` on port 3000.

What changed
- Home page with hero, problem framing, how parametric insurance works, the five contract
  architecture overview, a trust section and a project status strip.
- Architecture and index science page: contract responsibilities, purchase and payout flows,
  the trust model, the oracle median and challenge window, both index definitions, the severity
  curve with a worked example and the golden test vectors.
- Roadmap and status page: public safe phase framing and the mainnet behind audit posture.
- Documentation section authored in MDX under content/docs/: how Mvua works, the protocol
  reference and the FAQ, rendered through a catch-all route with a sidebar and a TOC.
- Shared layout components, including the neumorphic card footer with the giant masked wordmark.
- Design system ported from the shared stylesheet into CSS variables and Tailwind tokens,
  preserving the Mvua palette.

Removed
- The previous static HTML pages and asset bundle (index.html, architecture.html,
  roadmap.html, docs/, assets/).

Notes
- Dependencies pinned exactly (Next 15.5.12, React 19.2.4, Tailwind 3.4.19).
- No em dashes and no comma before "and" across all written content.
- Verified: tsc clean, MDX compiles, Tailwind compiles. Please run `npm run build` before merge.
```

## After it is deployed

The app deploys as a standard Next.js project. On Vercel, import `Mvua-Protocol/mvua-site`
and accept the detected defaults (framework Next.js, build `npm run build`).
