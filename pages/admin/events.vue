<template>
  <div>
    <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 class="font-serif font-bold text-2xl text-terra-900">Events</h1>
        <p class="text-warm-400 text-sm mt-1">Opret og administrer kommende events</p>
      </div>
      <button @click="openCreate" class="btn-gold text-sm">
        <Plus class="w-4 h-4" /> Nyt Event
      </button>
    </div>

    <!-- List -->
    <div v-if="pending" class="flex justify-center py-16">
      <div class="w-7 h-7 rounded-full border-2 border-terra-300 border-t-terra-700 animate-spin" />
    </div>
    <div v-else-if="!events.length" class="card p-12 text-center">
      <Calendar class="w-8 h-8 text-warm-200 mx-auto mb-3" />
      <p class="text-warm-400 text-sm">Ingen events endnu. Opret det første.</p>
    </div>
    <div v-else class="space-y-3">
      <div v-for="event in events" :key="event.id" class="card p-5 flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-4 min-w-0">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-terra-50 flex-shrink-0">
            <Calendar class="w-4 h-4 text-terra-600" />
          </div>
          <div class="min-w-0">
            <p class="font-semibold text-terra-900 truncate">{{ event.title }}</p>
            <p class="text-warm-400 text-xs">{{ fmtDate(event.date) }} · {{ event.location }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', catStyle(event.category)]">{{ catLabel(event.category) }}</span>
          <button @click="openEdit(event)" class="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-400 hover:text-terra-600">
            <Pencil class="w-3.5 h-3.5" />
          </button>
          <button @click="deleteEvent(event.id)" class="p-2 rounded-lg hover:bg-red-50 transition-colors text-warm-400 hover:text-red-500">
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
            <h2 class="font-serif font-bold text-lg text-terra-900">{{ editingEvent ? 'Rediger Event' : 'Nyt Event' }}</h2>
            <button @click="showModal = false" class="p-1.5 rounded-lg hover:bg-warm-100 transition-colors text-warm-400">
              <X class="w-4 h-4" />
            </button>
          </div>
          <form @submit.prevent="saveEvent" class="p-6 space-y-4">
            <div>
              <label class="form-label">Titel *</label>
              <input v-model="form.title" required class="form-input" placeholder="Event titel" />
            </div>
            <div>
              <label class="form-label">Beskrivelse</label>
              <textarea v-model="form.description" rows="3" class="form-input resize-none" placeholder="Beskrivelse…" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Dato *</label>
                <input v-model="form.date" type="date" required class="form-input" />
              </div>
              <div>
                <label class="form-label">Kategori</label>
                <select v-model="form.category" class="form-input">
                  <option value="service">Gudstjeneste</option>
                  <option value="prayer">Bøn</option>
                  <option value="youth">Unge</option>
                  <option value="general">Generelt</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Start tid</label>
                <input v-model="form.startTime" type="time" class="form-input" />
              </div>
              <div>
                <label class="form-label">Slut tid</label>
                <input v-model="form.endTime" type="time" class="form-input" />
              </div>
            </div>
            <div>
              <label class="form-label">Lokation</label>
              <input v-model="form.location" class="form-input" placeholder="Kirkevej 10, Brønderslev" />
            </div>
            <div>
              <label class="form-label">Billede URL</label>
              <input v-model="form.imageUrl" class="form-input" placeholder="https://…" />
            </div>
            <div v-if="saveError" class="p-3 rounded-xl bg-red-50 text-red-600 text-sm">{{ saveError }}</div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="showModal = false" class="flex-1 py-2 rounded-xl border border-warm-200 text-warm-500 text-sm hover:bg-warm-50 transition-colors">Annuller</button>
              <button type="submit" :disabled="saving" class="flex-1 btn-gold justify-center text-sm">
                {{ saving ? 'Gemmer…' : (editingEvent ? 'Opdater' : 'Opret') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Plus, Pencil, Trash2, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Events — BIAK Admin' })

const { data, pending, refresh } = await useFetch('/api/events?all=1')
const events = computed(() => (data.value ?? []) as any[])

const showModal = ref(false)
const editingEvent = ref<any>(null)
const saving = ref(false)
const saveError = ref('')

const emptyForm = () => ({ title: '', description: '', date: '', category: 'service', startTime: '', endTime: '', location: 'Kirkevej 10, Brønderslev', imageUrl: '' })
const form = reactive(emptyForm())

function openCreate() { editingEvent.value = null; Object.assign(form, emptyForm()); showModal.value = true; saveError.value = '' }
function openEdit(e: any) {
  editingEvent.value = e
  Object.assign(form, { title: e.title, description: e.description ?? '', date: e.date.slice(0, 10), category: e.category, startTime: e.startTime ?? '', endTime: e.endTime ?? '', location: e.location, imageUrl: e.imageUrl ?? '' })
  showModal.value = true
  saveError.value = ''
}

async function saveEvent() {
  saving.value = true; saveError.value = ''
  try {
    const body = { ...form, startTime: form.startTime || null, endTime: form.endTime || null, imageUrl: form.imageUrl || null }
    if (editingEvent.value) {
      await $fetch(`/api/events/${editingEvent.value.id}`, { method: 'PUT', body })
    } else {
      await $fetch('/api/events', { method: 'POST', body })
    }
    showModal.value = false
    await refresh()
  } catch (e: any) {
    saveError.value = e?.data?.message ?? 'Noget gik galt.'
  } finally {
    saving.value = false
  }
}

async function deleteEvent(id: string) {
  if (!confirm('Er du sikker på, at du vil slette dette event?')) return
  await $fetch(`/api/events/${id}`, { method: 'DELETE' })
  await refresh()
}

function catLabel(cat: string) { return { service: 'Gudstjeneste', prayer: 'Bøn', youth: 'Unge', general: 'Generelt' }[cat] ?? cat }
function catStyle(cat: string) { return { service: 'bg-terra-100 text-terra-700', prayer: 'bg-warm-100 text-warm-600', youth: 'bg-gold-100 text-gold-700', general: 'bg-gray-100 text-gray-600' }[cat] ?? 'bg-gray-100 text-gray-600' }
function fmtDate(d: string) { return new Date(d).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' }) }
</script>
