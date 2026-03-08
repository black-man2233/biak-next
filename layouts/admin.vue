<template>
  <div class="min-h-screen bg-warm flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-warm-200 flex flex-col shadow-sm fixed inset-y-0 left-0 z-30">
      <!-- Logo -->
      <div class="h-16 flex items-center gap-3 px-6 border-b border-warm-100">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img src="/biak-logo.svg" alt="BIAK" class="w-7 h-auto" />
          <span class="font-serif font-bold text-terra-500 text-lg">BIAK</span>
        </NuxtLink>
      </div>

      <!-- Nav -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <NuxtLink to="/admin/dashboard" class="admin-sidebar-link" :class="{ active: route.path === '/admin/dashboard' }">
          <LayoutDashboard class="w-4 h-4" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/events" class="admin-sidebar-link" :class="{ active: route.path === '/admin/events' }">
          <Calendar class="w-4 h-4" /> Events
        </NuxtLink>
        <NuxtLink to="/admin/sermons" class="admin-sidebar-link" :class="{ active: route.path === '/admin/sermons' }">
          <Mic class="w-4 h-4" /> Prædikener
        </NuxtLink>
        <NuxtLink to="/admin/announcements" class="admin-sidebar-link" :class="{ active: route.path === '/admin/announcements' }">
          <Bell class="w-4 h-4" /> Meddelelser
        </NuxtLink>
        <NuxtLink to="/admin/church-info" class="admin-sidebar-link" :class="{ active: route.path === '/admin/church-info' }">
          <Image class="w-4 h-4" /> Kirkeindhold
        </NuxtLink>
        <NuxtLink to="/admin/settings" class="admin-sidebar-link" :class="{ active: route.path === '/admin/settings' }">
          <Settings class="w-4 h-4" /> Indstillinger
        </NuxtLink>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-warm-100">
        <NuxtLink to="/" class="admin-sidebar-link text-warm-400 mb-1">
          <ExternalLink class="w-4 h-4" /> Se hjemmeside
        </NuxtLink>
        <button @click="logout" class="admin-sidebar-link w-full text-left text-red-400 hover:text-red-600 hover:bg-red-50">
          <LogOut class="w-4 h-4" /> Log ud
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="pl-64 flex-1 min-h-screen">
      <header class="h-16 bg-white border-b border-warm-100 flex items-center px-8 sticky top-0 z-20 shadow-sm">
        <h1 class="font-semibold text-terra-700 text-sm">Admin Panel</h1>
        <span class="ml-auto text-xs text-warm-400">BIAK Brønderslev</span>
      </header>
      <div class="p-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard, Calendar, Mic, Bell, Settings, LogOut, ExternalLink, Image } from 'lucide-vue-next'

const route = useRoute()

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>
