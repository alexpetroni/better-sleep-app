<script lang="ts">
  let { label, checked = false, onchange }: { label: string; checked?: boolean; onchange: (checked: boolean) => void } = $props();

  let id = $derived(`cb-${label.replace(/\s/g, '-').toLowerCase()}`);
</script>

<label
  for={id}
  class="group flex cursor-pointer gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150
    {checked ? 'bg-night-50/60' : 'hover:bg-sand-100/60'}"
>
  <div class="flex h-6 shrink-0 items-center">
    <div class="grid size-[18px] grid-cols-1">
      <input
        {id}
        type="checkbox"
        {checked}
        onchange={(e) => onchange(e.currentTarget.checked)}
        class="col-start-1 row-start-1 appearance-none rounded border-[1.5px] border-sand-300 bg-white transition-colors duration-150 checked:border-night-600 checked:bg-night-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-600 group-hover:border-sand-400 forced-colors:appearance-auto"
      />
      <svg class="pointer-events-none col-start-1 row-start-1 size-[18px] self-center justify-self-center stroke-white p-0.5" viewBox="0 0 14 14" fill="none">
        <path class="opacity-0 transition-opacity duration-150 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
  <span class="text-sm/6 font-medium {checked ? 'text-night-900' : 'text-sand-800'}">{label}</span>
</label>
