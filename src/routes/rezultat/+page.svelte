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

  const phaseIcons = ['M3 3v18h18', 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'];
  const phaseColors = ['from-warm-500 to-warm-600', 'from-night-500 to-night-600', 'from-night-700 to-night-800'];

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
  <div class="min-h-screen bg-sand-50">
    <div
      class="transition-all duration-300 ease-in-out {visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
    >

      <!-- STEP 1: Ce se întâmplă -->
      {#if resultStep === 1}
        <!-- Dark hero header -->
        <div class="relative overflow-hidden bg-night-900 px-4 pb-14 pt-12 sm:pb-20 sm:pt-16">
          <div class="absolute inset-0" aria-hidden="true">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-night-700)_0%,_transparent_60%)] opacity-60"></div>
            <div class="absolute bottom-0 left-1/3 h-40 w-80 rounded-full bg-warm-500/5 blur-[80px]"></div>
          </div>
          <div class="relative mx-auto max-w-2xl">
            <!-- Breadcrumb -->
            <div class="mb-8 flex items-center gap-2 text-sm">
              <span class="rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold text-night-200">1 din 3</span>
              <span class="font-medium text-night-300">Ce se întâmplă cu somnul tău</span>
            </div>

            <h1 class="font-serif text-4xl font-semibold text-white sm:text-5xl">
              {diagnosticResult.archetype.name}
            </h1>
            <p class="mt-3 font-serif text-lg italic text-night-200/90">
              „{diagnosticResult.archetype.keyPhrase}"
            </p>
          </div>
        </div>

        <!-- Content -->
        <div class="mx-auto max-w-2xl px-4 py-10 sm:py-14">
          <div class="space-y-6">
            <p class="text-base leading-relaxed text-sand-700">{narrative.recognition}</p>

            <div class="rounded-xl border border-night-100 bg-night-50/50 px-5 py-5 sm:px-6">
              <p class="mb-2.5 text-xs font-bold uppercase tracking-wider text-night-500">Ce se întâmplă biologic</p>
              <p class="text-[15px] leading-relaxed text-night-800">{narrative.mechanism}</p>
            </div>

            <p class="text-base leading-relaxed text-sand-700">{narrative.causes}</p>

            <button type="button" class="btn-primary mt-4" onclick={() => goToStep(2)}>
              Continuă — De ce se întâmplă
            </button>
          </div>
        </div>

      <!-- STEP 2: De ce se întâmplă -->
      {:else if resultStep === 2}
        <!-- Dark hero header -->
        <div class="relative overflow-hidden bg-night-900 px-4 pb-14 pt-12 sm:pb-20 sm:pt-16">
          <div class="absolute inset-0" aria-hidden="true">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-night-700)_0%,_transparent_60%)] opacity-60"></div>
            <div class="absolute bottom-0 left-1/3 h-40 w-80 rounded-full bg-warm-500/5 blur-[80px]"></div>
          </div>
          <div class="relative mx-auto max-w-2xl">
            <div class="mb-8 flex items-center gap-2 text-sm">
              <span class="rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold text-night-200">2 din 3</span>
              <span class="font-medium text-night-300">De ce se întâmplă</span>
            </div>

            <h2 class="font-serif text-3xl font-semibold text-white sm:text-4xl">
              {diagnosticResult.adaptationPhase.name}
            </h2>
            <p class="mt-2 text-base text-night-300">Faza de adaptare în care se află corpul tău</p>
          </div>
        </div>

        <!-- Content -->
        <div class="mx-auto max-w-2xl px-4 py-10 sm:py-14">
          <div class="space-y-6">
            <p class="text-base leading-relaxed text-sand-700">{narrative.adaptation}</p>

            <div class="rounded-xl border border-warm-200/60 bg-warm-50/50 px-5 py-5 sm:px-6">
              <p class="mb-2.5 text-xs font-bold uppercase tracking-wider text-warm-600">Tipul de abordare recomandat</p>
              <p class="text-[15px] leading-relaxed text-sand-800">{narrative.scenario}</p>
            </div>

            {#if diagnosticResult.saboteurDominance === 'EMOTIONAL'}
              <div class="rounded-xl border-l-4 border-l-warm-400 bg-warm-50 px-5 py-5 shadow-sm">
                <p class="mb-2 text-xs font-bold uppercase tracking-wider text-warm-600">Atenție</p>
                <p class="text-[15px] leading-relaxed text-sand-700">{emotionalDominanceNarrative}</p>
              </div>
            {/if}

            <div class="rounded-xl border border-sand-200 bg-white px-5 py-5 shadow-sm sm:px-6">
              <p class="mb-2.5 text-xs font-bold uppercase tracking-wider text-night-500">Zonele de regenerare afectate</p>
              <p class="text-[15px] leading-relaxed text-sand-700">{narrative.pillars}</p>
            </div>

            <button type="button" class="btn-primary mt-4" onclick={() => goToStep(3)}>
              Continuă — Ce poți face
            </button>
          </div>
        </div>

      <!-- STEP 3: Ce poți face -->
      {:else if resultStep === 3}
        <!-- Dark hero header -->
        <div class="relative overflow-hidden bg-night-900 px-4 pb-14 pt-12 sm:pb-20 sm:pt-16">
          <div class="absolute inset-0" aria-hidden="true">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-night-700)_0%,_transparent_60%)] opacity-60"></div>
            <div class="absolute bottom-0 left-1/3 h-40 w-80 rounded-full bg-warm-500/5 blur-[80px]"></div>
          </div>
          <div class="relative mx-auto max-w-2xl">
            <div class="mb-8 flex items-center gap-2 text-sm">
              <span class="rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold text-night-200">3 din 3</span>
              <span class="font-medium text-night-300">Ce poți face</span>
            </div>

            <h2 class="font-serif text-3xl font-semibold text-white sm:text-4xl">
              Protocolul tău în trei faze
            </h2>
            <p class="mt-2 text-base text-night-300">Aplică-le în ordine, câte una pe rând</p>
          </div>
        </div>

        <!-- Content -->
        <div class="mx-auto max-w-2xl px-4 py-10 sm:py-14">
          <div class="space-y-6">
            {#each diagnosticResult.protocol as phase, i}
              <div class="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-sm">
                <!-- Phase header -->
                <div class="flex items-center gap-3 border-b border-sand-100 bg-sand-50/50 px-5 py-3.5">
                  <span class="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br {phaseColors[i]} text-sm font-bold text-white shadow-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 class="font-serif text-lg font-semibold text-sand-900">{phase.name}</h3>
                  </div>
                </div>
                <!-- Phase content -->
                <div class="px-5 py-4 sm:px-6">
                  <p class="text-[15px] leading-relaxed text-sand-700">{narrative.protocolPhases[i]}</p>
                </div>
              </div>
            {/each}

            <!-- Closing message -->
            <div class="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-night-800 to-night-900 px-6 py-8 sm:px-10 sm:py-10">
              <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-night-700)_0%,_transparent_60%)] opacity-40" aria-hidden="true"></div>
              <div class="relative">
                <p class="font-serif text-xl font-medium text-white">
                  Un lucru important de reținut
                </p>
                <p class="mt-4 text-base leading-relaxed text-night-200">
                  Somnul nu e ceva ce poți forța — e ceva ce permiți. Acum ai o hartă clară a ce se întâmplă și de ce.
                </p>
                <p class="mt-3 text-base leading-relaxed text-night-200">
                  Începe cu Faza 1: alege 2-3 lucruri din cele de mai sus și aplică-le consistent timp de 2 săptămâni. Apoi observă ce s-a schimbat. Nu totul deodată — un pas la un moment dat.
                </p>
              </div>
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
      {/if}

    </div>
  </div>
{/if}
