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

      <!-- Cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="(sermon, i) in sermons.slice(0, 3)"
          :key="sermon.id"
          :href="sermon.videoUrl ?? '#'"
          :target="sermon.videoUrl ? '_blank' : undefined"
          rel="noopener noreferrer"
          :ref="el => cardEls[i] = el as Element"
          :class="['reveal card group overflow-hidden block', cardVisible[i] && 'visible', `delay-${i * 100 + 100}`]"
        >
          <!-- Thumbnail or gradient fallback -->
          <div class="relative h-44 overflow-hidden" style="background:var(--hero-from)">
            <img v-if="sermon.imageUrl" :src="sermon.imageUrl" :alt="sermon.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div v-else class="absolute inset-0 flex items-center justify-center"
              :style="`background: linear-gradient(135deg, ${gradients[i % 3][0]}, ${gradients[i % 3][1]})`">
              <Mic class="w-8 h-8 text-white/40" />
            </div>
            <!-- Play overlay -->
            <div v-if="sermon.videoUrl"
              class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background:var(--accent)">
                <Play class="w-5 h-5 text-white ml-0.5" />
              </div>
            </div>
            <!-- Date badge -->
            <div class="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
              style="background:rgba(0,0,0,0.55); color:var(--accent-light); backdrop-filter:blur(4px)">
              {{ fmtDate(sermon.date) }}
            </div>
          </div>

          <div class="p-5">
            <h3 class="font-serif font-bold text-sm leading-snug group-hover:opacity-70 transition-opacity line-clamp-2 mb-1" style="color:var(--text)">
              {{ sermon.title }}
            </h3>
            <p v-if="sermon.speaker" class="text-xs font-semibold uppercase tracking-wide mb-2" style="color:var(--accent)">
              {{ sermon.speaker }}
            </p>
            <p v-if="sermon.description" class="text-xs leading-relaxed line-clamp-2" style="color:var(--text-mid)">
              {{ sermon.description }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mic, ArrowRight, Play } from 'lucide-vue-next'

defineProps<{
  sermons: Array<{ id: string; title: string; speaker: string; date: string; description: string | null; videoUrl: string | null; imageUrl: string | null }>
}>()

const gradients = [
  ['var(--primary)', 'var(--primary-dark)'],
  ['var(--accent)', 'var(--primary)'],
  ['#7c6a5a', '#4a3828'],
]

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' })
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
