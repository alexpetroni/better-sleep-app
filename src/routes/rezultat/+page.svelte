<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { result, resetDiagnostic } from '$lib/stores/diagnostic';
  import type { DiagnosticResult } from '$lib/types';
  import {
    archetypeNarratives,
    getArchetypeMechanism,
    buildCausesNarrative,
    adaptationNarratives,
    scenarioNarratives,
    emotionalDominanceNarrative,
    buildPillarsNarrative,
    buildProtocolPhaseNarrative
  } from '$lib/data/narratives';

  let diagnosticResult: DiagnosticResult | null = $state(null);
  let resultStep = $state<1 | 2 | 3>(1);
  let visible = $state(true);
  let animating = $state(false);

  onMount(() => {
    const unsub = result.subscribe((r) => {
      if (!r) {
        goto('/diagnostic');
      } else {
        diagnosticResult = r;
      }
    });
    return unsub;
  });

  function animateTransition(action: () => void) {
    if (animating) return;
    animating = true;
    visible = false;
    setTimeout(() => {
      action();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      visible = true;
      setTimeout(() => { animating = false; }, 300);
    }, 300);
  }

  function goToStep(step: 1 | 2 | 3) {
    animateTransition(() => { resultStep = step; });
  }

  function handleRestart() {
    resetDiagnostic();
    goto('/diagnostic');
  }

  let narrative = $derived(diagnosticResult ? {
    recognition: archetypeNarratives[diagnosticResult.archetype.id].recognition,
    mechanism: getArchetypeMechanism(diagnosticResult.archetype.id, diagnosticResult.demographics),
    causes: buildCausesNarrative(diagnosticResult.causalLabels, diagnosticResult.demographics),
    adaptation: adaptationNarratives[diagnosticResult.adaptationPhase.id],
    scenario: scenarioNarratives[diagnosticResult.scenario.id],
    pillars: buildPillarsNarrative(diagnosticResult.compromisedPillars),
    protocolPhases: diagnosticResult.protocol.map(buildProtocolPhaseNarrative),
  } : null);
</script>

