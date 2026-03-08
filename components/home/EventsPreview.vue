<template>
  <section class="py-24 md:py-32 bg-warm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Header -->
      <div ref="headerEl" :class="['reveal flex items-end justify-between mb-12 gap-4 flex-wrap', headerVisible && 'visible']">
        <div>
          <span class="section-label mb-3">Kalender</span>
          <h2 class="font-serif font-bold text-3xl sm:text-4xl text-terra-900 mt-3">
            Kommende <span class="text-gold-600">Events</span>
          </h2>
        </div>
        <NuxtLink to="/events" class="flex items-center gap-1.5 text-sm text-warm-400 hover:text-terra-600 transition-colors font-medium group">
          Se alle events
          <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="!events.length" class="card p-14 text-center">
        <Calendar class="w-10 h-10 text-warm-200 mx-auto mb-3" />
        <p class="text-warm-400 text-sm">Ingen kommende events på nuværende tidspunkt.</p>
      </div>

      <!-- Event cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(event, i) in events.slice(0, 3)"
          :key="event.id"
          :ref="el => cardEls[i] = el as Element"
          :class="['reveal card group overflow-hidden', cardVisible[i] && 'visible', `delay-${i * 100 + 100}`]"
        >
          <!-- Image or gradient -->
          <div class="h-44 overflow-hidden relative">
            <img
              v-if="event.imageUrl"
              :src="event.imageUrl"
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
              :style="`background: linear-gradient(135deg, ${gradients[i % 3][0]}, ${gradients[i % 3][1]})`"
            >
              <Calendar class="w-10 h-10 text-white/30" />
            </div>
            <!-- Category badge -->
            <div class="absolute top-3 right-3">
              <span :class="['text-xs font-semibold px-2.5 py-1 rounded-full', catStyle(event.category)]">
                {{ catLabel(event.category) }}
              </span>
            </div>
          </div>

          <div class="p-5">
            <!-- Date -->
            <div class="flex items-center gap-3 mb-4">
              <div class="text-center min-w-[2.5rem]">
                <p class="text-[10px] text-warm-400 uppercase font-bold tracking-wider leading-none">
                  {{ fmtMonth(event.date) }}
                </p>
                <p class="font-serif font-bold text-2xl text-terra-900 leading-tight">
                  {{ fmtDay(event.date) }}
                </p>
              </div>
              <div class="w-px h-9 bg-warm-100" />
              <p class="text-warm-400 text-xs capitalize">{{ fmtWeekday(event.date) }}</p>
            </div>

            <h3 class="font-serif font-semibold text-terra-900 text-base mb-2 group-hover:text-terra-600 transition-colors">
              {{ event.title }}
            </h3>
            <p class="text-warm-400 text-sm leading-relaxed line-clamp-2 mb-4">{{ event.description }}</p>

            <div class="space-y-1.5 pt-4 border-t border-warm-100 text-xs text-warm-400">
              <div v-if="event.startTime" class="flex items-center gap-2">
                <Clock class="w-3 h-3 flex-shrink-0 text-warm-300" />
                {{ event.startTime }}{{ event.endTime ? ` – ${event.endTime}` : '' }}
              </div>
              <div class="flex items-center gap-2">
                <MapPin class="w-3 h-3 flex-shrink-0 text-warm-300" />
                <span class="truncate">{{ event.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  events: Array<{
    id: string; title: string; description: string; date: string
    startTime: string | null; endTime: string | null; location: string
    category: string; imageUrl: string | null
  }>
}>()

const gradients = [
  ['#8b4513', '#62300d'],
  ['#c9a84c', '#a8842a'],
  ['#7c6a5a', '#4a3828'],
]

function catLabel(cat: string) {
  return { service: 'Gudstjeneste', prayer: 'Bøn', youth: 'Unge', general: 'Generelt' }[cat] ?? cat
}
function catStyle(cat: string) {
  return {
    service: 'bg-terra-100 text-terra-700',
    prayer:  'bg-warm-100 text-warm-600',
    youth:   'bg-gold-100 text-gold-700',
    general: 'bg-gray-100 text-gray-600',
  }[cat] ?? 'bg-gray-100 text-gray-600'
}
function fmtMonth(d: string)   { return new Date(d).toLocaleDateString('da-DK', { month: 'short' }) }
function fmtDay(d: string)     { return new Date(d).getDate() }
function fmtWeekday(d: string) { return new Date(d).toLocaleDateString('da-DK', { weekday: 'long' }) }

const { el: headerEl, isVisible: headerVisible } = useReveal()
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
