import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CloudRain,
  Droplets,
  FileCheck2,
  Layers,
  Radio,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Reveal } from "@/components/ui/Reveal";
import {
  GITHUB_APP_URL,
  GITHUB_CONTRACT_URL,
  GITHUB_PUBLISHER_URL,
  SITE_NAME,
} from "@/constants/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Parametric climate insurance on Stellar`,
  description:
    "Parametric climate insurance on Stellar. Farmers get paid automatically when on chain weather data says the season failed.",
  alternates: { canonical: "/" },
};

const stats = [
  { value: "5", label: "Soroban contracts, each with one job" },
  { value: "USDC", label: "Premiums and payouts on Stellar" },
  { value: "2", label: "Independent index definitions" },
  { value: "24h", label: "Challenge window on published data" },
];

const problems = [
  {
    title: "Premiums exclude the poor",
    body: "Assessing each small field individually costs more than the field is worth to insure. The economics never close.",
  },
  {
    title: "Adjusters cannot get there",
    body: "Rural roads, dispersed plots, no records. Verification is slow, expensive and easy to dispute.",
  },
  {
    title: "Payouts arrive too late",
    body: "Months of delay turns relief into history. The money lands after the next season has already been decided.",
  },
];

const steps = [
  {
    icon: Droplets,
    title: "Buy cover",
    body: "A farmer picks a region and a season and pays a premium in USDC into a risk pool. The policy records the rainfall index, the payout trigger and the payout amount before the season begins.",
  },
  {
    icon: CloudRain,
    title: "Watch the season",
    body: "For the length of the season, the oracle adapter collects signed rainfall readings from independent publishers. Anyone can read the same numbers; there is nothing to dispute about the weather.",
  },
  {
    icon: Waves,
    title: "Get paid automatically",
    body: "At the end of the season the trigger engine reads the index. If it crossed the trigger, the payout vault releases funds to every affected policy. No claim, no adjuster, no wait.",
  },
];

const contracts = [
  { name: "risk-pool", role: "Holds the capital", icon: Layers },
  { name: "policy", role: "Records the terms", icon: FileCheck2 },
  { name: "oracle-adapter", role: "Brings in the weather", icon: Radio },
  { name: "trigger-engine", role: "Decides the season", icon: CloudRain },
  { name: "payout-vault", role: "Releases the money", icon: ShieldCheck },
];

