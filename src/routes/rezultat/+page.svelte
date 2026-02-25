<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { result, resetDiagnostic } from '$lib/stores/diagnostic';
  import ResultSection from '$lib/components/ResultSection.svelte';
  import PillarCard from '$lib/components/PillarCard.svelte';
  import ProtocolPhase from '$lib/components/ProtocolPhase.svelte';
  import type { DiagnosticResult } from '$lib/types';

  let diagnosticResult: DiagnosticResult | null = $state(null);

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

  function handleRestart() {
    resetDiagnostic();
    goto('/diagnostic');
  }
</script>

{#if diagnosticResult}
  <div class="min-h-screen bg-sand-50 px-4 py-10 sm:py-16">
    <div class="mx-auto max-w-2xl space-y-10">

      <!-- HEADER: Archetype -->
      <div class="rounded-2xl bg-white px-6 py-8 shadow-xs ring-1 ring-sand-200 sm:px-10 sm:py-10">
        <p class="text-sm font-medium uppercase tracking-wide text-night-500">Tiparul tău de somn</p>
        <h1 class="mt-2 font-serif text-3xl font-semibold text-sand-900 sm:text-4xl">
          {diagnosticResult.archetype.name}
        </h1>
        <p class="mt-2 font-serif text-lg italic text-night-600">
          „{diagnosticResult.archetype.keyPhrase}"
        </p>
        <p class="mt-4 text-base leading-relaxed text-sand-700">
          {diagnosticResult.archetype.description}
        </p>
      </div>

      <!-- SABOTEUR SUMMARY -->
      <ResultSection title="Analiza sabotorilor">
        {#snippet children()}
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-lg bg-white p-4 ring-1 ring-sand-200 text-center">
              <p class="text-2xl font-semibold text-sand-900">{diagnosticResult.externalSaboteurCount}<span class="text-sm text-sand-400">/10</span></p>
              <p class="mt-1 text-sm text-sand-600">Sabotori externi</p>
              {#if diagnosticResult.externalSaboteurCount >= 3}
                <span class="mt-2 inline-block rounded-full bg-warm-100 px-2 py-0.5 text-xs font-medium text-warm-800">Dominant</span>
              {/if}
              {#if diagnosticResult.selectedExternalSaboteurs.length > 0}
                <p class="mt-2 text-xs text-sand-500 leading-relaxed">{diagnosticResult.selectedExternalSaboteurs.map(s => s.label).join(', ')}</p>
              {/if}
            </div>
            <div class="rounded-lg bg-white p-4 ring-1 ring-sand-200 text-center">
              <p class="text-2xl font-semibold text-sand-900">{diagnosticResult.internalSaboteurCount}<span class="text-sm text-sand-400">/8</span></p>
              <p class="mt-1 text-sm text-sand-600">Sabotori interni</p>
              {#if diagnosticResult.internalSaboteurCount >= 2}
                <span class="mt-2 inline-block rounded-full bg-warm-100 px-2 py-0.5 text-xs font-medium text-warm-800">Dominant</span>
              {/if}
              {#if diagnosticResult.selectedInternalSaboteurs.length > 0}
                <p class="mt-2 text-xs text-sand-500 leading-relaxed">{diagnosticResult.selectedInternalSaboteurs.map(s => s.label).join(', ')}</p>
              {/if}
            </div>
            <div class="rounded-lg bg-white p-4 ring-1 ring-sand-200 text-center">
              <p class="text-2xl font-semibold text-sand-900">{diagnosticResult.safetyScore}<span class="text-sm text-sand-400">/5</span></p>
              <p class="mt-1 text-sm text-sand-600">Scor siguranță</p>
              {#if diagnosticResult.safetyCompromised}
                <span class="mt-2 inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">Compromis</span>
              {/if}
            </div>
          </div>
        {/snippet}
      </ResultSection>

      <!-- CAUSAL LABELS (if any) -->
      {#if diagnosticResult.causalLabels.length > 0}
        <ResultSection title="Cauze identificate">
          {#snippet children()}
            <div class="space-y-3">
              {#each diagnosticResult.causalLabels as label}
                <div class="rounded-lg border border-sand-200 bg-white px-5 py-3">
                  <h4 class="font-medium text-sand-900">{label.name}</h4>
                  <p class="mt-1 text-sm text-sand-600">{label.description}</p>
                </div>
              {/each}
            </div>
          {/snippet}
        </ResultSection>
      {/if}

      <!-- ADAPTATION PHASE -->
      <ResultSection title="Faza ta de adaptare">
        {#snippet children()}
          <div class="rounded-lg border-l-4 px-5 py-4
            {diagnosticResult.adaptationPhase.id === 'EARLY_ALERT' ? 'border-l-green-500 bg-green-50' :
             diagnosticResult.adaptationPhase.id === 'ACTIVE_COMPENSATION' ? 'border-l-warm-500 bg-warm-50' :
             'border-l-red-500 bg-red-50'}">
            <h4 class="font-serif text-lg font-medium text-sand-900">{diagnosticResult.adaptationPhase.name}</h4>
            <p class="mt-1 text-sm leading-relaxed text-sand-700">{diagnosticResult.adaptationPhase.description}</p>
          </div>
        {/snippet}
      </ResultSection>

      <!-- SCENARIO -->
      <ResultSection title="Strategia recomandată">
        {#snippet children()}
          <div class="rounded-lg bg-night-50 px-5 py-4 ring-1 ring-night-200">
            <h4 class="font-serif text-lg font-medium text-night-900">{diagnosticResult.scenario.title}</h4>
            <p class="mt-1 text-sm leading-relaxed text-night-700">{diagnosticResult.scenario.description}</p>
          </div>
        {/snippet}
      </ResultSection>

      <!-- COMPROMISED PILLARS -->
      {#if diagnosticResult.compromisedPillars.length > 0}
        <ResultSection title="Piloni de regenerare">
          {#snippet children()}
            <div class="grid gap-3 sm:grid-cols-2">
              {#each diagnosticResult.compromisedPillars as { pillar, status }}
                <PillarCard {pillar} {status} />
              {/each}
            </div>
          {/snippet}
        </ResultSection>
      {/if}

      <!-- 3-PHASE PROTOCOL -->
      <ResultSection title="Protocolul tău personalizat">
        {#snippet children()}
          <div class="space-y-4">
            {#each diagnosticResult.protocol as phase}
              <ProtocolPhase {phase} />
            {/each}
          </div>
        {/snippet}
      </ResultSection>

      <!-- CLOSING MESSAGE -->
      <div class="rounded-2xl bg-night-50 px-6 py-8 ring-1 ring-night-200 sm:px-10">
        <p class="font-serif text-lg font-medium text-night-900">
          Somnul este rezultatul modului în care ai trăit ziua.
        </p>
        <p class="mt-3 text-sm leading-relaxed text-night-700">
          Nu ai insomnie. Ai un deficit de siguranță biologică pe unul sau mai multe niveluri.
          Vestea bună: acum știi exact unde sunt problemele și ce poți face.
        </p>
        <p class="mt-2 text-sm leading-relaxed text-night-700">
          Ziua creează noaptea. Începe cu Faza 1, aplică 2-3 schimbări timp de 2 săptămâni, apoi evaluează.
        </p>
      </div>

      <!-- RESTART -->
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
  </div>
{/if}
