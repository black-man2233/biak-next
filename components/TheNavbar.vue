<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-100' : 'bg-transparent'"
  >
    <nav class="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <img
          src="/biak-logo.svg"
          alt="BIAK"
          class="w-8 h-auto transition-all duration-300"
          :class="scrolled ? '' : 'brightness-0 invert'"
        />
        <div>
          <span class="font-serif font-bold text-xl transition-colors duration-300"
            :class="scrolled ? 'text-terra-600' : 'text-white'">BIAK</span>
          <p class="text-xs leading-none hidden sm:block transition-colors duration-300"
            :class="scrolled ? 'text-warm-400' : 'text-white/60'">Brønderslev Int. Kirke</p>
        </div>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden lg:flex items-center gap-6">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="nav-link"
          :class="[
            route.path === link.href ? 'active' : '',
            scrolled ? '' : '!text-white/80 hover:!text-white',
          ]"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink to="/events" class="btn-primary ml-2 !py-2.5 !px-5 !text-sm">
          Kommende Events
        </NuxtLink>
      </div>

      <!-- Mobile toggle -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
        :class="scrolled ? 'text-terra-600 hover:bg-warm-100' : 'text-white hover:bg-white/10'"
        aria-label="Menu"
      >
        <X v-if="mobileOpen" class="w-5 h-5" />
        <Menu v-else class="w-5 h-5" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="mobileOpen" class="lg:hidden bg-white border-t border-warm-100 shadow-lg">
        <div class="px-6 py-5 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            @click="mobileOpen = false"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="route.path === link.href
              ? 'text-terra-600 bg-terra-50'
              : 'text-warm-600 hover:text-terra-600 hover:bg-warm-100'"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/events" @click="mobileOpen = false" class="btn-primary mt-3 justify-center">
            Kommende Events
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { href: '/',          label: 'Hjem' },
  { href: '/about',     label: 'Om Os' },
  { href: '/events',    label: 'Events' },
  { href: '/youth',     label: 'Unge' },
  { href: '/sermons',   label: 'Prædikener' },
  { href: '/contact',   label: 'Kontakt' },
]

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 24 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

watch(() => route.path, () => { mobileOpen.value = false })
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
