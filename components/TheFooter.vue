<template>
  <footer class="bg-[var(--bg-secondary)] border-t border-[var(--border)]">
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, var(--accent), transparent)" />
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-5">
            <img src="/biak-logo.svg" alt="BIAK" class="w-10 h-auto" style="filter: none" />
            <div>
              <span class="font-serif font-bold text-xl text-[var(--primary)]">BIAK</span>
              <p class="text-xs text-[var(--text-mid)]">Brønderslev International Apostolsk Kirke</p>
            </div>
          </div>
          <p class="text-[var(--text-mid)] text-sm leading-relaxed max-w-xs">
            {{ $t('footer.desc') }}
          </p>
          <div class="flex items-center gap-3 mt-5">
            <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] text-[var(--text-mid)] transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://www.youtube.com/@biakyoutube" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] hover:border-red-500 hover:text-red-500 text-[var(--text-mid)] transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-[var(--text-mid)] mb-4">{{ $t('footer.navTitle') }}</p>
          <ul class="space-y-2.5">
            <li v-for="link in navLinks" :key="link.href">
              <NuxtLink :to="link.href" class="text-sm text-[var(--text-mid)] hover:text-[var(--primary)] transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-[var(--text-mid)] mb-4">{{ $t('footer.contactTitle') }}</p>
          <ul class="space-y-2.5 text-sm text-[var(--text-mid)]">
            <li>
              <a href="tel:+4526161439" class="hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                <Phone class="w-3.5 h-3.5 flex-shrink-0" /> +45 26 16 14 39
              </a>
            </li>
            <li>
              <a href="mailto:info@biak.dk" class="hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                <Mail class="w-3.5 h-3.5 flex-shrink-0" /> info@biak.dk
              </a>
            </li>
            <li class="flex items-start gap-2">
              <MapPin class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> Kirkevej 10, 9700 Brønderslev
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)]">
        <p class="text-xs text-[var(--text-light)]">© {{ new Date().getFullYear() }} {{ $t('footer.copyright') }}</p>
        <button @click="scrollTop" class="text-xs text-[var(--text-light)] hover:text-[var(--primary)] transition-colors flex items-center gap-1.5">
          {{ $t('footer.backToTop') }} <ArrowUp class="w-3 h-3" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-vue-next'
const { t } = useI18n()

const navLinks = computed(() => [
  { href: '/',        label: t('nav.home') },
  { href: '/about',   label: t('nav.about') },
  { href: '/events',  label: t('nav.events') },
  { href: '/youth',   label: t('nav.youth') },
  { href: '/sermons', label: t('nav.sermons') },
  { href: '/contact', label: t('nav.contact') },
])

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
</script>
