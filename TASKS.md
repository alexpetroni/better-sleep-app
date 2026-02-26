# Tasks — Better Sleep Diagnostic Flow™

## Today

- [x] Pas demografic (Step 6): tipuri, store, scoring, UI, narratives
- [x] Rescriere completă texte rezultat — ton cald, medic funcțional
- [x] Deduplicare acțiuni protocol — SHARED constants cross-pilon
- [x] Redesign pagini — landing, diagnostic, rezultat, componente
- [x] Paletă night-* schimbată din gri-albastru în indigo cald
- [x] Actualizare documentație proiect

## Next

- [ ] Testare manuală end-to-end (toate combinațiile, inclusiv demografice: M/F/UNSPEC × vârstă × menopauză)
- [ ] Testare narativ: 0 cauze / 1 cauză / 3+ cauze, EMOTIONAL dominance, toate arhetipurile × demografice
- [ ] Verificare StepIndicator pe mobil cu 6 dots
- [ ] Sleep Regeneration Score™ — placeholder vizual pe pagina rezultat
- [ ] CTA email capture pe pagina rezultat
- [ ] Polish responsive (testare mobilă completă, inclusiv step 6 cu 4 fieldsets)
- [ ] Accesibilitate: ARIA labels, focus management, keyboard nav pe rezultat steps

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

## Done (2026-02-26)

- [x] Implementat Step 6 — colectare profil demografic (sex, vârstă, menopauză condiționată, tipologie corporală)
- [x] Tipuri noi: `BiologicalSex`, `AgeRange`, `MenopauseStatus`, `BodyType`, `Demographics`
- [x] `DiagnosticStep` extins la 7; store actualizat cu `submitDemographics()`
- [x] `personalizeProtocol()` în scoring — HORMONAL_HARMONY adapt text, RESPIRATORY_STABILITY + greutate
- [x] Narratives demographics-aware: `getArchetypeMechanism()`, `getHormonalFragment()`, `buildCausesNarrative()` cu demographics
- [x] Rescriere completă texte rezultat — ton cald, medic funcțional, fără jargon neexplicat
- [x] Deduplicare acțiuni protocol — `SHARED` constants în protocols.ts (alcool, ecrane, mișcare, hidratare, omega-3)
- [x] Redesign complet: landing (night-900 + ambient glows), diagnostic (bg accent, .btn-primary), rezultat (dark hero headers, protocol cards)
- [x] Paletă night-* → indigo cald (de la gri-albastru rece)
- [x] `.btn-primary` în app.css @layer components
- [x] Componente restilizate: StepIndicator (progress bar), QuestionCard (accent line), OptionButton (radio indicator), CheckboxOption (full-row label), YesNoQuestion

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
