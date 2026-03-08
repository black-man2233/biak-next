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
          <span class="section-label !text-gold-400 mb-4" style="--section-color:#c9a84c">{{ $t('about.sectionLabel') }}</span>
          <h1 class="font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl mt-3 max-w-3xl leading-tight">
            {{ $t('about.heroTitle') }}<br />
            <span style="background: linear-gradient(135deg, #e8c76a, #c9a84c); -webkit-background-clip: text; background-clip: text; color: transparent">
              {{ $t('about.heroTitleAccent') }}
            </span>
          </h1>
          <p class="text-white/60 text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
            {{ $t('about.heroDesc') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-24 md:py-32 bg-warm">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref="storyEl" :class="['reveal', storyVisible && 'visible']">
            <span class="section-label mb-4">{{ $t('about.storyLabel') }}</span>
            <h2 class="font-serif font-bold text-3xl sm:text-4xl mt-3 mb-6 leading-tight" style="color:var(--text)">
              {{ $t('about.storyTitle') }} <span style="color:var(--accent)">{{ $t('about.storyTitleAccent') }}</span>
            </h2>
            <div class="space-y-4 leading-relaxed" style="color:var(--text-mid)">
              <p>{{ $t('about.story1') }}</p>
              <p>{{ $t('about.story2') }}</p>
              <p>{{ $t('about.story3') }}</p>
            </div>
          </div>

          <!-- Stats + single expandable community section -->
          <div ref="statsEl" :class="['reveal delay-200', statsVisible && 'visible']">
            <div class="grid grid-cols-2 gap-5 mb-5">
              <div class="card p-6 text-center">
                <p class="font-serif font-bold text-4xl mb-1" style="color:var(--text)">10+</p>
                <p class="text-sm" style="color:var(--text-mid)">{{ $t('about.stat1') }}</p>
              </div>
              <div class="card p-6 text-center">
                <p class="font-serif font-bold text-4xl mb-1" style="color:var(--text)">4</p>
                <p class="text-sm" style="color:var(--text-mid)">{{ $t('about.stat2') }}</p>
              </div>
            </div>

            <!-- Single expandable: Nationalities + Languages together -->
            <div class="card overflow-hidden">
              <button
                @click="showCommunity = !showCommunity"
                class="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                style="hover:background: var(--bg-secondary)"
                @mouseenter="e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)'"
                @mouseleave="e => (e.currentTarget as HTMLElement).style.background = ''"
              >
                <div class="flex items-center gap-2.5">
                  <Globe class="w-4 h-4" style="color:var(--primary)" />
                  <span class="font-semibold text-sm" style="color:var(--text)">
                    {{ $t('about.nationsLabel') }} & {{ $t('about.langsLabel') }}
                  </span>
                  <span class="text-xs px-2 py-0.5 rounded-full font-bold"
                    style="background:var(--bg-secondary); color:var(--primary)">10+ / 4</span>
                </div>
                <ChevronDown class="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                  style="color:var(--text-mid)"
                  :class="showCommunity && 'rotate-180'" />
              </button>

              <Transition name="expand">
                <div v-if="showCommunity" class="px-6 pb-5 pt-2">
                  <!-- Nationalities -->
                  <div class="flex items-center gap-2 mb-3">
                    <Globe class="w-3.5 h-3.5" style="color:var(--primary)" />
                    <span class="text-xs font-bold uppercase tracking-wider" style="color:var(--text-mid)">
                      {{ $t('about.nationsLabel') }}
                    </span>
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                    <div v-for="n in nations" :key="n.code"
                      class="flex items-start gap-2 p-2.5 rounded-xl text-xs"
                      style="background:var(--bg-secondary)">
                      <span class="text-base leading-none mt-0.5">{{ n.flag }}</span>
                      <div>
                        <p class="font-semibold" style="color:var(--text)">{{ n.name }}</p>
                        <p class="mt-0.5" style="color:var(--text-mid)">{{ n.lang }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Languages -->
                  <div class="flex items-center gap-2 mb-3">
                    <Languages class="w-3.5 h-3.5" style="color:var(--accent)" />
                    <span class="text-xs font-bold uppercase tracking-wider" style="color:var(--text-mid)">
                      {{ $t('about.langsLabel') }}
                    </span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div v-for="l in languages" :key="l.code"
                      class="flex items-center gap-3 p-3 rounded-xl text-sm"
                      style="background:var(--bg-secondary)">
                      <span class="text-xl">{{ l.flag }}</span>
                      <div class="min-w-0">
                        <p class="font-semibold" style="color:var(--text)">{{ l.name }}</p>
                        <p class="text-xs" style="color:var(--text-mid)">{{ l.services }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Beliefs -->
    <section class="py-24 md:py-32 bg-cream relative overflow-hidden">
      <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style="background:var(--accent)" />
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref="beliefsHeaderEl" :class="['reveal text-center mb-16', beliefsHeaderVisible && 'visible']">
          <span class="section-label justify-center mb-4">{{ $t('about.beliefsLabel') }}</span>
          <h2 class="font-serif font-bold text-3xl sm:text-4xl mt-3" style="color:var(--text)">
            {{ $t('about.beliefsTitle') }} <span style="color:var(--accent)">{{ $t('about.beliefsTitleAccent') }}</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(belief, i) in beliefs"
            :key="belief.titleKey"
            :ref="el => beliefEls[i] = el as Element"
            :class="['reveal card p-6', beliefVisible[i] && 'visible', `delay-${i * 100 + 100}`]"
          >
            <div class="belief-icon-wrap w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              :style="`background: linear-gradient(135deg, ${belief.colorFrom}, ${belief.colorTo})`">
              <component :is="belief.icon" class="w-4.5 h-4.5 text-white" />
            </div>
            <h3 class="font-serif font-semibold text-base mb-2" style="color:var(--text)">{{ $t(belief.titleKey) }}</h3>
            <p class="text-sm leading-relaxed" style="color:var(--text-mid)">{{ $t(belief.descKey) }}</p>
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
import { BookOpen, Heart, Zap, Users, Star, Globe, ChevronDown, Languages } from 'lucide-vue-next'
const { t } = useI18n()

useHead({ title: computed(() => `${t('about.sectionLabel')} — BIAK`) })

const showCommunity = ref(false)

const nations = [
  { flag: '🇩🇰', code: 'dk', name: 'Danmark', lang: 'Dansk' },
  { flag: '🇿🇲', code: 'zm', name: 'Zambia', lang: 'English' },
  { flag: '🇨🇩', code: 'cd', name: 'Congo', lang: 'Français' },
  { flag: '🇳🇬', code: 'ng', name: 'Nigeria', lang: 'English' },
  { flag: '🇰🇪', code: 'ke', name: 'Kenya', lang: 'Kiswahili' },
  { flag: '🇸🇸', code: 'ss', name: 'Sydsudan', lang: 'English' },
  { flag: '🇪🇹', code: 'et', name: 'Etiopien', lang: 'Amharisk' },
  { flag: '🇦🇴', code: 'ao', name: 'Angola', lang: 'Português' },
  { flag: '🇷🇼', code: 'rw', name: 'Rwanda', lang: 'Kinyarwanda' },
  { flag: '🇺🇬', code: 'ug', name: 'Uganda', lang: 'English' },
  { flag: '🌍', code: 'more', name: 'Og Flere…', lang: '' },
]

const languages = computed(() => [
  { flag: '🇩🇰', code: 'da', name: 'Dansk', services: t('about.langDaServices') },
  { flag: '🇬🇧', code: 'en', name: 'English', services: t('about.langEnServices') },
  { flag: '🇰🇪', code: 'sw', name: 'Kiswahili', services: t('about.langSwServices') },
  { flag: '🇪🇸', code: 'es', name: 'Español', services: t('about.langEsServices') },
])

const beliefs = [
  { icon: BookOpen, titleKey: 'about.b1.title', descKey: 'about.b1.desc', colorFrom: '#8b4513', colorTo: '#62300d' },
  { icon: Heart,    titleKey: 'about.b2.title', descKey: 'about.b2.desc', colorFrom: '#c9a84c', colorTo: '#a8842a' },
  { icon: Zap,      titleKey: 'about.b3.title', descKey: 'about.b3.desc', colorFrom: '#8b4513', colorTo: '#c9a84c' },
  { icon: Users,    titleKey: 'about.b4.title', descKey: 'about.b4.desc', colorFrom: '#7c6a5a', colorTo: '#4a3828' },
  { icon: Star,     titleKey: 'about.b5.title', descKey: 'about.b5.desc', colorFrom: '#c9a84c', colorTo: '#8b4513' },
  { icon: Globe,    titleKey: 'about.b6.title', descKey: 'about.b6.desc', colorFrom: '#62300d', colorTo: '#8b4513' },
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

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.35s ease, opacity 0.25s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 600px;
  opacity: 1;
}
</style>
