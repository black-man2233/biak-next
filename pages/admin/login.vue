<template>
  <div class="min-h-screen bg-terra-900 flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none"
      style="background: radial-gradient(ellipse, #c9a84c 0%, transparent 70%)" />

    <div class="relative w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="/biak-logo.svg" alt="BIAK" class="h-12 mx-auto invert opacity-90 mb-4" />
        <p class="text-white/40 text-sm">Admin Panel</p>
      </div>

      <div class="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
        <h1 class="font-serif font-bold text-white text-xl mb-6 text-center">Log Ind</h1>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5">Adgangskode</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition"
            />
          </div>
          <div v-if="error" class="p-3 rounded-xl bg-red-500/20 text-red-300 text-sm text-center">{{ error }}</div>
          <button type="submit" :disabled="loading" class="w-full py-2.5 rounded-xl font-semibold text-sm transition-all"
            style="background: linear-gradient(135deg, #e8c76a, #c9a84c); color: #2d1f14">
            <span v-if="loading">Logger ind…</span>
            <span v-else>Log Ind</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const password = ref('')
const loading = ref(false)
const error = ref('')

async function login() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { password: password.value } })
    await navigateTo('/admin/dashboard')
  } catch {
    error.value = 'Forkert adgangskode. Prøv igen.'
  } finally {
    loading.value = false
  }
}
</script>
