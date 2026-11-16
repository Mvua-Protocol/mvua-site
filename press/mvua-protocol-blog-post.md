---
title: "Insurance That Pays When the Rain Doesn't: What I'm Building With Mvua Protocol"
description: "Parametric weather insurance for smallholder farmers on Stellar: how it works, the first season that settled on testnet, and what 34 years of rainfall taught us about pricing."
date: 2026-11-10
readingTime: 6 min read
tags: [Stellar, Soroban, Insurance, Agriculture, Build in Public]
coverImage: /blog/mvua-protocol-cover.png
coverImageAlt: "Mvua Protocol cover: a farmer in a straw hat stands in a maize field under storm clouds and rain, holding a phone that shows a raindrop, a green check and the words Payout sent, beside the title Insurance That Pays When the Rain Doesn't and the steps Signed rainfall, On-chain index, Automatic payout."
---

![Mvua Protocol cover: a farmer in a straw hat stands in a maize field under storm clouds and rain, holding a phone that shows a raindrop, a green check and the words Payout sent, beside the title Insurance That Pays When the Rain Doesn't and the steps Signed rainfall, On-chain index, Automatic payout.](../public/press/mvua-protocol-cover.png)

A farmer plants maize when the rains start. For the next three months everything depends on the sky. If the rain stops halfway through the season, the crop fails, and the money spent on seed and fertiliser is gone with it.

Insurance is supposed to cover exactly this. In practice almost no smallholder farmer has it. Traditional crop insurance sends an assessor to inspect the farm, argue about the damage and agree on a number. For a farm of one or two hectares, that visit can cost more than the policy is worth. So the policy never gets sold, and the farmer carries the whole risk alone.

Mvua Protocol is my attempt at a different answer. "Mvua" is Swahili for rain.

## Pay on the weather, not on the damage

The idea is called parametric insurance. Instead of inspecting the farm, the policy pays out when a measured index crosses a threshold agreed in advance. For example: if rainfall over the growing season falls below 75% of normal, the policy starts paying, and it pays in full if rainfall falls to 40% of normal. Nobody visits the farm. Nobody argues. The weather decides, and the payout follows automatically.

The hard parts are trust and cost. Who measures the rain? Who holds the money? How does a farmer without a bank account actually receive a payout? That is where Stellar comes in.

## How it works

Mvua is built as five smart contracts on Stellar's Soroban platform, each with one job:

- **The risk pool** holds the capital. Investors deposit into it, farmers' premiums flow into it, and it refuses any withdrawal that would leave it unable to pay the claims it has promised.
- **The policy contract** issues the cover. A farmer, or a cooperative buying for all its members at once, pays a premium and receives a policy for one season.
- **The oracle adapter** brings in the weather. Independent publishers fetch daily rainfall, sign it with their own keys and submit it. The contract checks every signature and takes the median, so no single publisher can move the number alone.
- **The trigger engine** decides the season. It applies the index formula to the recorded rainfall, exactly the same way every time, and waits through a 24 hour challenge window before the result is locked.
- **The payout vault** pays the farmer. Payouts land in a claim balance that anyone can push to the farmer's address, so the farmer needs no tokens and no signature to receive the money.

Alongside the contracts there is a publisher service that fetches rainfall from two independent weather sources, refuses to submit if they disagree, and signs what it sends. If a source is down or the data looks wrong, it submits nothing. A missing observation is safe. A wrong one is not.

## The first season that actually paid

Code that only runs in tests proves very little, so we ran a full season on Stellar testnet, against real wall clock time.

An investor funded the pool with 40 test tokens. A farmer bought one token of cover for a premium of 0.011 tokens. Two publishers submitted signed rainfall that added up to 65% of the expected amount for the window: a drought. The trigger engine evaluated it, waited out the challenge window, and locked the severity at 28.57%. The vault paid out 0.2857 tokens and the farmer claimed it. Every number matched the result our test suite predicted before the season started, and every step is a public transaction anyone can check on the [deployment page](https://mvua-site.vercel.app/docs/reference/deployment).

The live run also did what live runs are for: it found a bug the tests could not. One of our contracts described a field using a type alias the Stellar command line tool could not resolve, so creating the index failed outright. In unit tests it was invisible. We fixed it, redeployed just the affected contracts without touching the pool's money, and added a check to CI so that class of bug fails the build instead of a live season.

Some things in Mvua are deliberately slow. Adding a new publisher waits seven days, so a stolen key can be caught before it can submit anything. Finalizing a payout waits 24 hours, so a bad reading can be challenged. Those waits are features. Insurance that pays the wrong amount is worse than insurance that pays a day later.

## What 34 years of rainfall told us

Before anyone puts real money into a pool, you want to know how often it would have paid in the past. So we pulled 34 years of daily rainfall, 1991 to 2024, for four candidate regions: Nakuru in Kenya, Kano in Nigeria, and Dodoma and Mbeya in Tanzania. Then we replayed every season through the real trigger engine contract, not a copy of its formula, so the results come from the exact code that runs on chain.

The results were humbling, which is the point of doing it:

- In Kano, the June to September rains are steady. The default index would have paid in only one season out of 34, in 2021.
- In Nakuru, the long rains vary wildly. The same index would have paid in 12 seasons out of 34, including the well known droughts of 2000, 2009, 2011 and 2017.
- Our provisional premium, 1.1% of the cover, is too low everywhere. In Kano a sustainable premium is around 1.6%. In Nakuru, the default index would need a premium so high no farmer could afford it.

That last finding matters most. It tells us that one index cannot fit every region: Nakuru needs its own design, not just a higher price. Better to learn that from history than from a pool that runs dry.

We also tested satellite measures of how green the crops are. In three of the four regions greenness tracked rainfall, and the worst droughts showed up clearly; around Kano it barely did, likely because irrigation keeps fields green whatever the rain does. It is too slow and too sensitive to how you sample it to trigger payouts today, but it is a useful check: the seasons where rain and greenness disagree are exactly the ones where a rainfall index might pay the wrong farmer.

## Why Stellar

Insurance for small farms only works if the cost of each transaction is tiny, the money is stable, and it can reach people who do not hold crypto. Stellar has low fees, stable assets like USDC, and a network of anchors that connect to local currencies and mobile money. Soroban lets us put the rules where everyone can read them: the pool's reserves, every reading, every trigger and every payout are on chain and checkable.

## The honest limits

Mvua is pre alpha and testnet only. The contracts have not been audited, and nothing goes to mainnet until they are and a full beta season has run like production. Parametric insurance also has a real weakness called basis risk: the index can say a farm failed when it did fine, or the other way round. We cannot remove that, only measure it and shrink it, which is why the methodology and the backtests are public.

## What comes next

The next step is the index methodology: calibrating each region from the backtests and setting a premium that keeps the pool solvent. After that comes the app, where investors fund pools and farmers and cooperatives buy cover. We also want a simple phone menu for farmers without smartphones, in the languages they actually speak.

All of it is open source. If you build on Stellar, care about climate risk, or just want to see how it works, the code and the docs are public:

- Website: [mvua-site.vercel.app](https://mvua-site.vercel.app/)
- How it works: [the guide](https://mvua-site.vercel.app/docs/guide/how-mvua-works)
- Code: [github.com/Mvua-Protocol](https://github.com/Mvua-Protocol)

The rain will keep doing what it does. The goal is that when it fails, the farmer doesn't fail with it.
