<template>
  <div>
    <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 class="font-serif font-bold text-2xl text-terra-900">Fremhævede kort</h1>
        <p class="text-warm-400 text-sm mt-1">Kort med billede/ikon, titel og beskrivelse på forsiden</p>
      </div>
      <button @click="openAdd" class="btn-gold text-sm"><Plus class="w-4 h-4" /> Nyt kort</button>
    </div>

    <div v-if="pending" class="flex justify-center py-16">
      <div class="w-7 h-7 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
    </div>
    <div v-else-if="!cards.length" class="card p-12 text-center">
      <LayoutGrid class="w-8 h-8 text-warm-200 mx-auto mb-3" />
      <p class="text-warm-400 text-sm">Ingen kort endnu.</p>
    </div>
    <div v-else class="space-y-2">
      <div v-for="(card, i) in cards" :key="card.id"
        class="card flex items-center gap-3 p-3"
        :class="!card.isActive ? 'opacity-50' : ''">
        <!-- Thumb/icon -->
        <div class="w-14 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-warm-100 flex items-center justify-center">
          <img v-if="card.imageUrl" :src="card.imageUrl" class="w-full h-full object-cover" :alt="card.title" />
          <span v-else class="text-xl">{{ iconEmoji[card.icon] ?? '⭐' }}</span>
        </div>
        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-terra-900 text-sm truncate">{{ card.title }}</p>
          <p class="text-warm-400 text-xs truncate">{{ card.subtitle || card.description || '—' }}</p>
        </div>
        <!-- Active toggle -->
        <button @click="toggleActive(card)" :title="card.isActive ? 'Deaktiver' : 'Aktiver'"
          :class="['w-9 h-5 rounded-full transition-colors flex-shrink-0', card.isActive ? 'bg-terra-600' : 'bg-warm-200']">
          <span :class="['block w-4 h-4 rounded-full bg-white shadow transition-transform mx-0.5', card.isActive ? 'translate-x-4' : 'translate-x-0']" />
        </button>
        <!-- Order -->
        <button :disabled="i === 0" @click="moveUp(card, i)" class="p-1.5 rounded hover:bg-warm-100 disabled:opacity-30 text-warm-400"><ArrowUp class="w-3.5 h-3.5" /></button>
        <button :disabled="i === cards.length - 1" @click="moveDown(card, i)" class="p-1.5 rounded hover:bg-warm-100 disabled:opacity-30 text-warm-400"><ArrowDown class="w-3.5 h-3.5" /></button>
        <button @click="openEdit(card)" class="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600"><Pencil class="w-3.5 h-3.5" /></button>
        <button @click="deleteCard(card.id)" class="p-2 rounded-lg hover:bg-red-50 transition-colors text-warm-400 hover:text-red-500"><Trash2 class="w-3.5 h-3.5" /></button>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="showModal = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
          <div class="p-6 border-b border-warm-100 flex items-center justify-between">
            <h2 class="font-serif font-bold text-lg text-terra-900">{{ editing ? 'Rediger kort' : 'Nyt kort' }}</h2>
            <button @click="showModal = false" class="p-1.5 rounded-lg hover:bg-warm-100 text-warm-400"><X class="w-4 h-4" /></button>
          </div>
          <form @submit.prevent="save" class="p-6 space-y-4">
            <div>
              <label class="form-label">Titel *</label>
              <input v-model="form.title" required class="form-input" />
            </div>
            <div>
              <label class="form-label">Undertitel <span class="normal-case font-normal text-warm-300">(vises over titel med accent farve)</span></label>
              <input v-model="form.subtitle" class="form-input" placeholder="F.eks. Søndagsgudstjeneste" />
            </div>
            <div>
              <label class="form-label">Beskrivelse</label>
              <textarea v-model="form.description" rows="3" class="form-input resize-none" />
            </div>

            <!-- Image: URL or upload -->
            <div>
              <label class="form-label">Billede</label>
              <div class="flex rounded-xl border border-warm-200 overflow-hidden text-sm font-medium mb-2">
                <button type="button" @click="imgMode = 'url'" :class="['flex-1 py-1.5 transition-colors', imgMode === 'url' ? 'bg-terra-700 text-white' : 'text-warm-500 hover:bg-warm-50']">URL</button>
                <button type="button" @click="imgMode = 'upload'" :class="['flex-1 py-1.5 transition-colors', imgMode === 'upload' ? 'bg-terra-700 text-white' : 'text-warm-500 hover:bg-warm-50']">Upload</button>
                <button type="button" @click="imgMode = 'none'; form.imageUrl = ''" :class="['flex-1 py-1.5 transition-colors', imgMode === 'none' ? 'bg-terra-700 text-white' : 'text-warm-500 hover:bg-warm-50']">Ingen</button>
              </div>
              <input v-if="imgMode === 'url'" v-model="form.imageUrl" class="form-input" placeholder="https://…" />
              <input v-if="imgMode === 'upload'" type="file" accept="image/*" @change="onFileChange" class="form-input py-2" />
              <p v-if="uploadMsg" class="text-xs text-warm-400 mt-1">{{ uploadMsg }}</p>
              <div v-if="form.imageUrl && imgMode !== 'none'" class="mt-2 h-24 rounded-xl overflow-hidden bg-warm-100">
                <img :src="form.imageUrl" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Icon (when no image) -->
            <div v-if="!form.imageUrl || imgMode === 'none'">
              <label class="form-label">Ikon (bruges når der ikke er et billede)</label>
              <div class="grid grid-cols-5 gap-1.5">
                <button type="button" v-for="ic in icons" :key="ic.name" @click="form.icon = ic.name"
                  :class="['p-2 rounded-lg border text-center transition-colors text-lg', form.icon === ic.name ? 'border-terra-500 bg-terra-50' : 'border-warm-200 hover:bg-warm-50']"
                  :title="ic.name">
                  {{ ic.emoji }}
                </button>
              </div>
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
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown, LayoutGrid } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Fremhævede kort — BIAK Admin' })

