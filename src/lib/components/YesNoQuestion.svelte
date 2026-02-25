<script lang="ts">
  let { text, value, onchange }: {
    text: string;
    value: boolean | undefined;
    onchange: (val: boolean) => void;
  } = $props();
</script>

<div class="flex items-center justify-between gap-4 rounded-lg border border-sand-200 bg-white px-5 py-4 shadow-xs">
  <span class="text-base text-sand-900">{text}</span>
  <div class="flex shrink-0 gap-2">
    <button
      type="button"
      class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200
        {value === true
          ? 'bg-night-600 text-white shadow-sm'
          : 'border border-sand-300 bg-white text-sand-700 hover:bg-sand-50'}"
      onclick={() => onchange(true)}
    >Da</button>
    <button
      type="button"
      class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200
        {value === false
          ? 'bg-sand-500 text-white shadow-sm'
          : 'border border-sand-300 bg-white text-sand-700 hover:bg-sand-50'}"
      onclick={() => onchange(false)}
    >Nu</button>
  </div>
</div>
