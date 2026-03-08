<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled
      ? 'bg-[var(--bg)]/95 backdrop-blur-md shadow-sm border-b border-[var(--border)]'
      : 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]'"
  >
    <nav class="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <img
          src="/biak-logo.svg"
          alt="BIAK"
          class="w-8 h-auto transition-all duration-300"
          :class="scrolled ? 'brightness-0 invert-0' : 'brightness-0 invert'"
          :style="scrolled ? `filter: none; opacity:1` : ''"
        />
        <div>
          <span
            class="font-serif font-bold text-xl transition-colors duration-300"
            :class="scrolled ? 'text-[var(--primary)]' : 'text-white'"
          >BIAK</span>
          <p
            class="text-xs leading-none hidden sm:block transition-colors duration-300"
            :class="scrolled ? 'text-[var(--text-mid)]' : 'text-white/70'"
          >Brønderslev Int. Kirke</p>
        </div>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden lg:flex items-center gap-5">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="nav-link font-medium text-sm transition-colors duration-200"
          :class="[
            route.path === link.href ? 'active' : '',
            scrolled ? '' : '!text-white/90 hover:!text-white',
          ]"
        >
          {{ link.label }}
        </NuxtLink>

        <!-- Theme switcher -->
        <div class="flex items-center gap-1 ml-2">
          <button
            v-for="t in themes"
            :key="t"
            @click="setTheme(t)"
            :title="$t(`common.theme.${t}`)"
            class="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            :class="[
              theme === t ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-80',
              scrolled ? 'text-[var(--text-mid)]' : 'text-white',
            ]"
          >
            <Sun v-if="t === 'light'" class="w-3.5 h-3.5" />
            <Moon v-else-if="t === 'dark'" class="w-3.5 h-3.5" />
            <Zap v-else class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Language switcher -->
        <div class="relative" ref="langDropRef">
          <button
            @click="langOpen = !langOpen"
            class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-lg transition-colors"
            :class="scrolled ? 'text-[var(--text-mid)] hover:bg-[var(--bg-secondary)]' : 'text-white/80 hover:text-white hover:bg-white/10'"
          >
            {{ locale }}
            <ChevronDown class="w-3 h-3" />
          </button>
          <Transition name="drop">
            <div v-if="langOpen" class="absolute right-0 top-full mt-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg py-1 min-w-[120px] z-50">
              <button
                v-for="l in locales"
                :key="l.code"
                @click="switchLocale(l.code)"
                class="w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors flex items-center gap-2"
                :class="locale === l.code ? 'text-[var(--primary)] font-semibold' : 'text-[var(--text-mid)]'"
              >
                {{ l.name }}
              </button>
            </div>
          </Transition>
        </div>

        <NuxtLink to="/events" class="btn-primary !py-2 !px-4 !text-sm ml-1">
          {{ $t('nav.upcomingEvents') }}
        </NuxtLink>
      </div>

      <!-- Mobile toggle -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
        :class="scrolled ? 'text-[var(--primary)] hover:bg-[var(--bg-secondary)]' : 'text-white hover:bg-white/10'"
        aria-label="Menu"
      >
        <X v-if="mobileOpen" class="w-5 h-5" />
        <Menu v-else class="w-5 h-5" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="mobileOpen" class="lg:hidden bg-[var(--bg-card)] border-t border-[var(--border)] shadow-lg">
        <div class="px-6 py-5 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            @click="mobileOpen = false"
            class="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            :class="route.path === link.href
              ? 'text-[var(--primary)] bg-[var(--bg-secondary)]'
              : 'text-[var(--text-mid)] hover:text-[var(--primary)] hover:bg-[var(--bg-secondary)]'"
          >
            {{ link.label }}
          </NuxtLink>

          <NuxtLink to="/events" @click="mobileOpen = false" class="btn-primary mt-3 justify-center">
            {{ $t('nav.upcomingEvents') }}
          </NuxtLink>

          <!-- Mobile theme + lang row -->
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
            <div class="flex items-center gap-1">
              <button v-for="t in themes" :key="t" @click="setTheme(t)"
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all text-[var(--text-mid)]"
                :class="theme === t ? 'bg-[var(--bg-secondary)] text-[var(--primary)]' : 'hover:bg-[var(--bg-secondary)]'"
              >
                <Sun v-if="t === 'light'" class="w-4 h-4" />
                <Moon v-else-if="t === 'dark'" class="w-4 h-4" />
                <Zap v-else class="w-4 h-4" />
              </button>
            </div>
            <div class="flex items-center gap-1">
              <button
                v-for="l in locales"
                :key="l.code"
                @click="switchLocale(l.code); mobileOpen = false"
                class="px-2 py-1 rounded-lg text-xs font-bold uppercase transition-colors"
                :class="locale === l.code ? 'text-[var(--primary)] bg-[var(--bg-secondary)]' : 'text-[var(--text-light)] hover:text-[var(--primary)]'"
              >{{ l.code }}</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Menu, X, Sun, Moon, Zap, ChevronDown } from 'lucide-vue-next'
const { t } = useI18n()
const { locale, locales, setLocale } = useI18n()
const route = useRoute()
const { theme, themes, setTheme } = useTheme()

const scrolled = ref(false)
const mobileOpen = ref(false)
const langOpen = ref(false)
const langDropRef = ref<HTMLElement | null>(null)

const navLinks = computed(() => [
  { href: '/',         label: t('nav.home') },
  { href: '/about',    label: t('nav.about') },
  { href: '/events',   label: t('nav.events') },
  { href: '/youth',    label: t('nav.youth') },
  { href: '/sermons',  label: t('nav.sermons') },
  { href: '/contact',  label: t('nav.contact') },
])

async function switchLocale(code: string) {
  await setLocale(code as any)
  langOpen.value = false
}

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 24 }
  window.addEventListener('scroll', onScroll, { passive: true })
  const onClickOutside = (e: MouseEvent) => {
    if (langDropRef.value && !langDropRef.value.contains(e.target as Node)) {
      langOpen.value = false
    }
  }
  document.addEventListener('click', onClickOutside)
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', onClickOutside)
  })
})

watch(() => route.path, () => { mobileOpen.value = false })
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
.drop-enter-active, .drop-leave-active { transition: all 0.15s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px) scale(0.97); }
</style>
