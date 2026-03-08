<template>
  <section class="py-24 md:py-32 bg-warm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Header -->
      <div ref="headerEl" :class="['reveal text-center mb-16', headerVisible && 'visible']">
        <span class="section-label justify-center mb-4">Gudstjenester &amp; Møder</span>
        <h2 class="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-terra-900 mt-3">
          Mød Os <span class="text-gold-600">Denne Uge</span>
        </h2>
        <p class="text-warm-500 mt-4 max-w-md mx-auto">Vi samles regelmæssigt — alle er velkomne uanset baggrund</p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(s, i) in services"
          :key="s.title"
          :ref="el => cardEls[i] = el as Element"
          :class="['reveal card group', cardVisible[i] && 'visible', `delay-${i * 100 + 100}`, s.primary && 'ring-2 ring-gold-400']"
        >
          <!-- Top accent bar -->
          <div class="h-1.5" :class="s.primary ? 'bg-gradient-to-r from-gold-500 to-gold-400' : 'bg-gradient-to-r from-warm-200 to-warm-100'" />

          <div class="p-7">
            <!-- Day badge -->
            <div class="flex items-center justify-between mb-5">
              <span
                class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                :class="s.primary ? 'text-gold-600' : 'text-warm-400'"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="s.primary ? 'bg-gold-500' : 'bg-warm-300'" />
                {{ s.day }}
              </span>
              <span v-if="s.primary" class="text-[10px] bg-gold-100 text-gold-700 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide">
                Primær
              </span>
            </div>

            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              :class="s.primary ? 'bg-gold-100' : 'bg-warm-100'">
              <component :is="s.icon" class="w-5 h-5" :class="s.primary ? 'text-gold-600' : 'text-warm-500'" />
            </div>

            <h3 class="font-serif font-bold text-xl text-terra-900 mb-2">{{ s.title }}</h3>
            <p class="text-warm-500 text-sm leading-relaxed mb-6">{{ s.desc }}</p>

            <div class="space-y-2 mb-5 text-sm text-warm-500">
              <div class="flex items-center gap-2.5">
                <Clock class="w-3.5 h-3.5 text-warm-300 flex-shrink-0" />
                {{ s.time }}
              </div>
              <div class="flex items-center gap-2.5">
                <MapPin class="w-3.5 h-3.5 text-warm-300 flex-shrink-0" />
                <span class="truncate">{{ s.location }}</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-1.5 pt-5 border-t border-warm-100">
              <span
                v-for="f in s.features"
                :key="f"
                class="px-2.5 py-1 text-xs rounded-full font-medium"
                :class="s.primary ? 'bg-gold-100 text-gold-700' : 'bg-warm-100 text-warm-500'"
              >{{ f }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Live stream bar -->
      <div ref="barEl" :class="['reveal mt-6 p-5 rounded-2xl bg-terra-900 flex flex-wrap items-center justify-between gap-4', barVisible && 'visible delay-400']">
        <div class="flex items-center gap-3 text-white/80">
          <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Wifi class="w-4 h-4 text-gold-400" />
          </div>
          <span class="text-sm">Kan du ikke være med fysisk? Se os live på Facebook — hver søndag kl. 10:30</span>
        </div>
        <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer"
          class="text-gold-400 hover:text-gold-300 text-sm font-semibold transition-colors flex items-center gap-1.5 group">
          Gå til Facebook
          <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Music, BookOpen, Star, Clock, MapPin, Wifi, ArrowRight } from 'lucide-vue-next'

const services = [
  {
    day: 'Søndag',
    time: '10:30 – 12:30',
    title: 'Søndagsgudstjeneste',
    desc: 'Tilbedelse, bøn og forkyndelse. Tolkning på dansk, engelsk, swahili og spansk.',
    icon: Music,
    features: ['Livemusik', 'Bibelundervisning', 'Bøn'],
    location: 'Kirkevej 10, Brønderslev',
    primary: true,
  },
  {
    day: 'Onsdag',
    time: '18:30 – 20:00',
    title: 'Bøn & Bibelundervisning',
    desc: 'Midtugs-samling med fokus på bøn og fordybelse i Bibelen.',
    icon: BookOpen,
    features: ['Bøn', 'Bibelstudium'],
    location: 'Kirkevej 12, Brønderslev',
    primary: false,
  },
  {
    day: 'Fredag',
    time: '18:00 – 20:00',
    title: 'Ungdomsmøde',
    desc: 'Månedligt møde med sjov, tilbedelse og stærkt fællesskab for unge.',
    icon: Star,
    features: ['Musik', 'Aktiviteter'],
    location: 'Kirkevej 10, Brønderslev',
    primary: false,
  },
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
