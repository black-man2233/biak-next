<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-terra-900 via-terra-800 to-[#2d1f14]" />

    <!-- Warm glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-20"
        style="background: radial-gradient(ellipse, #c9a84c 0%, transparent 70%)" />
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10"
        style="background: radial-gradient(ellipse, #e8c76a 0%, transparent 70%)" />
    </div>

    <!-- Subtle pattern -->
    <div class="absolute inset-0 opacity-[0.04]"
      style="background-image: repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px);" />

    <!-- Decorative cross (right side, large) -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden xl:block" aria-hidden>
      <svg width="400" height="600" viewBox="0 0 400 600" fill="none">
        <rect x="175" y="0" width="50" height="600" fill="white" rx="8" />
        <rect x="0" y="200" width="400" height="50" fill="white" rx="8" />
      </svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 text-center">

      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-10"
        style="animation: fadeIn 0.6s ease both"
      >
        <span class="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        <span class="text-gold-300 text-xs font-semibold tracking-widest uppercase">
          Søndagsgudstjeneste · Kl. 10:30
        </span>
      </div>

      <!-- Heading -->
      <h1
        class="font-serif font-bold text-white leading-[1.1] mb-3 tracking-tight"
        style="font-size: clamp(2.8rem, 8vw, 6rem); animation: fadeUp 0.8s 0.1s ease both"
      >
        Oplev Guds<br />
        <span class="text-transparent" style="background: linear-gradient(135deg, #e8c76a, #c9a84c); -webkit-background-clip: text; background-clip: text;">
          Kærlighed
        </span>
      </h1>
      <h2
        class="font-serif font-normal italic text-white/70 mb-8"
        style="font-size: clamp(1.5rem, 4vw, 3rem); animation: fadeUp 0.8s 0.22s ease both"
      >
        &amp; Hans Kraft
      </h2>

      <!-- Gold divider -->
      <div
        class="w-20 h-0.5 mx-auto mb-8"
        style="background: linear-gradient(90deg, transparent, #c9a84c, transparent); animation: fadeIn 0.8s 0.3s ease both"
      />

      <!-- Subtitle -->
      <p
        class="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
        style="animation: fadeUp 0.8s 0.38s ease both"
      >
        Et levende kristent fællesskab i Brønderslev med folk fra hele verden.
        Dansk, engelsk, swahili og spansk — du er altid velkommen.
      </p>

      <!-- CTAs -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        style="animation: fadeUp 0.8s 0.48s ease both"
      >
        <NuxtLink to="/about" class="btn-primary !bg-gold-500 !border-gold-500 hover:!bg-gold-600 hover:!border-gold-600 !text-white">
          Lær Os At Kende
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
        <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer" class="btn-outline">
          <Play class="w-4 h-4" />
          Se Live Stream
        </a>
      </div>

      <!-- Stats -->
      <div
        class="flex items-center justify-center gap-8 sm:gap-16"
        style="animation: fadeIn 1s 0.65s ease both"
      >
        <div>
          <p class="font-serif font-bold text-white text-3xl sm:text-4xl">10+</p>
          <p class="text-white/40 text-xs sm:text-sm mt-1 uppercase tracking-wider">Nationaliteter</p>
        </div>
        <div class="w-px h-10 bg-white/10" />
        <div>
          <p class="font-serif font-bold text-white text-3xl sm:text-4xl">4</p>
          <p class="text-white/40 text-xs sm:text-sm mt-1 uppercase tracking-wider">Sprog</p>
        </div>
        <div class="w-px h-10 bg-white/10" />
        <div>
          <p class="font-serif font-bold text-3xl sm:text-4xl"
            style="background: linear-gradient(135deg, #e8c76a, #c9a84c); -webkit-background-clip: text; background-clip: text; color: transparent">∞</p>
          <p class="text-white/40 text-xs sm:text-sm mt-1 uppercase tracking-wider">Kærlighed</p>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style="animation: fadeIn 1.2s 1s ease both">
      <span class="text-white/25 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Play } from 'lucide-vue-next'
</script>
