<template>
  <Teleport to="body">
    <!-- Floating orbs + grid — visible sitewide in youth mode -->
    <div v-if="isYouth" class="youth-fx" aria-hidden="true">
      <div class="youth-orb youth-orb-1" />
      <div class="youth-orb youth-orb-2" />
      <div class="youth-orb youth-orb-3" />
      <div class="youth-orb youth-orb-4" />
      <div class="youth-grid" />
    </div>

    <!-- Easter egg: emoji rain (Konami code) -->
    <div v-if="eggRain" class="youth-egg-rain" aria-hidden="true">
      <span
        v-for="e in rainEmojis"
        :key="e.id"
        class="rain-drop"
        :style="e.style"
      >{{ e.emoji }}</span>
    </div>

    <!-- Easter egg: Konami toast -->
    <Transition name="youth-toast">
      <div v-if="konamiShown" class="youth-konami-toast">
        🎮 CHEAT CODE — GOD MODE ON ⚡🙏
      </div>
    </Transition>

    <!-- Easter egg: AMEN crosses float up -->
    <div v-if="amenShown" class="youth-amen-burst" aria-hidden="true">
      <span
        v-for="c in amenCrosses"
        :key="c.id"
        class="amen-cross"
        :style="c.style"
      >✝️</span>
    </div>

    <!-- Easter egg: logo rainbow flash overlay -->
    <Transition name="fade">
      <div v-if="rainbowFlash" class="youth-rainbow-flash" aria-hidden="true" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { theme } = useTheme()
const isYouth = computed(() => theme.value === 'youth')

/* ── Emoji rain ─────────────────────────────────────────────── */
const eggRain = ref(false)
const rainEmojis = ref<{ id: number; emoji: string; style: string }[]>([])

function triggerRain(pool: string[]) {
  rainEmojis.value = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    emoji: pool[i % pool.length],
    style: [
      `left:${(Math.random() * 96).toFixed(1)}vw`,
      `animation-delay:${(Math.random() * 2.5).toFixed(2)}s`,
      `animation-duration:${(1.8 + Math.random() * 2).toFixed(2)}s`,
      `font-size:${22 + Math.floor(Math.random() * 28)}px`,
    ].join(';'),
  }))
  eggRain.value = true
  setTimeout(() => { eggRain.value = false }, 5000)
}

/* ── Konami code ─────────────────────────────────────────────── */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const konamiPos = ref(0)
const konamiShown = ref(false)

function handleKonami(key: string) {
  if (key === KONAMI[konamiPos.value]) {
    konamiPos.value++
    if (konamiPos.value === KONAMI.length) {
      konamiPos.value = 0
      konamiShown.value = true
      triggerRain(['⚡','🔥','✨','💜','🎮','🙏','🦋','🌟'])
      setTimeout(() => { konamiShown.value = false }, 4000)
    }
  } else {
    konamiPos.value = key === KONAMI[0] ? 1 : 0
  }
}

/* ── AMEN typing ────────────────────────────────────────────── */
const amenBuf = ref('')
const amenShown = ref(false)
const amenCrosses = ref<{ id: number; style: string }[]>([])

function triggerAmen() {
  amenCrosses.value = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    style: [
      `left:${(15 + Math.random() * 70).toFixed(1)}vw`,
      `bottom:${(10 + Math.random() * 40).toFixed(1)}vh`,
      `animation-delay:${(i * 0.08).toFixed(2)}s`,
      `font-size:${24 + Math.floor(Math.random() * 20)}px`,
    ].join(';'),
  }))
  amenShown.value = true
  setTimeout(() => { amenShown.value = false }, 3200)
}

/* ── Logo rainbow: click BIAK logo 5× ──────────────────────── */
const rainbowFlash = ref(false)
const logoClicks = ref(0)
let logoClickTimer: ReturnType<typeof setTimeout> | null = null

function handleLogoClick() {
  if (!isYouth.value) return
  logoClicks.value++
  if (logoClickTimer) clearTimeout(logoClickTimer)
  logoClickTimer = setTimeout(() => { logoClicks.value = 0 }, 2000)
  if (logoClicks.value >= 5) {
    logoClicks.value = 0
    rainbowFlash.value = true
    triggerRain(['🌈','✨','💫','🦄','🎉','🎊','🌟','⭐'])
    setTimeout(() => { rainbowFlash.value = false }, 3000)
  }
}

/* ── Fire emoji: click 3× → fire burst ──────────────────────── */
const fireClicks = ref(0)
let fireClickTimer: ReturnType<typeof setTimeout> | null = null

function handleFireClick() {
  if (!isYouth.value) return
  fireClicks.value++
  if (fireClickTimer) clearTimeout(fireClickTimer)
  fireClickTimer = setTimeout(() => { fireClicks.value = 0 }, 1500)
  if (fireClicks.value >= 3) {
    fireClicks.value = 0
    triggerRain(['🔥','💥','🌋','⚡','🔥','💜','🔥'])
  }
}

/* ── Global keydown listener ─────────────────────────────────── */
function onKeyDown(e: KeyboardEvent) {
  if (!isYouth.value) return
  handleKonami(e.key)
  // Accumulate typed characters (only letters)
  if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
    amenBuf.value = (amenBuf.value + e.key.toLowerCase()).slice(-4)
    if (amenBuf.value === 'amen') {
      amenBuf.value = ''
      triggerAmen()
    }
  }
}

/* ── Click delegation: logo + fire emoji ─────────────────────── */
function onDocClick(e: MouseEvent) {
  if (!isYouth.value) return
  const target = e.target as HTMLElement
  if (target.closest('a[href="/"], .navbar-logo, [data-logo]')) {
    handleLogoClick()
  }
  if (target.textContent?.trim() === '🔥' || target.closest('[data-fire]')) {
    handleFireClick()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('click', onDocClick)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('click', onDocClick)
  if (logoClickTimer) clearTimeout(logoClickTimer)
  if (fireClickTimer) clearTimeout(fireClickTimer)
})
</script>

<style scoped>
.youth-rainbow-flash {
  position: fixed;
  inset: 0;
  z-index: 9990;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(124,58,237,0.15) 0%,
    rgba(236,72,153,0.15) 25%,
    rgba(251,191,36,0.15) 50%,
    rgba(16,185,129,0.15) 75%,
    rgba(59,130,246,0.15) 100%
  );
  animation: rainbow-flash-anim 3s ease-out forwards;
}
@keyframes rainbow-flash-anim {
  0%   { opacity: 0; }
  15%  { opacity: 1; }
  70%  { opacity: 1; }
  100% { opacity: 0; }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
