<template>
  <div>
    <!-- Hero -->
    <section class="bg-terra-900 pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style="background: radial-gradient(ellipse, #c9a84c 0%, transparent 70%)" />
      </div>
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
        <span class="section-label !text-gold-400 mb-4" style="--section-color:#c9a84c">Kalender</span>
        <h1 class="font-serif font-bold text-white text-4xl sm:text-5xl mt-3 leading-tight">
          Kommende <span style="background: linear-gradient(135deg, #e8c76a, #c9a84c); -webkit-background-clip: text; background-clip: text; color: transparent">Events</span>
        </h1>
        <p class="text-white/60 mt-4 max-w-md">Mød os til gudstjenester, bøn, ungdomsmøder og meget mere.</p>
      </div>
    </section>

    <!-- Filter bar -->
    <section class="sticky top-16 z-30 bg-warm/95 backdrop-blur border-b border-warm-100 py-3">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-2 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="activeCategory = cat.value"
          :class="['px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors', activeCategory === cat.value ? 'bg-terra-700 text-white' : 'bg-warm-100 text-warm-500 hover:bg-warm-200']"
        >
          {{ cat.label }}
        </button>
      </div>
    </section>

    <!-- Events list -->
    <section class="py-16 bg-warm min-h-[50vh]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-if="pending" class="flex items-center justify-center py-20">
          <div class="w-8 h-8 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
        </div>

        <div v-else-if="!filteredEvents.length" class="card p-16 text-center">
          <Calendar class="w-10 h-10 text-warm-200 mx-auto mb-3" />
          <p class="text-warm-400 text-sm">Ingen events fundet i denne kategori.</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="card group flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition-shadow"
          >
            <!-- Date column -->
            <div class="sm:w-24 flex-shrink-0 flex sm:flex-col items-center justify-center gap-3 sm:gap-0 bg-terra-900 p-5 sm:p-4 text-center">
              <p class="text-gold-400 text-[10px] font-bold uppercase tracking-widest">{{ fmtMonth(event.date) }}</p>
              <p class="font-serif font-bold text-white text-3xl leading-none">{{ fmtDay(event.date) }}</p>
              <p class="text-white/40 text-[10px] mt-1 capitalize hidden sm:block">{{ fmtWeekday(event.date) }}</p>
            </div>

            <!-- Image (optional) -->
            <div v-if="event.imageUrl" class="sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
              <img :src="event.imageUrl" :alt="event.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            <!-- Content -->
            <div class="p-5 sm:p-6 flex-1 min-w-0">
              <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <h3 class="font-serif font-bold text-terra-900 text-lg group-hover:text-terra-600 transition-colors">{{ event.title }}</h3>
                <span :class="['text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0', catStyle(event.category)]">
                  {{ catLabel(event.category) }}
                </span>
              </div>
              <p class="text-warm-500 text-sm leading-relaxed mb-4 line-clamp-2">{{ event.description }}</p>
              <div class="flex flex-wrap gap-4 text-xs text-warm-400">
                <span v-if="event.startTime" class="flex items-center gap-1.5">
                  <Clock class="w-3 h-3" />
                  {{ event.startTime }}{{ event.endTime ? ` – ${event.endTime}` : '' }}
                </span>
                <span class="flex items-center gap-1.5">
                  <MapPin class="w-3 h-3" />
                  {{ event.location }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Clock, MapPin } from 'lucide-vue-next'

useHead({ title: 'Events — BIAK' })

const { data, pending } = await useFetch('/api/events')

const categories = [
  { value: 'all', label: 'Alle' },
  { value: 'service', label: 'Gudstjeneste' },
  { value: 'prayer', label: 'Bøn' },
  { value: 'youth', label: 'Unge' },
  { value: 'general', label: 'Generelt' },
]
const activeCategory = ref('all')

const filteredEvents = computed(() => {
  const evts = data.value ?? []
  if (activeCategory.value === 'all') return evts
  return evts.filter((e: any) => e.category === activeCategory.value)
})

function catLabel(cat: string) {
  return { service: 'Gudstjeneste', prayer: 'Bøn', youth: 'Unge', general: 'Generelt' }[cat] ?? cat
}
function catStyle(cat: string) {
  return { service: 'bg-terra-100 text-terra-700', prayer: 'bg-warm-100 text-warm-600', youth: 'bg-gold-100 text-gold-700', general: 'bg-gray-100 text-gray-600' }[cat] ?? 'bg-gray-100 text-gray-600'
}
function fmtMonth(d: string) { return new Date(d).toLocaleDateString('da-DK', { month: 'short' }) }
function fmtDay(d: string)   { return new Date(d).getDate() }
function fmtWeekday(d: string) { return new Date(d).toLocaleDateString('da-DK', { weekday: 'long' }) }
</script>
