# KERB presentation reset

## Audit
- Page-scoped CSS repeats dark bordered rounded panels and hard-coded green.
- Spacing tokens do not match their names; headings compete with primary numbers.
- Showroom hero is displaced by navigation; price, specifications, opinion and tools share a treatment.
- Shared showroom contains hard-coded Nexon facts, unsupported match percentages and generic rival dimensions.
- Mobile has competing fixed bars; filters omit desktop options; some selection controls lack keyboard semantics.
- Existing [city] catch-all treats specification routes as city pricing.
- Existing working-tree changes are retained; no data-model or calculation API replacement.

## Implementation sequence
1. Correct global tokens and add reusable editorial, metric, table, selection and finance primitives.
2. Simplify navigation/footer chrome and establish consistent sticky offsets.
3. Rebuild showroom presentation over existing aggregate and finance functions; preserve complete datasets, variant/city/add-on/calculator interactions. Explicitly identify estimates and absent data.
4. Apply discovery, comparison and launch-page visual grammars, with shared vehicle previews.
5. Preserve SSR/metadata/JSON-LD and distinguish crawlable dossier topic routes from city routes.
6. Inspect rendered desktop/tablet/mobile screenshots at all seven requested sizes. Exercise interactions and route/SEO checks; run lint, typecheck and production build.

## Visual system
Photography leads; flat sections separated by rules. Financial green, technical blue, safety coral, efficiency amber, EV cyan, hybrid violet. Editorial uses warm white. Rounded panels reserved for dialogs. Tables use aligned tabular numerals. Selected controls include a check or text state in addition to color.
