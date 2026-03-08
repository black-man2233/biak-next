"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Edit2, Trash2, X, Save, BookOpen, Play, Calendar, User } from "lucide-react";

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  videoUrl: string | null;
  description: string | null;
}

const emptyForm = { title: "", speaker: "Pastor Martin Mutale", date: new Date().toISOString().split("T")[0], videoUrl: "", description: "" };

export function AdminSermonsClient({ sermons: init }: { sermons: Sermon[] }) {
  const [items, setItems] = useState(init);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openNew = () => { setEditingId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (s: Sermon) => {
    setEditingId(s.id);
    setForm({ title: s.title, speaker: s.speaker, date: s.date.split("T")[0], videoUrl: s.videoUrl ?? "", description: s.description ?? "" });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        editingId ? `/api/admin/sermons/${editingId}` : "/api/admin/sermons",
        { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, date: new Date(form.date).toISOString() }) }
      );
      if (res.ok) {
        const data = await res.json();
        setItems(editingId ? items.map((i) => (i.id === editingId ? { ...i, ...data } : i)) : [data, ...items]);
        setShowForm(false);
      }
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Slet denne prædiken?")) return;
    await fetch(`/api/admin/sermons/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="p-6 lg:p-10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Prædikener</h1>
          <p className="text-slate-400 mt-1">{items.length} prædikener i alt</p>
        </div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tilføj Prædiken
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">Ingen prædikener endnu.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item, i) => {
              const date = new Date(item.date);
              return (
                <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center flex-shrink-0">
                    {item.videoUrl ? <Play className="w-5 h-5 text-white" /> : <BookOpen className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium mb-1 truncate">{item.title}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{item.speaker}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {date.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      {item.videoUrl && <span className="text-blue-400 flex items-center gap-1"><Play className="w-3 h-3" />Video</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto glass-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{editingId ? "Rediger Prædiken" : "Ny Prædiken"}</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Titel *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="form-input" placeholder="Prædikenens titel" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Taler *</label>
                    <input value={form.speaker} onChange={(e) => setForm({ ...form, speaker: e.target.value })} className="form-input" placeholder="Taler" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Dato *</label>
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Video URL (Facebook/YouTube)</label>
                  <input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} className="form-input" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Beskrivelse</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="form-input resize-none" rows={3} placeholder="Kort beskrivelse..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-lg glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all">Annuller</button>
                  <button onClick={handleSave} disabled={loading || !form.title || !form.speaker} className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-4 h-4" />{editingId ? "Opdater" : "Gem"}</>}
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
