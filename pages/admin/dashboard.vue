<template>
  <div>
    <div class="mb-8">
      <h1 class="font-serif font-bold text-2xl text-terra-900">Dashboard</h1>
      <p class="text-warm-400 text-sm mt-1">Velkommen til BIAK admin panel</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center" :class="stat.bg">
            <component :is="stat.icon" class="w-4 h-4" :class="stat.color" />
          </div>
        </div>
        <p class="font-serif font-bold text-2xl text-terra-900">{{ stat.value }}</p>
        <p class="text-warm-400 text-xs mt-0.5">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Quick links -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="link in quickLinks"
        :key="link.to"
        :to="link.to"
        class="card p-5 flex items-center gap-4 group hover:shadow-lg transition-shadow"
      >
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="link.bg">
          <component :is="link.icon" class="w-4.5 h-4.5" :class="link.color" />
        </div>
        <div>
          <p class="font-semibold text-terra-900 group-hover:text-terra-600 transition-colors text-sm">{{ link.label }}</p>
          <p class="text-warm-400 text-xs">{{ link.desc }}</p>
        </div>
        <ArrowRight class="w-3.5 h-3.5 text-warm-300 ml-auto group-hover:translate-x-1 transition-transform" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Mic, Bell, Settings, ArrowRight } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Dashboard — BIAK Admin' })

const { data: eventsData } = await useFetch('/api/events')
const { data: sermonsData } = await useFetch('/api/sermons')

const stats = computed(() => [
  { icon: Calendar, label: 'Events', value: (eventsData.value as any[])?.length ?? 0, bg: 'bg-terra-50', color: 'text-terra-600' },
  { icon: Mic, label: 'Prædikener', value: (sermonsData.value as any[])?.length ?? 0, bg: 'bg-gold-50', color: 'text-gold-600' },
  { icon: Bell, label: 'Meddelelser', value: '—', bg: 'bg-warm-100', color: 'text-warm-500' },
  { icon: Settings, label: 'Indstillinger', value: '✓', bg: 'bg-cream', color: 'text-terra-400' },
])

const quickLinks = [
  { to: '/admin/events', icon: Calendar, label: 'Events', desc: 'Opret og rediger events', bg: 'bg-terra-50', color: 'text-terra-600' },
  { to: '/admin/sermons', icon: Mic, label: 'Prædikener', desc: 'Administrer prædikener', bg: 'bg-gold-50', color: 'text-gold-600' },
  { to: '/admin/announcements', icon: Bell, label: 'Meddelelser', desc: 'Aktuelle meddelelser', bg: 'bg-warm-100', color: 'text-warm-500' },
  { to: '/admin/settings', icon: Settings, label: 'Indstillinger', desc: 'Menigheds­indstillinger', bg: 'bg-cream', color: 'text-terra-400' },
]
</script>
