"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Megaphone, ToggleLeft, ToggleRight } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

const emptyForm = { title: "", content: "", isActive: true };

export function AnnouncementsClient({ announcements: init }: { announcements: Announcement[] }) {
  const [items, setItems] = useState(init);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openNew = () => { setEditingId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (a: Announcement) => {
    setEditingId(a.id);
    setForm({ title: a.title, content: a.content, isActive: a.isActive });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        editingId ? `/api/admin/announcements/${editingId}` : "/api/admin/announcements",
        { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }
      );
      if (res.ok) {
        const data = await res.json();
        setItems(editingId ? items.map((i) => (i.id === editingId ? { ...i, ...data } : i)) : [data, ...items]);
        setShowForm(false);
      }
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Slet denne meddelelse?")) return;
    await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  };

  const toggleActive = async (a: Announcement) => {
    const res = await fetch(`/api/admin/announcements/${a.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...a, isActive: !a.isActive }),
    });
    if (res.ok) {
      setItems(items.map((i) => (i.id === a.id ? { ...i, isActive: !i.isActive } : i)));
    }
  };

  return (
    <div className="p-6 lg:p-10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Meddelelser</h1>
          <p className="text-slate-400 mt-1">{items.filter((i) => i.isActive).length} aktive</p>
        </div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Ny Meddelelse
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <Megaphone className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">Ingen meddelelser endnu.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="p-5 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.isActive ? "bg-gradient-to-br from-blue-600 to-indigo-700" : "bg-slate-800"}`}>
                  <Megaphone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-medium ${item.isActive ? "text-white" : "text-slate-500"}`}>{item.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${item.isActive ? "bg-green-500/20 text-green-300" : "bg-slate-700 text-slate-500"}`}>
                      {item.isActive ? "Aktiv" : "Inaktiv"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">{item.content}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(item)} className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                    {item.isActive ? <ToggleRight className="w-5 h-5 text-blue-400" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                  <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
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
                <h2 className="text-2xl font-bold text-white">{editingId ? "Rediger Meddelelse" : "Ny Meddelelse"}</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Titel *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="form-input" placeholder="Meddelelsens titel" />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Indhold *</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="form-input resize-none" rows={4} placeholder="Meddelelsens indhold..." />
                </div>
                <div className="flex items-center gap-3">
                  <input id="active" type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-blue-500 bg-slate-800 text-blue-600" />
                  <label htmlFor="active" className="text-slate-300 text-sm">Aktiv (vises på hjemmesiden)</label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-lg glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all">Annuller</button>
                  <button onClick={handleSave} disabled={loading || !form.title || !form.content} className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
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
