<template>
  <div>
    <div class="mb-8">
      <h1 class="font-serif font-bold text-2xl text-terra-900">Kirkeindhold</h1>
      <p class="text-warm-400 text-sm mt-1">Rediger indhold der vises på forsiden</p>
    </div>

    <div class="max-w-2xl space-y-6">

      <!-- Slideshow images -->
      <div class="card p-6">
        <h2 class="font-semibold text-terra-900 mb-1 flex items-center gap-2">
          <ImageIcon class="w-4 h-4 text-terra-600" /> Slideshow Billeder
        </h2>
        <p class="text-warm-400 text-xs mb-4">
          Én URL per linje. Brug direkte billedelinks (jpg/png/webp) eller Google Drive links
          (konverteres automatisk). Tom = standard billeder.
        </p>
        <textarea
          v-model="fields.slideshow_images"
          rows="5"
          placeholder="https://eksempel.dk/billede1.jpg&#10;https://drive.google.com/file/d/ABC123/view&#10;https://eksempel.dk/billede3.jpg"
          class="form-input resize-none font-mono text-xs"
        />
        <SaveRow field="slideshow_images" :value="fields.slideshow_images" :saving="saving.slideshow_images" :saved="saved.slideshow_images" @save="saveField" />
      </div>

      <!-- Hero badge -->
      <div class="card p-6">
        <h2 class="font-semibold text-terra-900 mb-1 flex items-center gap-2">
          <Tag class="w-4 h-4 text-terra-600" /> Hero Badge Tekst
        </h2>
        <p class="text-warm-400 text-xs mb-4">Teksten i den lille badge øverst i heroen. Standard: "Søndagsgudstjeneste · Kl. 10:30"</p>
        <input
          v-model="fields.hero_badge"
          type="text"
          placeholder="Søndagsgudstjeneste · Kl. 10:30"
          class="form-input"
        />
        <SaveRow field="hero_badge" :value="fields.hero_badge" :saving="saving.hero_badge" :saved="saved.hero_badge" @save="saveField" />
      </div>

      <!-- Welcome message -->
      <div class="card p-6">
        <h2 class="font-semibold text-terra-900 mb-1 flex items-center gap-2">
          <MessageSquare class="w-4 h-4 text-terra-600" /> Velkomst Besked
        </h2>
        <p class="text-warm-400 text-xs mb-4">Kort velkomstbesked vist under heroen. Valgfri.</p>
        <textarea
          v-model="fields.welcome_message"
          rows="3"
          placeholder="Skriv en velkomstbesked til besøgende…"
          class="form-input resize-none"
        />
        <SaveRow field="welcome_message" :value="fields.welcome_message" :saving="saving.welcome_message" :saved="saved.welcome_message" @save="saveField" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Image as ImageIcon, Tag, MessageSquare, Save, CheckCircle } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Kirkeindhold — BIAK Admin' })

const fields = reactive<Record<string, string>>({
  slideshow_images: '',
  hero_badge: '',
  welcome_message: '',
})
const saving = reactive<Record<string, boolean>>({})
const saved = reactive<Record<string, boolean>>({})

const { data } = await useFetch('/api/church-info')
onMounted(() => {
  const info = (data.value as Record<string, string>) ?? {}
  Object.keys(fields).forEach(k => {
    if (info[k] !== undefined) fields[k] = info[k]
  })
})

async function saveField(field: string, value: string) {
  saving[field] = true
  saved[field] = false
  try {
    await $fetch('/api/church-info', { method: 'PUT', body: { key: field, value } })
    saved[field] = true
    setTimeout(() => { saved[field] = false }, 2500)
  } finally {
    saving[field] = false
  }
}

// Inline sub-component to avoid repetition
const SaveRow = defineComponent({
  props: {
    field: String,
    value: String,
    saving: Boolean,
    saved: Boolean,
  },
  emits: ['save'],
  setup(props, { emit }) {
    return () => h('div', { class: 'mt-3 flex items-center justify-end' },
      h('button', {
        onClick: () => emit('save', props.field, props.value),
        disabled: props.saving,
        class: 'btn-primary !py-2 !px-4 !text-xs flex items-center gap-2',
      }, [
        props.saved
          ? h(CheckCircle, { class: 'w-3.5 h-3.5' })
          : h(Save, { class: 'w-3.5 h-3.5' }),
        props.saving ? 'Gemmer…' : props.saved ? 'Gemt!' : 'Gem',
      ])
    )
  },
})
</script>
