<template>
  <div>
    <HeroSection />
    <ServicesSection />
    <MissionSection />
    <EventsPreview :events="events" />
    <PastorsSection />
    <CTASection />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/events')
const events = computed(() => data.value ?? [])
</script>
