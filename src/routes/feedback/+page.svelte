<script lang="ts">
  let rating = $state<number | null>(null);
  let suggestion = $state('');
  let submitted = $state(false);

  function handleSubmit() {
    if (rating === null) return;
    // TODO: send to backend when available
    submitted = true;
  }
</script>

<div class="relative min-h-screen bg-sand-50 px-4 py-8 sm:py-12">
  <div class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-night-50/30 to-transparent" aria-hidden="true"></div>

  <!-- Logo -->
  <div class="relative mb-10 text-center">
    <a href="/" class="inline-block font-serif text-xl font-semibold text-night-700 transition-colors hover:text-night-900">
      Better Sleep
    </a>
  </div>

  <div class="relative mx-auto max-w-xl">
    {#if submitted}
      <!-- Success state -->
      <div class="rounded-2xl bg-white px-6 py-12 shadow-md shadow-sand-200/60 ring-1 ring-sand-200/80 text-center sm:px-10">
        <svg class="mx-auto size-10 text-night-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <p class="mt-4 font-serif text-2xl font-medium text-sand-900">Mulțumim.</p>
        <p class="mt-2 text-[15px] leading-relaxed text-sand-600">
          Feedback-ul tău ne ajută să facem analiza mai precisă și mai utilă.
        </p>
        <a
          href="/rezultat"
          class="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-night-600 transition-colors hover:text-night-800"
        >
          <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
          </svg>
          Înapoi la rezultat
        </a>
      </div>
    {:else}
      <!-- Feedback form -->
      <div class="relative overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-md shadow-sand-200/60 ring-1 ring-sand-200/80 sm:px-10 sm:py-10">
        <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-night-500/60 via-night-400/80 to-night-500/60"></div>

        <h1 class="font-serif text-2xl font-medium text-sand-900 sm:text-3xl">
          Părerea ta contează
        </h1>
        <p class="mt-2 text-[15px] leading-relaxed text-sand-600">
          Răspunsurile sunt anonime și ne ajută să îmbunătățim analiza.
        </p>

        <div class="mt-10 space-y-10">
          <!-- Question 1: Rating -->
          <div>
            <p class="font-serif text-lg font-medium text-sand-900">
              Cât de bine ți s-a potrivit rezultatul?
            </p>
            <p class="mt-1 flex items-center justify-between text-xs text-sand-400">
              <span>Deloc</span>
              <span>Foarte bine</span>
            </p>
            <div class="mt-3 flex gap-2">
              {#each Array.from({ length: 10 }, (_, i) => i + 1) as n}
                <button
                  type="button"
                  onclick={() => { rating = n; }}
                  class="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-150
                    {rating === n
                      ? 'bg-night-600 text-white shadow-sm'
                      : 'border border-sand-200 bg-sand-50 text-sand-600 hover:border-night-300 hover:bg-night-50 hover:text-night-700'}"
                >
                  {n}
                </button>
              {/each}
            </div>
          </div>

          <!-- Question 2: Suggestions -->
          <div>
            <label for="suggestion" class="block font-serif text-lg font-medium text-sand-900">
              Ce crezi că poate fi îmbunătățit?
            </label>
            <textarea
              id="suggestion"
              bind:value={suggestion}
              rows="4"
              placeholder="Orice observație e binevenită..."
              class="mt-3 w-full resize-y rounded-lg border border-sand-300 bg-white px-4 py-3 text-sm leading-relaxed text-sand-900 placeholder:text-sand-400 transition-colors focus:border-night-400 focus:ring-2 focus:ring-night-200 focus:outline-none"
            ></textarea>
          </div>

          <!-- Submit -->
          <button
            type="button"
            onclick={handleSubmit}
            disabled={rating === null}
            class="btn-primary"
          >
            Trimite feedback
          </button>
        </div>
      </div>

      <div class="mt-6 text-center">
        <a
          href="/rezultat"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-sand-500 transition-colors hover:text-sand-700"
        >
          <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
          </svg>
          Înapoi la rezultat
        </a>
      </div>
    {/if}
  </div>
</div>
