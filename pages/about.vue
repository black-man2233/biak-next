<template>
  <div>
    <!-- Page Hero -->
    <section class="bg-terra-900 pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style="background: radial-gradient(ellipse, #c9a84c 0%, transparent 70%)" />
      </div>
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref="heroEl" :class="['reveal', heroVisible && 'visible']">
          <span class="section-label justify-center !text-gold-400 mb-4" style="--section-color:#c9a84c">Om Os</span>
          <h1 class="font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl mt-3 max-w-3xl leading-tight">
            En Levende Menighed<br />
            <span style="background: linear-gradient(135deg, #e8c76a, #c9a84c); -webkit-background-clip: text; background-clip: text; color: transparent">
              med Rødderne i Tro
            </span>
          </h1>
          <p class="text-white/60 text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
            BIAK — Bethany International Apostolic Kingdom — er en international kristen menighed i Brønderslev, Danmark, grundlagt af pastor Martin og Ruth Mutale.
          </p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-24 md:py-32 bg-warm">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref="storyEl" :class="['reveal', storyVisible && 'visible']">
            <span class="section-label mb-4">Vores Historie</span>
            <h2 class="font-serif font-bold text-3xl sm:text-4xl text-terra-900 mt-3 mb-6 leading-tight">
              Grundlagt i Tro &amp; <span class="text-gold-600">Kærlighed</span>
            </h2>
            <div class="space-y-4 text-warm-500 leading-relaxed">
              <p>
                BIAK blev grundlagt med en vision om at skabe et hjem for alle — uanset nationalitet, baggrund eller fortid. Menigheden samler mennesker fra over 10 nationer under ét tag i Brønderslev.
              </p>
              <p>
                Vi tror på, at kirken er mere end en bygning — det er et fællesskab af troende, der ønsker at opleve Gud og efterligne Jesus i hverdagen.
              </p>
              <p>
                Vores gudstjenester afholdes på dansk, engelsk, swahili og spansk — fordi vi ønsker, at alle kan møde Gud på deres eget modersmål.
              </p>
            </div>
          </div>

          <!-- Stats -->
          <div ref="statsEl" :class="['reveal delay-200', statsVisible && 'visible']">
            <div class="grid grid-cols-2 gap-5">
              <div v-for="stat in stats" :key="stat.label" class="card p-6 text-center">
                <p class="font-serif font-bold text-4xl text-terra-900 mb-1">{{ stat.value }}</p>
                <p class="text-warm-400 text-sm">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Beliefs -->
    <section class="py-24 md:py-32 bg-cream relative overflow-hidden">
      <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5 bg-gold-500 pointer-events-none" />
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref="beliefsHeaderEl" :class="['reveal text-center mb-16', beliefsHeaderVisible && 'visible']">
          <span class="section-label justify-center mb-4">Trossyn</span>
          <h2 class="font-serif font-bold text-3xl sm:text-4xl text-terra-900 mt-3">
            Hvad Vi <span class="text-gold-600">Tror På</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(belief, i) in beliefs"
            :key="belief.title"
            :ref="el => beliefEls[i] = el as Element"
            :class="['reveal card p-6', beliefVisible[i] && 'visible', `delay-${i * 100 + 100}`]"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              :style="`background: linear-gradient(135deg, ${belief.colorFrom}, ${belief.colorTo})`">
              <component :is="belief.icon" class="w-4.5 h-4.5 text-white" />
            </div>
            <h3 class="font-serif font-semibold text-terra-900 text-base mb-2">{{ belief.title }}</h3>
            <p class="text-warm-500 text-sm leading-relaxed">{{ belief.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pastors -->
    <PastorsSection />

    <!-- CTA -->
    <CTASection />
  </div>
</template>

<script setup lang="ts">
import { BookOpen, Heart, Zap, Users, Star, Globe } from 'lucide-vue-next'

useHead({ title: 'Om Os — BIAK' })

const stats = [
  { value: '10+', label: 'Nationaliteter' },
  { value: '4', label: 'Sprog' },
  { value: '∞', label: 'Kærlighed' },
  { value: '2', label: 'Pastorer' },
]

const beliefs = [
  { icon: BookOpen, title: 'Bibelens Autoritet', desc: 'Vi tror at Bibelen er Guds inspirerede og ufejlbarlige ord — vores rettesnor for tro og liv.', colorFrom: '#8b4513', colorTo: '#62300d' },
  { icon: Heart, title: 'Frelse ved Nåde', desc: 'Frelse er Guds gave til alle der tror — ikke noget vi fortjener, men noget vi modtager.', colorFrom: '#c9a84c', colorTo: '#a8842a' },
  { icon: Zap, title: 'Helligåndens Kraft', desc: 'Vi tror på Helligåndens aktive arbejde i dag — med tegn, undere og åndelige gaver.', colorFrom: '#8b4513', colorTo: '#c9a84c' },
  { icon: Users, title: 'Kristi Legeme', desc: 'Kirken er ikke en bygning men et fællesskab — Kristi legeme på jordens.', colorFrom: '#7c6a5a', colorTo: '#4a3828' },
  { icon: Star, title: 'Jesu Genkomst', desc: 'Vi lever i forventning om Jesu synlige, fysiske genkomst for at oprette sit rige.', colorFrom: '#c9a84c', colorTo: '#8b4513' },
  { icon: Globe, title: 'Mission & Evangeliet', desc: 'Vi er kaldet til at dele evangeliet lokalt og globalt — til alle folkeslag.', colorFrom: '#62300d', colorTo: '#8b4513' },
]

const { el: heroEl, isVisible: heroVisible } = useReveal()
const { el: storyEl, isVisible: storyVisible } = useReveal()
const { el: statsEl, isVisible: statsVisible } = useReveal()
const { el: beliefsHeaderEl, isVisible: beliefsHeaderVisible } = useReveal()

const beliefEls = ref<Element[]>([])
const beliefVisible = ref(beliefs.map(() => false))
onMounted(() => {
  beliefEls.value.forEach((el, i) => {
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { beliefVisible.value[i] = true; obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
  })
})
</script>
