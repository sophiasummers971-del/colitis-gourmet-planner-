import { useApp } from '../context/AppContext';
import {
  User, Weight, Wallet, HeartPulse, FileText,
  Info, Sparkles
} from 'lucide-react';

export default function Settings() {
  const { profile, updateProfile, healthMode } = useApp();

  return (
    <div className="page-container animate-smoke-reveal">
      <div className="mb-6">
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          <Sparkles size={14} className="inline mr-1" />
          The Backstage
        </p>
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Settings</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Your profile and preferences</p>
      </div>

      {/* Profile Card — Glowing Avatar */}
      <div className="menu-card mb-6 animate-drop-in"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold"
            style={{
              background: healthMode === 'flare'
                ? 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)'
                : 'linear-gradient(135deg, var(--smoke-green) 0%, #1a3d28 100%)',
              boxShadow: healthMode === 'flare'
                ? '0 0 20px var(--crimson-glow)'
                : '0 0 20px var(--smoke-green-glow)'
            }}
          >
            {profile.name[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{profile.name}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {healthMode === 'flare' ? 'Flare mode active' : 'Remission mode'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold mb-1 flex items-center gap-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              <User size={14} /> Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={e => updateProfile({ ...profile, name: e.target.value })}
              className="input-field"
              placeholder="Your name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold mb-1 flex items-center gap-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                <Weight size={14} /> Weight (kg)
              </label>
              <input
                type="number"
                value={profile.weight}
                onChange={e => updateProfile({ ...profile, weight: Number(e.target.value) || 0 })}
                className="input-field"
                placeholder="75"
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 flex items-center gap-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                <Wallet size={14} /> Weekly Budget (£)
              </label>
              <input
                type="number"
                value={profile.weeklyBudget}
                onChange={e => updateProfile({ ...profile, weeklyBudget: Number(e.target.value) || 0 })}
                className="input-field"
                placeholder="60"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 flex items-center gap-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              <HeartPulse size={14} /> Dietary Notes
            </label>
            <textarea
              value={profile.dietaryNotes}
              onChange={e => updateProfile({ ...profile, dietaryNotes: e.target.value })}
              className="input-field min-h-[80px] resize-none"
              placeholder="e.g. No dairy, prefers fish over red meat, allergic to shellfish..."
            />
          </div>
        </div>
      </div>

      {/* About Section — Dark */}
      <div className="menu-card mb-6 animate-drop-in">
        <div className="flex items-center gap-2 mb-3">
          <Info size={18} style={{ color: 'var(--text-muted)' }} />
          <p className="font-bold" style={{ color: 'var(--text-primary)' }}>About Colitis Gourmet</p>
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          A meal planning app for people living with Ulcerative Colitis.
          Created with love by Jade and Babykay. 💚
        </p>
        <div className="space-y-2 text-xs">
          <p className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--safe)' }} />
            Built with React + TypeScript + Tailwind CSS
          </p>
          <p className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--crimson)' }} />
            Food data based on NHS and medical research
          </p>
          <p className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--ember)' }} />
            Always consult your doctor before dietary changes
          </p>
        </div>
      </div>

      {/* Disclaimer — Amber Glow */}
      <div className="menu-card animate-drop-in"
        style={{
          background: 'linear-gradient(145deg, rgba(212,160,23,0.05) 0%, var(--surface) 100%)',
          border: '1px solid rgba(212,160,23,0.15)'
        }}
      >
        <div className="flex items-start gap-3">
          <FileText size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--ember)' }} />
          <div>
            <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Medical Disclaimer</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              This app is for informational purposes only and is not a substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your physician with any questions regarding your condition.
              Never disregard professional medical advice because of something you read in this app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
