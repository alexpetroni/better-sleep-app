<script lang="ts">
  let { label, checked = false, onchange }: { label: string; checked?: boolean; onchange: (checked: boolean) => void } = $props();

  let id = $derived(`cb-${label.replace(/\s/g, '-').toLowerCase()}`);
</script>

<!-- Checkbox pattern from @tailwind/checkboxes/list_with_description adapted -->
<div class="flex gap-3">
  <div class="flex h-6 shrink-0 items-center">
    <div class="group grid size-4 grid-cols-1">
      <input
        {id}
        type="checkbox"
        {checked}
        onchange={(e) => onchange(e.currentTarget.checked)}
        class="col-start-1 row-start-1 appearance-none rounded-sm border border-sand-300 bg-white checked:border-night-600 checked:bg-night-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-600 forced-colors:appearance-auto"
      />
      <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white" viewBox="0 0 14 14" fill="none">
        <path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
  <div class="text-sm/6">
    <label for={id} class="font-medium text-sand-900 cursor-pointer">{label}</label>
  </div>
</div>
