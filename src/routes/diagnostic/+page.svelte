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
    submitStep1,
    submitExternalSaboteurs,
    submitInternalSaboteurs,
    submitEmotionalSaboteurs,
    submitSafetyAnswers,
    submitDemographics,
    goBackOneStep,
    resetDiagnostic
  } from '$lib/stores/diagnostic';
  import { step1OnsetOptions, step1MaintenanceOptions, step1MorningOptions, step2Items, step3Items, step4Items, step5Questions, stepMeta, sexOptions, ageRangeOptions, menopauseOptions, bodyTypeOptions } from '$lib/data/steps';
  import type { OnsetAnswerId, MaintenanceAnswerId, MorningStateId, ExternalSaboteurId, InternalSaboteurId, EmotionalSaboteurId, BiologicalSex, AgeRange, MenopauseStatus, BodyType } from '$lib/types';

  // Local state for multi-select steps (preserved when going back)
  let step2Selected = $state<string[]>([]);
  let step3Selected = $state<string[]>([]);
  let step4Selected = $state<string[]>([]);
  let step5Answers = $state<Record<string, boolean | undefined>>({});

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

  // Step 1 — 3 sub-questions: onset, maintenance, morning
  let step1Onset = $state<OnsetAnswerId | null>(null);
  let step1Maintenance = $state<MaintenanceAnswerId | null>(null);
  let step1Morning = $state<MorningStateId | null>(null);
  let step1PartBVisible = $state(false);
  let step1PartCVisible = $state(false);
  let step1PartBEl = $state<HTMLElement | null>(null);
  let step1PartCEl = $state<HTMLElement | null>(null);

  function scrollToElement(el: HTMLElement | null) {
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function handleStep1OnsetSelect(id: string) {
    step1Onset = id as OnsetAnswerId;
    if (!step1PartBVisible) {
      setTimeout(() => {
        step1PartBVisible = true;
        // Wait for DOM update then scroll
        setTimeout(() => scrollToElement(step1PartBEl), 50);
      }, 150);
    }
  }

  function handleStep1MaintenanceSelect(id: string) {
    step1Maintenance = id as MaintenanceAnswerId;
    if (!step1PartCVisible) {
      setTimeout(() => {
        step1PartCVisible = true;
        setTimeout(() => scrollToElement(step1PartCEl), 50);
      }, 150);
    }
  }

  function handleStep1MorningSelect(morningId: string) {
    step1Morning = morningId as MorningStateId;
  }

  function handleStep1Submit() {
    if (!step1Onset || !step1Maintenance || !step1Morning) return;
    animateTransition(() => submitStep1(step1Onset!, step1Maintenance!, step1Morning!));
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
  let step3ExpandedInfo = $state<string | null>(null);

  function toggleStep3Info(id: string) {
    step3ExpandedInfo = step3ExpandedInfo === id ? null : id;
  }

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

  // Step 4 — Emotional Saboteurs
  function toggleStep4(id: string) {
    if (step4Selected.includes(id)) {
      step4Selected = step4Selected.filter((s) => s !== id);
    } else {
      step4Selected = [...step4Selected, id];
    }
  }

  function handleStep4Submit() {
    animateTransition(() => submitEmotionalSaboteurs([...step4Selected] as EmotionalSaboteurId[]));
  }

  // Step 5 — Safety
  function setStep5Answer(id: string, val: boolean) {
    step5Answers = { ...step5Answers, [id]: val };
  }

  function handleStep5Submit() {
    const finalAnswers: Record<string, boolean> = {};
    for (const q of step5Questions) {
      finalAnswers[q.id] = step5Answers[q.id] ?? false;
    }
    animateTransition(() => submitSafetyAnswers(finalAnswers));
  }

  let allStep5Answered = $derived(
    step5Questions.every((q) => step5Answers[q.id] !== undefined)
  );

  // Step 6 — Demographics
  let step6Sex = $state<BiologicalSex | null>(null);
  let step6Age = $state<AgeRange | null>(null);
  let step6Menopause = $state<MenopauseStatus | null>(null);
  let step6Body = $state<BodyType | null>(null);

  let showMenopause = $derived(
    step6Sex === 'F' && (step6Age === '46_55' || step6Age === '56_PLUS')
  );

  let allStep6Answered = $derived(
    step6Sex !== null && step6Age !== null && step6Body !== null &&
    (!showMenopause || step6Menopause !== null)
  );

  function handleStep6Submit() {
    if (!step6Sex || !step6Age || !step6Body) return;
    const menopause: MenopauseStatus = showMenopause && step6Menopause ? step6Menopause : 'NA';
    animateTransition(() => submitDemographics({
      sex: step6Sex!,
      ageRange: step6Age!,
      menopauseStatus: menopause,
      bodyType: step6Body!
    }));
  }

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

  // Restore step 1 local state from store (for back navigation)
  $effect(() => {
    if ($currentStep === 1 && $diagnosticState.onsetAnswer) {
      step1Onset = $diagnosticState.onsetAnswer;
      step1PartBVisible = true;
      if ($diagnosticState.maintenanceAnswer) {
        step1Maintenance = $diagnosticState.maintenanceAnswer;
        step1PartCVisible = true;
      }
      if ($diagnosticState.morningState) {
        step1Morning = $diagnosticState.morningState;
      }
    }
  });

  onMount(() => {
    resetDiagnostic();
    visible = true;
    animating = false;
  });
</script>

<div class="relative min-h-screen bg-sand-50 px-4 py-8 sm:py-12">
  <!-- Subtle background accent -->
  <div class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-night-50/30 to-transparent" aria-hidden="true"></div>

  <!-- Logo -->
  <div class="relative mb-6 text-center">
    <a href="/" class="inline-block font-serif text-xl font-semibold text-night-700 transition-colors hover:text-night-900">
      Better Sleep
    </a>
  </div>

  <!-- Step Indicator -->
  <div class="relative mb-10">
    <StepIndicator currentStep={$currentStep} />
  </div>

  <!-- Step Content -->
  <div
    class="relative transition-all duration-300 ease-in-out {visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
  >
    <!-- STEP 1: Onset + Maintenance + Morning State -->
    {#if $currentStep === 1}
      <QuestionCard text={stepMeta[0].subtitle} subtext="">
        {#snippet children()}
          <!-- Part A: Onset -->
          <div class="mb-4">
            <p class="text-base font-semibold text-sand-800">Cum adormi?</p>
          </div>
          <div class="space-y-2.5" role="radiogroup" aria-label="Cum adormi">
            {#each step1OnsetOptions as option}
              <OptionButton
                label={option.label}
                selected={step1Onset === option.id}
                onclick={() => handleStep1OnsetSelect(option.id)}
              />
            {/each}
          </div>

          <!-- Part B: Maintenance (progressive reveal) -->
          {#if step1PartBVisible}
            <div bind:this={step1PartBEl} class="mt-8 transition-all duration-300 ease-in-out {step1PartBVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
              <div class="mb-4 border-t border-sand-200 pt-6">
                <p class="text-base font-semibold text-sand-800">Ce se întâmplă pe parcursul nopții?</p>
              </div>
              <div class="space-y-2.5" role="radiogroup" aria-label="Parcursul nopții">
                {#each step1MaintenanceOptions as option}
                  <OptionButton
                    label={option.label}
                    selected={step1Maintenance === option.id}
                    onclick={() => handleStep1MaintenanceSelect(option.id)}
                  />
                {/each}
              </div>
            </div>
          {/if}

          <!-- Part C: Morning State (progressive reveal) -->
          {#if step1PartCVisible}
            <div bind:this={step1PartCEl} class="mt-8 transition-all duration-300 ease-in-out {step1PartCVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
              <div class="mb-4 border-t border-sand-200 pt-6">
                <p class="text-base font-semibold text-sand-800">Cum te simți dimineața, înainte de cafea?</p>
              </div>
              <div class="space-y-2.5" role="radiogroup" aria-label="Starea de dimineață">
                {#each step1MorningOptions as option}
                  <OptionButton
                    label={option.label}
                    selected={step1Morning === option.id}
                    onclick={() => handleStep1MorningSelect(option.id)}
                  />
                {/each}
              </div>

              {#if step1Morning}
                <button type="button" class="btn-primary mt-6" onclick={handleStep1Submit}>
                  Continuă
                </button>
              {/if}
            </div>
          {/if}
        {/snippet}
      </QuestionCard>

    <!-- STEP 2: External Saboteurs -->
    {:else if $currentStep === 2}
      <QuestionCard text={stepMeta[1].subtitle} subtext="Bifează tot ce e adevărat pentru tine. Poți continua și fără să bifezi nimic.">
        {#snippet children()}
          <div class="space-y-4">
            <fieldset>
              <legend class="sr-only">Sabotori externi</legend>
              <div class="space-y-1">
                {#each step2Items as item}
                  <CheckboxOption
                    label={item.label}
                    checked={step2Selected.includes(item.id)}
                    onchange={() => toggleStep2(item.id)}
                  />
                {/each}
              </div>
            </fieldset>
            <button type="button" class="btn-primary mt-6" onclick={handleStep2Submit}>
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
              <div class="space-y-1">
                {#each step3Items as item}
                  <div>
                    <div class="flex items-start gap-1.5">
                      <div class="flex-1">
                        <CheckboxOption
                          label={item.label}
                          checked={step3Selected.includes(item.id)}
                          onchange={() => toggleStep3(item.id)}
                        />
                      </div>
                      {#if item.details}
                        <button
                          type="button"
                          class="mt-2.5 shrink-0 flex size-6 items-center justify-center rounded-full text-sand-400 transition-colors hover:bg-night-50 hover:text-night-600"
                          onclick={() => toggleStep3Info(item.id)}
                          aria-label="Mai multe detalii"
                          aria-expanded={step3ExpandedInfo === item.id}
                        >
                          <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      {/if}
                    </div>
                    {#if step3ExpandedInfo === item.id && item.details}
                      <div class="ml-9 mt-1 rounded-lg border border-night-100 bg-night-50/50 px-3.5 py-2.5">
                        <p class="text-xs leading-relaxed text-night-700">{item.details}</p>
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </fieldset>
            <button type="button" class="btn-primary mt-6" onclick={handleStep3Submit}>
              Continuă
            </button>
          </div>
        {/snippet}
      </QuestionCard>

    <!-- STEP 4: Emotional Saboteurs -->
    {:else if $currentStep === 4}
      <QuestionCard text={stepMeta[3].subtitle} subtext="">
        {#snippet children()}
          <div class="space-y-4">
            <fieldset>
              <legend class="sr-only">Sabotori emoționali</legend>
              <div class="space-y-1">
                {#each step4Items as item}
                  <CheckboxOption
                    label={item.label}
                    checked={step4Selected.includes(item.id)}
                    onchange={() => toggleStep4(item.id)}
                  />
                {/each}
              </div>
            </fieldset>
            <button type="button" class="btn-primary mt-6" onclick={handleStep4Submit}>
              Continuă
            </button>
          </div>
        {/snippet}
      </QuestionCard>

    <!-- STEP 5: Biological Safety -->
    {:else if $currentStep === 5}
      <QuestionCard text={stepMeta[4].subtitle} subtext="Răspunde sincer, nu există răspunsuri greșite. Alege DA sau NU pentru fiecare.">
        {#snippet children()}
          <div class="space-y-4">
            <div class="space-y-3">
              {#each step5Questions as question}
                <YesNoQuestion
                  text={question.text}
                  value={step5Answers[question.id]}
                  onchange={(val) => setStep5Answer(question.id, val)}
                />
              {/each}
            </div>
            <button
              type="button"
              class="btn-primary mt-6"
              disabled={!allStep5Answered}
              onclick={handleStep5Submit}
            >
              Continuă
            </button>
          </div>
        {/snippet}
      </QuestionCard>

    <!-- STEP 6: Demographics -->
    {:else if $currentStep === 6}
      <QuestionCard text={stepMeta[5].subtitle} subtext="Ne ajută să personalizăm recomandările pentru tine.">
        {#snippet children()}
          <div class="space-y-6">
            <!-- Sex -->
            <fieldset>
              <legend class="text-sm font-semibold text-sand-700 mb-2.5">Sex</legend>
              <div class="space-y-2">
                {#each sexOptions as option}
                  <OptionButton
                    label={option.label}
                    selected={step6Sex === option.id}
                    onclick={() => { step6Sex = option.id; }}
                  />
                {/each}
              </div>
            </fieldset>

            <!-- Age range -->
            <fieldset>
              <legend class="text-sm font-semibold text-sand-700 mb-2.5">Vârstă</legend>
              <div class="space-y-2">
                {#each ageRangeOptions as option}
                  <OptionButton
                    label={option.label}
                    selected={step6Age === option.id}
                    onclick={() => { step6Age = option.id; }}
                  />
                {/each}
              </div>
            </fieldset>

            <!-- Menopause (conditional) -->
            {#if showMenopause}
              <fieldset>
                <legend class="text-sm font-semibold text-sand-700 mb-2.5">Status menopauză</legend>
                <div class="space-y-2">
                  {#each menopauseOptions as option}
                    <OptionButton
                      label={option.label}
                      selected={step6Menopause === option.id}
                      onclick={() => { step6Menopause = option.id; }}
                    />
                  {/each}
                </div>
              </fieldset>
            {/if}

            <!-- Body type -->
            <fieldset>
              <legend class="text-sm font-semibold text-sand-700 mb-2.5">Tipologie corporală</legend>
              <div class="space-y-2">
                {#each bodyTypeOptions as option}
                  <OptionButton
                    label={option.label}
                    selected={step6Body === option.id}
                    onclick={() => { step6Body = option.id; }}
                  />
                {/each}
              </div>
            </fieldset>

            <button
              type="button"
              class="btn-primary mt-6"
              disabled={!allStep6Answered}
              onclick={handleStep6Submit}
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
    <div class="relative mx-auto mt-6 max-w-2xl text-center">
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-sand-500 transition-colors hover:text-sand-700"
        onclick={handleBack}
      >
        <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
        </svg>
        Înapoi
      </button>
    </div>
  {/if}
</div>
