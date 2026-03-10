<template>
  <section v-if="slides.length" class="py-8" style="background:var(--bg)">
    <div class="max-w-5xl mx-auto px-6 lg:px-8">
      <div class="relative h-64 md:h-[28rem] rounded-2xl overflow-hidden shadow-xl">
        <!-- Slides -->
        <div
          v-for="(slide, i) in slides"
          :key="slide.id"
          class="absolute inset-0 transition-opacity duration-1000"
          :style="{ opacity: current === i ? 1 : 0 }"
        >
          <img :src="slide.url" :alt="slide.caption || ''" class="w-full h-full object-cover" />
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 55%)" />
          <p v-if="slide.caption"
            class="absolute bottom-5 left-5 right-5 text-white/90 text-sm font-medium">
            {{ slide.caption }}
          </p>
        </div>

        <!-- Dots -->
        <div v-if="slides.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <button
            v-for="(_, i) in slides" :key="i" @click="goTo(i)"
            :class="['rounded-full transition-all duration-300', current === i ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70']"
          />
        </div>

        <!-- Arrows -->
        <button v-if="slides.length > 1" @click="prev"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button v-if="slides.length > 1" @click="next"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10">
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{ slides: Array<{ id: string; url: string; caption: string | null }> }>()

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function goTo(i: number) { current.value = i; resetTimer() }
function next() { current.value = (current.value + 1) % props.slides.length; resetTimer() }
function prev() { current.value = (current.value - 1 + props.slides.length) % props.slides.length; resetTimer() }
function resetTimer() {
  if (timer) clearInterval(timer)
  if (props.slides.length > 1) timer = setInterval(next, 5000)
}
onMounted(resetTimer)
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>
