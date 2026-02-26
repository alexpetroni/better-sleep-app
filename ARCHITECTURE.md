# Arhitectură — Better Sleep Diagnostic Flow™

## Componente principale

### 1. Flux Diagnostic (7 pași)

Utilizatorul parcurge secvențial 7 pași. Primii 6 sunt interactivi, al 7-lea e calcul automat:

```
Pas 1 (single-select) → Pas 2 (multi-select) → Pas 3 (multi-select) → Pas 4 (multi-select) → Pas 5 (da/nu ×5) → Pas 6 (single-select ×4) → Pas 7 (calcul automat)
     Tipar somn              Sabotori externi        Sabotori interni       Sabotori emoționali       Siguranță biologică       Profil demografic            Rezultat
```

### 2. Model de arhetipuri (8, mapate 1:1 cu pattern-urile)

| ID | Arhetip | Pattern |
|----|---------|---------|
| A | Comutare Lentă | Adorm greu (>30 min) |
| B | Trezire Nocturnă | Mă trezesc între 2–4 AM |
| C | Trezire Timpurie | Mă trezesc prea devreme |
| D | Somn Ușor | Mă trezesc frecvent / ușor |
| E | Somn Neodihnitor | Dorm dar mă trezesc obosit |
| F | Nocturn | Nu mi-e somn până târziu |
| G | Trezire Autonomă | Palpitații / foame |
| H | Somn Fragmentat | Fragmentare constantă |

Cauzele mai profunde (hormonal, metabolic, histamină, respirator, etc.) NU sunt arhetipuri separate — sunt **etichete cauzale** derivate din sabotorii interni (Pas 3) și afișate pe pagina de rezultat.

### 3. Motor de Scoring

Scoring **categoric** (nu aditiv). Fiecare pas produce o clasificare discretă:
- Pas 1 → SleepArchetypeId (mapare directă 1:1, fără rafinare)
- Pas 2 → extern dominant dacă ≥3/19 selectate
- Pas 3 → intern dominant dacă ≥2/12 selectate + etichete cauzale
- Pas 4 → emoțional dominant dacă ≥2/4 selectate + etichetă cauzală EMOTIONAL
- Pas 5 → safety compromisă dacă scor ≥3/5 + Faza de Adaptare (Alertă/Compensare/Epuizare)
- Combinarea → ≥2 categorii dominante = MIXED → ScenarioId (LIFESTYLE / MEDICAL / NEUROENDOCRINE / GRADUAL)

### 4. Sistem de Piloni

8 piloni de regenerare. Fiecare saboteur/întrebare de siguranță afectează 1-2 piloni.
Agregăm hits: 1-2 = COMPROMISED, 3+ = CRITICAL.

### 5. Generator Protocol

3 faze (Remove → Repair → Regulate) × max 5 acțiuni.
Acțiunile sunt selectate din pool-uri per pilon, prioritizate, deduplicate.

### 6. Strat Narativ (Pagina Rezultat)

Pagina de rezultat prezintă informația progresiv, în 3 pași, cu text narativ cald (ton de medic funcțional):
- **Pas 1 — Tiparul tău de somn**: arhetip, recognition, mecanism biologic, cauze
- **Pas 2 — Analiza ta**: faza de adaptare, scenariu, notă emoțională (opțional), piloni
- **Pas 3 — Protocolul personalizat**: 3 sub-secțiuni narative cu acțiunile integrate

Textele sunt în `narratives.ts`: constante narative per entitate + funcții builder (`buildCausesNarrative`, `buildPillarsNarrative`, `buildProtocolPhaseNarrative`) care adaptează narativul la combinația concretă a utilizatorului.

## Data Flow

```
[Input utilizator]
    │
    ├─ Pas 1: SleepArchetypeId ('A'-'H')
    ├─ Pas 2: ExternalSaboteurId[]
    ├─ Pas 3: InternalSaboteurId[]
    ├─ Pas 4: EmotionalSaboteurId[]
    ├─ Pas 5: Record<string, boolean> → safetyScore (0-5)
    └─ Pas 6: Demographics { sex, ageRange, menopauseStatus, bodyType }
    │
    ▼
[DiagnosticState] ─── diagnosticState (writable store)
    │
    ▼
[calculateDiagnosticResult(state)]
    │
    ├─ resolveArchetype() → SleepArchetype
    ├─ deriveCausalLabels() → CausalLabel[]
    ├─ classifySaboteurDominance() → EXTERNAL/INTERNAL/EMOTIONAL/MIXED/NONE
    ├─ deriveAdaptationPhase() → AdaptationPhase
    ├─ determineScenario() → Scenario
    ├─ calculateCompromisedPillars() → {pillar, status}[]
    ├─ generateProtocol() → ProtocolPhase[3]
    └─ personalizeProtocol(phases, demographics, saboteurs) → ProtocolPhase[3]
    │
    ▼
[DiagnosticResult] ─── result (derived store)
    │
    ▼
[Strat Narativ] ─── narratives.ts (builder functions, demographics-aware)
    │
    ▼
[Pagina Rezultat] — 3-step progressive reveal cu text narativ
```

## Entități principale

| Entitate | Cardinalitate | Descriere |
|----------|--------------|-----------|
| SleepArchetype | 8 (A-H) | Tipare de somn (1:1 cu pattern-urile) |
| CausalLabel | 11 | Etichete cauzale derivate din sabotori interni + emoționali |
| ExternalSaboteur | 19 | Factori externi (lifestyle) |
| InternalSaboteur | 12 | Factori interni/biologici |
| EmotionalSaboteur | 4 | Factori emoționali |
| SafetyQuestion | 5 | Evaluare siguranță biologică |
| Demographics | 1 per user | Sex, vârstă, menopauză (condiționat), tipologie corporală |
| AdaptationPhase | 3 | Alertă Inițială / Compensare Activă / Epuizare Adaptativă |
| Pillar | 8 | Piloni de regenerare |
| Scenario | 4 | Scenarii strategice |
| ProtocolPhase | 3 | Faze protocol (Remove/Repair/Regulate) |
| ArchetypeNarrative | 8 | Texte recognition + mechanism per arhetip |
| CausalLabelFragment | 11 | Fraze inline integrale în narativ per etichetă cauzală |

## Servicii externe

- **Niciunul (MVP).** Totul rulează client-side, fără API, fără bază de date, fără analytics.
- **Planificat:** SQLite pentru persistență rezultate + feedback loop.

## Constrângeri

- **Client-side only** — fără SSR pentru date sensibile (totul rămâne în browser)
- **Max 5 acțiuni per fază de protocol** — pentru a nu copleși utilizatorul
- **Diagnostic liniar** — 7 pași ficși, fără branching condiționat (excepție: menopauză vizibilă doar pentru F ≥46 ani)
- **SaboteurItem.details** — explicații expandabile ⓘ (Step 3 momentan, extensibil)
- **SHARED action texts** — acțiuni protocol identice cross-pilon pentru deduplicare (în protocols.ts)
- **Personalizare demografică** — textele de pe pagina rezultat se adaptează la sex/menopauză/tipologie; fluxul diagnostic rămâne generic
- **Fără dependențe runtime externe** — zero JS libraries beyond Svelte/SvelteKit
