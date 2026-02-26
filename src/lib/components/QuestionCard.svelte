<script lang="ts">
  import type { Snippet } from 'svelte';

  let { text, subtext = '', children }: { text: string; subtext?: string; children: Snippet } = $props();
</script>

<div class="mx-auto max-w-2xl">
  <div class="relative overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-md shadow-sand-200/60 ring-1 ring-sand-200/80 sm:px-10 sm:py-10">
    <!-- Top accent line -->
    <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-night-500/60 via-night-400/80 to-night-500/60"></div>

    <h2 class="font-serif text-2xl font-medium text-sand-900 sm:text-3xl">{text}</h2>
    {#if subtext}
      <p class="mt-2 text-sm leading-relaxed text-sand-500">{subtext}</p>
    {/if}
    <div class="mt-8">
      {@render children()}
    </div>
  </div>
</div>
