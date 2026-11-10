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
- Testnet deployment reference page (`/docs/reference/deployment`): the live
  Stellar testnet contract addresses and the finalize, payout and claim
  transactions of the first settled season, linked to Stellar Expert. The home
  page status strip and the roadmap milestone now report the settled season and
  link to it.
- The deployment page lists the redeployed `oracle-adapter` (2026-11-09, the
  replay fix) and notes that the first season ran on the previous oracle.

### Changed

- Site brought up to date with Phase 2. The protocol reference describes the
  oracle as it now works (each publisher's latest reading, accepted once, one
  value per publisher in the median) instead of the replaced observation ring,
  and its parameters table lists the publisher limit per region in place of
  the ring size. The protocol reference, the architecture page and the FAQ say
  that a first calibration from 34 years of rainfall in four candidate regions
  has been run. The FAQ reports the settled testnet season, and the roadmap's
  Phase 2 card lists what is done and what comes next.

### Removed

- The previous static HTML pages and asset bundle (`index.html`,
  `architecture.html`, `roadmap.html`, `docs/`, `assets/`).
