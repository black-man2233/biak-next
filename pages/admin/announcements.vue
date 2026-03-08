<template>
  <div>
    <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 class="font-serif font-bold text-2xl text-terra-900">Meddelelser</h1>
        <p class="text-warm-400 text-sm mt-1">Aktuelle meddelelser til menigheden</p>
      </div>
      <button @click="openCreate" class="btn-gold text-sm">
        <Plus class="w-4 h-4" /> Ny Meddelelse
      </button>
    </div>

    <div v-if="pending" class="flex justify-center py-16">
      <div class="w-7 h-7 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
    </div>
    <div v-else-if="!announcements.length" class="card p-12 text-center">
      <Bell class="w-8 h-8 text-warm-200 mx-auto mb-3" />
      <p class="text-warm-400 text-sm">Ingen meddelelser endnu.</p>
    </div>
    <div v-else class="space-y-3">
      <div v-for="a in announcements" :key="a.id" class="card p-5 flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-start gap-4 min-w-0 flex-1">
          <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" :class="a.isActive ? 'bg-green-400' : 'bg-warm-200'" />
          <div class="min-w-0">
            <p class="font-semibold text-terra-900">{{ a.title }}</p>
            <p class="text-warm-400 text-xs mt-0.5 line-clamp-2">{{ a.content }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', a.isActive ? 'bg-green-50 text-green-700' : 'bg-warm-100 text-warm-500']">
            {{ a.isActive ? 'Aktiv' : 'Inaktiv' }}
          </span>
          <button @click="openEdit(a)" class="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600"><Pencil class="w-3.5 h-3.5" /></button>
          <button @click="deleteAnn(a.id)" class="p-2 rounded-lg hover:bg-red-50 transition-colors text-warm-400 hover:text-red-500"><Trash2 class="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="showModal = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          <div class="p-6 border-b border-warm-100 flex items-center justify-between">
            <h2 class="font-serif font-bold text-lg text-terra-900">{{ editing ? 'Rediger' : 'Ny'}} Meddelelse</h2>
            <button @click="showModal = false" class="p-1.5 rounded-lg hover:bg-warm-100 text-warm-400"><X class="w-4 h-4" /></button>
          </div>
          <form @submit.prevent="save" class="p-6 space-y-4">
            <div>
              <label class="form-label">Titel *</label>
              <input v-model="form.title" required class="form-input" />
            </div>
            <div>
              <label class="form-label">Indhold *</label>
              <textarea v-model="form.content" rows="4" required class="form-input resize-none" />
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="form.active" type="checkbox" class="w-4 h-4 rounded accent-terra-600" />
              <span class="text-sm text-terra-900">Aktiv (vises på hjemmesiden)</span>
            </label>
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
import { Bell, Plus, Pencil, Trash2, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Meddelelser — BIAK Admin' })

const { data, pending, refresh } = await useFetch('/api/announcements')
const announcements = computed(() => (data.value ?? []) as any[])

const showModal = ref(false)
const editing = ref<any>(null)
const saving = ref(false)
const saveError = ref('')

const emptyForm = () => ({ title: '', content: '', active: true })
const form = reactive(emptyForm())

function openCreate() { editing.value = null; Object.assign(form, emptyForm()); showModal.value = true; saveError.value = '' }
function openEdit(a: any) {
  editing.value = a
  Object.assign(form, { title: a.title, content: a.content, active: a.isActive })
  showModal.value = true; saveError.value = ''
}

async function save() {
  saving.value = true; saveError.value = ''
  try {
    if (editing.value) await $fetch(`/api/announcements/${editing.value.id}`, { method: 'PUT', body: { ...form } })
    else await $fetch('/api/announcements', { method: 'POST', body: { ...form } })
    showModal.value = false; await refresh()
  } catch (e: any) {
    saveError.value = e?.data?.message ?? 'Noget gik galt.'
  } finally {
    saving.value = false
  }
}

async function deleteAnn(id: string) {
  if (!confirm('Slet denne meddelelse?')) return
  await $fetch(`/api/announcements/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>
