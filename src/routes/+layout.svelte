<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>Better Sleep — Diagnostic Flow</title>
  <meta name="description" content="Somnul nu este un mister. Este un indicator al siguranței tale biologice. Diagnostic personalizat în 5 pași." />
</svelte:head>

<div class="min-h-screen bg-sand-50">
  {@render children()}
</div>
