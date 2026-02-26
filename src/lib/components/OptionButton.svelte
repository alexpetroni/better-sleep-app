<script lang="ts">
  let { label, selected = false, onclick }: { label: string; selected?: boolean; onclick: () => void } = $props();
</script>

<button
  type="button"
  class="group relative block w-full cursor-pointer rounded-xl border px-5 py-4 text-left transition-all duration-200 focus:outline-hidden
    {selected
      ? 'border-night-500 bg-night-50 shadow-md shadow-night-200/40 ring-1 ring-night-500/50'
      : 'border-sand-200 bg-white shadow-sm hover:border-night-300 hover:bg-night-50/30 hover:shadow-md hover:shadow-sand-200/50'}"
  onclick={onclick}
>
  <span class="flex items-center gap-3">
    <!-- Radio indicator -->
    <span
      class="flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200
        {selected ? 'border-night-600 bg-night-600' : 'border-sand-300 group-hover:border-night-400'}"
    >
      {#if selected}
        <span class="size-2 rounded-full bg-white"></span>
      {/if}
    </span>
    <span class="text-base font-medium {selected ? 'text-night-900' : 'text-sand-800'}">{label}</span>
  </span>
</button>
