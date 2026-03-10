<template>
  <div>
    <!-- 1. Hero -->
    <PageHero
      :label="churchInfo.hero_badge || $t('hero.badge')"
      :title="$t('hero.title')"
      :title-accent="$t('hero.titleAccent')"
      :desc="$t('hero.desc')"
    >
      <div class="flex flex-col sm:flex-row gap-4">
        <NuxtLink to="/about" class="btn-gold">{{ $t('hero.ctaLearn') }}</NuxtLink>
        <NuxtLink to="/contact" class="btn-outline">{{ $t('hero.ctaLive') }}</NuxtLink>
      </div>
    </PageHero>

    <!-- 2. Photo slideshow (admin-managed) -->
    <HomeSlideshow :slides="slides" />

    <!-- 3. Quick service info strip -->
    <div class="bg-cream border-b border-[var(--border)]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)]">
          <div class="bg-cream text-center py-5 px-6">
            <p class="text-[10px] font-bold uppercase tracking-widest mb-1.5" style="color:var(--text-mid)">{{ $t('services.sunday.day') }}</p>
            <p class="font-serif font-bold text-2xl" style="color:var(--text)">10:30 – 12:00</p>
            <p class="text-xs mt-1" style="color:var(--text-light)">{{ $t('services.sunday.title') }}</p>
          </div>
          <div class="bg-cream text-center py-5 px-6">
            <p class="text-[10px] font-bold uppercase tracking-widest mb-1.5" style="color:var(--text-mid)">{{ $t('services.wednesday.day') }}</p>
            <p class="font-serif font-bold text-2xl" style="color:var(--text)">18:30 – 20:00</p>
            <p class="text-xs mt-1" style="color:var(--text-light)">{{ $t('services.wednesday.title') }}</p>
          </div>
          <div class="bg-cream text-center py-5 px-6">
            <p class="text-[10px] font-bold uppercase tracking-widest mb-1.5" style="color:var(--text-mid)">{{ $t('services.friday.day') }}</p>
            <p class="font-serif font-bold text-2xl" style="color:var(--accent)">18:00 – 20:00</p>
            <p class="text-xs mt-1" style="color:var(--text-light)">{{ $t('services.friday.title') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Announcements -->
    <AnnouncementsBar :announcements="activeAnnouncements" />

    <!-- 5. Welcome message (admin-editable) -->
    <div v-if="churchInfo.welcome_message" class="bg-cream py-8">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <p class="text-lg leading-relaxed" style="color:var(--text-mid)">{{ churchInfo.welcome_message }}</p>
      </div>
    </div>

    <!-- 6. Featured cards (admin-managed) -->
    <FeaturedCards :cards="featuredCards" />

    <!-- 7. Latest sermons (imported via admin from YouTube) -->
    <SermonsPreview :sermons="sermons" />

    <!-- 8. Services & meeting times -->
    <ServicesSection />

    <!-- 9. Mission & vision -->
    <MissionSection />

    <!-- 10. Pastors -->
    <PastorsSection />

    <!-- 11. CTA -->
    <CTASection />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'BIAK — Brønderslev International Apostolsk Kirke' })

const [eventsRes, annRes, sermonsRes, infoRes, slidesRes, featuredRes] = await Promise.all([
  useFetch('/api/events'),
  useFetch('/api/announcements'),
  useFetch('/api/sermons'),
  useFetch('/api/church-info'),
  useFetch('/api/slides?page=home'),
  useFetch('/api/featured-cards'),
])

const activeAnnouncements = computed(() =>
  ((annRes.data.value as any[]) ?? []).filter((a: any) => a.isActive)
)
const sermons       = computed(() => (sermonsRes.data.value as any[]) ?? [])
const churchInfo    = computed<Record<string, string>>(() => (infoRes.data.value as any) ?? {})
const slides        = computed(() => (slidesRes.data.value as any[]) ?? [])
const featuredCards = computed(() => ((featuredRes.data.value as any[]) ?? []).filter((c: any) => c.isActive))
</script>
