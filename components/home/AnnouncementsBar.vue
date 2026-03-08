<template>
  <section v-if="announcements.length" class="relative overflow-hidden" style="background: linear-gradient(135deg, var(--accent), var(--accent-light))">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-5">

      <!-- Single announcement -->
      <div v-if="announcements.length === 1" class="flex items-start gap-4">
        <div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-black/10 mt-0.5">
          <Megaphone class="w-4 h-4 text-terra-900" />
        </div>
        <div class="min-w-0">
          <p class="font-bold text-terra-900 text-sm leading-snug">{{ announcements[0].title }}</p>
          <p class="text-terra-800/80 text-sm mt-0.5 leading-relaxed">{{ announcements[0].content }}</p>
        </div>
      </div>

      <!-- Multiple announcements — scrollable list -->
      <div v-else>
        <div class="flex items-center gap-2 mb-3">
          <Megaphone class="w-4 h-4 text-terra-900 flex-shrink-0" />
          <p class="font-bold text-terra-900 text-xs uppercase tracking-wider">{{ $t('announcements.title') }}</p>
        </div>
        <div class="space-y-2">
          <div v-for="ann in announcements" :key="ann.id" class="bg-black/10 rounded-xl px-4 py-3">
            <p class="font-semibold text-terra-900 text-sm">{{ ann.title }}</p>
            <p class="text-terra-800/75 text-sm mt-0.5">{{ ann.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Megaphone } from 'lucide-vue-next'

defineProps<{
  announcements: Array<{ id: string; title: string; content: string; isActive: boolean }>
}>()
</script>
