# Tasks — Better Sleep Diagnostic Flow™

## Today

- [ ] Testare manuală end-to-end (toate combinațiile de pași)
- [ ] Inițializare repo git + primul commit

## Next

- [ ] Texte arhetipuri extinse — recognition + mechanism per arhetip
- [ ] Îmbogățire protocols.ts — mai multe acțiuni per pilon, texte mai detaliate
- [ ] Card siguranță neurovegetativă pe pagina rezultat
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
