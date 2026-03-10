<template>
  <section v-if="slides.length" class="py-6 overflow-hidden" style="background: var(--bg)">
    <div class="relative" ref="trackWrap">
      <!-- Track -->
      <div
        class="flex transition-transform duration-700 ease-in-out"
        :style="{ gap: '14px', transform: `translateX(${trackOffset}px)` }"
      >
        <div
          v-for="(slide, i) in slides"
          :key="slide.id"
          class="flex-shrink-0 relative overflow-hidden rounded-2xl h-72 md:h-[32rem] cursor-pointer transition-all duration-500"
          :style="{
            width: slideWidth + 'px',
            opacity: current === i ? 1 : 0.5,
            transform: current === i ? 'scale(1)' : 'scale(0.96)',
          }"
          @click="goTo(i)"
        >
          <img :src="slide.url" :alt="slide.caption || ''" class="w-full h-full object-cover" />
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)" />
          <p v-if="slide.caption && current === i"
            class="absolute bottom-5 left-6 right-6 text-white/90 text-sm font-medium transition-opacity duration-500">
            {{ slide.caption }}
          </p>
        </div>
      </div>

      <!-- Arrows -->
      <button v-if="slides.length > 1" @click="prev"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10">
        <ChevronLeft class="w-4 h-4" />
      </button>
      <button v-if="slides.length > 1" @click="next"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10">
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>

    <!-- Dots -->
    <div v-if="slides.length > 1" class="flex justify-center gap-2 mt-4">
      <button
        v-for="(_, i) in slides" :key="i" @click="goTo(i)"
        :class="['rounded-full transition-all duration-300', current === i ? 'w-6 h-2 bg-terra-600' : 'w-2 h-2 bg-warm-300 hover:bg-warm-400']"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{ slides: Array<{ id: string; url: string; caption: string | null }> }>()

const current = ref(0)
const trackWrap = ref<HTMLElement | null>(null)
const slideWidth = ref(0)
const peekPx = ref(0)
const gap = 14

const trackOffset = computed(() => peekPx.value - current.value * (slideWidth.value + gap))

function updateSizes() {
  if (!trackWrap.value) return
  const w = trackWrap.value.offsetWidth
  slideWidth.value = Math.round(w * 0.82)
  peekPx.value = Math.round(w * 0.09)
}

let timer: ReturnType<typeof setInterval> | null = null

function goTo(i: number) { current.value = i; resetTimer() }
function next() { current.value = (current.value + 1) % props.slides.length; resetTimer() }
function prev() { current.value = (current.value - 1 + props.slides.length) % props.slides.length; resetTimer() }
function resetTimer() {
  if (timer) clearInterval(timer)
  if (props.slides.length > 1) timer = setInterval(next, 5000)
}

onMounted(() => {
  updateSizes()
  window.addEventListener('resize', updateSizes)
  resetTimer()
})
onUnmounted(() => {
  window.removeEventListener('resize', updateSizes)
  if (timer) clearInterval(timer)
})
</script>
