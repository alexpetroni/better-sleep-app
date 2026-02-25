<script lang="ts">
  import { stepMeta } from '$lib/data/steps';

  let { currentStep }: { currentStep: number } = $props();
</script>

<nav aria-label="Progres diagnostic" class="mx-auto max-w-2xl px-4">
  <ol role="list" class="flex items-center justify-between">
    {#each stepMeta as step, i}
      {@const status = step.number < currentStep ? 'complete' : step.number === currentStep ? 'current' : 'upcoming'}
      <li class="flex items-center gap-2">
        <span
          class="flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300
            {status === 'complete' ? 'bg-night-600 text-white' :
             status === 'current' ? 'border-2 border-night-600 text-night-700' :
             'border border-sand-300 text-sand-400'}"
          aria-current={status === 'current' ? 'step' : undefined}
        >
          {#if status === 'complete'}
            <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          {:else}
            {step.number}
          {/if}
        </span>
        <span class="hidden text-sm sm:block {status === 'upcoming' ? 'text-sand-400' : 'font-medium text-sand-800'}">
          {step.title}
        </span>
      </li>
      {#if i < stepMeta.length - 1}
        <div class="mx-1 h-px flex-1 {step.number < currentStep ? 'bg-night-600' : 'bg-sand-200'}" aria-hidden="true"></div>
      {/if}
    {/each}
  </ol>
</nav>
