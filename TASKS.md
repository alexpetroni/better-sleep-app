# Tasks — Better Sleep Diagnostic Flow™

## Today

- [x] Pagina rezultat: rescriere completă — 3-step progressive reveal cu text narativ
- [x] Creat `narratives.ts` — texte narative per arhetip, cauze, adaptare, scenariu, protocol
- [x] Adăugat tipuri `ArchetypeNarrative` + `CausalLabelFragment`
- [x] Builder functions: `buildCausesNarrative`, `buildPillarsNarrative`, `buildProtocolPhaseNarrative`

## Next

- [ ] Testare manuală end-to-end (toate combinațiile de pași, inclusiv Step 4 emoțional)
- [ ] Testare narativ: 0 cauze / 1 cauză / 3+ cauze, EMOTIONAL dominance, toate arhetipurile
- [ ] Back button pe pagina rezultat (step 2 → 1, step 3 → 2)
- [ ] Sleep Regeneration Score™ — placeholder vizual pe pagina rezultat
- [ ] CTA email capture pe pagina rezultat
- [ ] Polish responsive design (testare mobilă completă)
- [ ] Accesibilitate: ARIA labels, focus states, semantic HTML

## Backlog

- [ ] Backend SQLite pentru persistență rezultate
- [ ] Feedback loop: micro-tracking (oră culcare/trezire, energie, treziri nocturne)
- [ ] Reevaluare la 2-4 săptămâni cu comparație scoruri
- [ ] Sleep Regeneration Score™ funcțional (calcul din tracking data)
- [ ] Sistem de conturi / email capture cu livrare ghid personalizat
- [ ] Analytics anonimizate (ce arhetipuri, ce scenarii, ce protocoale)
- [ ] Variante de limbă (engleză)
- [ ] Export PDF al rezultatului
- [ ] Integrare cu dispozitive de somn (wearables)

## Done (2026-02-25 — sesiunea 2)

- [x] Pagina rezultat: rescriere 3-step reveal (tiparul → analiza → protocol)
- [x] Creat `src/lib/data/narratives.ts` cu texte narative + builder functions
- [x] Tipuri noi: `ArchetypeNarrative`, `CausalLabelFragment`
- [x] `buildCausesNarrative()` — adaptiv: 0/1/2+ cauze
- [x] `buildPillarsNarrative()` — grupează CRITICAL/COMPROMISED, `joinRomanian()`
- [x] `buildProtocolPhaseNarrative()` — intro + acțiuni cu conectori
- [x] `emotionalDominanceNarrative` — text dedicat dominanță emoțională
- [x] Tranziție animată între pașii rezultat + scroll to top

## Done (2026-02-25)

- [x] Adăugat `details?: string` pe SaboteurItem + populat 12 explicații Step 3
- [x] Rescris label-urile Step 4 (patient-voiced, nu diagnostic)
- [x] Eliminat callout paternalist din Step 4
- [x] Reordonat Step 2: ritm → obiceiuri seara → substanțe → dormitor
- [x] Adăugat causal labels: DEFICIENCY, INFLAMMATORY, EMOTIONAL
- [x] Extins protocol actions (nicotină, ventilație, psihoterapie)
- [x] Scoring: suport complet Step 4 emoțional (dominance, scenario, pillars)
- [x] Rezultat: card sabotori emoționali + notă psihoterapie

## Done (2026-02-23)

- [x] Scaffold proiect: copiere config-uri din somn, `npm install`, verificare `npm run dev`
- [x] Definire tipuri complete în `src/lib/types/index.ts`
- [x] Implementare date pași (steps.ts) cu toate opțiunile în română
- [x] Implementare date arhetipuri (archetypes.ts) — 8 arhetipuri 1:1 cu pattern-urile
- [x] Implementare date piloni (pillars.ts) — 8 piloni + faze + scenarii + etichete cauzale
- [x] Implementare date protocol (protocols.ts) — acțiuni per pilon per fază
- [x] Implementare motor scoring (scoring.ts) — calcul categoric complet
- [x] Implementare store diagnostic (diagnostic.ts) — state + acțiuni + derived stores
- [x] Copiere componente din somn (QuestionCard, OptionButton, CheckboxOption, ResultSection)
- [x] Creare componente noi (StepIndicator, YesNoQuestion, PillarCard, ProtocolPhase)
- [x] Implementare landing page
- [x] Implementare pagina diagnostic (5 pași cu animații)
- [x] Implementare pagina rezultat
- [x] Creare documentație proiect (CLAUDE.md, ARCHITECTURE.md, TASKS.md, DECISIONS.md)
