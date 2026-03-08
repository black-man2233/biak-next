<template>
  <section class="py-24 md:py-32 bg-cream">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Header -->
      <div ref="headerEl" :class="['reveal flex items-end justify-between mb-12 gap-4 flex-wrap', headerVisible && 'visible']">
        <div>
          <span class="section-label mb-3">{{ $t('sermons.sectionLabel') }}</span>
          <h2 class="font-serif font-bold text-3xl sm:text-4xl mt-3" style="color:var(--text)">
            {{ $t('sermons.titleHome') }} <span style="color:var(--accent)">{{ $t('sermons.titleAccentHome') }}</span>
          </h2>
        </div>
        <NuxtLink to="/sermons" class="flex items-center gap-1.5 text-sm font-medium group transition-colors" style="color:var(--text-mid)">
          {{ $t('sermons.viewAll') }}
          <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="!sermons.length" class="card p-14 text-center">
        <Mic class="w-10 h-10 mx-auto mb-3" style="color:var(--border-mid)" />
        <p class="text-sm" style="color:var(--text-mid)">{{ $t('sermons.noSermonsHome') }}</p>
      </div>

      <!-- Sermon cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(sermon, i) in sermons.slice(0, 3)"
          :key="sermon.id"
          :ref="el => cardEls[i] = el as Element"
          :class="['reveal card group overflow-hidden', cardVisible[i] && 'visible', `delay-${i * 100 + 100}`]"
        >
          <!-- Gradient header bar -->
          <div class="h-2" :style="`background: linear-gradient(90deg, ${gradients[i % 3][0]}, ${gradients[i % 3][1]})`" />

          <div class="p-6">
            <!-- Date -->
            <div class="flex items-center gap-2 mb-4 text-xs" style="color:var(--text-mid)">
              <Calendar class="w-3.5 h-3.5 flex-shrink-0" style="color:var(--border-mid)" />
              {{ fmtDate(sermon.date) }}
            </div>

            <h3 class="font-serif font-bold text-base mb-1 leading-snug group-hover:opacity-80 transition-opacity" style="color:var(--text)">
              {{ sermon.title }}
            </h3>
            <p class="text-xs font-semibold mb-3 uppercase tracking-wide" style="color:var(--accent)">{{ sermon.speaker }}</p>
            <p v-if="sermon.description" class="text-sm leading-relaxed line-clamp-2 mb-4" style="color:var(--text-mid)">
              {{ sermon.description }}
            </p>

            <div class="pt-4 border-t" style="border-color:var(--border)">
              <a v-if="sermon.videoUrl" :href="sermon.videoUrl" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-xs font-semibold transition-colors hover:opacity-70"
                style="color:var(--primary)">
                <Play class="w-3.5 h-3.5" />
                {{ $t('sermons.watchVideo') }}
              </a>
              <span v-else class="text-xs" style="color:var(--text-light)">{{ $t('sermons.noVideo') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Calendar, Mic, ArrowRight, Play } from 'lucide-vue-next'

defineProps<{
  sermons: Array<{ id: string; title: string; speaker: string; date: string; description: string | null; videoUrl: string | null }>
}>()

const gradients = [
  ['var(--primary)', 'var(--primary-dark)'],
  ['var(--accent)', 'var(--primary)'],
  ['#7c6a5a', '#4a3828'],
]

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
}

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