const pillars = [
  {
    title: "Funds are never held by the app",
    body: "The interface reads state and submits transactions. Capital lives in the on chain pool and vault, under the rules the contracts enforce.",
  },
  {
    title: "Terms are fixed before the season",
    body: "The trigger and payout are written at purchase. Nobody can move the goalposts after the weather is known.",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-8 lg:px-8">
        <Reveal as="p" className="mb-5 font-display text-sm font-bold uppercase tracking-[0.3em] text-theme-primary">
          Mvua Protocol
        </Reveal>
        <Reveal as="h1" delayMs={80} className="max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-content-primary sm:text-6xl lg:text-7xl">
          Parametric climate insurance for the people who feed us.
        </Reveal>
        <Reveal as="p" delayMs={160} className="mt-7 max-w-2xl text-lg leading-relaxed text-content-secondary sm:text-xl">
          When the weather data says the season failed, the payout is already on its
          way.
        </Reveal>
        <Reveal delayMs={240} className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/docs/guide/how-mvua-works" className="btn btn-primary">
            How it works <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/docs" className="btn btn-secondary">
            Browse the docs
          </Link>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delayMs={i * 80}
              className="rounded-2xl bg-bg-elevated px-5 py-6 shadow-neu-raised"
            >
              <div className="grad-text font-display text-3xl font-extrabold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm leading-snug text-content-secondary">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="p" className="font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          The problem
        </Reveal>
        <Reveal as="h2" delayMs={80} className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl">
          A failed season does not wait for paperwork.
        </Reveal>
        <Reveal as="p" delayMs={160} className="mt-6 max-w-3xl text-lg leading-relaxed text-content-secondary">
          When rain does not come, a smallholder farmer can lose a whole year of income
          in a few weeks. Traditional crop insurance was never built for them: premiums
          are out of reach, adjusters must reach fields that may be hours from a road
          and a claim can take months to settle. By the time a payout arrives, the
          planting window is gone.
        </Reveal>
        <Reveal as="p" delayMs={200} className="mt-5 max-w-3xl text-lg leading-relaxed text-content-secondary">
          Index insurance removes the whole apparatus. Instead of inspecting a field
          after the fact, it pays on a number that anyone can check: the rainfall record
          for that place and that season. The farmer and the fund both know the rule
          before the season starts.
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {problems.map((item, i) => (
            <Reveal
              key={item.title}
              delayMs={i * 100}
              className="rounded-3xl bg-bg-elevated p-6 shadow-neu-raised"
            >
              <h3 className="font-display text-lg font-bold text-content-primary">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What Mvua is */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="p" className="font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          What Mvua is
        </Reveal>
        <Reveal as="h2" delayMs={80} className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl">
          Micro insurance that settles itself
        </Reveal>
        <Reveal as="p" delayMs={160} className="mt-6 max-w-3xl text-lg leading-relaxed text-content-secondary">
          A farmer buys a small policy in USDC at the start of a season. The protocol
          watches an on chain rainfall index for that region. If the season fails by the
          rule written into the policy, the payout vault releases automatically, with no
          claim to file and no one to convince.
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delayMs={i * 100}
              className="flex flex-col rounded-3xl bg-bg-elevated p-6 shadow-neu-raised"
            >
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-bg-sunken text-theme-primary shadow-neu-sunken-sm">
                <step.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-bold text-content-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Architecture preview */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="p" className="font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          Architecture
        </Reveal>
        <Reveal as="h2" delayMs={80} className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl">
          Five contracts, one job each
        </Reveal>
        <Reveal as="p" delayMs={160} className="mt-6 max-w-3xl text-lg leading-relaxed text-content-secondary">
          The on chain core is split so that a failure in one part cannot quietly corrupt
          another. Funds, policy terms, data intake, the index decision and payout are
          separate.
        </Reveal>
        <div className="mt-12 space-y-3">
          {contracts.map((c, i) => (
            <Reveal
              key={c.name}
              delayMs={i * 60}
              className="flex items-center gap-5 rounded-2xl bg-bg-elevated px-6 py-5 shadow-neu-raised"
            >
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-bg-sunken text-theme-primary shadow-neu-sunken-sm">
                <c.icon size={20} aria-hidden="true" />
              </span>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <code className="font-mono text-sm font-semibold text-theme-accent">
                  {c.name}
                </code>
                <span className="text-content-secondary">{c.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={120} className="mt-8 flex flex-wrap gap-4">
          <Link href="/architecture" className="btn btn-secondary">
            Read the full architecture <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* Why it holds */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="p" className="font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          Why it holds
        </Reveal>
        <Reveal as="h2" delayMs={80} className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl">
          Rules you can read, not promises you have to trust
        </Reveal>
        <Reveal as="p" delayMs={160} className="mt-6 max-w-3xl text-lg leading-relaxed text-content-secondary">
          Every decision the protocol makes is a function of public inputs: the signed
          rainfall readings, the index definition and the policy terms. The same inputs
          produce the same outcome for everyone.
        </Reveal>
        <Reveal as="p" delayMs={200} className="mt-5 max-w-3xl text-lg leading-relaxed text-content-secondary">
          The oracle is deliberately boring. Readings come from more than one publisher,
          the adapter takes the median rather than any single submission; a challenge
          window gives honest parties time to object before a bad reading settles.
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal
              key={p.title}
              delayMs={i * 100}
              className="rounded-3xl bg-bg-sunken p-6 shadow-neu-sunken-sm"
            >
              <h3 className="font-display text-lg font-bold text-content-primary">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={120} className="mt-8">
          <Link href="/docs/reference/protocol" className="btn btn-secondary">
            Read the trust model
          </Link>
        </Reveal>
      </section>

      {/* Status */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal className="rounded-3xl bg-bg-elevated p-8 shadow-neu-raised sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-bg-sunken px-4 py-1.5 text-sm font-semibold text-theme-primary shadow-neu-sunken-sm">
            <span className="h-2 w-2 rounded-full bg-theme-accent" aria-hidden="true" />
            Pre alpha, live on Stellar testnet
          </span>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl">
            The on chain core is under active development and running a first testnet
            season.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-content-secondary">
            Mainnet is gated behind an external audit and a full beta season operated
            like production.
          </p>
          <Link href="/roadmap" className="btn btn-primary mt-8">
            See the roadmap <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* Code */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="p" className="font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          Where the code lives
        </Reveal>
        <Reveal as="h2" delayMs={80} className="mt-3 font-display text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl">
          Split on purpose
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Reveal className="flex flex-col rounded-3xl bg-bg-elevated p-7 shadow-neu-raised">
            <code className="font-mono text-sm font-semibold text-theme-accent">
              mvua-contract
            </code>
            <h3 className="mt-3 font-display text-xl font-bold text-content-primary">
              The on chain core
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary">
              Risk pools, policies, the oracle adapter, the trigger engine and the
              payout vault. Rust, on Soroban. This is where funds are held and payouts
              are decided.
            </p>
            <a
              href={GITHUB_CONTRACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-theme-primary hover:underline"
            >
              github.com/Mvua-Protocol/mvua-contract
            </a>
          </Reveal>
          <Reveal delayMs={100} className="flex flex-col rounded-3xl bg-bg-elevated p-7 shadow-neu-raised">
            <code className="font-mono text-sm font-semibold text-theme-accent">
              mvua-app
            </code>
            <h3 className="mt-3 font-display text-xl font-bold text-content-primary">
              The interface
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary">
              Pool dashboards, policy purchase and a payout explorer. Built with
              Next.js. It reads state and submits transactions and never holds funds.
            </p>
            <a
              href={GITHUB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-theme-primary hover:underline"
            >
              github.com/Mvua-Protocol/mvua-app
            </a>
          </Reveal>
          <Reveal delayMs={200} className="flex flex-col rounded-3xl bg-bg-elevated p-7 shadow-neu-raised">
            <code className="font-mono text-sm font-semibold text-theme-accent">
              mvua-publisher
            </code>
            <h3 className="mt-3 font-display text-xl font-bold text-content-primary">
              The oracle feed
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary">
              Turns public rainfall archives into signed observations the oracle
              verifies on chain. One independent publisher in the quorum, built with
              Node and TypeScript. It holds no funds. Its signing keys never leave the
              operator.
            </p>
            <a
              href={GITHUB_PUBLISHER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-theme-primary hover:underline"
            >
              github.com/Mvua-Protocol/mvua-publisher
            </a>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
