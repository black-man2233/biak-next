<template>
  <section class="py-24 md:py-32 bg-cream relative overflow-hidden">
    <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5 pointer-events-none" style="background:var(--accent)" />
    <div class="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-5 pointer-events-none" style="background:var(--primary)" />

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Header -->
      <div ref="headerEl" :class="['reveal mb-16', headerVisible && 'visible']">
        <span class="section-label mb-4">{{ $t('mission.sectionLabel') }}</span>
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mt-4">
          <h2 class="font-serif font-bold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight" style="color:var(--text)">
            {{ $t('mission.title') }}
            <span style="color:var(--accent)">{{ $t('mission.titleAccent') }}</span>
          </h2>
          <p class="text-sm italic max-w-xs leading-relaxed" style="color:var(--text-mid)">
            {{ $t('mission.verse') }}
          </p>
        </div>
      </div>

      <!-- Value cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div
          v-for="(v, i) in values"
          :key="v.titleKey"
          :ref="el => valEls[i] = el as Element"
          :class="['reveal card p-6 group', valVisible[i] && 'visible', `delay-${i * 100 + 100}`]"
        >
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
            :style="`background: linear-gradient(135deg, ${v.fromColor}, ${v.toColor})`">
            <component :is="v.icon" class="w-5 h-5 text-white" />
          </div>
          <h3 class="font-serif font-semibold text-base mb-2" style="color:var(--text)">{{ $t(v.titleKey) }}</h3>
          <p class="text-sm leading-relaxed" style="color:var(--text-mid)">{{ $t(v.descKey) }}</p>
        </div>
      </div>

      <!-- Vision strip -->
      <div ref="visionEl" :class="['reveal card p-8 md:p-10', visionVisible && 'visible delay-400']"
        style="background: linear-gradient(135deg, var(--hero-from), var(--hero-to))">
        <p class="text-xs uppercase tracking-widest text-white/40 mb-7 font-semibold">{{ $t('mission.visionLabel') }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div v-for="(item, i) in vision" :key="item.labelKey" class="flex items-start gap-4">
            <span class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
              style="background: linear-gradient(135deg, var(--accent-light), var(--accent)); color: var(--hero-to)">
              {{ i + 1 }}
            </span>
            <div>
              <p class="font-semibold text-white text-sm mb-1">{{ $t(item.labelKey) }}</p>
              <p class="text-white/50 text-sm leading-relaxed">{{ $t(item.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heart, Zap, Globe, Users } from 'lucide-vue-next'
const { t } = useI18n()

const values = [
  { icon: Heart, titleKey: 'mission.values.love.title', descKey: 'mission.values.love.desc', fromColor: 'var(--primary)', toColor: 'var(--primary-dark)' },
  { icon: Zap,   titleKey: 'mission.values.power.title', descKey: 'mission.values.power.desc', fromColor: 'var(--accent)', toColor: 'var(--primary)' },
  { icon: Globe, titleKey: 'mission.values.intl.title', descKey: 'mission.values.intl.desc', fromColor: '#7c6a5a', toColor: '#4a3828' },
  { icon: Users, titleKey: 'mission.values.connected.title', descKey: 'mission.values.connected.desc', fromColor: 'var(--primary)', toColor: 'var(--accent)' },
]
const vision = [
  { labelKey: 'mission.vision.v1.label', descKey: 'mission.vision.v1.desc' },
  { labelKey: 'mission.vision.v2.label', descKey: 'mission.vision.v2.desc' },
  { labelKey: 'mission.vision.v3.label', descKey: 'mission.vision.v3.desc' },
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
