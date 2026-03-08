<template>
  <section class="py-24 md:py-32 bg-warm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">

      <div ref="headerEl" :class="['reveal text-center mb-16', headerVisible && 'visible']">
        <span class="section-label justify-center mb-4">Lederskab</span>
        <h2 class="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-terra-900 mt-3">
          Mød Vores <span class="text-gold-600">Pastorer</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        <div
          v-for="(p, i) in pastors"
          :key="p.name"
          :ref="el => cardEls[i] = el as Element"
          :class="['reveal card p-7 flex gap-5 group', cardVisible[i] && 'visible', `delay-${i * 150 + 100}`]"
        >
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-serif font-bold text-white shadow-md"
              :style="`background: linear-gradient(135deg, ${p.gradFrom}, ${p.gradTo})`"
            >
              {{ p.initial }}
            </div>
          </div>
          <div class="min-w-0">
            <h3 class="font-serif font-bold text-terra-900 text-lg leading-tight group-hover:text-terra-600 transition-colors">
              {{ p.name }}
            </h3>
            <p class="text-gold-600 text-xs font-semibold mt-1 mb-3 uppercase tracking-wide">{{ p.role }}</p>
            <p class="text-warm-500 text-sm leading-relaxed">{{ p.bio }}</p>
          </div>
        </div>
      </div>

      <!-- Quote -->
      <div ref="quoteEl" :class="['reveal max-w-4xl mx-auto', quoteVisible && 'visible delay-300']">
        <div class="card p-8 md:p-10 text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p class="font-serif text-5xl text-gold-200 leading-none mb-4 select-none">&ldquo;</p>
          <p class="font-serif italic text-terra-800 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Vi ønsker at inspirere mennesker til at opleve Gud og efterligne Jesus
            — i et fællesskab, der er fuld af Guds kraft og kærlighed.
          </p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <div class="h-px w-10 bg-gold-200" />
            <p class="text-warm-400 text-sm font-medium">Martin &amp; Ruth Mutale</p>
            <div class="h-px w-10 bg-gold-200" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const pastors = [
  {
    initial: 'M', name: 'Pastor Martin Mutale', role: 'Sognepastor',
    bio: 'Martin har en kandidatgrad i teologi fra Harvest Bible College i Australien. Han leder menigheden med visdom og dyb kærlighed til Gud og mennesker.',
    gradFrom: '#8b4513', gradTo: '#62300d',
  },
  {
    initial: 'R', name: 'Pastor Ruth Mutale', role: 'Sognepastor & Kvindeleder',
    bio: 'Ruth leder kvindegruppen og tilbedelsesholdet. Med sit hjerte for tilbedelse er hun en elsket og central del af BIAK.',
    gradFrom: '#c9a84c', gradTo: '#a8842a',
  },
]

const { el: headerEl, isVisible: headerVisible } = useReveal()
const { el: quoteEl, isVisible: quoteVisible } = useReveal()
const cardEls = ref<Element[]>([])
const cardVisible = ref([false, false])
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
