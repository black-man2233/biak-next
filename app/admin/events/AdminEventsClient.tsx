"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, Save, Calendar, Clock, MapPin, RotateCcw, Image as ImageIcon, Upload } from "lucide-react";

interface Event {
  id: string;
  title: string;
  titleDa: string | null;
  description: string;
  descriptionDa: string | null;
  date: string;
  location: string;
  category: string;
  startTime: string | null;
  endTime: string | null;
  isRecurring: boolean;
  recurringDay: string | null;
  imageUrl: string | null;
}

const emptyForm: Omit<Event, "id"> = {
  title: "",
  titleDa: "",
  description: "",
  descriptionDa: "",
  date: new Date().toISOString().split("T")[0],
  location: "Kirkevej 10, 9700 Brønderslev",
  category: "service",
  startTime: "10:30",
  endTime: "12:30",
  isRecurring: false,
  recurringDay: null,
  imageUrl: "",
};

const categories = ["service", "prayer", "youth", "general"];
const categoryLabels: Record<string, string> = {
  service: "Gudstjeneste",
  prayer: "Bøn",
  youth: "Unge",
  general: "Generelt",
};

export function AdminEventsClient({ events: initialEvents }: { events: Event[] }) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (event: Event) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      titleDa: event.titleDa ?? "",
      description: event.description,
      descriptionDa: event.descriptionDa ?? "",
      date: event.date.split("T")[0],
      location: event.location,
      category: event.category,
      startTime: event.startTime ?? "",
      endTime: event.endTime ?? "",
      isRecurring: event.isRecurring,
      recurringDay: event.recurringDay ?? null,
      imageUrl: event.imageUrl ?? "",
    });
    setShowForm(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: data });
      if (res.ok) {
        const json = await res.json();
        setForm((f) => ({ ...f, imageUrl: json.url }));
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/events/${editingId}` : "/api/admin/events";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: new Date(form.date).toISOString(),
          imageUrl: form.imageUrl || null,
        }),
      });
      if (res.ok) {
        router.refresh();
        setShowForm(false);
        const data = await res.json();
        if (editingId) {
          setEvents(events.map((e) => (e.id === editingId ? { ...e, ...data } : e)));
        } else {
          setEvents([data, ...events]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette dette event?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      setEvents(events.filter((e) => e.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Events</h1>
          <p className="text-slate-400 mt-1 text-sm">{events.length} events i alt</p>
        </div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nyt Event</span>
          <span className="sm:hidden">Ny</span>
        </button>
      </div>

      {/* Events table */}
      <div className="glass-card overflow-hidden">
        {events.length === 0 ? (
          <div className="p-10 sm:p-12 text-center">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">Ingen events endnu. Opret dit første event.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {events.map((event, i) => {
              const date = new Date(event.date);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-3 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-white/3 transition-colors"
                >
                  {event.imageUrl ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold leading-none">
                        {date.toLocaleDateString("da-DK", { month: "short" })}
                      </span>
                      <span className="text-white text-lg font-black leading-none">{date.getDate()}</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-white font-medium truncate text-sm sm:text-base">{event.title}</p>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-300 flex-shrink-0">
                        {categoryLabels[event.category] || event.category}
                      </span>
                      {event.isRecurring && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-300 flex-shrink-0 hidden sm:flex items-center gap-1">
                          <RotateCcw className="w-2.5 h-2.5" /> Tilbagevendende
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      {event.startTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}
                        </span>
                      )}
                      <span className="flex items-center gap-1 truncate hidden sm:flex">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEdit(event)}
                      className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      disabled={deleting === event.id}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              className="fixed inset-x-3 sm:inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-2xl mx-auto max-h-[92vh] overflow-y-auto glass-card p-5 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {editingId ? "Rediger Event" : "Nyt Event"}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Titel (EN) *</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="form-input"
                      placeholder="Event title"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Titel (DA)</label>
                    <input
                      value={form.titleDa ?? ""}
                      onChange={(e) => setForm({ ...form, titleDa: e.target.value })}
                      className="form-input"
                      placeholder="Event titel"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">Beskrivelse *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="form-input resize-none"
                    rows={3}
                    placeholder="Beskriv eventet..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Dato *</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Starttid</label>
                    <input
                      type="time"
                      value={form.startTime ?? ""}
                      onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Sluttid</label>
                    <input
                      type="time"
                      value={form.endTime ?? ""}
                      onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Sted *</label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Kategori</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="form-input"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c} className="bg-slate-900">
                          {categoryLabels[c]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    <ImageIcon className="w-4 h-4 inline mr-1" />
                    Billede
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={form.imageUrl ?? ""}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      className="form-input flex-1"
                      placeholder="Billedeadresse (URL) eller upload nedenfor"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex-shrink-0 px-3 py-2 rounded-lg glass border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {uploading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                  {form.imageUrl && (
                    <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden">
                      <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, imageUrl: "" })}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-red-500/80 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="recurring"
                    type="checkbox"
                    checked={form.isRecurring}
                    onChange={(e) => setForm({ ...form, isRecurring: e.target.checked })}
                    className="w-4 h-4 rounded border-blue-500 bg-slate-800 text-blue-600"
                  />
                  <label htmlFor="recurring" className="text-slate-300 text-sm">
                    Tilbagevendende event
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-lg glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-sm">
                    Annuller
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading || !form.title || !form.description || !form.date}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-60 text-sm"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        {editingId ? "Opdater" : "Gem Event"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
