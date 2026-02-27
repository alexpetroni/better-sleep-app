<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { result, resetDiagnostic } from '$lib/stores/diagnostic';
  import type { DiagnosticResult } from '$lib/types';
  import {
    archetypeNarratives,
    morningStateFragments,
    onsetFragments,
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

  const resultSteps: { id: 1 | 2 | 3; title: string; subtitle: string }[] = [
    { id: 1, title: 'Ce se întâmplă', subtitle: 'Tiparul tău' },
    { id: 2, title: 'De ce', subtitle: 'Cauze și fază' },
    { id: 3, title: 'Ce poți face', subtitle: 'Protocol' }
  ];

  const phaseColors = ['from-warm-500 to-warm-600', 'from-night-500 to-night-600', 'from-night-700 to-night-800'];

  let narrative = $derived(diagnosticResult ? {
    recognition: archetypeNarratives[diagnosticResult.archetype.id].recognition,
    onsetFragment: diagnosticResult.secondaryArchetype
      ? onsetFragments[diagnosticResult.secondaryArchetype.id as 'A' | 'F']
      : null,
    morningState: morningStateFragments[diagnosticResult.morningState],
    mechanism: getArchetypeMechanism(diagnosticResult.archetype.id, diagnosticResult.demographics),
    causes: buildCausesNarrative(diagnosticResult.causalLabels, diagnosticResult.demographics),
    adaptation: adaptationNarratives[diagnosticResult.adaptationPhase.id],
    scenario: scenarioNarratives[diagnosticResult.scenario.id],
    pillars: buildPillarsNarrative(diagnosticResult.compromisedPillars),
    protocolPhases: diagnosticResult.protocol.map(buildProtocolPhaseNarrative),
  } : null);
</script>

{#if diagnosticResult && narrative}
  <div class="relative min-h-screen bg-sand-50 px-4 py-8 sm:py-12">
    <!-- Subtle background accent (same as diagnostic) -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-night-50/30 to-transparent" aria-hidden="true"></div>

    <!-- Logo -->
    <div class="relative mb-6 text-center">
      <a href="/" class="inline-block font-serif text-xl font-semibold text-night-700 transition-colors hover:text-night-900">
        Better Sleep
      </a>
    </div>

    <!-- Result Step Indicator (matches diagnostic StepIndicator style) -->
    <nav aria-label="Progres rezultat" class="relative mx-auto mb-10 max-w-2xl">
      <!-- Progress bar -->
      <div class="relative mb-4">
        <div class="h-1 rounded-full bg-sand-200">
          <div
            class="h-1 rounded-full bg-gradient-to-r from-night-500 to-night-600 transition-all duration-500 ease-out"
            style="width: {((resultStep - 1) / 2) * 100}%"
          ></div>
        </div>
      </div>

      <!-- Step dots + labels -->
      <ol role="list" class="flex items-start justify-between">
        {#each resultSteps as step, i}
          {@const status = step.id < resultStep ? 'complete' : step.id === resultStep ? 'current' : 'upcoming'}
          <li class="flex flex-col items-center gap-1.5">
            <button
              type="button"
              class="flex flex-col items-center gap-1.5 transition-all duration-200"
              onclick={() => goToStep(step.id)}
            >
              <span
                class="flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300
                  {status === 'complete' ? 'bg-night-600 text-white shadow-sm' :
                   status === 'current' ? 'border-2 border-night-600 text-night-700 shadow-sm shadow-night-200' :
                   'border border-sand-300 text-sand-400'}"
              >
                {#if status === 'complete'}
                  <svg class="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                {:else}
                  {step.id}
                {/if}
              </span>
              <span class="text-[11px] {status === 'upcoming' ? 'text-sand-400' : status === 'current' ? 'font-semibold text-night-700' : 'font-medium text-sand-600'}">
                {step.title}
              </span>
              <span class="hidden text-[10px] sm:block {status === 'current' ? 'text-sand-500' : 'text-sand-400'}">
                {step.subtitle}
              </span>
            </button>
          </li>
          {#if i < resultSteps.length - 1}
            <div class="mb-8 sm:mb-10 mx-0.5 h-px flex-1" aria-hidden="true"></div>
          {/if}
        {/each}
      </ol>
    </nav>

    <!-- Step Content -->
    <div
      class="relative transition-all duration-300 ease-in-out {visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
    >

      <!-- STEP 1: Ce se întâmplă -->
      {#if resultStep === 1}
        <div class="mx-auto max-w-2xl">
          <div class="relative overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-md shadow-sand-200/60 ring-1 ring-sand-200/80 sm:px-10 sm:py-10">
            <!-- Top accent line -->
            <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-night-500/60 via-night-400/80 to-night-500/60"></div>

            <!-- Title -->
            <h1 class="font-serif text-2xl font-medium text-sand-900 sm:text-3xl">
              {diagnosticResult.archetype.nameEn}
            </h1>
            <p class="mt-1 text-sm font-medium uppercase tracking-wide text-sand-400">
              {diagnosticResult.archetype.name}
            </p>
            <p class="mt-2 font-serif text-base italic text-sand-500">
              „{diagnosticResult.archetype.keyPhrase}"
            </p>

            <!-- Content -->
            <div class="mt-8 space-y-5">
              <p class="text-[15px] leading-relaxed text-sand-700">{narrative.recognition}</p>

              {#if narrative.onsetFragment}
                <p class="text-[15px] leading-relaxed text-sand-700">{narrative.onsetFragment}</p>
              {/if}

              <p class="text-[15px] leading-relaxed text-sand-700">{narrative.morningState}</p>

              <div class="rounded-xl border border-night-100 bg-night-50/40 px-5 py-4">
                <p class="mb-2 text-xs font-bold uppercase tracking-wider text-night-500">Ce se întâmplă biologic</p>
                <p class="text-[15px] leading-relaxed text-night-800">{narrative.mechanism}</p>
              </div>

              <p class="text-[15px] leading-relaxed text-sand-700">{narrative.causes}</p>

              <button type="button" class="btn-primary mt-4" onclick={() => goToStep(2)}>
                Continuă
              </button>
            </div>
          </div>
        </div>

      <!-- STEP 2: De ce se întâmplă -->
      {:else if resultStep === 2}
        <div class="mx-auto max-w-2xl">
          <div class="relative overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-md shadow-sand-200/60 ring-1 ring-sand-200/80 sm:px-10 sm:py-10">
            <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-night-500/60 via-night-400/80 to-night-500/60"></div>

            <h2 class="font-serif text-2xl font-medium text-sand-900 sm:text-3xl">
              {diagnosticResult.adaptationPhase.name}
            </h2>
            <p class="mt-2 text-sm text-sand-500">Faza de adaptare în care se află corpul tău</p>

            <div class="mt-8 space-y-5">
              <p class="text-[15px] leading-relaxed text-sand-700">{narrative.adaptation}</p>

              <div class="rounded-xl border border-warm-200/60 bg-warm-50/40 px-5 py-4">
                <p class="mb-2 text-xs font-bold uppercase tracking-wider text-warm-600">Tipul de abordare recomandat</p>
                <p class="text-[15px] leading-relaxed text-sand-800">{narrative.scenario}</p>
              </div>

              {#if diagnosticResult.saboteurDominance === 'EMOTIONAL'}
                <div class="rounded-xl border-l-4 border-l-warm-400 bg-warm-50/40 px-5 py-4">
                  <p class="mb-2 text-xs font-bold uppercase tracking-wider text-warm-600">Atenție</p>
                  <p class="text-[15px] leading-relaxed text-sand-700">{emotionalDominanceNarrative}</p>
                </div>
              {/if}

              <div class="rounded-xl border border-sand-200 bg-sand-50 px-5 py-4">
                <p class="mb-2 text-xs font-bold uppercase tracking-wider text-night-500">Zonele de regenerare afectate</p>
                <p class="text-[15px] leading-relaxed text-sand-700">{narrative.pillars}</p>
              </div>

              <button type="button" class="btn-primary mt-4" onclick={() => goToStep(3)}>
                Continuă
              </button>
            </div>
          </div>
        </div>

      <!-- STEP 3: Ce poți face -->
      {:else if resultStep === 3}
        <div class="mx-auto max-w-2xl">
          <div class="relative overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-md shadow-sand-200/60 ring-1 ring-sand-200/80 sm:px-10 sm:py-10">
            <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-night-500/60 via-night-400/80 to-night-500/60"></div>

            <h2 class="font-serif text-2xl font-medium text-sand-900 sm:text-3xl">
              Protocolul tău în trei faze
            </h2>
            <p class="mt-2 text-sm text-sand-500">Aplică-le în ordine, câte una pe rând</p>

            <div class="mt-8 space-y-5">
              {#each diagnosticResult.protocol as phase, i}
                <div class="overflow-hidden rounded-xl border border-sand-200 bg-sand-50/50">
                  <!-- Phase header -->
                  <div class="flex items-center gap-3 border-b border-sand-100 px-5 py-3">
                    <span class="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br {phaseColors[i]} text-xs font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <h3 class="font-serif text-base font-semibold text-sand-900">{phase.name}</h3>
                  </div>
                  <!-- Phase content -->
                  <div class="bg-white px-5 py-4">
                    <p class="text-[15px] leading-relaxed text-sand-700">{narrative.protocolPhases[i]}</p>
                  </div>
                </div>
              {/each}

              <!-- Closing message -->
              <div class="rounded-xl border border-night-100 bg-night-50/40 px-5 py-5">
                <p class="font-serif text-lg font-medium text-sand-900">
                  Un lucru important de reținut
                </p>
                <p class="mt-3 text-[15px] leading-relaxed text-sand-700">
                  Somnul nu e ceva ce poți forța — e ceva ce permiți. Acum ai o hartă clară a ce se întâmplă și de ce.
                </p>
                <p class="mt-2 text-[15px] leading-relaxed text-sand-700">
                  Începe cu Faza 1: alege 2-3 lucruri din cele de mai sus și aplică-le consistent timp de 2 săptămâni. Apoi observă ce s-a schimbat. Nu totul deodată — un pas la un moment dat.
                </p>
              </div>

              <div class="pt-2 text-center">
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-sand-500 transition-colors hover:text-sand-700"
                  onclick={handleRestart}
                >
                  <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.598a.75.75 0 00-.75.75v3.634a.75.75 0 001.5 0v-2.033l.312.311a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm-1.621-7.847a7 7 0 00-11.712 3.135.75.75 0 001.449.39 5.5 5.5 0 019.201-2.466l.312.311H10.51a.75.75 0 000 1.5h3.634a.75.75 0 00.75-.75V2.063a.75.75 0 00-1.5 0v2.033l-.312-.311a6.972 6.972 0 00-.392-.208z" clip-rule="evenodd" />
                  </svg>
                  Reia diagnosticul
                </button>
              </div>
            </div>
          </div>
        </div>
      {/if}

    </div>
  </div>
{/if}