{#if diagnosticResult && narrative}
  <div class="min-h-screen bg-sand-50 px-4 py-10 sm:py-16">
    <div
      class="mx-auto max-w-2xl transition-all duration-300 ease-in-out {visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
    >

      <!-- STEP 1: Ce se întâmplă -->
      {#if resultStep === 1}
        <div class="space-y-6">
          <!-- Section header -->
          <div class="flex items-center gap-3 text-sm text-night-400">
            <span class="flex size-6 items-center justify-center rounded-full border-2 border-night-500 text-xs font-bold text-night-500">1</span>
            <span class="font-medium uppercase tracking-wide">Ce se întâmplă cu somnul tău</span>
            <span class="ml-auto text-xs text-sand-400">1 din 3</span>
          </div>

          <div>
            <h1 class="font-serif text-3xl font-semibold text-sand-900 sm:text-4xl">
              {diagnosticResult.archetype.name}
            </h1>
            <p class="mt-2 font-serif text-lg italic text-night-600">
              „{diagnosticResult.archetype.keyPhrase}"
            </p>
          </div>

          <p class="text-base leading-relaxed text-sand-700">{narrative.recognition}</p>

          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-night-400">Ce se întâmplă biologic</p>
            <p class="text-base leading-relaxed text-sand-700">{narrative.mechanism}</p>
          </div>

          <p class="text-base leading-relaxed text-sand-700">{narrative.causes}</p>

          <button
            type="button"
            class="mt-4 w-full rounded-md bg-night-600 px-4 py-3 text-base font-semibold text-white shadow-xs hover:bg-night-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-600 transition-colors"
            onclick={() => goToStep(2)}
          >
            Continuă &rarr; De ce se întâmplă
          </button>
        </div>

      <!-- STEP 2: De ce se întâmplă -->
      {:else if resultStep === 2}
        <div class="space-y-6">
          <!-- Section header -->
          <div class="flex items-center gap-3 text-sm text-night-400">
            <span class="flex size-6 items-center justify-center rounded-full bg-night-600 text-xs font-bold text-white">1</span>
            <div class="h-px flex-0 w-4 bg-night-300"></div>
            <span class="flex size-6 items-center justify-center rounded-full border-2 border-night-500 text-xs font-bold text-night-500">2</span>
            <span class="font-medium uppercase tracking-wide">De ce se întâmplă</span>
            <span class="ml-auto text-xs text-sand-400">2 din 3</span>
          </div>

          <div>
            <h2 class="font-serif text-2xl font-semibold text-sand-900 sm:text-3xl">
              {diagnosticResult.adaptationPhase.name}
            </h2>
            <p class="mt-1 text-sm text-sand-500">Faza de adaptare în care se află corpul tău</p>
          </div>

          <p class="text-base leading-relaxed text-sand-700">{narrative.adaptation}</p>

          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-night-400">Tipul de abordare recomandat</p>
            <p class="text-base leading-relaxed text-sand-700">{narrative.scenario}</p>
          </div>

          {#if diagnosticResult.saboteurDominance === 'EMOTIONAL'}
            <div class="rounded-lg border-l-4 border-l-warm-400 bg-warm-50 px-5 py-4">
              <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-warm-600">Atenție</p>
              <p class="text-base leading-relaxed text-sand-700">{emotionalDominanceNarrative}</p>
            </div>
          {/if}

          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-night-400">Zonele de regenerare afectate</p>
            <p class="text-base leading-relaxed text-sand-700">{narrative.pillars}</p>
          </div>

          <button
            type="button"
            class="mt-4 w-full rounded-md bg-night-600 px-4 py-3 text-base font-semibold text-white shadow-xs hover:bg-night-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-600 transition-colors"
            onclick={() => goToStep(3)}
          >
            Continuă &rarr; Ce poți face
          </button>
        </div>

      <!-- STEP 3: Ce poți face -->
      {:else if resultStep === 3}
        <div class="space-y-8">
          <!-- Section header -->
          <div class="flex items-center gap-3 text-sm text-night-400">
            <span class="flex size-6 items-center justify-center rounded-full bg-night-600 text-xs font-bold text-white">1</span>
            <div class="h-px flex-0 w-4 bg-night-300"></div>
            <span class="flex size-6 items-center justify-center rounded-full bg-night-600 text-xs font-bold text-white">2</span>
            <div class="h-px flex-0 w-4 bg-night-300"></div>
            <span class="flex size-6 items-center justify-center rounded-full border-2 border-night-500 text-xs font-bold text-night-500">3</span>
            <span class="font-medium uppercase tracking-wide">Ce poți face</span>
            <span class="ml-auto text-xs text-sand-400">3 din 3</span>
          </div>

          <div>
            <h2 class="font-serif text-2xl font-semibold text-sand-900 sm:text-3xl">
              Protocolul tău în trei faze
            </h2>
            <p class="mt-1 text-sm text-sand-500">Aplică-le în ordine, câte una pe rând</p>
          </div>

          {#each diagnosticResult.protocol as phase, i}
            <div class="space-y-2">
              <h3 class="font-serif text-lg font-medium text-sand-900">
                Faza {i + 1}: {phase.name}
              </h3>
              <p class="text-base leading-relaxed text-sand-700">{narrative.protocolPhases[i]}</p>
            </div>
          {/each}

          <!-- Closing message -->
          <div class="rounded-2xl bg-night-50 px-6 py-8 ring-1 ring-night-200 sm:px-10">
            <p class="font-serif text-lg font-medium text-night-900">
              Un lucru important de reținut
            </p>
            <p class="mt-3 text-base leading-relaxed text-night-700">
              Somnul nu e ceva ce poți forța — e ceva ce permiți. Acum ai o hartă clară a ce se întâmplă și de ce.
            </p>
            <p class="mt-2 text-base leading-relaxed text-night-700">
              Începe cu Faza 1: alege 2-3 lucruri din cele de mai sus și aplică-le consistent timp de 2 săptămâni. Apoi observă ce s-a schimbat. Nu totul deodată — un pas la un moment dat.
            </p>
          </div>

          <div class="text-center">
            <button
              type="button"
              class="text-sm font-medium text-sand-500 hover:text-sand-700 transition-colors"
              onclick={handleRestart}
            >
              Reia diagnosticul
            </button>
          </div>
        </div>
      {/if}

    </div>
  </div>
{/if}
