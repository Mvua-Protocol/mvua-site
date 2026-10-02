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

A static site. Plain HTML, one shared stylesheet, and a small amount of vanilla
JavaScript for the theme toggle, the mobile menu, and docs navigation. There is
no framework and no build step, so it opens straight from disk and deploys as
pure static files.

Pages:

- `index.html`: home. What Mvua is, the problem it solves, how parametric
  insurance works, and the five contract architecture at a glance.
- `architecture.html`: the five contracts, the purchase and payout flows, the
  trust model, the oracle, and the index science with a worked example.
- `roadmap.html`: where the project is and what comes next.
- `docs/`: the full documentation, with its own sidebar.

## Run it locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy

Because the site is static, any static host works. Point the host at the
repository root.

- **Vercel**: import the repository. Framework preset: Other. Build command:
  none. Output directory: `.`
- **Netlify**: import the repository. Build command: none. Publish directory: `.`
- **GitHub Pages**: in repository settings, set the source to the branch root.

## Design

The site is built on a small token system in `assets/css/mvua.css`: sand paper,
navy ink, and the rain blue drop gradient as the signature accent, with
terracotta used sparingly. Light and dark themes are both first class. If you
change a color or a typeface, change the token, not the page.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE).
