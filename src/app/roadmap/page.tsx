import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Reveal } from "@/components/ui/Reveal";
import { GITHUB_ORG_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The honest state of each phase of Mvua Protocol, from the contract core to a capped, graduated launch.",
  alternates: { canonical: "/roadmap" },
};

const phases = [
  {
    phase: "Phase 0: Foundation",
    status: "Done",
    tone: "done" as const,
    body: "The five repositories, the shared conventions, the decision record process and continuous integration across all of them. This is the scaffolding everything else sits on: trunk-based development, required review, secret scanning and a pinned toolchain, so no later phase has to stop and build its own discipline.",
  },
  {
    phase: "Phase 1: Contract core",
    status: "Released v0.2.0",
    tone: "done" as const,
    body: "The five Soroban contracts, their shared library and the tests that pin their maths. All 120 tests pass, with line coverage in the high nineties across the workspace. The index maths is fixed against golden vectors, the oracle median is gated on two independent publishers; an end-to-end season is exercised in a deterministic test host. Released as v0.2.0.",
  },
  {
    phase: "Phase 2: Deployment and operations",
    status: "In progress",
    tone: "active" as const,
    body: "The live testnet deploy and the off-chain publisher service that feeds it real weather. This phase proves the protocol against real wall-clock time and real data: the timelock, the challenge window, the median over live feeds and a complete season from deposit to claim. It is where the provisional parameters meet reality and get corrected.",
    items: [
      "Live testnet deploy of the five contracts, wired and seeded",
      "Publisher service submitting signed observations on a schedule",
      "A full season run: policy sold, index evaluated, payout claimed",
      "Parameter review against the run before anything is called final",
    ],
  },
  {
    phase: "Phase 3: User surfaces",
    status: "Planned",
    tone: "planned" as const,
    body: "The farmer-facing ways in. A web application for buying cover and reading a season, plus a low-bandwidth channel for the people least served by a smartphone browser. The design target throughout is a farmer who has never used a wallet: buying cover should feel like buying airtime.",
  },
  {
    phase: "Phase 4: Index and coverage expansion",
    status: "Planned",
    tone: "planned" as const,
    body: "More than two ways to describe a failed season and more regions. Rainfall shortfall and consecutive dry days are the starting definitions; heat, vegetation and other region-specific indices follow, each backtested before a pool can rely on it. Coverage widens only as the data behind it earns trust.",
  },
  {
    phase: "Phase 5: External audit",
    status: "Planned",
    tone: "planned" as const,
    body: "An independent security firm reviews the contracts, the index maths and the trust model; their findings are resolved in public. No amount of internal testing substitutes for an outside adversarial look at code that holds other people's money.",
  },
  {
    phase: "Phase 6: Full beta season",
    status: "Planned",
    tone: "planned" as const,
    body: "A complete season operated the way production would be, still on testnet, with real operational discipline: monitoring, runbooks, incident response and a real crop calendar. This is the rehearsal that has to go well before a single real shilling is at risk.",
  },
  {
    phase: "Phase 7: Capped, graduated launch",
    status: "Planned",
    tone: "planned" as const,
    body: "Mainnet, introduced with hard caps on pool size, per-policy coverage and per-season exposure. Caps rise only against written criteria met in the field, never on a date. Growth is earned one notch at a time, because the cost of being wrong is borne by the farmers the protocol exists to protect.",
  },
];

const toneStyles: Record<string, string> = {
  done: "bg-bg-sunken text-theme-primary shadow-neu-sunken-sm",
  active: "bg-bg-elevated text-theme-accent shadow-neu-raised-sm",
  planned: "bg-bg-sunken text-content-secondary shadow-neu-sunken-sm",
};

export default function RoadmapPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-8 lg:px-8">
        <Reveal as="p" className="font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          Roadmap
        </Reveal>
        <Reveal as="h1" delayMs={80} className="mt-3 max-w-4xl font-display text-4xl font-extrabold leading-tight tracking-tight text-content-primary sm:text-5xl">
          Where Mvua is now
        </Reveal>
        <Reveal as="p" delayMs={160} className="mt-6 max-w-3xl text-lg leading-relaxed text-content-secondary">
          Mvua is built in phases; each phase is gated on the one before it. The
          contract core is written, tested and released. A live testnet season is the
          work in front of us today. Mainnet sits behind an external audit and a full beta
          season on purpose: an insurance product that pays the wrong amount is worse than
          one that does not exist yet.
        </Reveal>

        <Reveal delayMs={220} className="mt-10 rounded-3xl bg-bg-elevated p-8 shadow-neu-raised">
          <span className="inline-flex items-center gap-2 rounded-full bg-bg-sunken px-4 py-1.5 text-sm font-semibold text-theme-accent shadow-neu-sunken-sm">
            <span className="h-2 w-2 rounded-full bg-theme-accent" aria-hidden="true" />
            In progress
          </span>
          <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-content-primary">
            Testnet season in flight
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-content-secondary">
            The five contracts are deployed to Stellar testnet and a real season is
            running against wall-clock time, which is the only way to exercise the
            publisher timelock and the challenge window honestly. Findings from this run
            feed the next release.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal as="h2" className="font-display text-2xl font-bold tracking-tight text-content-primary sm:text-3xl">
          The phases
        </Reveal>
        <Reveal as="p" delayMs={80} className="mt-4 max-w-3xl text-lg leading-relaxed text-content-secondary">
          Six phases carry the project from the first line of code to a capped, graduated
          launch. The list below is the honest state of each, not an aspiration.
        </Reveal>

        <ol className="mt-10 space-y-4">
          {phases.map((p, i) => (
            <Reveal
              key={p.phase}
              delayMs={i * 50}
              as="li"
              className="rounded-3xl bg-bg-elevated p-7 shadow-neu-raised"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-content-primary">
                  {p.phase}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${toneStyles[p.tone]}`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-content-secondary">{p.body}</p>
              {p.items && (
                <ul className="mt-5 space-y-2">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-content-secondary"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-theme-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-8">
        <Reveal className="rounded-3xl bg-bg-sunken p-8 shadow-neu-sunken-sm sm:p-10">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-content-primary">
            What the roadmap is and is not
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-content-secondary">
            <p>
              Every phase above is an execution contract with acceptance criteria, not a
              slide. A phase closes when its criteria are met and its tests are green, not
              when a date arrives.
            </p>
            <p>
              That is why there are no target dates on this page. A date would imply the
              work is predictable to the week; the honest position is that security
              work is not. The order is fixed; the calendar is not.
            </p>
            <p>
              Two things are deliberately absent from this page: anything about how the
              project is funded, plus any claim of traction it has not earned. The roadmap
              is about engineering and governance; it stays there. If you want to
              judge the project, read the code, run the tests and read the decision
              records that explain why each choice was made.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={100} className="mt-6 rounded-3xl bg-bg-elevated p-8 shadow-neu-raised">
          <h2 className="font-display text-xl font-bold text-content-primary">
            The one rule that outranks the roadmap
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-content-secondary">
            Mainnet is never rushed to hit a milestone. If that ever seems to conflict with
            a schedule, the schedule loses. The protocol exists to protect smallholder
            farmers; a defect that pays the wrong amount harms exactly the people it is
            meant to help.
          </p>
        </Reveal>

        <Reveal delayMs={150} className="mt-8">
          <a
            href={GITHUB_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View the org on GitHub <ArrowRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
      </section>
    </SiteShell>
  );
}
