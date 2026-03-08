<template>
  <div>
    <!-- 1. Full-screen slideshow with hero text -->
    <Slideshow
      :hero-badge="churchInfo.hero_badge"
      :slideshow-images="churchInfo.slideshow_images"
    />

    <!-- 2. Announcements (if any) -->
    <AnnouncementsBar :announcements="activeAnnouncements" />

    <!-- 3. Welcome message (admin-editable) -->
    <div v-if="churchInfo.welcome_message" class="bg-cream py-8">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <p class="text-lg leading-relaxed" style="color: var(--text-mid)">
          {{ churchInfo.welcome_message }}
        </p>
      </div>
    </div>

    <!-- 4. Featured: latest sermon video + image cards -->
    <FeaturedSection :sermons="sermons" :events="events" />

    <!-- 5. Services & meeting times -->
    <ServicesSection />

    <!-- 6. Mission & vision -->
    <MissionSection />

    <!-- 7. Events preview -->
    <EventsPreview :events="events" />

    <!-- 8. Pastors -->
    <PastorsSection />

    <!-- 9. CTA -->
    <CTASection />
  </div>
</template>

<script setup lang="ts">
const [eventsRes, annRes, sermonsRes, infoRes] = await Promise.all([
  useFetch('/api/events'),
  useFetch('/api/announcements'),
  useFetch('/api/sermons'),
  useFetch('/api/church-info'),
])

const events   = computed(() => (eventsRes.data.value as any[]) ?? [])
const activeAnnouncements = computed(() =>
  ((annRes.data.value as any[]) ?? []).filter((a: any) => a.isActive)
)
const sermons    = computed(() => (sermonsRes.data.value as any[]) ?? [])
const churchInfo = computed<Record<string, string>>(() => (infoRes.data.value as any) ?? {})
</script>
