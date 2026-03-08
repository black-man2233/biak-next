<template>
  <div>
    <!-- Hero — full-bleed with floating orbs -->
    <section class="relative min-h-[70vh] flex items-center overflow-hidden pt-32 pb-24"
      style="background: linear-gradient(135deg, #2d0859 0%, #1a0535 40%, #0f0320 100%)">

      <!-- Animated orbs -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute w-[500px] h-[500px] rounded-full opacity-25 top-[-100px] right-[-100px]"
          style="background: radial-gradient(circle, #7c3aed 0%, transparent 70%); animation: orb-drift-1 12s ease-in-out infinite" />
        <div class="absolute w-[350px] h-[350px] rounded-full opacity-20 bottom-[-80px] left-[10%]"
          style="background: radial-gradient(circle, #a78bfa 0%, transparent 70%); animation: orb-drift-2 15s ease-in-out infinite" />
        <div class="absolute w-[250px] h-[250px] rounded-full opacity-15 top-[40%] left-[50%]"
          style="background: radial-gradient(circle, #c9a84c 0%, transparent 70%); animation: orb-drift-3 10s ease-in-out infinite" />
      </div>

      <!-- Grid texture -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
        style="background-image: repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,1) 40px,rgba(255,255,255,1) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,1) 40px,rgba(255,255,255,1) 41px)" />

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div ref="heroEl" :class="['reveal', heroVisible && 'visible']">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style="background: rgba(124,58,237,0.25); border: 1px solid rgba(167,139,250,0.4); color: #c4b5fd; animation: fadeIn 0.5s ease both">
            <span class="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Ungdom
          </span>

          <h1 class="font-serif font-bold text-white leading-[1.05] mt-3"
            style="font-size: clamp(2.5rem, 7vw, 5.5rem); animation: fadeUp 0.7s 0.1s ease both">
            Unge med <br />
            <span style="
              background: linear-gradient(135deg, #f0d6ff, #c4b5fd, #a78bfa, #7c3aed, #c9a84c);
              background-size: 300% 300%;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              animation: gradient-pan 4s ease infinite;
            ">Ild i Hjertet</span>
          </h1>

          <p class="text-white/60 text-lg mt-6 max-w-lg leading-relaxed" style="animation: fadeUp 0.7s 0.25s ease both">
            BIAK Ungdom er et sted for unge mennesker at mødes, dyrke fællesskab, tilbede og vokse i troen.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mt-10" style="animation: fadeUp 0.7s 0.38s ease both">
            <NuxtLink to="/contact?context=youth"
              class="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white justify-center overflow-hidden"
              style="background: linear-gradient(135deg, #7c3aed, #6d28d9); animation: youth-glow 3s ease-in-out infinite; box-shadow: 0 0 30px rgba(124,58,237,0.4)">
              Kom og Mød Os
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Info + Feature cards -->
    <section class="py-24 md:py-32 bg-warm">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <!-- Info text + meeting details -->
          <div ref="infoEl" :class="['reveal', infoVisible && 'visible']">
            <span class="section-label mb-4">Om BIAK Ungdom</span>
            <h2 class="font-serif font-bold text-3xl sm:text-4xl text-terra-900 mt-3 mb-6 leading-tight">
              Et Sted Du <span class="text-gold-600">Hører Til</span>
            </h2>
            <div class="space-y-4 text-warm-500 leading-relaxed">
              <p>Vi mødes én gang om måneden til ungdomsmøde — med tilbedelse, undervisning, sjov og stærkt fællesskab. Du behøver ikke have erfaring med kristendom. Du er velkommen, som du er.</p>
              <p>Ungdomsgruppen ledes af engagerede unge ledere, der brænder for at se unge vækste i deres tro og identitet.</p>
            </div>

            <!-- Meeting info — staggered reveal -->
            <div class="mt-8 space-y-3">
              <div
                v-for="(info, i) in meetingInfo"
                :key="info.label"
                :ref="el => infoEls[i] = el as Element"
                :class="['reveal flex items-center gap-3 text-sm', infoElsVisible[i] && 'visible', `delay-${i * 100 + 100}`]"
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
                v-for="feat in features"
                :key="feat.title"
                class="relative rounded-2xl p-5 text-center cursor-pointer select-none transition-all duration-300 overflow-hidden border-2"
                :class="[
                  expandedFeature === feat.title
                    ? 'border-violet-400 shadow-xl shadow-violet-100'
                    : 'border-[var(--border)] hover:border-violet-300 hover:shadow-lg'
                ]"
                style="background: rgba(255,255,255,0.85); backdrop-filter: blur(8px)"
                @click="toggleFeature(feat.title)"
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
                  <div v-if="expandedFeature === feat.title"
                    class="mt-3 pt-3 border-t border-violet-100 text-left relative z-10">
                    <p class="text-terra-700 text-xs leading-relaxed">{{ feat.detail }}</p>
                  </div>
                </Transition>

                <!-- Chevron -->
                <div class="mt-2 flex justify-center relative z-10">
                  <ChevronDown
                    class="w-3.5 h-3.5 transition-transform duration-300 text-warm-300"
                    :class="expandedFeature === feat.title ? 'rotate-180 text-violet-500' : ''" />
                </div>
              </div>
            </div>
            <p class="text-center text-xs text-warm-300 mt-3">Klik på en boks for at læse mere</p>
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

useHead({ title: 'Ungdom — BIAK' })

const meetingInfo = [
  { icon: Calendar, label: 'Hvornår', value: 'Månedlige fredagsmøder' },
  { icon: Clock,    label: 'Tid',     value: '18:00 – 20:00' },
  { icon: MapPin,   label: 'Sted',    value: 'Kirkevej 10, Brønderslev' },
]

const features = [
  {
    icon: Music,
    title: 'Tilbedelse',
    desc: 'Levende musik og lovsang',
    detail: 'Vores tilbedelsestid er hjertet i hvert møde. Vi synger med hele hjertet og inviterer Guds nærvær ind i rummet — uanset om du har sunget før eller ej.',
    from: '#7c3aed',
    to: '#6d28d9',
  },
  {
    icon: Users,
    title: 'Fællesskab',
    desc: 'Venner for livet',
    detail: 'Her møder du unge fra mange forskellige baggrunde og nationer. Vi spiser, griner og bygger venskaber, der rækker langt ud over mødeaftenen.',
    from: '#c9a84c',
    to: '#a8842a',
  },
  {
    icon: BookOpen,
    title: 'Undervisning',
    desc: 'Bibelbaseret undervisning',
    detail: 'Hver samling indeholder relevant og praksisnær undervisning fra Bibelen — leveret på en måde, der giver mening for unge i dag.',
    from: '#8b4513',
    to: '#62300d',
  },
  {
    icon: Star,
    title: 'Aktiviteter',
    desc: 'Sjov, sport og events',
    detail: 'Ud over de månedlige møder arrangerer vi ture, sportsaftener, sommerlejre og spontane aktiviteter — for der er mere ved livet end fire vægge.',
    from: '#7c3aed',
    to: '#c9a84c',
  },
]

const expandedFeature = ref<string | null>(null)
function toggleFeature(title: string) {
  expandedFeature.value = expandedFeature.value === title ? null : title
}

const { el: heroEl, isVisible: heroVisible } = useReveal()
const { el: infoEl, isVisible: infoVisible } = useReveal()
const { el: featEl, isVisible: featVisible } = useReveal()

const infoEls = ref<Element[]>([])
const infoElsVisible = ref([false, false, false])
onMounted(() => {
  infoEls.value.forEach((el, i) => {
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { infoElsVisible.value[i] = true; obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
  })
})
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
