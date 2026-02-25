# Arhitectură — Better Sleep Diagnostic Flow™

## Componente principale

### 1. Flux Diagnostic (5 pași)

Utilizatorul parcurge secvențial 5 pași. Fiecare pas colectează date diferite:

```
Pas 1 (single-select) → Pas 2 (multi-select) → Pas 3 (multi-select) → Pas 4 (da/nu ×5) → Pas 5 (calcul automat)
     Tipar somn              Sabotori externi        Sabotori interni       Siguranță biologică       Rezultat
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
- Pas 2 → extern dominant dacă ≥3 selectate
- Pas 3 → intern dominant dacă ≥2 selectate + etichete cauzale
- Pas 4 → safety compromisă dacă scor ≥3/5 + Faza de Adaptare (Alertă/Compensare/Epuizare)
- Combinarea → ScenarioId (LIFESTYLE / MEDICAL / NEUROENDOCRINE / GRADUAL)

### 4. Sistem de Piloni

8 piloni de regenerare. Fiecare saboteur/întrebare de siguranță afectează 1-2 piloni.
Agregăm hits: 1-2 = COMPROMISED, 3+ = CRITICAL.

### 5. Generator Protocol

3 faze (Remove → Repair → Regulate) × max 5 acțiuni.
Acțiunile sunt selectate din pool-uri per pilon, prioritizate, deduplicate.

## Data Flow

```
[Input utilizator]
    │
    ├─ Pas 1: SleepArchetypeId ('A'-'H')
    ├─ Pas 2: ExternalSaboteurId[]
    ├─ Pas 3: InternalSaboteurId[]
    └─ Pas 4: Record<string, boolean> → safetyScore (0-5)
    │
    ▼
[DiagnosticState] ─── diagnosticState (writable store)
    │
    ▼
[calculateDiagnosticResult(state)]
    │
    ├─ resolveArchetype() → SleepArchetype
    ├─ deriveCausalLabels() → CausalLabel[]
    ├─ classifySaboteurDominance() → EXTERNAL/INTERNAL/BOTH/NONE
    ├─ deriveAdaptationPhase() → AdaptationPhase
    ├─ determineScenario() → Scenario
    ├─ calculateCompromisedPillars() → {pillar, status}[]
    └─ generateProtocol() → ProtocolPhase[3]
    │
    ▼
[DiagnosticResult] ─── result (derived store)
    │
    ▼
[Pagina Rezultat] — render secțiuni: arhetip, sabotori, piloni, protocol
```

## Entități principale

| Entitate | Cardinalitate | Descriere |
|----------|--------------|-----------|
| SleepArchetype | 8 (A-H) | Tipare de somn (1:1 cu pattern-urile) |
| CausalLabel | 8 | Etichete cauzale derivate din sabotori interni |
| ExternalSaboteur | 8 | Factori externi (lifestyle) |
| InternalSaboteur | 8 | Factori interni/biologici |
| SafetyQuestion | 5 | Evaluare siguranță biologică |
| AdaptationPhase | 3 | Alertă Inițială / Compensare Activă / Epuizare Adaptativă |
| Pillar | 8 | Piloni de regenerare |
| Scenario | 4 | Scenarii strategice |
| ProtocolPhase | 3 | Faze protocol (Remove/Repair/Regulate) |

## Servicii externe

- **Niciunul (MVP).** Totul rulează client-side, fără API, fără bază de date, fără analytics.
- **Planificat:** SQLite pentru persistență rezultate + feedback loop.

## Constrângeri

- **Client-side only** — fără SSR pentru date sensibile (totul rămâne în browser)
- **Max 5 acțiuni per fază de protocol** — pentru a nu copleși utilizatorul
- **Diagnostic liniar** — 5 pași ficși, fără branching condiționat (spre deosebire de somn)
- **Fără dependențe runtime externe** — zero JS libraries beyond Svelte/SvelteKit
