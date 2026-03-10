<template>
  <div>
    <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 class="font-serif font-bold text-2xl text-terra-900">Ledere</h1>
        <p class="text-warm-400 text-sm mt-1">Pastorer og ledere vist på Om Os-siden</p>
      </div>
      <button @click="openAdd" class="btn-gold text-sm"><Plus class="w-4 h-4" /> Tilføj leder</button>
    </div>

    <div v-if="pending" class="flex justify-center py-16">
      <div class="w-7 h-7 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
    </div>

    <div v-else-if="!leaders.length" class="card p-12 text-center">
      <UsersIcon class="w-8 h-8 text-warm-200 mx-auto mb-3" />
      <p class="text-warm-400 text-sm">Ingen ledere endnu. Tilføj den første.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(leader, i) in leaders" :key="leader.id" class="card overflow-hidden">
        <!-- Photo -->
        <div class="h-48 overflow-hidden bg-warm-100 relative">
          <img v-if="leader.imageUrl" :src="leader.imageUrl" :alt="leader.name" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center">
            <UserCircle class="w-16 h-16 text-warm-200" />
          </div>
          <span class="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center font-bold">
            {{ i + 1 }}
          </span>
          <span v-if="!leader.isActive"
            class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500/80 text-white text-[10px] font-medium">
            Inaktiv
          </span>
        </div>

        <!-- Info -->
        <div class="p-4">
          <p class="font-semibold text-terra-900">{{ leader.name }}</p>
          <p class="text-sm text-warm-400 mt-0.5">{{ leader.role }}</p>
          <p v-if="leader.bio" class="text-xs text-warm-300 mt-2 line-clamp-2">{{ leader.bio }}</p>

          <div class="flex items-center gap-1.5 mt-3">
            <button :disabled="i === 0" @click="moveUp(leader, i)"
              class="p-1.5 rounded hover:bg-warm-100 disabled:opacity-30 transition-colors text-warm-400">
              <ArrowUp class="w-3.5 h-3.5" />
            </button>
            <button :disabled="i === leaders.length - 1" @click="moveDown(leader, i)"
              class="p-1.5 rounded hover:bg-warm-100 disabled:opacity-30 transition-colors text-warm-400">
              <ArrowDown class="w-3.5 h-3.5" />
            </button>
            <button @click="toggleActive(leader)"
              :class="['p-1.5 rounded transition-colors', leader.isActive ? 'hover:bg-warm-100 text-warm-400' : 'text-amber-500 hover:bg-amber-50']"
              :title="leader.isActive ? 'Skjul' : 'Vis'">
              <EyeOff v-if="leader.isActive" class="w-3.5 h-3.5" />
              <Eye v-else class="w-3.5 h-3.5" />
            </button>
            <button @click="openEdit(leader)"
              class="p-1.5 rounded hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600">
              <Pencil class="w-3.5 h-3.5" />
            </button>
            <button @click="deleteLeader(leader.id)"
              class="p-1.5 rounded hover:bg-red-50 transition-colors text-warm-400 hover:text-red-500 ml-auto">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="showModal = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-warm-100 flex items-center justify-between">
            <h2 class="font-serif font-bold text-lg text-terra-900">{{ editing ? 'Rediger leder' : 'Tilføj leder' }}</h2>
            <button @click="showModal = false" class="p-1.5 rounded-lg hover:bg-warm-100 text-warm-400"><X class="w-4 h-4" /></button>
          </div>
          <div class="p-6 space-y-4">
            <!-- Image input tabs -->
            <div class="flex rounded-xl border border-warm-200 overflow-hidden text-sm font-medium">
              <button @click="inputMode = 'url'" :class="['flex-1 py-2 transition-colors', inputMode === 'url' ? 'bg-terra-700 text-white' : 'text-warm-500 hover:bg-warm-50']">URL</button>
              <button @click="inputMode = 'upload'" :class="['flex-1 py-2 transition-colors', inputMode === 'upload' ? 'bg-terra-700 text-white' : 'text-warm-500 hover:bg-warm-50']">Upload</button>
            </div>

            <div v-if="inputMode === 'url'">
              <label class="form-label">Billede URL (valgfri)</label>
              <input v-model="form.imageUrl" placeholder="https://…" class="form-input" />
            </div>
            <div v-else>
              <label class="form-label">Vælg fil</label>
              <input type="file" accept="image/*" @change="onFileChange" class="form-input py-2" />
              <p v-if="uploadProgress" class="text-xs text-warm-400 mt-1">{{ uploadProgress }}</p>
            </div>

            <!-- Preview -->
            <div v-if="form.imageUrl" class="h-32 rounded-xl overflow-hidden bg-warm-100">
              <img :src="form.imageUrl" alt="preview" class="w-full h-full object-cover object-top" />
            </div>

            <div>
              <label class="form-label">Navn *</label>
              <input v-model="form.name" placeholder="F.eks. Pastor Martin" class="form-input" />
            </div>
            <div>
              <label class="form-label">Titel / Rolle *</label>
              <input v-model="form.role" placeholder="F.eks. Sognepræst" class="form-input" />
            </div>
            <div>
              <label class="form-label">Biografi (valgfri)</label>
              <textarea v-model="form.bio" placeholder="Kort beskrivelse…" rows="3" class="form-input resize-none" />
            </div>

            <div v-if="saveError" class="p-3 rounded-xl bg-red-50 text-red-600 text-sm">{{ saveError }}</div>
            <div class="flex gap-3 pt-2">
              <button @click="showModal = false" class="flex-1 py-2 rounded-xl border border-warm-200 text-warm-500 text-sm hover:bg-warm-50 transition-colors">Annuller</button>
              <button @click="save" :disabled="saving || !form.name || !form.role" class="flex-1 btn-gold justify-center text-sm">{{ saving ? 'Gemmer…' : (editing ? 'Opdater' : 'Tilføj') }}</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown, Eye, EyeOff, UserCircle, Users as UsersIcon } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Ledere — BIAK Admin' })

