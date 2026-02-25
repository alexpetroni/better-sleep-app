<script lang="ts">
  import type { Snippet } from 'svelte';

  let { text, subtext = '', children }: { text: string; subtext?: string; children: Snippet } = $props();
</script>

<!-- Card based on @tailwind/layout/cards/basic_card pattern -->
<div class="mx-auto max-w-2xl">
  <div class="rounded-2xl bg-white px-6 py-8 shadow-xs ring-1 ring-sand-200 sm:px-10 sm:py-10">
    <h2 class="font-serif text-2xl font-medium text-sand-900 sm:text-3xl">{text}</h2>
    {#if subtext}
      <p class="mt-2 text-sm text-sand-500">{subtext}</p>
    {/if}
    <div class="mt-8">
      {@render children()}
    </div>
  </div>
</div>
