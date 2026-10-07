import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How Mvua is built: five Soroban contracts, the purchase and payout flows, the trust model and the index science.",
  alternates: { canonical: "/architecture" },
};

const contracts = [
  {
    tag: "Capital",
    name: "risk-pool",
    body: "Holds premiums and liquidity provider capital in USDC, split across a junior tranche that takes first loss and a senior tranche that is protected. It moves a season through Open, Active, Closed and Settled, collects premiums against a capped protocol fee and applies an asymmetric settlement waterfall. Solvency is an enforced invariant, checked on chain, not a promise. Everything financial starts here.",
  },
  {
    tag: "Terms",
    name: "policy",
    body: "Mints a non fungible certificate for each purchase, carrying the coverage amount, region, coverage window and severity curve. A policy moves forward through a fixed state machine: Active to Triggered to Paid on a claim, Active to Expired after the window, or Active to Cancelled before it opens. The contract holds no value itself: premiums flow into the risk pool and refunds flow back out. Off chain metadata is kept as an opaque pointer, so no personally identifying information is ever stored on chain.",
  },
  {
    tag: "Data",
    name: "oracle-adapter",
    body: "The protocol's trust boundary for external weather data. Independent publishers submit signed observations; the adapter verifies each ed25519 signature directly, so a weather station never needs an on chain account. It returns only a median over fresh, unchallenged observations from at least two distinct publishers; anything less is reported as stale. The trigger engine consumes only this trusted median, never a raw single submission.",
  },
  {
    tag: "Decision",
    name: "trigger-engine",
    body: "Evaluates index definitions deterministically. All math is integer only, because Soroban has no floating point; every division states its rounding direction. The contract reads the median series and an immutable index definition and produces a severity in basis points. The rule is fixed before the season starts, so the same inputs always produce the same outcome.",
  },
  {
    tag: "Settlement",
    name: "payout-vault",
    body: "Releases payouts as resumable batches into Stellar claimable balances, so a farmer never needs XLM to receive money. It holds no funds of its own and makes no decisions: it pays exactly what the trigger engine reports, in a batch small enough to stay within the network's instruction limits, resumable if a batch is larger than one transaction.",
  },
];

const purchaseFlow = [
  {
    n: "01",
    title: "Deposit into the pool",
    body: "A liquidity provider funds a regional risk pool. The junior tranche takes first loss and earns more; the senior tranche is protected and earns less.",
  },
  {
    n: "02",
    title: "Quote",
    body: "A buyer or a cooperative requests a quote for a region, window and coverage amount. The price comes from the pool's premium curve.",
  },
  {
    n: "03",
    title: "Mint",
    body: "The purchase re-quotes, checks the price against the buyer's maximum, collects the premium into the risk pool and mints an Active certificate.",
  },
  {
    n: "04",
    title: "Batch purchase",
    body: "A cooperative funds a bounded list of policies in one atomic call, each owned by its own farmer, split across calls if the group is large.",
  },
];

const payoutFlow = [
  {
    n: "01",
    title: "Observe",
    body: "Through the season, publishers submit signed daily rainfall readings for the region, straight to the oracle adapter.",
  },
  {
    n: "02",
    title: "Aggregate and challenge",
    body: "The adapter builds a median series. Guardians have a challenge window to exclude a bad reading before it is trusted.",
  },
  {
    n: "03",
    title: "Evaluate",
    body: "At window end the trigger engine reads the median series against the policy's index definition and computes a severity in basis points.",
  },
  {
    n: "04",
    title: "Pay",
    body: "If the index qualifies, the payout vault releases each policy's payout into a claimable balance. No claim is filed and no adjuster is involved.",
  },
];

const trust = [
  {
    title: "The app holds no funds",
    body: "The web interface reads state and submits signed transactions. Capital lives in the on chain pool and vault, under the rules the contracts enforce. A compromised app can annoy users; it cannot move their money.",
  },
  {
    title: "No single reading decides",
    body: "The median requires at least two distinct publishers. One bad or dishonest publisher cannot move the index; a forged signature fails verification outright.",
  },
  {
    title: "Terms are fixed, then immutable",
    body: "An index definition cannot change once policies reference it. Changing the maths means a new index id behind a timelock, so a sold policy keeps the terms it was sold under.",
  },
  {
    title: "Fresh or nothing",
    body: "A day whose data is older than the staleness bound, or backed by fewer than the minimum publishers, is reported as stale. A stale index blocks a trigger; it never fires one.",
  },
  {
    title: "A window to object",
    body: "After a reading is submitted, guardians can challenge it and exclude it from the median. This gives honest parties time to catch and remove a bad reading before it settles.",
  },
  {
    title: "A window to cancel",
    body: "Adding a publisher's key sits behind a timelock, so if a key is compromised there is a cancellation window before it can publish. Removing a key deactivates it, so past observations keep a resolvable author.",
  },
];

