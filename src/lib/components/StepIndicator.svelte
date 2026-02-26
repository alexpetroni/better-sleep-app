<script lang="ts">
  import { stepMeta } from '$lib/data/steps';

  let { currentStep }: { currentStep: number } = $props();

  // Only show diagnostic steps (1-6), not the result step (7)
  const diagnosticSteps = stepMeta.filter(s => s.number <= 6);
</script>

<nav aria-label="Progres diagnostic" class="mx-auto max-w-2xl px-4">
  <!-- Progress bar (background) -->
  <div class="relative mb-4">
    <div class="h-1 rounded-full bg-sand-200">
      <div
        class="h-1 rounded-full bg-gradient-to-r from-night-500 to-night-600 transition-all duration-500 ease-out"
        style="width: {Math.min(((currentStep - 1) / (diagnosticSteps.length - 1)) * 100, 100)}%"
      ></div>
    </div>
  </div>

  <!-- Step dots + labels -->
  <ol role="list" class="flex items-center justify-between">
    {#each diagnosticSteps as step, i}
      {@const status = step.number < currentStep ? 'complete' : step.number === currentStep ? 'current' : 'upcoming'}
      <li class="flex flex-col items-center gap-1.5">
        <span
          class="flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300
            {status === 'complete' ? 'bg-night-600 text-white shadow-sm' :
             status === 'current' ? 'border-2 border-night-600 text-night-700 shadow-sm shadow-night-200' :
             'border border-sand-300 text-sand-400'}"
          aria-current={status === 'current' ? 'step' : undefined}
        >
          {#if status === 'complete'}
            <svg class="size-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          {:else}
            {step.number}
          {/if}
        </span>
        <span class="hidden text-[11px] sm:block {status === 'upcoming' ? 'text-sand-400' : status === 'current' ? 'font-semibold text-night-700' : 'font-medium text-sand-600'}">
          {step.title}
        </span>
      </li>
      {#if i < diagnosticSteps.length - 1}
        <div class="mb-5 sm:mb-6 mx-0.5 h-px flex-1" aria-hidden="true"></div>
      {/if}
    {/each}
  </ol>
</nav>
