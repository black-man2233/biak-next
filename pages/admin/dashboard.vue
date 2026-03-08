<template>
  <div>
    <div class="flex items-start justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 class="font-serif font-bold text-2xl" style="color:var(--text)">Dashboard</h1>
        <p class="text-sm mt-1" style="color:var(--text-mid)">Velkommen til BIAK admin panel</p>
      </div>
      <button @click="seedEvents" :disabled="seeding" class="btn-gold text-sm">
        <Repeat class="w-4 h-4" />
        <span v-if="seeding">Opretter…</span>
        <span v-else>Opret Tilbagevendende Events</span>
      </button>
    </div>

    <div v-if="seedMsg" class="mb-6 p-3 rounded-xl text-sm text-center"
      :class="seedMsg.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'">
      {{ seedMsg.text }}
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:var(--bg-secondary)">
            <component :is="stat.icon" class="w-4 h-4" style="color:var(--primary)" />
          </div>
        </div>
        <p class="font-serif font-bold text-2xl" style="color:var(--text)">{{ stat.value }}</p>
        <p class="text-xs mt-0.5" style="color:var(--text-mid)">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Quick links -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to"
        class="card p-5 flex items-center gap-4 group hover:shadow-lg transition-shadow">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:var(--bg-secondary)">
          <component :is="link.icon" class="w-4.5 h-4.5" style="color:var(--primary)" />
        </div>
        <div>
          <p class="font-semibold text-sm transition-colors" style="color:var(--text)">{{ link.label }}</p>
          <p class="text-xs" style="color:var(--text-mid)">{{ link.desc }}</p>
        </div>
        <ArrowRight class="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" style="color:var(--text-light)" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Mic, Bell, Settings, ArrowRight, Repeat } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Dashboard — BIAK Admin' })

const { data: eventsData, refresh: refreshEvents } = await useFetch('/api/events?all=1')
const { data: sermonsData } = await useFetch('/api/sermons')

const seeding = ref(false)
const seedMsg = ref<{ ok: boolean; text: string } | null>(null)

async function seedEvents() {
  seeding.value = true
  seedMsg.value = null
  try {
    const res = await $fetch<{ created: number }>('/api/admin/seed', { method: 'POST' })
    seedMsg.value = { ok: true, text: `${res.created} events oprettet!` }
    await refreshEvents()
  } catch {
    seedMsg.value = { ok: false, text: 'Fejl ved oprettelse af events.' }
  } finally {
    seeding.value = false
  }
}

const stats = computed(() => [
  { icon: Calendar, label: 'Events', value: (eventsData.value as any[])?.length ?? 0 },
  { icon: Mic, label: 'Prædikener', value: (sermonsData.value as any[])?.length ?? 0 },
  { icon: Bell, label: 'Meddelelser', value: '—' },
  { icon: Settings, label: 'Indstillinger', value: '✓' },
])

const quickLinks = [
  { to: '/admin/events', icon: Calendar, label: 'Events', desc: 'Opret og rediger events' },
  { to: '/admin/sermons', icon: Mic, label: 'Prædikener', desc: 'Administrer prædikener' },
  { to: '/admin/announcements', icon: Bell, label: 'Meddelelser', desc: 'Aktuelle meddelelser' },
  { to: '/admin/settings', icon: Settings, label: 'Indstillinger', desc: 'Menigheds­indstillinger' },
]
</script>