const { data, pending, refresh } = await useFetch('/api/leaders')
const leaders = computed(() => (data.value ?? []) as any[])

const showModal = ref(false)
const editing  = ref<any>(null)
const saving   = ref(false)
const saveError = ref('')
const inputMode = ref<'url' | 'upload'>('url')
const uploadProgress = ref('')
const form = reactive({ name: '', role: '', bio: '', imageUrl: '' })

function openAdd() {
  editing.value = null
  Object.assign(form, { name: '', role: '', bio: '', imageUrl: '' })
  inputMode.value = 'url'
  showModal.value = true
  saveError.value = ''
}
function openEdit(l: any) {
  editing.value = l
  Object.assign(form, { name: l.name, role: l.role, bio: l.bio ?? '', imageUrl: l.imageUrl ?? '' })
  inputMode.value = 'url'
  showModal.value = true
  saveError.value = ''
}

async function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploadProgress.value = 'Uploader…'
  const fd = new FormData()
  fd.append('file', file)
  try {
    const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
    form.imageUrl = res.url
    uploadProgress.value = 'Uploadet!'
  } catch {
    uploadProgress.value = 'Upload fejlede.'
  }
}

async function save() {
  if (!form.name || !form.role) return
  saving.value = true; saveError.value = ''
  try {
    const body = { name: form.name, role: form.role, bio: form.bio || null, imageUrl: form.imageUrl || null }
    if (editing.value) await $fetch(`/api/leaders/${editing.value.id}`, { method: 'PUT', body })
    else await $fetch('/api/leaders', { method: 'POST', body })
    showModal.value = false; await refresh()
  } catch (e: any) {
    saveError.value = e?.data?.message ?? 'Fejl.'
  } finally { saving.value = false }
}

async function toggleActive(leader: any) {
  await $fetch(`/api/leaders/${leader.id}`, { method: 'PUT', body: { ...leader, isActive: !leader.isActive } })
  await refresh()
}

async function deleteLeader(id: string) {
  if (!confirm('Slet denne leder?')) return
  await $fetch(`/api/leaders/${id}`, { method: 'DELETE' })
  await refresh()
}

async function moveUp(leader: any, i: number) {
  const prev = leaders.value[i - 1]
  await Promise.all([
    $fetch(`/api/leaders/${leader.id}`, { method: 'PUT', body: { ...leader, order: prev.order } }),
    $fetch(`/api/leaders/${prev.id}`,   { method: 'PUT', body: { ...prev,   order: leader.order } }),
  ])
  await refresh()
}
async function moveDown(leader: any, i: number) {
  const next = leaders.value[i + 1]
  await Promise.all([
    $fetch(`/api/leaders/${leader.id}`, { method: 'PUT', body: { ...leader, order: next.order } }),
    $fetch(`/api/leaders/${next.id}`,   { method: 'PUT', body: { ...next,   order: leader.order } }),
  ])
  await refresh()
}
</script>
