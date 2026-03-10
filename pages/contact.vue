<template>
  <div>
    <PageHero
      :label="isYouth ? $t('youth.sectionLabel') : $t('contact.sectionLabel')"
      :title="isYouth ? $t('contact.heroTitleYouth') : $t('contact.heroTitle')"
      :title-accent="isYouth ? $t('contact.heroAccentYouth') : $t('contact.heroTitleAccent')"
      :desc="isYouth ? $t('contact.heroDescYouth') : $t('contact.heroDesc')"
    />

    <HomeSlideshow v-if="slides.length" :slides="slides" />

    <section class="py-24 md:py-32 bg-warm">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <!-- Contact info -->
          <div ref="infoEl" :class="['reveal', infoVisible && 'visible']">

            <!-- Youth leader card -->
            <template v-if="isYouth">
              <span class="section-label mb-4">{{ $t('youth.sectionLabel') }}</span>
              <h2 class="font-serif font-bold text-3xl text-terra-900 mt-3 mb-8 leading-tight">
                {{ $t('contact.infoTitle') }} <span class="text-gold-600">Cyrus</span>
              </h2>
              <div class="card p-6 mb-8 flex items-center gap-5">
                <div class="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-2xl font-serif font-bold text-white"
                  style="background: linear-gradient(135deg, #c9a84c, #8b4513)">
                  C
                </div>
                <div>
                  <p class="font-serif font-bold text-terra-900 text-lg">Cyrus</p>
                  <p class="text-warm-400 text-sm">{{ $t('contact.youthLeaderTitle') }}</p>
                </div>
              </div>
              <div class="space-y-5 mb-10">
                <a href="mailto:ungdom@biak.dk" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-terra-100 transition-colors">
                    <Mail class="w-4 h-4 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">{{ $t('contact.email') }}</p>
                    <p class="text-terra-900 font-medium group-hover:text-terra-600 transition-colors">ungdom@biak.dk</p>
                  </div>
                </a>
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50">
                    <MapPin class="w-4 h-4 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">{{ $t('contact.address') }}</p>
                    <p class="text-terra-900 font-medium">{{ $t('contact.addressVal') }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50">
                    <Calendar class="w-4 h-4 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">{{ $t('contact.meetingLabel') }}</p>
                    <p class="text-terra-900 font-medium">{{ $t('contact.youthMeetingTime') }}</p>
                  </div>
                </div>
              </div>
              <div class="card p-5">
                <p class="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-2">{{ $t('contact.youthSignupLabel') }}</p>
                <p class="text-sm text-warm-500 leading-relaxed">{{ $t('contact.youthSignupDesc') }}</p>
              </div>
            </template>

            <!-- Regular contact info -->
            <template v-else>
              <span class="section-label mb-4">{{ $t('contact.infoLabel') }}</span>
              <h2 class="font-serif font-bold text-3xl text-terra-900 mt-3 mb-8 leading-tight">
                {{ $t('contact.infoTitle') }} <span class="text-gold-600">{{ $t('contact.infoTitleAccent') }}</span>
              </h2>

              <div class="space-y-5 mb-10">
                <a href="tel:+4526161439" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-terra-100 transition-colors">
                    <Phone class="w-4 h-4 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">{{ $t('contact.phone') }}</p>
                    <p class="text-terra-900 font-medium group-hover:text-terra-600 transition-colors">+45 26 16 14 39</p>
                  </div>
                </a>
                <a href="mailto:info@biak.dk" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-terra-100 transition-colors">
                    <Mail class="w-4 h-4 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">{{ $t('contact.email') }}</p>
                    <p class="text-terra-900 font-medium group-hover:text-terra-600 transition-colors">info@biak.dk</p>
                  </div>
                </a>
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50">
                    <MapPin class="w-4 h-4 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">{{ $t('contact.address') }}</p>
                    <p class="text-terra-900 font-medium">{{ $t('contact.addressVal') }}</p>
                  </div>
                </div>
                <a href="https://facebook.com/Biakirke" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-terra-100 transition-colors">
                    <Globe class="w-4 h-4 text-terra-600" />
                  </div>
                  <div>
                    <p class="text-xs text-warm-400 uppercase tracking-wide font-semibold">{{ $t('contact.facebook') }}</p>
                    <p class="text-terra-900 font-medium group-hover:text-terra-600 transition-colors">facebook.com/Biakirke</p>
                  </div>
                </a>
                <a href="https://www.youtube.com/@biakyoutube" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 group-hover:bg-red-50 transition-colors">
                    <svg class="w-4 h-4 text-terra-600 group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
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

              <div class="card p-6">
                <p class="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-4">{{ $t('contact.meetingLabel') }}</p>
                <div class="space-y-3">
                  <div v-for="mt in times" :key="mt.day" class="flex justify-between text-sm">
                    <span class="font-medium text-terra-900">{{ mt.day }}</span>
                    <span class="text-warm-400">{{ mt.time }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Contact form -->
          <div ref="formEl" :class="['reveal delay-200', formVisible && 'visible']">
            <div class="card p-8">
              <h3 class="font-serif font-bold text-xl text-terra-900 mb-6">
                {{ isYouth ? $t('contact.formTitleYouth') : $t('contact.formTitle') }}
              </h3>
              <form @submit.prevent="submitForm" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1.5">{{ $t('contact.name') }}</label>
                    <input v-model="form.name" type="text" required :placeholder="$t('contact.namePlaceholder')" class="form-input" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1.5">{{ $t('contact.email') }}</label>
                    <input v-model="form.email" type="email" required :placeholder="$t('contact.emailPlaceholder')" class="form-input" />
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1.5">{{ $t('contact.subject') }}</label>
                  <input v-model="form.subject" type="text" :placeholder="$t('contact.subjectPlaceholder')" class="form-input" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-warm-400 uppercase tracking-wide mb-1.5">{{ $t('contact.message') }}</label>
                  <textarea v-model="form.message" rows="5" required :placeholder="$t('contact.messagePlaceholder')" class="form-input resize-none" />
                </div>
                <div v-if="successMsg" class="p-3 rounded-xl bg-green-50 text-green-700 text-sm text-center">{{ successMsg }}</div>
                <div v-if="errorMsg" class="p-3 rounded-xl bg-red-50 text-red-600 text-sm text-center">{{ errorMsg }}</div>
                <button type="submit" :disabled="submitting" class="btn-gold w-full justify-center">
                  <span v-if="submitting">{{ $t('contact.sending') }}</span>
                  <span v-else class="flex items-center gap-2">{{ $t('contact.send') }} <Send class="w-4 h-4" /></span>
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

const { t } = useI18n()
useHead({ title: computed(() => `${t('contact.sectionLabel')} — BIAK`) })

const route = useRoute()

const { data: slidesData } = await useFetch('/api/slides?page=contact')
const slides = computed(() => (slidesData.value as any[]) ?? [])
const isYouth = computed(() => route.query.context === 'youth')

const times = computed(() => [
  { day: t('contact.t1.day'), time: t('contact.t1.time') },
  { day: t('contact.t2.day'), time: t('contact.t2.time') },
  { day: t('contact.t3.day'), time: t('contact.t3.time') },
])

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
  successMsg.value = t('contact.success')
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
}

const { el: infoEl, isVisible: infoVisible } = useReveal()
const { el: formEl, isVisible: formVisible } = useReveal()
</script>
