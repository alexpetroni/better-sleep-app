<script lang="ts">
  import type { Pillar, PillarStatus } from '$lib/types';

  let { pillar, status }: { pillar: Pillar; status: PillarStatus } = $props();

  const statusStyles: Record<PillarStatus, string> = {
    OK: 'border-green-200 bg-green-50 text-green-900',
    COMPROMISED: 'border-warm-200 bg-warm-50 text-warm-900',
    CRITICAL: 'border-red-200 bg-red-50 text-red-900'
  };

  const statusLabels: Record<PillarStatus, string> = {
    OK: 'OK',
    COMPROMISED: 'Compromis',
    CRITICAL: 'Critic'
  };

  const statusBadge: Record<PillarStatus, string> = {
    OK: 'bg-green-100 text-green-800',
    COMPROMISED: 'bg-warm-100 text-warm-800',
    CRITICAL: 'bg-red-100 text-red-800'
  };
</script>

<div class="rounded-xl border p-4 {statusStyles[status]}">
  <div class="flex items-start justify-between gap-2">
    <h4 class="font-serif text-base font-medium">{pillar.name}</h4>
    <span class="inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium {statusBadge[status]}">
      {statusLabels[status]}
    </span>
  </div>
  <p class="mt-1 text-sm leading-relaxed opacity-80">{pillar.description}</p>
</div>
