# Contributing

Thanks for your interest in Mvua Protocol. This repository holds the public
showcase and documentation site. It is a static site: plain HTML, one shared
stylesheet, and a small amount of vanilla JavaScript. There is no build step.

## Running the site locally

Open `index.html` in any browser. That is the whole workflow. If you prefer a
local server (useful for testing relative links exactly as they resolve in
production), run one of these from the repository root:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then visit `http://localhost:8080`.

## Project layout

```
mvua-site/
  index.html              home page
  architecture.html       architecture and index science
  roadmap.html            roadmap and status
  docs/                   documentation section
    index.html            docs landing
    overview.html         getting started and overview
    concepts.html         parametric insurance, architecture, lifecycle
    protocol.html         protocol reference
    faq.html              frequently asked questions
  assets/
    css/mvua.css          the entire design system
    js/mvua.js            theme toggle, mobile nav, docs navigation
    img/                  brand assets (logo mark, wordmark, lockup)
```

## Conventions

Commit messages follow Conventional Commits: `type(scope): imperative subject`,
at most 72 characters, no trailing period. Examples:

```
feat(docs): add oracle challenge window reference
fix(site): correct payout flow diagram labels
docs(readme): clarify local server instructions
```

Other standards this project follows:

- No em dashes anywhere in written content. Use commas, colons, or restructure.
- Work happens on a branch and lands through a pull request to `main`. No direct
  pushes to `main`.
- Keep the site dependency free. It should always open from `file://` without a
  build step.
- When you change colors or type, change the tokens in `assets/css/mvua.css`
  rather than hardcoding values in a page.

## Writing style

Write from the reader's point of view. Prefer plain words over jargon. A farmer
reading the home page should understand what the protocol does before they
understand how it works. Save the precise mechanism for the docs.
