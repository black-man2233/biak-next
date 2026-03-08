<template>
  <div>
    <div class="mb-8">
      <h1 class="font-serif font-bold text-2xl text-terra-900">Indstillinger</h1>
      <p class="text-warm-400 text-sm mt-1">Menigheds- og systemindstillinger</p>
    </div>

    <div class="max-w-lg space-y-6">
      <!-- Session info -->
      <div class="card p-6">
        <h2 class="font-semibold text-terra-900 mb-4 flex items-center gap-2">
          <Shield class="w-4 h-4 text-terra-600" /> Session &amp; Sikkerhed
        </h2>
        <p class="text-warm-500 text-sm mb-4">Du er logget ind som administrator. Din session er krypteret og sikker.</p>
        <button @click="logout" class="btn-terra-outline text-sm">
          <LogOut class="w-4 h-4" /> Log Ud
        </button>
      </div>

      <!-- Church info (read-only display) -->
      <div class="card p-6">
        <h2 class="font-semibold text-terra-900 mb-4 flex items-center gap-2">
          <Info class="w-4 h-4 text-terra-600" /> Menighedsinfo
        </h2>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-warm-400">Navn</span>
            <span class="text-terra-900 font-medium">BIAK — Bethany International Apostolic Kingdom</span>
          </div>
          <div class="flex justify-between">
            <span class="text-warm-400">Adresse</span>
            <span class="text-terra-900 font-medium">Kirkevej 10, 9700 Brønderslev</span>
          </div>
          <div class="flex justify-between">
            <span class="text-warm-400">Telefon</span>
            <span class="text-terra-900 font-medium">+45 26 16 14 39</span>
          </div>
          <div class="flex justify-between">
            <span class="text-warm-400">Email</span>
            <span class="text-terra-900 font-medium">info@biak.dk</span>
          </div>
        </div>
      </div>

      <!-- Links -->
      <div class="card p-6">
        <h2 class="font-semibold text-terra-900 mb-4 flex items-center gap-2">
          <Globe class="w-4 h-4 text-terra-600" /> Hurtige Genveje
        </h2>
        <div class="space-y-2">
          <NuxtLink to="/" target="_blank" class="flex items-center gap-2 text-sm text-terra-600 hover:text-terra-800 transition-colors">
            <ExternalLink class="w-3.5 h-3.5" /> Åbn hjemmeside
          </NuxtLink>
          <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-sm text-terra-600 hover:text-terra-800 transition-colors">
            <ExternalLink class="w-3.5 h-3.5" /> Facebook side
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Shield, LogOut, Info, Globe, ExternalLink } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Indstillinger — BIAK Admin' })

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>
