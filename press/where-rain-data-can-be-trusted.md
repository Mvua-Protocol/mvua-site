---
title: "Two Datasets, 36 Places: Where Rainfall Insurance Can Be Trusted"
description: "Before Mvua Protocol pays anyone on rainfall data, the data has to hold up against a second, independent source. We checked 36 sites in 12 African countries. Here is what passed, what failed, and why Nigeria is not first."
date: 2026-11-24
readingTime: 6 min read
tags: [Stellar, Soroban, Insurance, Agriculture, Climate Data, Build in Public]
coverImage: /blog/mvua-protocol-cover.png
coverImageAlt: "Mvua Protocol cover: a farmer in a maize field under storm clouds and rain, holding a phone that shows a raindrop, a green check and the words Payout sent."
---

Rainfall insurance makes one promise: when the rain fails, you get paid. No assessor visits the farm. A number measured from the sky decides.

That promise is only as good as the number. If the rainfall data says a season was normal when the farmer's crop dried up, the farmer pays a premium for years and gets nothing in the one season that mattered. Insurers call this basis risk. For a product like Mvua Protocol, which pays automatically from data, it is the risk that matters most.

So before choosing where to pilot, we asked a blunt question: in which places can the rainfall data actually be trusted?

## One dataset is not enough

Mvua sets each region's payout rules from 34 years of daily rainfall history, 1991 to 2024, taken from ERA5. ERA5 is a weather reanalysis: a global model, run by the European weather centre, that reconstructs past weather everywhere on Earth. It is consistent, free and available for any point. It is also the same family of data our live publishers report every day, so the history and the live feed match.

But a model can be confidently wrong. If we calibrated on ERA5 alone, we would inherit every mistake it makes in a region and never know.

So every region gets a second opinion from CHIRPS, a dataset built from satellite images of clouds blended with real rain gauge readings, at about 5 km. Two very different methods. If they agree on a region's history, we trust it. If they disagree, we do not.

## The test

For each site we computed every growing season's rainfall from both datasets and asked two questions:

1. **Do they rise and fall together?** The correlation of the season totals, where 1.0 means perfect agreement. We want 0.7 or more.
2. **Do they agree on the droughts?** Of the 6 driest seasons in ERA5, how many are also among the 6 driest in CHIRPS? These are exactly the seasons the insurance would pay in, so this matters most. We want at least 4 of 6.

A site that passes both is confirmed. Only confirmed sites can become pilot regions.

## What we found

We tested 36 sites in 12 countries: Kenya, Tanzania, Uganda, Rwanda, Ethiopia, Zambia, Zimbabwe, Malawi, Mozambique, Nigeria, Ghana and Senegal.

**Four passed:**

| Region | Agreement | Driest 6 seasons shared |
| --- | --- | --- |
| Nakuru, Kenya | 0.81 | 4 of 6 |
| Dodoma, Tanzania | 0.71 | 4 of 6 |
| Choma, Zambia | 0.79 | 6 of 6 |
| Masvingo, Zimbabwe | 0.83 | 4 of 6 |

Choma was the standout: both datasets named exactly the same six worst seasons in 33 years.

Four more were close: Machakos and Kitui in Kenya, Lilongwe in Malawi and Singida in Tanzania. Close is not enough to put someone's harvest on it, so they stay on the list for a closer look.

The other 28 did not pass.

## Why West Africa failed

All 16 West African sites failed. That includes 14 places in Nigeria, from Lagos and Delta in the south, through Niger, Kaduna, Plateau and Benue in the middle belt, to Kano, Katsina and Sokoto in the north, plus Tamale in Ghana and Kaolack in Senegal. In some states the two datasets barely agreed on anything: Kaduna came out at minus 0.04, which means no relationship at all.

This is personal for us. Mvua is built in Lagos, and Nigeria was always going to be on the list. So we kept testing, state after state, to be sure it was not bad luck with one location. It was not.

The reason is how the rain falls. Most West African rain comes from short, violent storms that hit one village and miss the next. A global model like ERA5 works in grid squares about 25 km across, and it smooths those storms away. It knows it was a rainy season in Kano; it does not know which farms got the rain. East and Southern African rain comes more from large weather systems spread over wide areas, which the model sees well. That is why Zambia and Zimbabwe pass and Kaduna does not.

The same pattern showed up within East Africa: sites near mountains and Lake Victoria (Eldoret, Meru, Mbale) failed, because rain there is also too local for the model.

So the honest answer is not "these Nigerian states are wrong". It is "this kind of data cannot serve West Africa". Launching there anyway would mean selling farmers a policy that might pay in the wrong years. We would rather say not yet.

## Turning a pass into a policy

Passing the data test is only the first step. For each confirmed region we then:

- **Set the payout rules with one fixed rule** applied the same way everywhere, so nobody tunes a region to a desired answer. The policy pays in about the driest one season in six, never above 80% of normal rainfall, and only the worst season on record pays in full.
- **Replayed all 34 years through the real smart contracts**, not a spreadsheet copy of the formula, to see exactly what each season would have paid.
- **Checked the payout years against history.** Choma and Masvingo pay in Southern Africa's known drought seasons: 1991/92, 2001/02, 2015/16, 2018/19 and 2023/24, the El Nino season Zambia declared a national disaster. Nakuru pays in Kenya's 2000, 2009 and 2017 droughts; Dodoma in Tanzania's 2005/06 and 2016/17.
- **Priced it and stress tested the pool** over thousands of simulated futures, to find the premium and the capital that keep the pool solvent through bad streaks.

All four are now frozen on Stellar testnet. Each region's rules are written into the trigger engine contract, where they can never be changed, along with a fingerprint (a SHA-256 hash) of the exact data file they were calibrated from. Anyone can check that the rules on chain match the published history.

## What comes next for West Africa

The fix for West Africa is not a better state. It is better data. CHIRPS itself sees those storms far better, because it is built from satellite images of the actual clouds and corrected with real rain gauges. The path is an index calibrated on CHIRPS, or on local rain gauges, with publishers reporting from the same source every day. That is real work, and it is on our list. Nigeria is not off the map. It is waiting for the right data.

## Check our work

Everything in this post is public and reproducible: the rainfall files, the calibration rule, the backtest tool, and the results for every site.

- **Choosing pilot regions** (all 36 sites): [mvua-site.vercel.app/docs/methodology/pilot-regions](https://mvua-site.vercel.app/docs/methodology/pilot-regions)
- **Index methodology** (rules, history, pricing): [mvua-site.vercel.app/docs/methodology/index-methodology](https://mvua-site.vercel.app/docs/methodology/index-methodology)
- **The code and data:** [github.com/Mvua-Protocol](https://github.com/Mvua-Protocol)

Insurance that pays automatically has to be right before it is fast. Testing the data first is how we try to earn that.
