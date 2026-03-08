<template>
  <section class="py-24 md:py-32 relative overflow-hidden"
    style="background: linear-gradient(135deg, var(--hero-from), var(--hero-to))">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-10"
        style="background: radial-gradient(ellipse, var(--accent) 0%, transparent 70%)" />
    </div>
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, var(--accent), transparent)" />
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, var(--accent)/0.4, transparent)" />

    <div class="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
      <div ref="el" :class="['reveal', isVisible && 'visible']">
        <span class="section-label justify-center mb-5" style="color:var(--accent); --section-color:var(--accent)">
          {{ $t('cta.sectionLabel') }}
        </span>

        <h2 class="font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-5 mt-3">
          {{ $t('cta.title') }}<br />
          <span style="background: linear-gradient(135deg, var(--accent-light), var(--accent)); -webkit-background-clip: text; background-clip: text; color: transparent">
            {{ $t('cta.titleAccent') }}
          </span>
        </h2>

        <p class="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          {{ $t('cta.desc') }}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <NuxtLink to="/contact" class="btn-gold w-full sm:w-auto justify-center">
            {{ $t('cta.btnContact') }}
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
          <NuxtLink to="/events" class="btn-outline w-full sm:w-auto justify-center">
            {{ $t('cta.btnEvents') }}
          </NuxtLink>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 text-sm text-white/40">
          <a href="tel:+4526161439" class="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
            <Phone class="w-3.5 h-3.5" /> +45 26 16 14 39
          </a>
          <a href="mailto:info@biak.dk" class="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
            <Mail class="w-3.5 h-3.5" /> info@biak.dk
          </a>
          <span class="flex items-center gap-2">
            <MapPin class="w-3.5 h-3.5" /> Kirkevej 10, Brønderslev
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-vue-next'
const { t } = useI18n()
const { el, isVisible } = useReveal()
</script>
