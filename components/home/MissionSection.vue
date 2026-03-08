<template>
  <section class="py-24 md:py-32 bg-cream relative overflow-hidden">
    <!-- Decorative circles -->
    <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5 bg-gold-500 pointer-events-none" />
    <div class="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-5 bg-terra-500 pointer-events-none" />

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Header -->
      <div ref="headerEl" :class="['reveal mb-16', headerVisible && 'visible']">
        <span class="section-label mb-4">Vores Mission</span>
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mt-4">
          <h2 class="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-terra-900 max-w-2xl leading-tight">
            At Åbenbare Guds Kærlighed &amp;
            <span class="text-gold-600">Demonstrere Hans Kraft</span>
          </h2>
          <p class="text-warm-400 text-sm italic max-w-xs leading-relaxed">
            Mark 12:30 — Elsk Herren din Gud af hele dit hjerte
          </p>
        </div>
      </div>

      <!-- Value cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div
          v-for="(v, i) in values"
          :key="v.title"
          :ref="el => valEls[i] = el as Element"
          :class="['reveal card p-6 group', valVisible[i] && 'visible', `delay-${i * 100 + 100}`]"
        >
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
            :class="v.bgClass">
            <component :is="v.icon" class="w-5 h-5" :class="v.iconClass" />
          </div>
          <h3 class="font-serif font-semibold text-terra-900 text-base mb-2">{{ v.title }}</h3>
          <p class="text-warm-500 text-sm leading-relaxed">{{ v.desc }}</p>
        </div>
      </div>

      <!-- Vision strip -->
      <div ref="visionEl" :class="['reveal card p-8 md:p-10 bg-terra-900 text-white', visionVisible && 'visible delay-400']">
        <p class="text-xs uppercase tracking-widest text-white/40 mb-7 font-semibold">Vores Vision</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div v-for="(item, i) in vision" :key="item.label" class="flex items-start gap-4">
            <span class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-terra-900 mt-0.5"
              style="background: linear-gradient(135deg, #e8c76a, #c9a84c)">
              {{ i + 1 }}
            </span>
            <div>
              <p class="font-semibold text-white text-sm mb-1">{{ item.label }}</p>
              <p class="text-white/50 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heart, Zap, Globe, Users } from 'lucide-vue-next'

const values = [
  { icon: Heart, title: 'Guds Kærlighed',  desc: 'Vi tror på en Gud der elsker alle uanset baggrund eller fortid.', bgClass: 'bg-terra-50', iconClass: 'text-terra-500' },
  { icon: Zap,   title: 'Hans Kraft',      desc: 'Vi oplever og forkynder Guds kraft — helbredelse og mirakler.', bgClass: 'bg-gold-50', iconClass: 'text-gold-600' },
  { icon: Globe, title: 'Internationalt',  desc: 'Folk fra over 10 nationaliteter. 4 sprog i vores gudstjenester.', bgClass: 'bg-warm-100', iconClass: 'text-warm-600' },
  { icon: Users, title: 'Forbundne Liv',   desc: 'Vi forbinder mennesker med Gud og hinanden i kaldet.', bgClass: 'bg-cream', iconClass: 'text-terra-400' },
]

const vision = [
  { label: 'Forbinde', desc: 'Mennesker med Gud og hinanden' },
  { label: 'Udruste',  desc: 'Til at leve i deres gudgivne kald' },
  { label: 'Nå Ud',    desc: 'Lokalt og globalt med evangeliet' },
]

const { el: headerEl, isVisible: headerVisible } = useReveal()
const { el: visionEl, isVisible: visionVisible } = useReveal()
const valEls = ref<Element[]>([])
const valVisible = ref([false, false, false, false])

onMounted(() => {
  valEls.value.forEach((el, i) => {
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { valVisible.value[i] = true; obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
  })
})
</script>
