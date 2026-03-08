<template>
  <div>
    <!-- Hero -->
    <section class="bg-terra-900 pt-32 pb-24 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style="background: radial-gradient(ellipse, #c9a84c 0%, transparent 70%)" />
      </div>
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref="heroEl" :class="['reveal', heroVisible && 'visible']">
          <span class="section-label !text-gold-400 mb-4" style="--section-color:#c9a84c">Ungdom</span>
          <h1 class="font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl mt-3 leading-tight max-w-2xl">
            Unge med <br />
            <span style="background: linear-gradient(135deg, #e8c76a, #c9a84c); -webkit-background-clip: text; background-clip: text; color: transparent">
              Ild i Hjertet
            </span>
          </h1>
          <p class="text-white/60 text-lg mt-6 max-w-lg leading-relaxed">
            BIAK Ungdom er et sted for unge mennesker at mødes, dyrke fællesskab, tilbede og vokse i troen.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mt-8">
            <NuxtLink to="/contact" class="btn-gold w-full sm:w-auto justify-center">
              Kom og Mød Os <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Info -->
    <section class="py-24 md:py-32 bg-warm">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref="infoEl" :class="['reveal', infoVisible && 'visible']">
            <span class="section-label mb-4">Om BIAK Ungdom</span>
            <h2 class="font-serif font-bold text-3xl sm:text-4xl text-terra-900 mt-3 mb-6 leading-tight">
              Et Sted Du <span class="text-gold-600">Hører Til</span>
            </h2>
            <div class="space-y-4 text-warm-500 leading-relaxed">
              <p>Vi mødes én gang om måneden til ungdomsmøde — med tilbedelse, undervisning, sjov og stærkt fællesskab. Du behøver ikke have erfaring med kristendom. Du er velkommen, som du er.</p>
              <p>Ungdomsgruppen ledes af engagerede unge ledere under vejledning af pastor Ruth Mutale, der brænder for at se unge vækste i deres tro og identitet.</p>
            </div>
            <div class="mt-8 space-y-3">
              <div v-for="info in meetingInfo" :key="info.label" class="flex items-center gap-3 text-sm">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-terra-50">
                  <component :is="info.icon" class="w-4 h-4 text-terra-600" />
                </div>
                <div>
                  <span class="text-warm-400 text-xs uppercase tracking-wide font-semibold">{{ info.label }}</span>
                  <p class="text-terra-900 font-medium">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature cards -->
          <div ref="featEl" :class="['reveal delay-200', featVisible && 'visible']">
            <div class="grid grid-cols-2 gap-4">
              <div v-for="feat in features" :key="feat.title" class="card p-5 text-center group hover:shadow-lg transition-shadow">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  :style="`background: linear-gradient(135deg, ${feat.from}, ${feat.to})`">
                  <component :is="feat.icon" class="w-4.5 h-4.5 text-white" />
                </div>
                <h3 class="font-serif font-semibold text-terra-900 text-sm mb-1">{{ feat.title }}</h3>
                <p class="text-warm-400 text-xs leading-relaxed">{{ feat.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <CTASection />
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Calendar, Clock, MapPin, Music, Users, BookOpen, Star } from 'lucide-vue-next'

useHead({ title: 'Ungdom — BIAK' })

const meetingInfo = [
  { icon: Calendar, label: 'Hvornår', value: 'Månedlige fredagsmøder' },
  { icon: Clock, label: 'Tid', value: '18:00 – 20:00' },
  { icon: MapPin, label: 'Sted', value: 'Kirkevej 10, Brønderslev' },
]

const features = [
  { icon: Music, title: 'Tilbedelse', desc: 'Levende musik og lovsang', from: '#c9a84c', to: '#a8842a' },
  { icon: Users, title: 'Fællesskab', desc: 'Venner for livet', from: '#8b4513', to: '#62300d' },
  { icon: BookOpen, title: 'Undervisning', desc: 'Bibelbaseret undervisning', from: '#7c6a5a', to: '#4a3828' },
  { icon: Star, title: 'Aktiviteter', desc: 'Sjov, sport og events', from: '#c9a84c', to: '#8b4513' },
]

const { el: heroEl, isVisible: heroVisible } = useReveal()
const { el: infoEl, isVisible: infoVisible } = useReveal()
const { el: featEl, isVisible: featVisible } = useReveal()
</script>
