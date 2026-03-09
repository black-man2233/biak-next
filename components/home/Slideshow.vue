<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">

    <!-- Background slides -->
    <div class="absolute inset-0">
      <div
        v-for="(img, i) in slides"
        :key="i"
        class="absolute inset-0"
        :style="{ opacity: current === i ? 1 : 0, transition: 'opacity 1.4s ease' }"
      >
        <img :src="img" class="w-full h-full object-cover object-center" aria-hidden="true" />
      </div>
      <!-- Overlay -->
      <div class="absolute inset-0 hero-img-overlay" />
    </div>

    <!-- Accent glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-15"
        style="background: radial-gradient(ellipse, var(--accent) 0%, transparent 70%)" />
    </div>

    <!-- Decorative cross -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden xl:block" aria-hidden>
      <svg width="400" height="600" viewBox="0 0 400 600" fill="none">
        <rect x="175" y="0" width="50" height="600" fill="white" rx="8" />
        <rect x="0" y="200" width="400" height="50" fill="white" rx="8" />
      </svg>
    </div>

    <!-- Main content -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 text-center">

      <!-- Badge -->
      <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 mb-10"
        style="animation: fadeIn 0.6s ease both">
        <span class="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
        <span class="text-[var(--accent-light)] text-xs font-semibold tracking-widest uppercase">
          {{ heroBadge || $t('hero.badge') }}
        </span>
      </div>

      <!-- Heading -->
      <h1 class="font-serif font-bold text-white leading-[1.1] mb-3 tracking-tight"
        style="font-size: clamp(2.8rem, 8vw, 6rem); animation: fadeUp 0.8s 0.1s ease both">
        {{ $t('hero.title') }}<br />
        <span class="text-transparent"
          style="background: linear-gradient(135deg, var(--accent-light), var(--accent)); -webkit-background-clip: text; background-clip: text;">
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

      <!-- Description -->
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
        <a href="https://www.youtube.com/@biakyoutube" target="_blank" rel="noopener noreferrer"
          class="btn-outline w-full sm:w-auto justify-center">
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
      </div>
    </div>

    <!-- Slide dots -->
    <div v-if="slides.length > 1"
      class="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
      style="animation: fadeIn 1.2s 0.8s ease both">
      <button
        v-for="(_, i) in slides"
        :key="i"
        @click="goTo(i)"
        :aria-label="`Slide ${i + 1}`"
        :class="['rounded-full transition-all duration-300', current === i ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/35 hover:bg-white/60']"
      />
    </div>

    <!-- Prev / Next -->
    <button v-if="slides.length > 1" @click="prev"
      class="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors">
      <ChevronLeft class="w-5 h-5" />
    </button>
    <button v-if="slides.length > 1" @click="next"
      class="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors">
      <ChevronRight class="w-5 h-5" />
    </button>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style="animation: fadeIn 1.2s 1s ease both">
      <span class="text-white/25 text-[10px] uppercase tracking-[0.2em]">{{ $t('hero.scroll') }}</span>
      <div class="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  heroBadge?: string
  slideshowImages?: string   // newline-separated URLs from church-info
}>()

// Default slides — beautiful church/worship/community photos
const DEFAULT_SLIDES = [
  'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?auto=format&fit=crop&w=1920&q=80',
]

function convertGDrive(url: string): string {
  const m = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/)
  return m ? `https://drive.google.com/uc?id=${m[1]}&export=view` : url
}

const slides = computed(() => {
  const raw = props.slideshowImages?.trim()
  if (!raw) return DEFAULT_SLIDES
  const parsed = raw.split('\n').map(u => convertGDrive(u.trim())).filter(Boolean)
  return parsed.length ? parsed : DEFAULT_SLIDES
})

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function goTo(i: number) { current.value = i; resetTimer() }
function next() { current.value = (current.value + 1) % slides.value.length; resetTimer() }
function prev() { current.value = (current.value - 1 + slides.value.length) % slides.value.length; resetTimer() }

function resetTimer() {
  if (timer) clearInterval(timer)
  timer = setInterval(next, 5500)
}

onMounted(() => { if (slides.value.length > 1) resetTimer() })
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>
