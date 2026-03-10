<template>
  <section v-if="cards.length" class="py-20 md:py-28 bg-warm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div ref="headerEl" :class="['reveal text-center mb-12', headerVisible && 'visible']">
        <span class="section-label justify-center mb-4">{{ $t('featured.label') }}</span>
        <h2 class="font-serif font-bold text-3xl sm:text-4xl mt-3" style="color:var(--text)">
          {{ $t('featured.title') }} <span style="color:var(--accent)">{{ $t('featured.titleAccent') }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(card, i) in cards"
          :key="card.id"
          :class="['reveal card overflow-hidden group', headerVisible && 'visible']"
          :style="{ transitionDelay: `${i * 120}ms` }"
        >
          <!-- Image or icon header -->
          <div class="h-44 overflow-hidden relative flex items-center justify-center"
            style="background: linear-gradient(135deg, var(--hero-from), var(--hero-to))">
            <img v-if="card.imageUrl" :src="card.imageUrl" :alt="card.title"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <component v-else-if="card.icon" :is="iconMap[card.icon] ?? StarIcon"
              class="w-12 h-12 text-white/50 relative z-10" />
            <div v-else class="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10"
              style="background:var(--accent)">
              <StarIcon class="w-6 h-6 text-white" />
            </div>
          </div>

          <div class="p-6">
            <p v-if="card.subtitle" class="text-xs font-bold uppercase tracking-widest mb-2" style="color:var(--accent)">
              {{ card.subtitle }}
            </p>
            <h3 class="font-serif font-bold text-lg leading-snug mb-2" style="color:var(--text)">{{ card.title }}</h3>
            <p v-if="card.description" class="text-sm leading-relaxed line-clamp-3" style="color:var(--text-mid)">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Heart, Star as StarIcon, Users, BookOpen, Music, Zap, Globe, Flame,
  Gift, Baby, HandHeart, Church, Cross, Smile, Home
} from 'lucide-vue-next'

defineProps<{
  cards: Array<{ id: string; title: string; subtitle: string | null; description: string | null; imageUrl: string | null; icon: string | null }>
}>()

const iconMap: Record<string, any> = {
  Heart, Star: StarIcon, Users, BookOpen, Music, Zap, Globe, Flame,
  Gift, Baby, HandHeart, Church, Cross, Smile, Home,
}

const { el: headerEl, isVisible: headerVisible } = useReveal()
</script>
