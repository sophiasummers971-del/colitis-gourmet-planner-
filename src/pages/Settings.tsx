import { useApp } from '../context/AppContext';
import {
  User, Weight, Wallet, HeartPulse, FileText,
  Info, ExternalLink, Mail
} from 'lucide-react';

export default function Settings() {
  const { profile, setProfile, healthMode } = useApp();

  return (
    <div className="page-container">
      <div className="mb-6">
        <p className="text-sm text-sage-500 mb-1">Configuration</p>
        <h2 className="section-title">Settings</h2>
        <p className="text-xs text-sage-500">Manage your profile and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold ${
            healthMode === 'flare' ? 'bg-terracotta-500' : 'bg-sage-500'
          }`}>
            {profile.name[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-bold text-sage-900">{profile.name}</p>
            <p className="text-xs text-sage-500">{healthMode === 'flare' ? 'Flare mode active' : 'Remission mode'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-sage-600 mb-1 flex items-center gap-1.5">
              <User size={14} /> Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
              className="input-field"
              placeholder="Your name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-sage-600 mb-1 flex items-center gap-1.5">
                <Weight size={14} /> Weight (kg)
              </label>
              <input
                type="number"
                value={profile.weight}
                onChange={e => setProfile({ ...profile, weight: Number(e.target.value) || 0 })}
                className="input-field"
                placeholder="75"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-sage-600 mb-1 flex items-center gap-1.5">
                <Wallet size={14} /> Weekly Budget (£)
              </label>
              <input
                type="number"
                value={profile.weeklyBudget}
                onChange={e => setProfile({ ...profile, weeklyBudget: Number(e.target.value) || 0 })}
                className="input-field"
                placeholder="60"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-sage-600 mb-1 flex items-center gap-1.5">
              <HeartPulse size={14} /> Dietary Notes
            </label>
            <textarea
              value={profile.dietaryNotes}
              onChange={e => setProfile({ ...profile, dietaryNotes: e.target.value })}
              className="input-field min-h-[80px] resize-none"
              placeholder="e.g. No dairy, prefers fish over red meat, allergic to shellfish..."
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Info size={18} className="text-sage-500" />
          <p className="font-bold text-sage-900">About Colitis Gourmet</p>
        </div>
        <p className="text-sm text-sage-600 mb-3">
          A meal planning app designed for people living with Ulcerative Colitis.
          Created with love by Jade and Babykay. 💚
        </p>
        <div className="space-y-2 text-xs text-sage-500">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Built with React + TypeScript + Tailwind CSS
          </p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Food data based on NHS and medical research
          </p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Always consult your doctor before dietary changes
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <FileText size={20} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">Medical Disclaimer</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              This app is for informational purposes only and is not a substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider
              with any questions you may have regarding your medical condition. Never disregard professional medical
              advice or delay in seeking it because of something you have read in this app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
