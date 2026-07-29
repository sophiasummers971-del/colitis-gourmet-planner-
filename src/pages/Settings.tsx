import { useApp, type AppPreferences } from '../context/AppContext';
import {
  User, Weight, Wallet, HeartPulse, FileText,
  Info, Sparkles, Zap, Eye, Palette, Target,
  Flame
} from 'lucide-react';

export default function Settings() {
  const { profile, updateProfile, healthMode, preferences, updatePreferences } = useApp();

  const togglePref = <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => {
    updatePreferences({ [key]: value } as Partial<AppPreferences>);
  };

  const accentColors: { key: AppPreferences['accentColor']; label: string; color: string }[] = [
    { key: 'crimson', label: 'Crimson', color: '#C41E3A' },
    { key: 'emerald', label: 'Emerald', color: '#2d5a3d' },
    { key: 'ocean', label: 'Ocean', color: '#4a6fa5' },
  ];

  const portionSizes: { key: AppPreferences['portionSize']; label: string; multiplier: number }[] = [
    { key: 'small', label: 'Small', multiplier: 0.75 },
    { key: 'medium', label: 'Medium', multiplier: 1 },
    { key: 'large', label: 'Large', multiplier: 1.25 },
  ];

  return (
    <div className="page-container animate-smoke-reveal">
      <div className="mb-6">
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          <Sparkles size={14} className="inline mr-1" />
          The Backstage
        </p>
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Settings</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Your profile, preferences, and customisation</p>
      </div>

      {/* Profile Card */}
      <div className="menu-card mb-6 animate-drop-in">
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
            <label className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
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
              <label className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
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
              <label className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
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
            <label className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
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

      {/* Nutrition Goals */}
      <div className="menu-card mb-6 animate-drop-in">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--ember) 0%, var(--ember-dim) 100%)', boxShadow: '0 0 15px var(--ember-glow)' }}>
            <Target size={16} style={{ color: '#fff' }} />
          </div>
          <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Nutrition Goals</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <Flame size={14} /> Daily Calorie Target
            </label>
            <input
              type="number"
              value={preferences.dailyCalorieGoal}
              onChange={e => togglePref('dailyCalorieGoal', Number(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <HeartPulse size={14} /> Daily Protein Target (g)
            </label>
            <input
              type="number"
              value={preferences.dailyProteinGoal}
              onChange={e => togglePref('dailyProteinGoal', Number(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-muted)' }}>Portion Size</label>
            <div className="flex gap-2">
              {portionSizes.map(p => (
                <button
                  key={p.key}
                  onClick={() => togglePref('portionSize', p.key)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: preferences.portionSize === p.key
                      ? 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)'
                      : 'var(--surface-hover)',
                    color: preferences.portionSize === p.key ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: preferences.portionSize === p.key ? '0 0 10px var(--crimson-glow)' : 'none',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="menu-card mb-6 animate-drop-in">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)', boxShadow: '0 0 15px var(--crimson-glow)' }}>
            <Palette size={16} style={{ color: '#fff' }} />
          </div>
          <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Appearance</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-muted)' }}>Accent Colour</label>
            <div className="flex gap-2">
              {accentColors.map(c => (
                <button
                  key={c.key}
                  onClick={() => togglePref('accentColor', c.key)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: preferences.accentColor === c.key ? `${c.color}20` : 'var(--surface-hover)',
                    color: preferences.accentColor === c.key ? c.color : 'var(--text-secondary)',
                    border: `1px solid ${preferences.accentColor === c.key ? c.color : 'var(--border-subtle)'}`,
                  }}
                >
                  <span className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow
            icon={Sparkles}
            label="Animations"
            description="Enable smooth transitions and effects"
            value={preferences.animationsEnabled}
            onChange={() => togglePref('animationsEnabled', !preferences.animationsEnabled)}
          />
          <ToggleRow
            icon={Eye}
            label="Particle Background"
            description="Interactive animated background"
            value={preferences.particleBackground}
            onChange={() => togglePref('particleBackground', !preferences.particleBackground)}
          />
          <ToggleRow
            icon={Zap}
            label="Compact Mode"
            description="Tighter spacing, more content per screen"
            value={preferences.compactMode}
            onChange={() => togglePref('compactMode', !preferences.compactMode)}
          />
          <ToggleRow
            icon={Eye}
            label="Nutrition on Cards"
            description="Show calories & protein on food cards"
            value={preferences.showNutritionOnCards}
            onChange={() => togglePref('showNutritionOnCards', !preferences.showNutritionOnCards)}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="menu-card mb-6 animate-drop-in">
        <div className="flex items-center gap-2 mb-3">
          <Info size={18} style={{ color: 'var(--text-muted)' }} />
          <p className="font-bold" style={{ color: 'var(--text-primary)' }}>About Colitis Gourmet</p>
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          A meal planning app for people living with Ulcerative Colitis.
          Created with love by Jade and Babykay.
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

      {/* Disclaimer */}
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

function ToggleRow({
  icon: Icon,
  label,
  description,
  value,
  onChange,
}: {
  icon: typeof Zap;
  label: string;
  description: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon size={18} style={{ color: 'var(--text-muted)' }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`toggle-track ${value ? 'flare' : ''}`}
        role="switch"
        aria-checked={value}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  );
}