const { data, pending, refresh } = await useFetch('/api/featured-cards')
const cards = computed(() => (data.value ?? []) as any[])

const icons = [
  { name: 'Heart',     emoji: '❤️' },
  { name: 'Star',      emoji: '⭐' },
  { name: 'Users',     emoji: '👥' },
  { name: 'BookOpen',  emoji: '📖' },
  { name: 'Music',     emoji: '🎵' },
  { name: 'Zap',       emoji: '⚡' },
  { name: 'Globe',     emoji: '🌍' },
  { name: 'Flame',     emoji: '🔥' },
  { name: 'Gift',      emoji: '🎁' },
  { name: 'Baby',      emoji: '👶' },
  { name: 'HandHeart', emoji: '🤲' },
  { name: 'Smile',     emoji: '😊' },
  { name: 'Cross',     emoji: '✝️' },
  { name: 'Home',      emoji: '🏠' },
  { name: 'Church',    emoji: '⛪' },
]
const iconEmoji: Record<string, string> = Object.fromEntries(icons.map(i => [i.name, i.emoji]))

const showModal = ref(false)
const editing   = ref<any>(null)
const saving    = ref(false)
const saveError = ref('')
const imgMode   = ref<'url' | 'upload' | 'none'>('none')
const uploadMsg = ref('')
const form = reactive({ title: '', subtitle: '', description: '', imageUrl: '', icon: 'Star' })

function emptyForm() { return { title: '', subtitle: '', description: '', imageUrl: '', icon: 'Star' } }
function openAdd() { editing.value = null; Object.assign(form, emptyForm()); imgMode.value = 'none'; showModal.value = true; saveError.value = '' }
function openEdit(c: any) {
  editing.value = c
  Object.assign(form, { title: c.title, subtitle: c.subtitle ?? '', description: c.description ?? '', imageUrl: c.imageUrl ?? '', icon: c.icon ?? 'Star' })
  imgMode.value = c.imageUrl ? 'url' : 'none'
  showModal.value = true; saveError.value = ''
}

async function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploadMsg.value = 'Uploader…'
  const fd = new FormData(); fd.append('file', file)
  try {
    const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
    form.imageUrl = res.url; uploadMsg.value = 'Uploadet!'
  } catch { uploadMsg.value = 'Upload fejlede.' }
}

async function save() {
  saving.value = true; saveError.value = ''
  try {
    const body = {
      title: form.title,
      subtitle: form.subtitle || null,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
      icon: (!form.imageUrl && form.icon) ? form.icon : null,
    }
    if (editing.value) await $fetch(`/api/featured-cards/${editing.value.id}`, { method: 'PUT', body })
    else await $fetch('/api/featured-cards', { method: 'POST', body })
    showModal.value = false; await refresh()
  } catch (e: any) { saveError.value = e?.data?.message ?? 'Fejl.' } finally { saving.value = false }
}

async function deleteCard(id: string) {
  if (!confirm('Slet dette kort?')) return
  await $fetch(`/api/featured-cards/${id}`, { method: 'DELETE' })
  await refresh()
}

async function toggleActive(card: any) {
  await $fetch(`/api/featured-cards/${card.id}`, { method: 'PUT', body: { ...card, isActive: !card.isActive } })
  await refresh()
}

async function moveUp(card: any, i: number) {
  const prev = cards.value[i - 1]
  await Promise.all([
    $fetch(`/api/featured-cards/${card.id}`, { method: 'PUT', body: { ...card, order: prev.order } }),
    $fetch(`/api/featured-cards/${prev.id}`, { method: 'PUT', body: { ...prev, order: card.order } }),
  ])
  await refresh()
}
async function moveDown(card: any, i: number) {
  const next = cards.value[i + 1]
  await Promise.all([
    $fetch(`/api/featured-cards/${card.id}`, { method: 'PUT', body: { ...card, order: next.order } }),
    $fetch(`/api/featured-cards/${next.id}`, { method: 'PUT', body: { ...next, order: card.order } }),
  ])
  await refresh()
}
</script>
