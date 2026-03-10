<template>
  <div>
    <PageHero
      :label="$t('sermons.sectionLabel')"
      :title="$t('sermons.heroTitle')"
      :title-accent="$t('sermons.heroTitleAccent')"
      :desc="$t('sermons.heroDesc')"
    />

    <HomeSlideshow v-if="slides.length" :slides="slides" />

    <!-- Search -->
    <section class="sticky top-20 z-30 bg-warm/95 backdrop-blur border-b border-warm-100 py-3">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-3 flex-wrap">
        <div class="relative flex-1 min-w-[180px] max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-300" />
          <input v-model="search" :placeholder="$t('sermons.search')" class="w-full pl-9 pr-3 py-1.5 text-sm bg-warm-100 border border-warm-200 rounded-full focus:outline-none focus:ring-2 focus:ring-terra-300" />
        </div>
      </div>
    </section>

    <!-- Grid -->
    <section class="py-16 bg-warm min-h-[50vh]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-if="pending" class="flex items-center justify-center py-20">
          <div class="w-8 h-8 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
        </div>

        <div v-else-if="!filteredSermons.length" class="card p-16 text-center">
          <Mic class="w-10 h-10 text-warm-200 mx-auto mb-3" />
          <p class="text-warm-400 text-sm">{{ $t('sermons.empty') }}</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="sermon in filteredSermons"
            :key="sermon.id"
            class="card group overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="h-44 overflow-hidden relative bg-terra-900 flex items-center justify-center">
              <img v-if="sermon.imageUrl" :src="sermon.imageUrl" :alt="sermon.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0" />
              <div v-else class="absolute inset-0 bg-gradient-to-br from-terra-800 to-terra-900" />
              <a
                v-if="sermon.videoUrl"
                :href="sermon.videoUrl" target="_blank" rel="noopener noreferrer"
                class="relative z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-gold-500/80 backdrop-blur-sm flex items-center justify-center transition-colors"
                @click.stop
              >
                <Play class="w-5 h-5 text-white ml-0.5" />
              </a>
              <div v-else class="relative z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Mic class="w-5 h-5 text-white/50" />
              </div>
              <div class="absolute top-3 left-3 bg-terra-900/70 backdrop-blur-sm text-gold-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                {{ fmtDate(sermon.date) }}
              </div>
            </div>

            <div class="p-5">
              <h3 class="font-serif font-bold text-terra-900 text-base mb-1 group-hover:text-terra-600 transition-colors line-clamp-2">{{ sermon.title }}</h3>
              <p v-if="sermon.speaker" class="text-gold-600 text-xs font-semibold mb-2">{{ sermon.speaker }}</p>
              <p class="text-warm-500 text-sm leading-relaxed line-clamp-3 mb-4">{{ sermon.description }}</p>
              <div class="flex items-center gap-2 pt-4 border-t border-warm-100">
                <a
                  v-if="sermon.videoUrl"
                  :href="sermon.videoUrl" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-1.5 text-xs text-terra-600 hover:text-terra-800 font-semibold transition-colors"
                >
                  <Play class="w-3 h-3" /> {{ $t('sermons.watchVideo') }}
                </a>
                <span v-else class="text-warm-300 text-xs">{{ $t('sermons.noVideo') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Mic, Play, Search } from 'lucide-vue-next'

const { t, locale } = useI18n()
useHead({ title: computed(() => `${t('sermons.sectionLabel')} — BIAK`) })

const [sermonsRes, slidesRes] = await Promise.all([
  useFetch('/api/sermons'),
  useFetch('/api/slides?page=sermons'),
])
const { data, pending } = sermonsRes
const slides = computed(() => (slidesRes.data.value as any[]) ?? [])
const search = ref('')

const filteredSermons = computed(() => {
  const s = search.value.trim().toLowerCase()
  const all = (data.value ?? []) as any[]
  if (!s) return all
  return all.filter(sermon =>
    sermon.title.toLowerCase().includes(s) ||
    (sermon.speaker ?? '').toLowerCase().includes(s) ||
    (sermon.description ?? '').toLowerCase().includes(s)
  )
})

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString(locale.value, { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
