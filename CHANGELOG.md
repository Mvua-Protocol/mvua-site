# Changelog

All notable changes to the Mvua Protocol site are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Rebuilt the site as a Next.js 15 App Router application. The previous version
  was a build-free static site; the marketing pages and the docs are now React
  and MDX and the project runs with `npm run dev` on port 3000.
- Documentation is now authored in MDX under `content/docs/`, rendered through a
  catch-all route with a sidebar and an on-page table of contents.
- Design system ported from the shared stylesheet into CSS variables and
  Tailwind tokens, preserving the Mvua palette and the signature footer.

### Added

- Home page with hero, problem framing, how parametric insurance works, the five
  contract architecture overview, a trust section and a project status strip.
- Architecture and index science page: contract responsibilities, purchase and
  payout flows, trust model, oracle median and challenge window, the rainfall
  shortfall and consecutive dry day index definitions, the severity curve with a
  worked example and the golden test vectors.
- Roadmap and status page: public safe phase framing, current development
  status and the mainnet behind audit posture.
- Documentation section: how Mvua works, the protocol reference and the FAQ.
- Shared layout components: navbar, theme toggle and the signature footer with
  the neumorphic card and the giant masked wordmark.
- Site constants for branding, navigation and repository links.

### Removed

- The previous static HTML pages and asset bundle (`index.html`,
  `architecture.html`, `roadmap.html`, `docs/`, `assets/`).
