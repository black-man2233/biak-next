<template>
  <section class="py-20 bg-warm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Latest sermon video (if available) -->
      <div v-if="latestSermon" class="mb-10">
        <div ref="sermonEl" :class="['reveal mb-8 text-center', sermonVisible && 'visible']">
          <span class="section-label justify-center mb-3">{{ $t('sermons.sectionLabel') }}</span>
          <h2 class="font-serif font-bold text-2xl sm:text-3xl mt-2" style="color:var(--text)">
            {{ $t('sermons.titleHome') }} <span style="color:var(--accent)">{{ $t('sermons.titleAccentHome') }}</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Video embed or thumbnail -->
          <div class="rounded-2xl overflow-hidden aspect-video bg-[var(--bg-secondary)] relative">
            <iframe
              v-if="sermonEmbedUrl"
              :src="sermonEmbedUrl"
              class="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            />
            <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3" style="color:var(--text-mid)">
              <Play class="w-12 h-12 opacity-30" />
              <span class="text-sm">{{ $t('sermons.noVideo') }}</span>
            </div>
          </div>
          <!-- Sermon info -->
          <div class="flex flex-col justify-center">
            <p class="text-xs font-bold uppercase tracking-widest mb-2" style="color:var(--accent)">
              {{ latestSermon.speaker || $t('sermons.unknownSpeaker') }}
            </p>
            <h3 class="font-serif font-bold text-xl sm:text-2xl mb-3 leading-tight" style="color:var(--text)">
              {{ latestSermon.title }}
            </h3>
            <p v-if="latestSermon.description" class="text-sm leading-relaxed mb-5" style="color:var(--text-mid)">
              {{ latestSermon.description }}
            </p>
            <p class="text-xs mb-5" style="color:var(--text-light)">
              <CalendarDays class="w-3.5 h-3.5 inline mr-1" />
              {{ formatDate(latestSermon.date) }}
            </p>
            <div class="flex gap-3">
              <a v-if="latestSermon.videoUrl" :href="latestSermon.videoUrl" target="_blank" rel="noopener"
                class="btn-primary !py-2.5 !px-5 !text-sm">
                <Play class="w-4 h-4" /> {{ $t('sermons.watchVideo') }}
              </a>
              <NuxtLink to="/sermons" class="btn-terra-outline !py-2.5 !px-5 !text-sm">
                {{ $t('sermons.viewAll') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature cards: events + service + youth -->
      <div ref="cardsEl" :class="['reveal mt-4', cardsVisible && 'visible']">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Card 1: latest or next event -->
          <div
            class="featured-card group rounded-2xl overflow-hidden relative min-h-[280px] flex flex-col justify-end cursor-default"
            :style="`background-image: url('${eventImg}'); background-size: cover; background-position: center`"
          >
            <div class="absolute inset-0 featured-overlay" />
            <div class="relative z-10 p-6">
              <span class="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2 block">
                {{ nextEvent ? formatDate(nextEvent.date) : $t('events.sectionLabel') }}
              </span>
              <h3 class="font-serif font-bold text-white text-lg leading-tight mb-2">
                {{ nextEvent ? nextEvent.title : $t('services.sunday.title') }}
              </h3>
              <p class="text-white/65 text-xs leading-relaxed mb-4 line-clamp-2">
                {{ nextEvent ? nextEvent.description : $t('services.sunday.desc') }}
              </p>
              <NuxtLink to="/events" class="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white transition-colors">
                {{ $t('events.viewAll') }} <ArrowRight class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>

          <!-- Card 2: Sunday service info -->
          <div
            class="featured-card group rounded-2xl overflow-hidden relative min-h-[280px] flex flex-col justify-end"
            style="background-image: url('https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=800&q=80'); background-size: cover; background-position: center"
          >
            <div class="absolute inset-0 featured-overlay" />
            <div class="relative z-10 p-6">
              <span class="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2 block">
                {{ $t('services.sectionLabel') }}
              </span>
              <h3 class="font-serif font-bold text-white text-lg leading-tight mb-2">
                {{ $t('services.sunday.title') }}
              </h3>
              <p class="text-white/65 text-xs leading-relaxed mb-4">
                {{ $t('services.sunday.desc') }}
              </p>
              <NuxtLink to="/about" class="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white transition-colors">
                {{ $t('hero.ctaLearn') }} <ArrowRight class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>

          <!-- Card 3: Youth -->
          <div
            class="featured-card group rounded-2xl overflow-hidden relative min-h-[280px] flex flex-col justify-end"
            style="background-image: url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'); background-size: cover; background-position: center"
          >
            <div class="absolute inset-0 featured-overlay" style="background: linear-gradient(to top, rgba(76,29,149,0.9) 0%, rgba(109,40,217,0.5) 60%, transparent 100%)" />
            <div class="relative z-10 p-6">
              <span class="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2 block">
                {{ $t('youth.sectionLabel') }}
              </span>
              <h3 class="font-serif font-bold text-white text-lg leading-tight mb-2">
                {{ $t('youth.heroTitleAccent') }}
              </h3>
              <p class="text-white/65 text-xs leading-relaxed mb-4">
                {{ $t('youth.heroDesc') }}
              </p>
              <NuxtLink to="/youth" class="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white transition-colors">
                {{ $t('youth.ctaJoin') }} <ArrowRight class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Play, CalendarDays, ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  sermons: any[]
  events: any[]
}>()

const latestSermon = computed(() => props.sermons?.[0] ?? null)
const nextEvent = computed(() => props.events?.[0] ?? null)

// Default event background
const eventImg = computed(() =>
  nextEvent.value?.imageUrl ||
  'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?auto=format&fit=crop&w=800&q=80'
)

// Extract YouTube embed URL
function getEmbedUrl(url?: string | null): string | null {
  if (!url) return null
  const ytFull  = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  const ytShort = url.match(/youtu\.be\/([^?]+)/)
  const fbVideo = url.includes('facebook.com')
  if (ytFull)  return `https://www.youtube.com/embed/${ytFull[1]}?autoplay=0`
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=0`
  if (fbVideo) return null  // Facebook doesn't allow direct embed easily
  return null
}

const sermonEmbedUrl = computed(() => getEmbedUrl(latestSermon.value?.videoUrl))

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
}

const { el: sermonEl, isVisible: sermonVisible } = useReveal()
const { el: cardsEl, isVisible: cardsVisible } = useReveal()
</script>

<style scoped>
.featured-card { transition: transform 0.3s ease; }
.featured-card:hover { transform: translateY(-4px); }
.featured-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 60%, transparent 100%);
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
