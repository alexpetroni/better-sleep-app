<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import StepIndicator from '$lib/components/StepIndicator.svelte';
  import QuestionCard from '$lib/components/QuestionCard.svelte';
  import OptionButton from '$lib/components/OptionButton.svelte';
  import CheckboxOption from '$lib/components/CheckboxOption.svelte';
  import YesNoQuestion from '$lib/components/YesNoQuestion.svelte';
  import {
    diagnosticState,
    currentStep,
    isComplete,
    selectArchetype,
    submitExternalSaboteurs,
    submitInternalSaboteurs,
    submitSafetyAnswers,
    goBackOneStep,
    resetDiagnostic
  } from '$lib/stores/diagnostic';
  import { step1Options, step2Items, step3Items, step4Questions, stepMeta } from '$lib/data/steps';
  import type { SleepArchetypeId, ExternalSaboteurId, InternalSaboteurId } from '$lib/types';

  // Local state for multi-select steps (preserved when going back)
  let step2Selected = $state<string[]>([]);
  let step3Selected = $state<string[]>([]);
  let step4Answers = $state<Record<string, boolean | undefined>>({});

  // Animation state
  let visible = $state(true);
  let animating = $state(false);

  function animateTransition(action: () => void) {
    if (animating) return;
    animating = true;
    visible = false;
    setTimeout(() => {
      action();
      visible = true;
      setTimeout(() => { animating = false; }, 300);
    }, 300);
  }

  // Step 1
  function handleStep1(archetypeId: string) {
    animateTransition(() => selectArchetype(archetypeId as SleepArchetypeId));
  }

  // Step 2
  function toggleStep2(id: string) {
    if (step2Selected.includes(id)) {
      step2Selected = step2Selected.filter((s) => s !== id);
    } else {
      step2Selected = [...step2Selected, id];
    }
  }

  function handleStep2Submit() {
    animateTransition(() => submitExternalSaboteurs([...step2Selected] as ExternalSaboteurId[]));
  }

  // Step 3
  function toggleStep3(id: string) {
    if (step3Selected.includes(id)) {
      step3Selected = step3Selected.filter((s) => s !== id);
    } else {
      step3Selected = [...step3Selected, id];
    }
  }

  function handleStep3Submit() {
    animateTransition(() => submitInternalSaboteurs([...step3Selected] as InternalSaboteurId[]));
  }

  // Step 4
  function setStep4Answer(id: string, val: boolean) {
    step4Answers = { ...step4Answers, [id]: val };
  }

  function handleStep4Submit() {
    const finalAnswers: Record<string, boolean> = {};
    for (const q of step4Questions) {
      finalAnswers[q.id] = step4Answers[q.id] ?? false;
    }
    animateTransition(() => submitSafetyAnswers(finalAnswers));
  }

  let allStep4Answered = $derived(
    step4Questions.every((q) => step4Answers[q.id] !== undefined)
  );

  // Back
  function handleBack() {
    animateTransition(() => goBackOneStep());
  }

  // Navigate to result when complete
  $effect(() => {
    if ($isComplete) {
      goto('/rezultat');
    }
  });

  onMount(() => {
    resetDiagnostic();
    visible = true;
    animating = false;
  });
</script>

<div class="min-h-screen bg-sand-50 px-4 py-8 sm:py-12">
  <!-- Step Indicator -->
  <div class="mb-10">
    <StepIndicator currentStep={$currentStep} />
  </div>

  <!-- Step Content -->
  <div
    class="transition-all duration-300 ease-in-out {visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
  >
    <!-- STEP 1: Sleep Pattern -->
    {#if $currentStep === 1}
      <QuestionCard text={stepMeta[0].subtitle} subtext="Alege cea care te descrie cel mai bine.">
        {#snippet children()}
          <div class="space-y-3" role="radiogroup" aria-label="Tipare de somn">
            {#each step1Options as option}
              <OptionButton
                label={option.label}
                selected={$diagnosticState.selectedArchetype === option.id}
                onclick={() => handleStep1(option.id)}
              />
            {/each}
          </div>
        {/snippet}
      </QuestionCard>

    <!-- STEP 2: External Saboteurs -->
    {:else if $currentStep === 2}
      <QuestionCard text={stepMeta[1].subtitle} subtext="Bifează tot ce este adevărat pentru tine. Poți continua și fără să bifezi nimic.">
        {#snippet children()}
          <div class="space-y-4">
            <fieldset>
              <legend class="sr-only">Sabotori externi</legend>
              <div class="space-y-3">
                {#each step2Items as item}
                  <CheckboxOption
                    label={item.label}
                    checked={step2Selected.includes(item.id)}
                    onchange={() => toggleStep2(item.id)}
                  />
                {/each}
              </div>
            </fieldset>
            <button
              type="button"
              class="mt-6 w-full rounded-md bg-night-600 px-4 py-3 text-base font-semibold text-white shadow-xs hover:bg-night-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-600 transition-colors"
              onclick={handleStep2Submit}
            >
              Continuă
            </button>
          </div>
        {/snippet}
      </QuestionCard>

    <!-- STEP 3: Internal Saboteurs -->
    {:else if $currentStep === 3}
      <QuestionCard text={stepMeta[2].subtitle} subtext="Bifează ce recunoști. E normal să nu ai niciunul.">
        {#snippet children()}
          <div class="space-y-4">
            <fieldset>
              <legend class="sr-only">Sabotori interni</legend>
              <div class="space-y-3">
                {#each step3Items as item}
                  <CheckboxOption
                    label={item.label}
                    checked={step3Selected.includes(item.id)}
                    onchange={() => toggleStep3(item.id)}
                  />
                {/each}
              </div>
            </fieldset>
            <button
              type="button"
              class="mt-6 w-full rounded-md bg-night-600 px-4 py-3 text-base font-semibold text-white shadow-xs hover:bg-night-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-600 transition-colors"
              onclick={handleStep3Submit}
            >
              Continuă
            </button>
          </div>
        {/snippet}
      </QuestionCard>

    <!-- STEP 4: Biological Safety -->
    {:else if $currentStep === 4}
      <QuestionCard text={stepMeta[3].subtitle} subtext="Răspunde sincer — nu există răspunsuri greșite.">
        {#snippet children()}
          <div class="space-y-4">
            <div class="space-y-3">
              {#each step4Questions as question}
                <YesNoQuestion
                  text={question.text}
                  value={step4Answers[question.id]}
                  onchange={(val) => setStep4Answer(question.id, val)}
                />
              {/each}
            </div>
            <button
              type="button"
              class="mt-6 w-full rounded-md px-4 py-3 text-base font-semibold shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-600
                {allStep4Answered
                  ? 'bg-night-600 text-white hover:bg-night-500'
                  : 'bg-sand-200 text-sand-400 cursor-not-allowed'}"
              disabled={!allStep4Answered}
              onclick={handleStep4Submit}
            >
              Vezi rezultatul
            </button>
          </div>
        {/snippet}
      </QuestionCard>
    {/if}
  </div>

  <!-- Back Button -->
  {#if $currentStep > 1}
    <div class="mx-auto mt-6 max-w-2xl text-center">
      <button
        type="button"
        class="text-sm font-medium text-sand-500 hover:text-sand-700 transition-colors"
        onclick={handleBack}
      >
        &larr; Înapoi
      </button>
    </div>
  {/if}
</div>
