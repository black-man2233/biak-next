<template>
  <div>
    <!-- Hero — full-bleed with floating orbs -->
    <section class="relative min-h-[70vh] flex items-center overflow-hidden pt-32 pb-24"
      style="background: linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)">

      <!-- Animated orbs (site-theme colors) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute w-[500px] h-[500px] rounded-full opacity-20 top-[-100px] right-[-100px]"
          style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%); animation: orb-drift-1 12s ease-in-out infinite" />
        <div class="absolute w-[350px] h-[350px] rounded-full opacity-15 bottom-[-80px] left-[10%]"
          style="background: radial-gradient(circle, var(--accent) 0%, transparent 70%); animation: orb-drift-2 15s ease-in-out infinite" />
        <div class="absolute w-[250px] h-[250px] rounded-full opacity-10 top-[40%] left-[50%]"
          style="background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%); animation: orb-drift-3 10s ease-in-out infinite" />
      </div>

      <!-- Decorative cross -->
      <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden xl:block" aria-hidden>
        <svg width="300" height="480" viewBox="0 0 300 480" fill="none">
          <rect x="130" y="0" width="40" height="480" fill="white" rx="6" />
          <rect x="0" y="160" width="300" height="40" fill="white" rx="6" />
        </svg>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div ref="heroEl" :class="['reveal', heroVisible && 'visible']">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style="background: var(--bg-secondary); border: 1px solid var(--accent); color: var(--accent); animation: fadeIn 0.5s ease both">
            <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background: var(--accent)" />
            {{ $t('youth.sectionLabel') }}
          </span>

          <h1 class="font-serif font-bold text-white leading-[1.05] mt-3"
            style="font-size: clamp(2.5rem, 7vw, 5.5rem); animation: fadeUp 0.7s 0.1s ease both">
            {{ $t('youth.heroTitle') }} <br />
            <span style="
              background: linear-gradient(135deg, var(--accent-light), var(--accent), var(--primary-dark), var(--accent));
              background-size: 300% 300%;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              animation: gradient-pan 4s ease infinite;
            ">{{ $t('youth.heroTitleAccent') }}</span>
          </h1>

          <p class="text-white/60 text-lg mt-6 max-w-lg leading-relaxed" style="animation: fadeUp 0.7s 0.25s ease both">
            {{ $t('youth.heroDesc') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mt-10" style="animation: fadeUp 0.7s 0.38s ease both">
            <NuxtLink to="/contact?context=youth" class="btn-gold">
              {{ $t('youth.ctaJoin') }}
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink to="/about" class="btn-outline">
              {{ $t('hero.ctaLearn') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <HomeSlideshow v-if="slides.length" :slides="slides" />

    <!-- Info + Feature cards -->
    <section class="py-24 md:py-32 bg-warm">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <!-- Info text + meeting details -->
          <div ref="infoEl" :class="['reveal', infoVisible && 'visible']">
            <span class="section-label mb-4">{{ $t('youth.infoLabel') }}</span>
            <h2 class="font-serif font-bold text-3xl sm:text-4xl text-terra-900 mt-3 mb-6 leading-tight">
              {{ $t('youth.infoTitle') }} <span class="text-gold-600">{{ $t('youth.infoTitleAccent') }}</span>
            </h2>
            <div class="space-y-4 text-warm-500 leading-relaxed">
              <p>{{ $t('youth.info1') }}</p>
              <p>{{ $t('youth.info2') }}</p>
            </div>

            <!-- Meeting info — staggered reveal -->
            <div class="mt-8 space-y-3">
              <div
                v-for="(info, i) in meetingInfo"
                :key="info.label"
                :class="['reveal flex items-center gap-3 text-sm', infoVisible && 'visible']"
                :style="{ transitionDelay: `${i * 120 + 100}ms` }"
              >
                <div class="w-9 h-9 rounded-xl flex items-center justify-center bg-terra-50 flex-shrink-0">
                  <component :is="info.icon" class="w-4 h-4 text-terra-600" />
                </div>
                <div>
                  <span class="text-warm-400 text-xs uppercase tracking-wide font-semibold block">{{ info.label }}</span>
                  <p class="text-terra-900 font-medium">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature cards — glassmorphism -->
          <div ref="featEl" :class="['reveal delay-200', featVisible && 'visible']">
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(feat, fi) in features"
                :key="fi"
                class="relative rounded-2xl p-5 text-center cursor-pointer select-none transition-all duration-300 overflow-hidden border-2"
                :class="[
                  expandedFeature === fi
                    ? 'shadow-lg'
                    : 'border-[var(--border)] hover:shadow-lg'
                ]"
                :style="expandedFeature === fi ? `border-color: var(--accent)` : ''"
                style="background: rgba(255,255,255,0.85); backdrop-filter: blur(8px)"
                @click="toggleFeature(fi)"
              >
                <!-- Gradient orb behind icon -->
                <div class="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 pointer-events-none"
                  :style="`background: radial-gradient(circle, ${feat.from} 0%, transparent 70%)`" />

                <div class="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3 relative z-10"
                  :style="`background: linear-gradient(135deg, ${feat.from}, ${feat.to})`">
                  <component :is="feat.icon" class="w-5 h-5 text-white" />
                </div>
                <h3 class="font-serif font-bold text-terra-900 text-sm mb-1 relative z-10">{{ feat.title }}</h3>
                <p class="text-warm-400 text-xs leading-relaxed relative z-10">{{ feat.desc }}</p>

                <!-- Expanded detail -->
                <Transition name="slide-expand">
                  <div v-if="expandedFeature === fi"
                    class="mt-3 pt-3 border-t border-[var(--border)] text-left relative z-10">
                    <p class="text-terra-700 text-xs leading-relaxed">{{ feat.detail }}</p>
                  </div>
                </Transition>

                <!-- Chevron -->
                <div class="mt-2 flex justify-center relative z-10">
                  <ChevronDown
                    class="w-3.5 h-3.5 transition-transform duration-300"
                    :class="expandedFeature === fi ? 'rotate-180' : ''"
                    :style="expandedFeature === fi ? 'color: var(--accent)' : 'color: var(--border-mid)'" />
                </div>
              </div>
            </div>
            <p class="text-center text-xs text-warm-300 mt-3">{{ $t('youth.featuresHint') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <CTASection />
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Calendar, Clock, MapPin, Music, Users, BookOpen, Star, ChevronDown } from 'lucide-vue-next'

const { t } = useI18n()
useHead({ title: computed(() => `${t('youth.sectionLabel')} — BIAK`) })

const { data: slidesData } = await useFetch('/api/slides?page=youth')
const slides = computed(() => (slidesData.value as any[]) ?? [])

const meetingInfo = computed(() => [
  { icon: Calendar, label: t('youth.when'),  value: t('youth.whenVal') },
  { icon: Clock,    label: t('youth.time'),  value: t('youth.timeVal') },
  { icon: MapPin,   label: t('youth.place'), value: t('youth.placeVal') },
])

const features = computed(() => [
  { icon: Music,    title: t('youth.f1.title'), desc: t('youth.f1.desc'), detail: t('youth.f1.detail'), from: '#7c3aed', to: '#6d28d9' },
  { icon: Users,    title: t('youth.f2.title'), desc: t('youth.f2.desc'), detail: t('youth.f2.detail'), from: '#c9a84c', to: '#a8842a' },
  { icon: BookOpen, title: t('youth.f3.title'), desc: t('youth.f3.desc'), detail: t('youth.f3.detail'), from: '#8b4513', to: '#62300d' },
  { icon: Star,     title: t('youth.f4.title'), desc: t('youth.f4.desc'), detail: t('youth.f4.detail'), from: '#7c3aed', to: '#c9a84c' },
])

const expandedFeature = ref<number | null>(null)
function toggleFeature(i: number) {
  expandedFeature.value = expandedFeature.value === i ? null : i
}

const { el: heroEl, isVisible: heroVisible } = useReveal()
const { el: infoEl, isVisible: infoVisible } = useReveal()
const { el: featEl, isVisible: featVisible } = useReveal()

</script>

<style scoped>
.slide-expand-enter-active,
.slide-expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.2s ease;
  overflow: hidden;
}
.slide-expand-enter-from,
.slide-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-expand-enter-to,
.slide-expand-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>
