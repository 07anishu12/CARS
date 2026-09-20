# KERB visual redesign

## Audit and implementation plan
The current site combines hardcoded colours, inflated spacing tokens, scoped style blocks, inline styles and repetitive rounded panels. The showroom presents unbacked percentages and hardcoded model-specific facts across different vehicles. Navigation has an oversized trust strip and conflicting sticky offsets. Mobile filters duplicate only part of the desktop controls. Comparison has no anchored attribute column.

1. Establish exact spacing, restrained radii, type scale, semantic accents and shared editorial/data primitives. Keep existing business calculation functions and database interfaces.
2. Simplify global navigation and footer. Use a single predictable navigation height and accessible native dialogs.
3. Rebuild the showroom presentation around dominant photography, key metrics, sticky chapter navigation, receipts, decision tables, visible specifications, safety, efficiency, financial tools and editorial reporting. Derive facts from the existing database and label estimates; never synthesize reviews or scores.
4. Apply the system to discovery, comparison, new cars and home. Reuse vehicle presentation; keep filtering, selection and calculator behaviour.
5. Preserve metadata, schemas and city routes; make named research routes explicitly crawlable.
6. Inspect screenshots at 1440×900, 1280×800, 1024×768, 768×1024, 390×844, 375×812 and 320×740. Exercise controls and route tests, lint, typecheck and production build.

## Design rules
Background #080C0F; surfaces #0E1418 / #131A1F / #182127. Green identifies finance and verified status; blue technical information, orange safety, amber efficiency/editorial, cyan electric, violet hybrid. Text labels accompany all status colours. Editorial chapters use whitespace and rules, not enclosing cards. Important numeric values precede labels. Tables remain server-rendered; only secondary data uses disclosure.

## Known source limits
The supplied database contains illustrative media and existing unverified editorial/data entries. No new automotive claims will be added. Missing colour photography, test results, city-specific delivery times and future launch data must be identified as unavailable. Estimated ownership costs must expose assumptions and separate acquisition cost from running cost.
