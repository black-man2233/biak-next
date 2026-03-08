<template>
  <footer class="bg-terra-900 text-white">
    <!-- Top gold line -->
    <div class="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-5">
            <img src="/biak-logo.svg" alt="BIAK" class="w-9 h-auto brightness-0 invert opacity-90" />
            <div>
              <p class="font-serif font-bold text-xl text-white">BIAK</p>
              <p class="text-xs text-white/50">Brønderslev International Apostolsk Kirke</p>
            </div>
          </div>
          <p class="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
            Et levende kristent fællesskab dedikeret til at åbenbare Guds kærlighed og demonstrere Hans kraft i Brønderslev og verden.
          </p>
          <a
            href="https://facebook.com/biakdk"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-white/50 hover:text-gold-400 text-sm transition-colors duration-200"
          >
            <Facebook class="w-4 h-4" /> Facebook
          </a>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Navigation</h3>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.href">
              <NuxtLink
                :to="link.href"
                class="text-white/60 hover:text-gold-400 text-sm transition-colors duration-200"
              >{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Kontakt</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
              <span class="text-white/60 text-sm leading-relaxed">
                Kirkevej 10<br />9700 Brønderslev<br />Danmark
              </span>
            </li>
            <li class="flex items-center gap-3">
              <Phone class="w-4 h-4 text-gold-500 flex-shrink-0" />
              <a href="tel:+4526161439" class="text-white/60 hover:text-gold-400 text-sm transition-colors duration-200">
                +45 26 16 14 39
              </a>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-4 h-4 text-gold-500 flex-shrink-0" />
              <a href="mailto:info@biak.dk" class="text-white/60 hover:text-gold-400 text-sm transition-colors duration-200">
                info@biak.dk
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-white/30 text-sm">
          © {{ new Date().getFullYear() }} BIAK — Brønderslev International Apostolsk Kirke
        </p>
        <button
          @click="scrollToTop"
          class="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-200 hover:-translate-y-0.5"
          aria-label="Scroll to top"
        >
          <ArrowUp class="w-4 h-4" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MapPin, Phone, Mail, Facebook, ArrowUp } from 'lucide-vue-next'

const links = [
  { href: '/about',   label: 'Om Os' },
  { href: '/events',  label: 'Events' },
  { href: '/youth',   label: 'Unge' },
  { href: '/sermons', label: 'Prædikener' },
  { href: '/contact', label: 'Kontakt Os' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
