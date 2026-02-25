<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, children }: { title: string; children: Snippet } = $props();
</script>

<section class="border-t border-sand-200 pt-8">
  <h3 class="font-serif text-xl font-medium text-sand-900">{title}</h3>
  <div class="mt-4 text-sand-700 leading-relaxed">
    {@render children()}
  </div>
</section>
