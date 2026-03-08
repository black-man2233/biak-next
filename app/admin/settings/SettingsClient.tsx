"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Save, CheckCircle, Settings, Lock, Globe, Phone, Mail, MapPin } from "lucide-react";

interface Props {
  info: Record<string, string>;
  userEmail: string;
}

export function SettingsClient({ info: initInfo, userEmail }: Props) {
  const [info, setInfo] = useState(initInfo);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: "church_name", label: "Kirkens Navn", icon: Globe },
    { key: "mission", label: "Mission", icon: Settings },
    { key: "address", label: "Adresse", icon: MapPin },
    { key: "phone", label: "Telefon", icon: Phone },
    { key: "email", label: "Email", icon: Mail },
    { key: "facebook", label: "Facebook URL", icon: Globe },
    { key: "sunday_service_time", label: "Søndagsgudstjeneste tid", icon: Settings },
    { key: "wednesday_time", label: "Onsdagsmøde tid", icon: Settings },
  ];

  return (
    <div className="p-6 lg:p-10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Indstillinger</h1>
          <p className="text-slate-400 mt-1">Administrer kirkeoplysninger og indstillinger</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2 disabled:opacity-60"
        >
          {saved ? (
            <><CheckCircle className="w-4 h-4 text-green-400" /> Gemt!</>
          ) : saving ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Gemmer...</>
          ) : (
            <><Save className="w-4 h-4" /> Gem Ændringer</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Church info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" /> Kirkeoplysninger
          </h2>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-slate-400 text-sm mb-2">{field.label}</label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    value={info[field.key] ?? ""}
                    onChange={(e) => setInfo({ ...info, [field.key]: e.target.value })}
                    className="form-input pl-10"
                    placeholder={field.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Account info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 h-fit">
          <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" /> Konto
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Email</label>
              <input value={userEmail} disabled className="form-input opacity-60 cursor-not-allowed" />
            </div>
            <p className="text-slate-500 text-sm">
              For at ændre adgangskode, kontakt din systemadministrator eller opdater direkte i databasen.
            </p>
          </div>

          {/* Info cards */}
          <div className="mt-8 space-y-3">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-400 text-sm font-semibold mb-1">Standard Admin Login</p>
              <p className="text-slate-400 text-xs">Email: admin@biak.dk</p>
              <p className="text-slate-400 text-xs">Adgangskode: admin123</p>
              <p className="text-slate-500 text-xs mt-2">⚠️ Skift adgangskode i produktion</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
