# Better Sleep Diagnostic Flow™

## Despre proiect

Aplicație web de diagnostic al somnului în 7 pași, care identifică tiparul de somn al utilizatorului, sabotorii externi, interni și emoționali, evaluează siguranța biologică, colectează un profil demografic și generează un protocol personalizat în 3 faze.

Spin-off al proiectului `somn` (~/work/somn) — trece de la arhetipuri emoționale la un model clinic structurat.

Mesajul central: *"Nu ai insomnie. Ai un deficit de siguranță biologică."*

## Tech stack

- **Framework:** SvelteKit + Svelte 5
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`, nu PostCSS)
- **Limbaj:** TypeScript strict
- **Backend:** Client-side doar (MVP); SQLite planificat pentru faze ulterioare
- **Limba conținut:** Română cu diacritice corecte (ă, â, î, ș, ț)

## Structura directorului

```
src/
  app.css              — Tailwind imports + tema custom (sand/night/warm) + .btn-primary
  app.html             — Shell HTML (lang="ro")
  lib/
    types/index.ts     — Toate definițiile de tipuri TypeScript
    data/
      archetypes.ts    — 8 arhetipuri de somn (1:1 cu pattern-urile)
      steps.ts         — Opțiuni/items pentru fiecare pas (1-6) + opțiuni demografice
      pillars.ts       — 8 piloni de regenerare
      protocols.ts     — Acțiuni protocol per pilon per fază
      scoring.ts       — Motor de calcul: pași 1-5 → rezultat final + personalizeProtocol()
      narratives.ts    — Texte narative + builder functions (demographics-aware) pentru pagina rezultat
    stores/
      diagnostic.ts    — State management (Svelte writable + derived stores)
    components/        — Componente Svelte 5 reutilizabile
  routes/
    +layout.svelte     — Layout global
    +page.svelte       — Landing page
    diagnostic/        — Fluxul diagnostic în 7 pași (6 interactivi + calcul)
    rezultat/          — Pagina de rezultat personalizat
```

## Convenții de cod

### Svelte 5
- **Doar Svelte 5 syntax**: `$props()`, `$state()`, `$derived()`, `{@render children()}`
- **Niciodată `export let`** — folosim mereu `$props()`
- **Snippets** pentru children, nu slot-uri

### TypeScript
- Mod strict activat
- Toate tipurile explicite — nu `any`
- Tipuri definite în `src/lib/types/index.ts`

### Tailwind
- Clase utility direct în template — nu CSS modules, nu `@apply` (excepție: `app.css` pentru baze globale)
- Tema custom cu tokeni: `sand-*`, `night-*`, `warm-*`
- Mobile-first: stiluri de bază pentru mobil, `sm:`/`lg:` pentru ecrane mari

### Convenții de numire
- **Fișiere componente:** PascalCase (`QuestionCard.svelte`)
- **Fișiere date/store:** camelCase (`archetypes.ts`, `diagnostic.ts`)
- **Variabile/funcții:** camelCase
- **Tipuri/Interfețe:** PascalCase
- **Constante enum-like:** SCREAMING_SNAKE_CASE (`SLOW_SWITCH_OFF`)
- **ID-uri:** SCREAMING_SNAKE_CASE pentru tipuri, litere simple pentru pattern-uri (`A`-`H`)

### Limbă
- Tot conținutul UI în **română cu diacritice corecte**
- Comentarii în cod și numele variabilelor/tipurilor în **engleză**
- Textele lungi (descrieri arhetipuri, acțiuni protocol) — ton cald, empatic, direct

## Comportament la editare

- **Citește înainte de modificat** — nu propune schimbări în fișiere necitite
- **Nu refactoriza neprovocot** — modifică doar ce e cerut explicit
- **Nu atinge `!initialData/`** — director read-only cu documente de referință
- **ID-urile de pași/arhetipuri/piloni sunt sacre** — sunt referențiate cross-file
- **După modificări:** rulează `npm run build` pentru verificare
- **Componente de bază** (`QuestionCard`, `OptionButton`, `CheckboxOption`) — stilizate pentru proiect; modificări cu atenție
- **La adăugarea de tipuri noi:** actualizează `src/lib/types/index.ts` mai întâi
