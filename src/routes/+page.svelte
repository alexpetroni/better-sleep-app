<!-- Landing page -->
<div class="relative min-h-screen overflow-hidden bg-night-900">
  <!-- Ambient glows -->
  <div class="absolute inset-0" aria-hidden="true">
    <div class="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-night-700/60 blur-[120px]"></div>
    <div class="absolute bottom-[-10%] left-1/4 w-[500px] h-[400px] rounded-full bg-warm-500/10 blur-[100px]"></div>
    <div class="absolute bottom-[-5%] right-1/4 w-[400px] h-[300px] rounded-full bg-night-600/30 blur-[80px]"></div>
  </div>

  <div class="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
    <!-- Badge -->
    <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-night-200 backdrop-blur-sm">
      <span class="size-1.5 rounded-full bg-warm-400"></span>
      6 pași &middot; 10 minute &middot; Protocol personalizat
    </div>

    <!-- Title -->
    <h1 class="mt-8 font-serif text-5xl font-semibold tracking-tight text-white sm:text-7xl">
      Better Sleep
    </h1>

    <!-- Subtitle -->
    <p class="mt-5 max-w-md font-serif text-xl leading-relaxed text-night-300 sm:text-2xl sm:leading-relaxed">
      Somnul nu este un mister.<br/>
      Este un indicator al siguranței tale biologice.
    </p>

    <!-- Divider -->
    <div class="mt-10 h-px w-16 bg-gradient-to-r from-transparent via-warm-400/60 to-transparent"></div>

    <!-- Description -->
    <p class="mt-10 max-w-sm text-base leading-relaxed text-night-400 sm:text-lg sm:leading-relaxed">
      Identifică ce îți sabotează somnul și primește un protocol personalizat în 3 faze.
    </p>

    <!-- CTA -->
    <a
      href="/diagnostic"
      class="mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-night-900 shadow-lg shadow-black/20 transition-all duration-200 hover:bg-sand-100 hover:shadow-xl hover:shadow-black/25 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Începe diagnosticul
      <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
      </svg>
    </a>

    <!-- Footer meta -->
    <p class="mt-10 text-xs tracking-wide text-night-500">
      8 tipare de somn &middot; 8 piloni de regenerare
    </p>
  </div>
</div>
