<script lang="ts">
  let { label, selected = false, onclick }: { label: string; selected?: boolean; onclick: () => void } = $props();
</script>

<!-- Radio card pattern from @tailwind/radio-groups/stacked_cards adapted to warm theme -->
<button
  type="button"
  class="relative block w-full cursor-pointer rounded-lg border px-6 py-4 text-left shadow-xs transition-all duration-200 focus:outline-hidden
    {selected
      ? 'border-night-500 bg-night-50 ring-2 ring-night-500'
      : 'border-sand-200 bg-white hover:border-sand-300 hover:bg-sand-50'}"
  onclick={onclick}
>
  <span class="flex items-center">
    <span class="flex flex-col text-base">
      <span class="font-medium {selected ? 'text-night-900' : 'text-sand-900'}">{label}</span>
    </span>
  </span>
  <span
    class="pointer-events-none absolute -inset-px rounded-lg border-2 {selected ? 'border-night-500' : 'border-transparent'}"
    aria-hidden="true"
  ></span>
</button>
