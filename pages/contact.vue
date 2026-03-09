<template>
  <div>
    <!-- Hero -->
    <section class="bg-terra-900 pt-32 pb-20 relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
        <span class="section-label !text-gold-400 mb-4" style="--section-color:#c9a84c; animation: fadeIn 0.5s ease both">
          {{ isYouth ? 'Ungdom' : 'Kontakt' }}
        </span>
        <h1 class="font-serif font-bold text-white text-4xl sm:text-5xl mt-3 leading-tight" style="animation: fadeUp 0.8s 0.1s ease both">
          <template v-if="isYouth">
            Mød <span style="background: linear-gradient(135deg, #e8c76a, #c9a84c); -webkit-background-clip: text; background-clip: text; color: transparent">BIAK Ungdom</span>
          </template>
          <template v-else>
            Vi Hører <span style="background: linear-gradient(135deg, #e8c76a, #c9a84c); -webkit-background-clip: text; background-clip: text; color: transparent">Fra Dig</span>
          </template>
        </h1>
        <p class="text-white/60 mt-4 max-w-md" style="animation: fadeUp 0.8s 0.25s ease both">
          {{ isYouth
            ? 'Har du spørgsmål om ungdomsgruppen? Kontakt vores ungdomsleder Cyrus direkte.'
            : 'Har du spørgsmål, ønsker gebet eller vil du bare sige hej? Skriv til os.' }}
        </p>
      </div>
    </section>

    <section class="py-24 md:py-32 bg-warm">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <!-- Contact info -->
          <div ref="infoEl" :class="['reveal', infoVisible && 'visible']">

            <!-- Youth leader card -->
            <template v-if="isYouth">
              <span class="section-label mb-4">Ungdomsleder</span>
              <h2 class="font-serif font-bold text-3xl text-terra-900 mt-3 mb-8 leading-tight">
                Kontakt <span class="text-gold-600">Cyrus</span>
              </h2>
              <div class="card p-6 mb-8 flex items-center gap-5">
                <div class="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-2xl font-serif font-bold text-white"
                  style="background: linear-gradient(135deg, #c9a84c, #8b4513)">
                  C
                </div>
                <div>
                  <p class="font-serif font-bold text-terra-900 text-lg">Cyrus</p>
                  <p class="text-warm-400 text-sm">Ungdomsleder, BIAK</p>
                </div>
              </div>
              <div class="space-y-5 mb-10">
                <a href="mailto:ungdom@biak.dk" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-terra-100 transition-colors">
                    <Mail class="w-4.5 h-4.5 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">Email</p>
                    <p class="text-terra-900 font-medium group-hover:text-terra-600 transition-colors">ungdom@biak.dk</p>
                  </div>
                </a>
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50">
                    <MapPin class="w-4.5 h-4.5 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">Sted</p>
                    <p class="text-terra-900 font-medium">Kirkevej 10, 9700 Brønderslev</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50">
                    <Calendar class="w-4.5 h-4.5 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">Mødetid</p>
                    <p class="text-terra-900 font-medium">Månedlige fredagsmøder, 18:00 – 20:00</p>
                  </div>
                </div>
              </div>
              <div class="card p-5">
                <p class="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-2">Tilmeld dig ungdomsgruppen</p>
                <p class="text-sm text-warm-500 leading-relaxed">Send os en besked via formularen, så kontakter Cyrus dig hurtigst muligt.</p>
              </div>
            </template>

            <!-- Regular contact info -->
            <template v-else>
              <span class="section-label mb-4">Find Os</span>
              <h2 class="font-serif font-bold text-3xl text-terra-900 mt-3 mb-8 leading-tight">
                Kontakt <span class="text-gold-600">Information</span>
              </h2>

              <div class="space-y-5 mb-10">
                <a href="tel:+4526161439" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-terra-100 transition-colors">
                    <Phone class="w-4.5 h-4.5 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">Telefon</p>
                    <p class="text-terra-900 font-medium group-hover:text-terra-600 transition-colors">+45 26 16 14 39</p>
                  </div>
                </a>
                <a href="mailto:info@biak.dk" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-terra-100 transition-colors">
                    <Mail class="w-4.5 h-4.5 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">Email</p>
                    <p class="text-terra-900 font-medium group-hover:text-terra-600 transition-colors">info@biak.dk</p>
                  </div>
                </a>
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50">
                    <MapPin class="w-4.5 h-4.5 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">Adresse</p>
                    <p class="text-terra-900 font-medium">Kirkevej 10, 9700 Brønderslev</p>
                  </div>
                </div>
                <a href="https://facebook.com/biakdk" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-terra-100 transition-colors">
                    <Globe class="w-4.5 h-4.5 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">Facebook</p>
                    <p class="text-terra-900 font-medium group-hover:text-terra-600 transition-colors">facebook.com/biakdk</p>
                  </div>
                </a>
                <a href="https://www.youtube.com/@biakyoutube" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-red-50 transition-colors">
                    <svg class="w-4.5 h-4.5 text-terra-600 group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">YouTube</p>
                    <p class="text-terra-900 font-medium group-hover:text-red-500 transition-colors">@biakyoutube</p>
                  </div>
                </a>
              </div>

              <!-- Service times quick-reference -->
              <div class="card p-6">
                <p class="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-4">Mødetider</p>
                <div class="space-y-3">
                  <div v-for="t in times" :key="t.day" class="flex justify-between text-sm">
                    <span class="font-medium text-terra-900">{{ t.day }}</span>
                    <span class="text-warm-400">{{ t.time }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Contact form -->
          <div ref="formEl" :class="['reveal delay-200', formVisible && 'visible']">
            <div class="card p-8">
              <h3 class="font-serif font-bold text-xl text-terra-900 mb-6">
                {{ isYouth ? 'Skriv til Cyrus' : 'Send En Besked' }}
              </h3>
              <form @submit.prevent="submitForm" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1.5">Navn</label>
                    <input v-model="form.name" type="text" required placeholder="Dit navn" class="form-input" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1.5">Email</label>
                    <input v-model="form.email" type="email" required placeholder="din@email.dk" class="form-input" />
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1.5">Emne</label>
                  <input v-model="form.subject" type="text" placeholder="Hvad drejer det sig om?" class="form-input" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1.5">Besked</label>
                  <textarea v-model="form.message" rows="5" required placeholder="Skriv din besked her…" class="form-input resize-none" />
                </div>
                <div v-if="successMsg" class="p-3 rounded-xl bg-green-50 text-green-700 text-sm text-center">{{ successMsg }}</div>
                <div v-if="errorMsg" class="p-3 rounded-xl bg-red-50 text-red-600 text-sm text-center">{{ errorMsg }}</div>
                <button type="submit" :disabled="submitting" class="btn-gold w-full justify-center">
                  <span v-if="submitting">Sender…</span>
                  <span v-else class="flex items-center gap-2">Send Besked <Send class="w-4 h-4" /></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Phone, Mail, MapPin, Globe, Send, Calendar } from 'lucide-vue-next'

useHead({ title: 'Kontakt — BIAK' })

const route = useRoute()
const isYouth = computed(() => route.query.context === 'youth')

const times = [
  { day: 'Søndag', time: '10:30 – 12:30' },
  { day: 'Onsdag', time: '18:30 – 20:00' },
  { day: 'Fredag (månedligt)', time: '18:00 – 20:00' },
]

const form = reactive({ name: '', email: '', subject: '', message: '' })
const submitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

async function submitForm() {
  submitting.value = true
  successMsg.value = ''
  errorMsg.value = ''
  await new Promise(r => setTimeout(r, 600))
  submitting.value = false
  successMsg.value = 'Tak for din besked! Vi vender tilbage hurtigst muligt.'
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
}

const { el: infoEl, isVisible: infoVisible } = useReveal()
const { el: formEl, isVisible: formVisible } = useReveal()
</script>
