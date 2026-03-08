<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background gradient — theme aware -->
    <div class="absolute inset-0" style="background: linear-gradient(135deg, var(--hero-from), var(--hero-to))" />

    <!-- Warm glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-20"
        style="background: radial-gradient(ellipse, var(--accent) 0%, transparent 70%)" />
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10"
        style="background: radial-gradient(ellipse, var(--accent-light) 0%, transparent 70%)" />
    </div>

    <!-- Grid pattern -->
    <div class="absolute inset-0 opacity-[0.04]"
      style="background-image: repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px);" />

    <!-- Decorative cross -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden xl:block" aria-hidden>
      <svg width="400" height="600" viewBox="0 0 400 600" fill="none">
        <rect x="175" y="0" width="50" height="600" fill="white" rx="8" />
        <rect x="0" y="200" width="400" height="50" fill="white" rx="8" />
      </svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 text-center">

      <!-- Badge -->
      <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 mb-10"
        style="animation: fadeIn 0.6s ease both">
        <span class="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
        <span class="text-[var(--accent-light)] text-xs font-semibold tracking-widest uppercase">
          {{ $t('hero.badge') }}
        </span>
      </div>

      <!-- Heading -->
      <h1 class="font-serif font-bold text-white leading-[1.1] mb-3 tracking-tight"
        style="font-size: clamp(2.8rem, 8vw, 6rem); animation: fadeUp 0.8s 0.1s ease both">
        {{ $t('hero.title') }}<br />
        <span class="text-transparent" style="background: linear-gradient(135deg, var(--accent-light), var(--accent)); -webkit-background-clip: text; background-clip: text;">
          {{ $t('hero.titleAccent') }}
        </span>
      </h1>
      <h2 class="font-serif font-normal italic text-white/70 mb-8"
        style="font-size: clamp(1.5rem, 4vw, 3rem); animation: fadeUp 0.8s 0.22s ease both">
        {{ $t('hero.subtitle2') }}
      </h2>

      <!-- Gold divider -->
      <div class="w-20 h-0.5 mx-auto mb-8"
        style="background: linear-gradient(90deg, transparent, var(--accent), transparent); animation: fadeIn 0.8s 0.3s ease both" />

      <!-- Subtitle -->
      <p class="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
        style="animation: fadeUp 0.8s 0.38s ease both">
        {{ $t('hero.desc') }}
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        style="animation: fadeUp 0.8s 0.48s ease both">
        <NuxtLink to="/about" class="btn-gold w-full sm:w-auto justify-center">
          {{ $t('hero.ctaLearn') }}
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
        <a href="https://www.youtube.com/@biakyoutube" target="_blank" rel="noopener noreferrer" class="btn-outline w-full sm:w-auto justify-center">
          <Play class="w-4 h-4" />
          {{ $t('hero.ctaLive') }}
        </a>
      </div>

      <!-- Stats -->
      <div class="flex items-center justify-center gap-8 sm:gap-16"
        style="animation: fadeIn 1s 0.65s ease both">
        <div>
          <p class="font-serif font-bold text-white text-3xl sm:text-4xl">10+</p>
          <p class="text-white/40 text-xs sm:text-sm mt-1 uppercase tracking-wider">{{ $t('hero.stat1Label') }}</p>
        </div>
        <div class="w-px h-10 bg-white/10" />
        <div>
          <p class="font-serif font-bold text-white text-3xl sm:text-4xl">4</p>
          <p class="text-white/40 text-xs sm:text-sm mt-1 uppercase tracking-wider">{{ $t('hero.stat2Label') }}</p>
        </div>
        <div class="w-px h-10 bg-white/10" />
        <div>
          <p class="font-serif font-bold text-3xl sm:text-4xl text-transparent"
            style="background: linear-gradient(135deg, var(--accent-light), var(--accent)); -webkit-background-clip: text; background-clip: text;">∞</p>
          <p class="text-white/40 text-xs sm:text-sm mt-1 uppercase tracking-wider">{{ $t('hero.stat3Label') }}</p>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style="animation: fadeIn 1.2s 1s ease both">
      <span class="text-white/25 text-[10px] uppercase tracking-[0.2em]">{{ $t('hero.scroll') }}</span>
      <div class="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Play } from 'lucide-vue-next'
const { t } = useI18n()
</script>
