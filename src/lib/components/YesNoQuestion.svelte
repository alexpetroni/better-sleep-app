<script lang="ts">
  let { text, value, onchange }: {
    text: string;
    value: boolean | undefined;
    onchange: (val: boolean) => void;
  } = $props();
</script>

<div class="flex items-center justify-between gap-4 rounded-xl border border-sand-200 bg-white px-5 py-4 shadow-sm transition-shadow duration-200 hover:shadow-md hover:shadow-sand-200/50">
  <span class="text-[15px] leading-relaxed text-sand-800">{text}</span>
  <div class="flex shrink-0 gap-1.5">
    <button
      type="button"
      class="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200
        {value === true
          ? 'bg-night-600 text-white shadow-sm shadow-night-600/30'
          : 'border border-sand-200 bg-sand-50 text-sand-600 hover:border-night-300 hover:bg-night-50 hover:text-night-700'}"
      onclick={() => onchange(true)}
    >Da</button>
    <button
      type="button"
      class="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200
        {value === false
          ? 'bg-sand-600 text-white shadow-sm shadow-sand-600/30'
          : 'border border-sand-200 bg-sand-50 text-sand-600 hover:border-sand-400 hover:bg-sand-100'}"
      onclick={() => onchange(false)}
    >Nu</button>
  </div>
</div>
