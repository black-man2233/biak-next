<template>
  <div>
    <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 class="font-serif font-bold text-2xl text-terra-900">Prædikener</h1>
        <p class="text-warm-400 text-sm mt-1">Administrer prædikener og taler</p>
      </div>
      <button @click="openCreate" class="btn-gold text-sm">
        <Plus class="w-4 h-4" /> Ny Prædiken
      </button>
    </div>

    <div v-if="pending" class="flex justify-center py-16">
      <div class="w-7 h-7 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
    </div>
    <div v-else-if="!sermons.length" class="card p-12 text-center">
      <Mic class="w-8 h-8 text-warm-200 mx-auto mb-3" />
      <p class="text-warm-400 text-sm">Ingen prædikener endnu.</p>
    </div>
    <div v-else class="space-y-3">
      <div v-for="s in sermons" :key="s.id" class="card p-5 flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-4 min-w-0">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-gold-50 flex-shrink-0">
            <Mic class="w-4 h-4 text-gold-600" />
          </div>
          <div class="min-w-0">
            <p class="font-semibold text-terra-900 truncate">{{ s.title }}</p>
            <p class="text-warm-400 text-xs">{{ s.speaker ?? 'Ukendt taler' }} · {{ fmtDate(s.date) }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <a v-if="s.videoUrl" :href="s.videoUrl" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600">
            <Play class="w-3.5 h-3.5" />
          </a>
          <button @click="openEdit(s)" class="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600">
            <Pencil class="w-3.5 h-3.5" />
          </button>
          <button @click="deleteSermon(s.id)" class="p-2 rounded-lg hover:bg-red-50 transition-colors text-warm-400 hover:text-red-500">
            <Trash2 class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="showModal = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-warm-100 flex items-center justify-between">
            <h2 class="font-serif font-bold text-lg text-terra-900">{{ editing ? 'Rediger Prædiken' : 'Ny Prædiken' }}</h2>
            <button @click="showModal = false" class="p-1.5 rounded-lg hover:bg-warm-100 text-warm-400"><X class="w-4 h-4" /></button>
          </div>
          <form @submit.prevent="save" class="p-6 space-y-4">
            <div>
              <label class="form-label">Titel *</label>
              <input v-model="form.title" required class="form-input" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Taler</label>
                <input v-model="form.speaker" class="form-input" placeholder="Pastor Martin Mutale" />
              </div>
              <div>
                <label class="form-label">Dato</label>
                <input v-model="form.date" type="date" class="form-input" />
              </div>
            </div>
            <div>
              <label class="form-label">Beskrivelse</label>
              <textarea v-model="form.description" rows="3" class="form-input resize-none" />
            </div>
            <div>
              <label class="form-label">Video URL</label>
              <input v-model="form.videoUrl" class="form-input" placeholder="https://youtube.com/…" />
            </div>
            <div>
              <label class="form-label">Billede URL</label>
              <input v-model="form.imageUrl" class="form-input" placeholder="https://…" />
            </div>
            <div v-if="saveError" class="p-3 rounded-xl bg-red-50 text-red-600 text-sm">{{ saveError }}</div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="showModal = false" class="flex-1 py-2 rounded-xl border border-warm-200 text-warm-500 text-sm hover:bg-warm-50 transition-colors">Annuller</button>
              <button type="submit" :disabled="saving" class="flex-1 btn-gold justify-center text-sm">{{ saving ? 'Gemmer…' : (editing ? 'Opdater' : 'Opret') }}</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Mic, Plus, Pencil, Trash2, X, Play } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Prædikener — BIAK Admin' })

const { data, pending, refresh } = await useFetch('/api/sermons')
const sermons = computed(() => (data.value ?? []) as any[])

const showModal = ref(false)
const editing = ref<any>(null)
const saving = ref(false)
const saveError = ref('')

const emptyForm = () => ({ title: '', speaker: '', date: new Date().toISOString().slice(0, 10), description: '', videoUrl: '', imageUrl: '' })
const form = reactive(emptyForm())

function openCreate() { editing.value = null; Object.assign(form, emptyForm()); showModal.value = true; saveError.value = '' }
function openEdit(s: any) {
  editing.value = s
  Object.assign(form, { title: s.title, speaker: s.speaker ?? '', date: s.date?.slice(0, 10) ?? '', description: s.description ?? '', videoUrl: s.videoUrl ?? '', imageUrl: s.imageUrl ?? '' })
  showModal.value = true; saveError.value = ''
}

async function save() {
  saving.value = true; saveError.value = ''
  try {
    const body = { ...form, videoUrl: form.videoUrl || null, imageUrl: form.imageUrl || null }
    if (editing.value) await $fetch(`/api/sermons/${editing.value.id}`, { method: 'PUT', body })
    else await $fetch('/api/sermons', { method: 'POST', body })
    showModal.value = false; await refresh()
  } catch (e: any) {
    saveError.value = e?.data?.message ?? 'Noget gik galt.'
  } finally {
    saving.value = false
  }
}

async function deleteSermon(id: string) {
  if (!confirm('Slet denne prædiken?')) return
  await $fetch(`/api/sermons/${id}`, { method: 'DELETE' })
  await refresh()
}

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' }) : '' }
</script>
