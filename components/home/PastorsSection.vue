<template>
  <section class="py-24 md:py-32 bg-warm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div ref="headerEl" :class="['reveal text-center mb-16', headerVisible && 'visible']">
        <span class="section-label justify-center mb-4">{{ $t('pastors.sectionLabel') }}</span>
        <h2 class="font-serif font-bold text-3xl sm:text-4xl md:text-5xl mt-3" style="color:var(--text)">
          {{ $t('pastors.title') }} <span style="color:var(--accent)">{{ $t('pastors.titleAccent') }}</span>
        </h2>
      </div>

      <!-- Single pastor card — centered -->
      <div class="max-w-lg mx-auto mb-10">
        <div ref="cardEl" :class="['reveal card p-8 flex gap-6 group', cardVisible && 'visible delay-100']">
          <div class="flex-shrink-0">
            <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-serif font-bold text-white shadow-md"
              style="background: linear-gradient(135deg, var(--primary), var(--primary-dark))">
              M
            </div>
          </div>
          <div class="min-w-0">
            <h3 class="font-serif font-bold text-xl leading-tight" style="color:var(--text)">Pastor Martin Mutale</h3>
            <p class="text-xs font-semibold mt-1 mb-3 uppercase tracking-wide" style="color:var(--accent)">{{ $t('pastors.martin.role') }}</p>
            <p class="text-sm leading-relaxed" style="color:var(--text-mid)">{{ $t('pastors.martin.bio') }}</p>
          </div>
        </div>
      </div>

      <!-- Quote -->
      <div ref="quoteEl" :class="['reveal max-w-lg mx-auto', quoteVisible && 'visible delay-300']">
        <div class="card p-8 md:p-10 text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1" style="background: linear-gradient(90deg, transparent, var(--accent), transparent)" />
          <p class="font-serif text-5xl leading-none mb-4 select-none" style="color:var(--border-mid)">&ldquo;</p>
          <p class="font-serif italic text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto" style="color:var(--text)">
            {{ $t('pastors.quote') }}
          </p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <div class="h-px w-10" style="background:var(--border-mid)" />
            <p class="text-sm font-medium" style="color:var(--text-mid)">{{ $t('pastors.quoteAuthor') }}</p>
            <div class="h-px w-10" style="background:var(--border-mid)" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { el: headerEl, isVisible: headerVisible } = useReveal()
const { el: quoteEl, isVisible: quoteVisible } = useReveal()

const cardEl = ref<Element | null>(null)
const cardVisible = ref(false)
onMounted(() => {
  if (!cardEl.value) return
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { cardVisible.value = true; obs.disconnect() }
  }, { threshold: 0.1 })
  obs.observe(cardEl.value)
})
</script>
