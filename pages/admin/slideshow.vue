<template>
  <div>
    <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 class="font-serif font-bold text-2xl text-terra-900">Slideshow</h1>
        <p class="text-warm-400 text-sm mt-1">Billeder der vises automatisk på forsiden</p>
      </div>
      <button @click="openAdd" class="btn-gold text-sm"><Plus class="w-4 h-4" /> Tilføj billede</button>
    </div>

    <div v-if="pending" class="flex justify-center py-16">
      <div class="w-7 h-7 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
    </div>

    <div v-else-if="!slides.length" class="card p-12 text-center">
      <ImageIcon class="w-8 h-8 text-warm-200 mx-auto mb-3" />
      <p class="text-warm-400 text-sm">Ingen billeder endnu. Tilføj det første.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(slide, i) in slides" :key="slide.id" class="card overflow-hidden group">
        <div class="h-40 overflow-hidden bg-warm-100 relative">
          <img :src="slide.url" :alt="slide.caption || ''" class="w-full h-full object-cover" />
          <!-- Order badge -->
          <span class="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center font-bold">
            {{ i + 1 }}
          </span>
        </div>
        <div class="p-4 flex items-center gap-2">
          <p class="flex-1 text-sm text-terra-900 truncate">{{ slide.caption || 'Ingen tekst' }}</p>
          <!-- Move up/down -->
          <button :disabled="i === 0" @click="moveUp(slide, i)" class="p-1.5 rounded hover:bg-warm-100 disabled:opacity-30 transition-colors text-warm-400">
            <ArrowUp class="w-3.5 h-3.5" />
          </button>
          <button :disabled="i === slides.length - 1" @click="moveDown(slide, i)" class="p-1.5 rounded hover:bg-warm-100 disabled:opacity-30 transition-colors text-warm-400">
            <ArrowDown class="w-3.5 h-3.5" />
          </button>
          <button @click="openEdit(slide)" class="p-1.5 rounded hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600">
            <Pencil class="w-3.5 h-3.5" />
          </button>
          <button @click="deleteSlide(slide.id)" class="p-1.5 rounded hover:bg-red-50 transition-colors text-warm-400 hover:text-red-500">
            <Trash2 class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="showModal = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
          <div class="p-6 border-b border-warm-100 flex items-center justify-between">
            <h2 class="font-serif font-bold text-lg text-terra-900">{{ editing ? 'Rediger billede' : 'Tilføj billede' }}</h2>
            <button @click="showModal = false" class="p-1.5 rounded-lg hover:bg-warm-100 text-warm-400"><X class="w-4 h-4" /></button>
          </div>
          <div class="p-6 space-y-4">
            <!-- Tab: URL vs Upload -->
            <div class="flex rounded-xl border border-warm-200 overflow-hidden text-sm font-medium">
              <button @click="inputMode = 'url'" :class="['flex-1 py-2 transition-colors', inputMode === 'url' ? 'bg-terra-700 text-white' : 'text-warm-500 hover:bg-warm-50']">URL</button>
              <button @click="inputMode = 'upload'" :class="['flex-1 py-2 transition-colors', inputMode === 'upload' ? 'bg-terra-700 text-white' : 'text-warm-500 hover:bg-warm-50']">Upload</button>
            </div>

            <div v-if="inputMode === 'url'">
              <label class="form-label">Billede URL *</label>
              <input v-model="form.url" placeholder="https://…" class="form-input" />
            </div>
            <div v-else>
              <label class="form-label">Vælg fil *</label>
              <input type="file" accept="image/*" @change="onFileChange" class="form-input py-2" />
              <p v-if="uploadProgress" class="text-xs text-warm-400 mt-1">{{ uploadProgress }}</p>
            </div>

            <!-- Preview -->
            <div v-if="form.url" class="h-32 rounded-xl overflow-hidden bg-warm-100">
              <img :src="form.url" alt="preview" class="w-full h-full object-cover" />
            </div>

            <div>
              <label class="form-label">Billedtekst (valgfri)</label>
              <input v-model="form.caption" placeholder="F.eks. Søndagsgudstjeneste" class="form-input" />
            </div>

            <div v-if="saveError" class="p-3 rounded-xl bg-red-50 text-red-600 text-sm">{{ saveError }}</div>
            <div class="flex gap-3 pt-2">
              <button @click="showModal = false" class="flex-1 py-2 rounded-xl border border-warm-200 text-warm-500 text-sm hover:bg-warm-50 transition-colors">Annuller</button>
              <button @click="save" :disabled="saving || !form.url" class="flex-1 btn-gold justify-center text-sm">{{ saving ? 'Gemmer…' : (editing ? 'Opdater' : 'Tilføj') }}</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Slideshow — BIAK Admin' })

const { data, pending, refresh } = await useFetch('/api/slides')
const slides = computed(() => (data.value ?? []) as any[])

const showModal = ref(false)
const editing  = ref<any>(null)
const saving   = ref(false)
const saveError = ref('')
const inputMode = ref<'url' | 'upload'>('url')
const uploadProgress = ref('')
const form = reactive({ url: '', caption: '' })

function openAdd()      { editing.value = null; Object.assign(form, { url: '', caption: '' }); inputMode.value = 'url'; showModal.value = true; saveError.value = '' }
function openEdit(s: any) { editing.value = s; Object.assign(form, { url: s.url, caption: s.caption ?? '' }); inputMode.value = 'url'; showModal.value = true; saveError.value = '' }

async function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploadProgress.value = 'Uploader…'
  const fd = new FormData()
  fd.append('file', file)
  try {
    const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
    form.url = res.url
    uploadProgress.value = 'Uploadet!'
  } catch {
    uploadProgress.value = 'Upload fejlede.'
  }
}

async function save() {
  if (!form.url) return
  saving.value = true; saveError.value = ''
  try {
    const body = { url: form.url, caption: form.caption || null }
    if (editing.value) await $fetch(`/api/slides/${editing.value.id}`, { method: 'PUT', body })
    else await $fetch('/api/slides', { method: 'POST', body })
    showModal.value = false; await refresh()
  } catch (e: any) {
    saveError.value = e?.data?.message ?? 'Fejl.'
  } finally { saving.value = false }
}

async function deleteSlide(id: string) {
  if (!confirm('Slet dette billede?')) return
  await $fetch(`/api/slides/${id}`, { method: 'DELETE' })
  await refresh()
}

async function moveUp(slide: any, i: number) {
  const prev = slides.value[i - 1]
  await Promise.all([
    $fetch(`/api/slides/${slide.id}`, { method: 'PUT', body: { ...slide, order: prev.order } }),
    $fetch(`/api/slides/${prev.id}`,  { method: 'PUT', body: { ...prev,  order: slide.order } }),
  ])
  await refresh()
}
async function moveDown(slide: any, i: number) {
  const next = slides.value[i + 1]
  await Promise.all([
    $fetch(`/api/slides/${slide.id}`, { method: 'PUT', body: { ...slide, order: next.order } }),
    $fetch(`/api/slides/${next.id}`,  { method: 'PUT', body: { ...next,  order: slide.order } }),
  ])
  await refresh()
}
</script>
