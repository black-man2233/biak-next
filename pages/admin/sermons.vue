<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 class="font-serif font-bold text-2xl text-terra-900">Prædikener</h1>
        <p class="text-warm-400 text-sm mt-1">Administrer prædikener og taler</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <!-- YouTube import -->
        <button @click="importFromYoutube" :disabled="importing" class="btn-terra-outline text-sm gap-2">
          <span v-if="importing" class="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
          </svg>
          {{ importing ? 'Henter…' : 'Hent fra YouTube' }}
        </button>
        <button @click="openCreate" class="btn-gold text-sm">
          <Plus class="w-4 h-4" /> Ny Prædiken
        </button>
      </div>
    </div>

    <!-- Import feedback -->
    <div v-if="importMsg" class="mb-4 p-3 rounded-xl text-sm text-center"
      :class="importMsg.type === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'">
      {{ importMsg.text }}
    </div>

    <!-- Bulk action bar (visible when items exist) -->
    <div v-if="sermons.length" class="mb-4 flex items-center gap-3 flex-wrap">
      <!-- Select all toggle -->
      <label class="flex items-center gap-2 text-sm text-warm-500 cursor-pointer select-none">
        <input type="checkbox" :checked="allSelected" :indeterminate="someSelected && !allSelected"
          @change="toggleAll" class="w-4 h-4 rounded accent-terra-600" />
        Vælg alle
      </label>
      <span class="text-warm-300 text-xs">{{ selected.size }} valgt</span>

      <div class="flex items-center gap-2 ml-auto">
        <button v-if="selected.size > 0" @click="deleteSelected"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
          <Trash2 class="w-3.5 h-3.5" /> Slet valgte ({{ selected.size }})
        </button>
        <button @click="deleteAll"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
          <Trash2 class="w-3.5 h-3.5" /> Slet alle
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-16">
      <div class="w-7 h-7 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
    </div>

    <!-- Empty -->
    <div v-else-if="!sermons.length" class="card p-12 text-center">
      <Mic class="w-8 h-8 text-warm-200 mx-auto mb-3" />
      <p class="text-warm-400 text-sm">Ingen prædikener endnu. Brug "Hent fra YouTube" for at importere.</p>
    </div>

    <!-- List -->
    <div v-else class="space-y-2">
      <div v-for="s in sermons" :key="s.id"
        class="card flex items-center gap-3 p-3 transition-colors"
        :class="selected.has(s.id) ? 'ring-2 ring-terra-400 bg-terra-50' : ''">

        <!-- Checkbox -->
        <input type="checkbox" :checked="selected.has(s.id)" @change="toggleItem(s.id)"
          class="w-4 h-4 flex-shrink-0 rounded accent-terra-600 cursor-pointer" />

        <!-- Thumbnail -->
        <div class="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-warm-100">
          <img v-if="s.imageUrl" :src="s.imageUrl" :alt="s.title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center">
            <Mic class="w-4 h-4 text-warm-300" />
          </div>
        </div>

        <!-- Info -->
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-terra-900 text-sm truncate">{{ s.title }}</p>
          <p class="text-warm-400 text-xs">{{ s.speaker || '—' }} · {{ fmtDate(s.date) }}</p>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1 flex-shrink-0">
          <a v-if="s.videoUrl" :href="s.videoUrl" target="_blank" rel="noopener noreferrer"
            class="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600">
            <Play class="w-3.5 h-3.5" />
          </a>
          <button @click="openEdit(s)" class="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600">
            <Pencil class="w-3.5 h-3.5" />
          </button>
          <button @click="deleteSingle(s.id)" class="p-2 rounded-lg hover:bg-red-50 transition-colors text-warm-400 hover:text-red-500">
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

// ── Selection ────────────────────────────────────────────
const selected = ref(new Set<string>())
const allSelected  = computed(() => sermons.value.length > 0 && selected.value.size === sermons.value.length)
const someSelected = computed(() => selected.value.size > 0)

function toggleItem(id: string) {
  const s = new Set(selected.value)
  s.has(id) ? s.delete(id) : s.add(id)
  selected.value = s
}
function toggleAll() {
  selected.value = allSelected.value
    ? new Set()
    : new Set(sermons.value.map((s: any) => s.id))
}

// ── Delete ───────────────────────────────────────────────
async function deleteSingle(id: string) {
  if (!confirm('Slet denne prædiken?')) return
  await $fetch(`/api/sermons/${id}`, { method: 'DELETE' })
  selected.value.delete(id)
  await refresh()
}
async function deleteSelected() {
  if (!confirm(`Slet ${selected.value.size} prædikener?`)) return
  await $fetch('/api/sermons', { method: 'DELETE', body: { ids: [...selected.value] } })
  selected.value = new Set()
  await refresh()
}
async function deleteAll() {
  if (!confirm(`Slet ALLE ${sermons.value.length} prædikener? Dette kan ikke fortrydes.`)) return
  await $fetch('/api/sermons', { method: 'DELETE', body: {} })
  selected.value = new Set()
  await refresh()
}

// ── YouTube import ───────────────────────────────────────
const importing = ref(false)
const importMsg = ref<{ type: 'ok' | 'err'; text: string } | null>(null)

async function importFromYoutube() {
  importing.value = true
  importMsg.value = null
  try {
    const res = await $fetch<{ imported: number; total: number }>('/api/admin/sermons/import', { method: 'POST' })
    importMsg.value = { type: 'ok', text: `${res.imported} nye prædikener importeret (${res.total} fundet på YouTube).` }
    await refresh()
  } catch {
    importMsg.value = { type: 'err', text: 'Kunne ikke hente fra YouTube. Prøv igen.' }
  } finally {
    importing.value = false
    setTimeout(() => { importMsg.value = null }, 6000)
  }
}

// ── Create / Edit modal ──────────────────────────────────
const showModal = ref(false)
const editing   = ref<any>(null)
const saving    = ref(false)
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

function fmtDate(d: string) { return d ? new Date(d).toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' }) : '' }
</script>
