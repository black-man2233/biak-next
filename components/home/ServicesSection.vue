<template>
  <section class="py-24 md:py-32 bg-warm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Header -->
      <div ref="headerEl" :class="['reveal text-center mb-16', headerVisible && 'visible']">
        <span class="section-label justify-center mb-4">{{ $t('services.sectionLabel') }}</span>
        <h2 class="font-serif font-bold text-3xl sm:text-4xl md:text-5xl mt-3" style="color:var(--text)">
          {{ $t('services.title') }} <span style="color:var(--accent)">{{ $t('services.titleAccent') }}</span>
        </h2>
        <p class="mt-4 max-w-md mx-auto text-sm" style="color:var(--text-mid)">{{ $t('services.subtitle') }}</p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(s, i) in services"
          :key="s.titleKey"
          :ref="el => cardEls[i] = el as Element"
          :class="['reveal card group', cardVisible[i] && 'visible', `delay-${i * 100 + 100}`, s.primary && 'ring-2 ring-[var(--accent)]']"
        >
          <div class="h-1.5" :style="s.primary ? 'background: linear-gradient(90deg, var(--accent), var(--accent-light))' : 'background: var(--border)'" />
          <div class="p-7">
            <div class="flex items-center justify-between mb-5">
              <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                :style="s.primary ? 'color:var(--accent)' : 'color:var(--text-mid)'">
                <span class="w-1.5 h-1.5 rounded-full" :style="s.primary ? 'background:var(--accent)' : 'background:var(--border-mid)'" />
                {{ $t(s.dayKey) }}
              </span>
              <span v-if="s.primary" class="text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide"
                style="background:var(--bg-secondary); color:var(--accent)">
                {{ $t('services.primaryBadge') }}
              </span>
            </div>
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              :style="s.primary ? 'background:var(--bg-secondary)' : 'background:var(--bg-secondary)'">
              <component :is="s.icon" class="w-5 h-5" :style="s.primary ? 'color:var(--accent)' : 'color:var(--text-mid)'" />
            </div>
            <h3 class="font-serif font-bold text-xl mb-2" style="color:var(--text)">{{ $t(s.titleKey) }}</h3>
            <p class="text-sm leading-relaxed mb-6" style="color:var(--text-mid)">{{ $t(s.descKey) }}</p>
            <div class="space-y-2 mb-5 text-sm" style="color:var(--text-mid)">
              <div class="flex items-center gap-2.5">
                <Clock class="w-3.5 h-3.5 flex-shrink-0" style="color:var(--border-mid)" />
                {{ s.time }}
              </div>
              <div class="flex items-center gap-2.5">
                <MapPin class="w-3.5 h-3.5 flex-shrink-0" style="color:var(--border-mid)" />
                <span class="truncate">{{ s.location }}</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-5 border-t border-[var(--border)]">
              <span v-for="fk in s.featureKeys" :key="fk"
                class="px-2.5 py-1 text-xs rounded-full font-medium"
                :style="s.primary ? 'background:var(--bg-secondary);color:var(--accent)' : 'background:var(--bg-secondary);color:var(--text-mid)'">
                {{ $t(fk) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Live stream bar -->
      <div ref="barEl" :class="['reveal mt-6 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4', barVisible && 'visible delay-400']"
        style="background: linear-gradient(135deg, var(--hero-from), var(--hero-to))">
        <div class="flex items-center gap-3 text-white/80">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
            <Wifi class="w-4 h-4" style="color:var(--accent)" />
          </div>
          <span class="text-sm">{{ $t('services.livestream') }}</span>
        </div>
        <div class="flex items-center gap-3">
          <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer"
            class="text-sm font-semibold transition-colors flex items-center gap-1.5 group hover:opacity-80"
            style="color:var(--accent)">
            {{ $t('services.livestreamBtn') }}
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="https://www.youtube.com/@biakyoutube" target="_blank" rel="noopener noreferrer"
            class="text-sm font-semibold transition-colors flex items-center gap-1.5 group hover:opacity-80 text-red-400">
            YouTube
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Music, BookOpen, Star, Clock, MapPin, Wifi, ArrowRight } from 'lucide-vue-next'
const { t } = useI18n()

const services = [
  { dayKey: 'services.sunday.day', titleKey: 'services.sunday.title', descKey: 'services.sunday.desc', icon: Music, featureKeys: ['services.sunday.f1', 'services.sunday.f2', 'services.sunday.f3'], time: '10:30 – 12:00', location: 'Kirkevej 10, Brønderslev', primary: true },
  { dayKey: 'services.wednesday.day', titleKey: 'services.wednesday.title', descKey: 'services.wednesday.desc', icon: BookOpen, featureKeys: ['services.wednesday.f1', 'services.wednesday.f2'], time: '18:30 – 20:00', location: 'Kirkevej 12, Brønderslev', primary: false },
  { dayKey: 'services.friday.day', titleKey: 'services.friday.title', descKey: 'services.friday.desc', icon: Star, featureKeys: ['services.friday.f1', 'services.friday.f2'], time: '18:00 – 20:00', location: 'Kirkevej 10, Brønderslev', primary: false },
]

const { el: headerEl, isVisible: headerVisible } = useReveal()
const { el: barEl, isVisible: barVisible } = useReveal()
const cardEls = ref<Element[]>([])
const cardVisible = ref([false, false, false])
onMounted(() => {
  cardEls.value.forEach((el, i) => {
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { cardVisible.value[i] = true; obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
  })
})
</script>
