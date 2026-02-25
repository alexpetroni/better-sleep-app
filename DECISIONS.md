# Decizii — Better Sleep Diagnostic Flow™

## [2026-02-23] Spin-off din proiectul somn, nu continuare
Proiectul `better-sleep-app` este un proiect nou, nu o extensie a `somn`. Modelul de date este fundamental diferit (scoring categoric vs aditiv, flux liniar vs adaptiv). Reutilizăm config-urile și unele componente UI, dar codul de business logic este complet nou.

## [2026-02-23] Tech stack identic cu somn
SvelteKit + Svelte 5 + Tailwind CSS 4 (via Vite plugin) + TypeScript strict. Funcționează bine, echipa îl cunoaște. Nu e nevoie de schimbare.

## [2026-02-23] Flux diagnostic liniar în 5 pași (nu adaptiv)
Spre deosebire de somn (care ramifică pe 4 branch-uri și ajustează întrebările), noul flux este fix: 5 pași identici pentru toți utilizatorii. Simplifică masiv implementarea, testarea și înțelegerea. Personalizarea vine din combinarea rezultatelor, nu din întrebări diferite.

## [2026-02-23] Scoring categoric, nu aditiv
Somn acumulează puncte per arhetip la fiecare răspuns. Noul sistem clasifică discret: pattern→arhetip, sabotori≥N→dominant, safety≥3→compromisă. Rezultatul e combinatoric, nu un clasament de scoruri. Mai simplu, mai transparent, mai ușor de explicat utilizatorului.

## [2026-02-23] 8 piloni ca axă centrală de evaluare
Pilonii (Circadian Coherence, Neurovegetative Safety, etc.) sunt unitatea de legătură: fiecare saboteur afectează 1-2 piloni, pilonii compromiși determină acțiunile de protocol. Asta face sistemul modular — poți adăuga noi sabotori sau acțiuni fără a restructura tot.

## [2026-02-23] Protocol în 3 faze cu max 5 acțiuni per fază
Remove Saboteurs → Repair Terrain → Regulate Axis. Maxim 5 acțiuni per fază pentru a nu copleși. Acțiunile sunt selectate dinamic din pool-uri per pilon, nu pre-scrise per arhetip.

## [2026-02-23] Client-side only pentru MVP
Zero backend, zero persistență, zero API calls. Totul rulează în browser. SQLite planificat pentru faze ulterioare (persistență + feedback loop).

## [2026-02-23] 8 arhetipuri (nu 12), mapate 1:1 cu pattern-urile din Pas 1
Documentul original propunea 12 arhetipuri, dar amesteca simptome cu cauze (3AM Surger = simptom, Blood Sugar Waker = cauză a aceluiași simptom). Am simplificat: 8 arhetipuri = 8 tipare vizibile de somn. Cauzele profunde (hormonal, metabolic, histamină, respirator) devin etichete cauzale derivate din sabotorii interni, nu arhetipuri separate. Elimină suprapunerile și logica de rafinare complicată.

## [2026-02-23] Faza de Adaptare derivată din safety score (înlocuiește Selye)
În somn, fazele Selye (Alarmă/Rezistență/Epuizare) erau determinate de o întrebare separată (Q5) și multiplicau conținutul ×3 (fiecare arhetip avea 3 variante text). În noul sistem, Pasul 4 (Siguranță Biologică) deja măsoară aceeași progresie. Am derivat "Faza de Adaptare" direct din safety score: 0-1 = Alertă Inițială, 2-3 = Compensare Activă, 4-5 = Epuizare Adaptativă. Zero întrebări suplimentare, păstrează narativul, reduce conținut necesar.

## [2026-02-23] 8 sabotori interni (revizuiți vs. documentul original)
Documentul propunea 7 sabotori interni. Probleme: "tensiune constantă" se suprapune cu Pas 4 (siguranță biologică), "perimenopauză" excludea alte dezechilibre hormonale, lipseau nocturie și RLS (prezente în somn ca F-NOCT și F-RLS). Revizuit: eliminat tensiune → Pas 4, lărgit perimenopauză → dezechilibru hormonal, adăugat nocturie + RLS, reformulat reflux separat de digestie. Total: 8 sabotori interni, toți biologici, fără suprapunere cu pașii 2 sau 4.

## [2026-02-23] Conținut exclusiv în română
Publicul țintă e românesc. Toate textele UI, descrierile, acțiunile de protocol — în română cu diacritice corecte. Variabilele și comentariile din cod rămân în engleză.

## [2026-02-23] Componente reutilizate din somn fără modificări
QuestionCard, OptionButton, CheckboxOption, ResultSection — copiate verbatim. Folosesc aceeași temă, același pattern Svelte 5. Nu le modificăm decât dacă e strict necesar.

## [2026-02-23] MVP diagnostic complet — flux funcțional end-to-end
Toate cele 12 task-uri inițiale implementate într-o singură sesiune: tipuri, date (arhetipuri, pași, piloni, protocoale), motor scoring categoric, store Svelte, 8 componente (4 din somn + 4 noi), 3 pagini (landing, diagnostic, rezultat). Build verificat fără erori. Rămân de făcut: testare manuală, texte extinse, polish UI, și funcționalități Next (safety card, SRS placeholder, email CTA).

## [2026-02-25] Întrebări emoționale rescrise ca stări trăite, nu diagnostice
Label-urile din Step 4 erau formulate clinic ("Am anxietate persistentă", "Am trecut prin experiențe dificile nerezolvate"). Le-am rescris din perspectiva pacientului: "Simt un nod în stomac care nu trece", "Am trecut printr-un divorț sau o pierdere care încă mă afectează". Am eliminat și callout-ul explicativ ("Nu e vina ta... răspunde cu blândețe") — utilizatorul nu trebuie tratat condescendent.

## [2026-02-25] Info tooltips (ⓘ) pe factorii interni (Step 3)
Simptomele din Step 3 pot fi neclare — utilizatorul nu înțelege de ce contează un simptom pentru somn. Am adăugat `details` pe SaboteurItem și un buton ⓘ inline care expandează o explicație scurtă (1-2 propoziții, ton de medic funcțional). Implementat direct în +page.svelte, fără a modifica CheckboxOption (componentă din somn).

## [2026-02-25] Factorii externi reordonați pe grupuri tematice
Întrebările din Step 2 erau în ordine arbitrară — condițiile din dormitor apăreau în locuri diferite, la fel substanțele. Reordonate în 4 grupuri: ritm/program (3), obiceiuri seara (5), substanțe (5), dormitor (6).

## [2026-02-25] Pagina rezultat: de la raport medical la narativ progresiv în 3 pași
Pagina de rezultat afișa totul simultan — arhetip, sabotori, cauze, piloni, protocol — folosind componente card (ResultSection, PillarCard, ProtocolPhase). Arăta ca un raport medical, nu ca o conversație. Am rescris-o complet: 3 pași progresivi navigați cu buton "Continuă", text narativ cald (ton de medic funcțional, persoana a II-a), fără carduri sau grile. Componentele vechi (ResultSection, PillarCard, ProtocolPhase) rămân în codebase dar nu mai sunt folosite pe pagina de rezultat. Noul strat de date (`narratives.ts`) conține constante narative per entitate și funcții builder care construiesc textul adaptiv (ex: `buildCausesNarrative` produce text diferit pentru 0, 1 sau 2+ cauze). Tranziție animată identică cu pagina de diagnostic.
