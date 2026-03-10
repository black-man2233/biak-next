<template>
  <div class="min-h-screen bg-warm flex" data-admin="true">
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
        <NuxtLink to="/admin/slideshow" class="admin-sidebar-link" :class="{ active: route.path === '/admin/slideshow' }">
          <GalleryHorizontal class="w-4 h-4" /> Slideshow
        </NuxtLink>
        <NuxtLink to="/admin/featured-cards" class="admin-sidebar-link" :class="{ active: route.path === '/admin/featured-cards' }">
          <LayoutGrid class="w-4 h-4" /> Fremhævede kort
        </NuxtLink>
        <NuxtLink to="/admin/leaders" class="admin-sidebar-link" :class="{ active: route.path === '/admin/leaders' }">
          <Users class="w-4 h-4" /> Ledere
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
        <!-- Language switcher -->
        <div class="flex items-center gap-1.5 mb-2 px-2">
          <span class="text-xs text-warm-400 mr-1">Sprog</span>
          <button v-for="l in adminLocales" :key="l.code" @click="setLocale(l.code)"
            :class="['px-2 py-1 rounded-md text-xs font-medium transition-all border',
              locale === l.code ? 'border-terra-400 bg-terra-50 text-terra-600' : 'border-transparent text-warm-400 hover:bg-warm-100']">
            {{ l.label }}
          </button>
        </div>
        <!-- Theme switcher -->
        <div class="flex items-center gap-1.5 mb-3 px-2">
          <span class="text-xs text-warm-400 mr-1">Tema</span>
          <button v-for="t in themes" :key="t" @click="setTheme(t)"
            :title="t"
            :class="['w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all border',
              theme === t ? 'border-terra-400 bg-terra-50 text-terra-600' : 'border-transparent text-warm-400 hover:bg-warm-100']">
            <Sun v-if="t === 'light'" class="w-3.5 h-3.5" />
            <Moon v-else-if="t === 'dark'" class="w-3.5 h-3.5" />
            <Zap v-else class="w-3.5 h-3.5" />
          </button>
        </div>
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
import { LayoutDashboard, Calendar, Mic, Bell, Settings, LogOut, ExternalLink, Image, Sun, Moon, Zap, GalleryHorizontal, LayoutGrid, Users } from 'lucide-vue-next'

const route = useRoute()
const { theme, themes, setTheme } = useTheme()
const { locale, setLocale } = useI18n()
const adminLocales = [{ code: 'da', label: 'DA' }, { code: 'en', label: 'EN' }]

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>
