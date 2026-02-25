<script lang="ts">
  import type { ProtocolPhase } from '$lib/types';

  let { phase }: { phase: ProtocolPhase } = $props();

  const phaseColors: Record<string, string> = {
    REMOVE: 'border-l-warm-500',
    REPAIR: 'border-l-night-500',
    REGULATE: 'border-l-green-600'
  };
</script>

{#if phase.actions.length > 0}
  <details open class="group">
    <summary class="flex cursor-pointer items-center gap-3 rounded-lg bg-white px-5 py-4 shadow-xs ring-1 ring-sand-200 transition-colors hover:bg-sand-50">
      <svg class="size-5 shrink-0 text-sand-400 transition-transform group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
      </svg>
      <div>
        <h4 class="font-serif text-lg font-medium text-sand-900">{phase.name}</h4>
        <p class="text-sm text-sand-500">{phase.description}</p>
      </div>
    </summary>
    <div class="mt-3 space-y-2 pl-4">
      {#each phase.actions as action}
        <div class="flex items-start gap-3 rounded-lg border-l-4 bg-white px-4 py-3 shadow-xs {phaseColors[phase.id] ?? 'border-l-sand-300'}">
          <span class="mt-0.5 text-sand-400">•</span>
          <span class="text-sm text-sand-800">{action.text}</span>
        </div>
      {/each}
    </div>
  </details>
{/if}