const vectors = [
  ["G1", "Rainfall shortfall", "baseline 800, actual 800", "ratio 10,000, not triggered"],
  ["G2", "Rainfall shortfall", "baseline 800, actual 600", "ratio 7,500, not triggered (boundary)"],
  ["G3", "Rainfall shortfall", "baseline 800, actual 520", "ratio 6,500, triggered, severity 2,857 bps"],
  ["G4", "Rainfall shortfall", "baseline 800, actual 320", "ratio 4,000, triggered, severity 10,000 bps"],
  ["G5", "Consecutive dry days", "longest run 20", "not triggered"],
  ["G6", "Consecutive dry days", "longest run 21", "triggered, severity 0 bps (boundary)"],
  ["G7", "Consecutive dry days", "longest run 28", "triggered, severity 5,000 bps"],
  ["G8", "Consecutive dry days", "longest run 35", "triggered, severity 10,000 bps"],
];

export default function ArchitecturePage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-8 lg:px-8">
        <Reveal as="p" className="font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          Architecture
        </Reveal>
        <Reveal as="h1" delayMs={80} className="mt-3 max-w-4xl font-display text-4xl font-extrabold leading-tight tracking-tight text-content-primary sm:text-5xl">
          How Mvua is built
        </Reveal>
        <Reveal as="p" delayMs={160} className="mt-6 max-w-3xl text-lg leading-relaxed text-content-secondary">
          Mvua is five Soroban contracts on Stellar plus a thin web layer. Funds, policy
          terms, data intake, the index decision and payout are separate concerns with
          separate contracts, so a defect in one cannot silently corrupt another.
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="h2" className="font-display text-2xl font-bold tracking-tight text-content-primary sm:text-3xl">
          The five contracts
        </Reveal>
        <div className="mt-8 space-y-4">
          {contracts.map((c, i) => (
            <Reveal
              key={c.name}
              delayMs={i * 60}
              className="rounded-3xl bg-bg-elevated p-7 shadow-neu-raised"
            >
              <p className="font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
                {c.tag}
              </p>
              <code className="mt-3 block font-mono text-lg font-semibold text-theme-accent">
                {c.name}
              </code>
              <p className="mt-4 text-base leading-relaxed text-content-secondary">
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="h2" className="font-display text-2xl font-bold tracking-tight text-content-primary sm:text-3xl">
          Two flows: buying cover and getting paid
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {[
            { title: "Purchase flow", steps: purchaseFlow },
            { title: "Payout flow", steps: payoutFlow },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-display text-lg font-bold text-content-primary">
                {col.title}
              </h3>
              <ol className="space-y-3">
                {col.steps.map((s, i) => (
                  <Reveal
                    key={s.n}
                    delayMs={i * 60}
                    as="li"
                    className="flex gap-4 rounded-2xl bg-bg-elevated p-5 shadow-neu-raised"
                  >
                    <span className="font-mono text-sm font-semibold text-theme-primary">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-content-primary">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                        {s.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="h2" className="font-display text-2xl font-bold tracking-tight text-content-primary sm:text-3xl">
          The trust model
        </Reveal>
        <Reveal as="p" delayMs={80} className="mt-4 max-w-3xl text-lg leading-relaxed text-content-secondary">
          The protocol is designed so that every money decision is a function of public
          inputs: the signed rainfall readings, the index definition and the policy
          terms. This section names exactly where trust is required and how it is
          bounded.
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {trust.map((t, i) => (
            <Reveal
              key={t.title}
              delayMs={i * 60}
              className="rounded-3xl bg-bg-elevated p-6 shadow-neu-raised"
            >
              <h3 className="font-display text-base font-bold text-content-primary">
                {t.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                {t.body}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 rounded-3xl bg-bg-sunken p-7 shadow-neu-sunken-sm">
          <h3 className="font-display text-base font-bold text-content-primary">
            What remains trusted
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            Two things are still trusted and named openly. First, the guardians, who hold
            the ability to challenge readings, pause and propose publishers; the design
            limits what they can do; it gives the community a cancellation window, but it
            does not pretend the role is empty. Second, the data sources themselves. Mvua
            reads rainfall from public feeds and from the publisher service; the median
            and challenge window reduce reliance on any one source, but they cannot make
            a wrong world record right.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="h2" className="font-display text-2xl font-bold tracking-tight text-content-primary sm:text-3xl">
          Index science
        </Reveal>
        <Reveal as="p" delayMs={80} className="mt-4 max-w-3xl text-lg leading-relaxed text-content-secondary">
          The index is the contract. Mvua starts with two definitions, both integer only
          and both fixed before the season. A trigger is not all or nothing: a severity
          curve scales the payout from zero at the trigger point to full at the
          exhaustion point, which softens the edge where a season barely fails and
          reduces basis risk.
        </Reveal>

        <Reveal className="mt-10 rounded-3xl bg-bg-elevated p-7 shadow-neu-raised">
          <h3 className="font-display text-lg font-bold text-content-primary">
            Index 1: rainfall shortfall
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            Fires when cumulative rainfall over the coverage window falls far enough below
            the historical baseline for that window.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-content-primary">
                  <th className="border-b border-theme-border py-3 pr-4 font-semibold">Parameter</th>
                  <th className="border-b border-theme-border py-3 pr-4 font-semibold">Meaning</th>
                  <th className="border-b border-theme-border py-3 font-semibold">Provisional value</th>
                </tr>
              </thead>
              <tbody className="text-content-secondary">
                <tr>
                  <td className="border-b border-theme-border/60 py-3 pr-4 font-mono text-xs">baseline</td>
                  <td className="border-b border-theme-border/60 py-3 pr-4">Historical seasonal rainfall for this region and window</td>
                  <td className="border-b border-theme-border/60 py-3">fixed per region and window</td>
                </tr>
                <tr>
                  <td className="border-b border-theme-border/60 py-3 pr-4 font-mono text-xs">trigger_ratio</td>
                  <td className="border-b border-theme-border/60 py-3 pr-4">Fires when actual is below this share of baseline</td>
                  <td className="border-b border-theme-border/60 py-3">7,500 bps (75 percent)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">exhaustion_ratio</td>
                  <td className="py-3 pr-4">Full payout at or below this share of baseline</td>
                  <td className="py-3">4,000 bps (40 percent)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout callout-warn mt-5">
            <span className="callout-title">Provisional values</span>
            <div className="text-sm leading-relaxed text-content-secondary">
              Every value marked provisional is a placeholder. The parameters are set
              from historical backtests before any real pool uses them. They are shown
              here so the mechanism is readable, not so they can be relied on as final.
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-5 rounded-3xl bg-bg-elevated p-7 shadow-neu-raised">
          <h3 className="font-display text-lg font-bold text-content-primary">
            Index 2: consecutive dry days
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            Fires when the longest run of consecutive dry days within the window reaches a
            threshold. A day counts as dry when its median rainfall is at or below a small
            floor, provisionally 1.0 mm. The trigger is a run of 21 days; full payout is
            reached at 35 days.
          </p>
        </Reveal>

        <Reveal className="mt-5 rounded-3xl bg-bg-elevated p-7 shadow-neu-raised">
          <h3 className="font-display text-lg font-bold text-content-primary">
            How severity becomes a payout
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            Once triggered, severity scales linearly from zero to full. The per policy
            payout is the coverage multiplied by the severity fraction, rounded down to
            favor the pool. The curve is monotonic: a worse index never yields a smaller
            payout and severity is clamped, so a payout can never exceed the coverage a
            policy bought.
          </p>
          <div className="callout callout-note mt-5">
            <span className="callout-title">Worked example</span>
            <div className="text-sm leading-relaxed text-content-secondary">
              Baseline seasonal rainfall 800 mm. Actual rainfall over the window 520 mm.
              The realized ratio is 520 / 800 = 6,500 bps, which is below the 7,500 bps
              trigger, so the index fires. Severity = (7,500 - 6,500) x 10,000 / (7,500 -
              4,000) = 2,857 bps, rounding down. On a 100 USDC policy that is a payout of
              28 USDC. At 400 mm the ratio is 4,000 bps, severity reaches 10,000 bps and
              the policy pays in full.
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-5 rounded-3xl bg-bg-elevated p-7 shadow-neu-raised">
          <h3 className="font-display text-lg font-bold text-content-primary">
            Golden test vectors
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            These fixed cases pin the maths. They are the source of truth for the trigger
            engine's unit tests, so the on chain behaviour can never drift from the
            specification without a failing test.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-content-primary">
                  <th className="border-b border-theme-border py-3 pr-4 font-semibold">Case</th>
                  <th className="border-b border-theme-border py-3 pr-4 font-semibold">Index</th>
                  <th className="border-b border-theme-border py-3 pr-4 font-semibold">Inputs</th>
                  <th className="border-b border-theme-border py-3 font-semibold">Expected</th>
                </tr>
              </thead>
              <tbody className="text-content-secondary">
                {vectors.map(([c, idx, inp, exp]) => (
                  <tr key={c}>
                    <td className="border-b border-theme-border/60 py-3 pr-4 font-mono text-xs text-theme-primary">{c}</td>
                    <td className="border-b border-theme-border/60 py-3 pr-4">{idx}</td>
                    <td className="border-b border-theme-border/60 py-3 pr-4 font-mono text-xs">{inp}</td>
                    <td className="border-b border-theme-border/60 py-3">{exp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-content-secondary">
            G2 is the boundary: the trigger test is strict, so exactly 75 percent does not
            fire. G6 is the other edge, a triggered index at zero severity, which is
            intentional and documents the lower end of the curve.
          </p>
        </Reveal>

        <Reveal className="mt-5 rounded-3xl bg-bg-sunken p-7 shadow-neu-sunken-sm">
          <h3 className="font-display text-lg font-bold text-content-primary">
            Basis risk, stated honestly
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            An index can disagree with any single farm's real outcome. Rain may fall on a
            neighbouring field and miss yours. Mvua's mitigation is regional granularity,
            index design that is documented openly and a severity curve rather than a
            cliff. This is a real limitation of parametric insurance, not a defect specific
            to Mvua; it is the main reason the index parameters are backtested before
            any pool relies on them.
          </p>
        </Reveal>

        <Reveal delayMs={80} className="mt-8">
          <Link href="/docs" className="btn btn-primary">
            Read the full documentation <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </SiteShell>
  );
}
