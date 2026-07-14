import { useApp } from '../context/AppContext';
import {
  BarChart3, TrendingUp, Droplets, Flame,
  Target, AlertCircle
} from 'lucide-react';

export default function NutritionDashboard() {
  const { profile, mealPlan, healthMode } = useApp();

  const totalCalories = mealPlan.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = mealPlan.reduce((sum, m) => sum + m.protein, 0);
  const avgCalories = mealPlan.length > 0 ? Math.round(totalCalories / mealPlan.length) : 0;
  const avgProtein = mealPlan.length > 0 ? Math.round(totalProtein / mealPlan.length) : 0;

  const proteinTarget = healthMode === 'flare' ? Math.round(profile.weight * 1.5) : Math.round(profile.weight * 1);
  const proteinProgress = Math.min((totalProtein / proteinTarget) * 100, 100);

  const calorieTarget = Math.round(profile.weight * 30);
  const calorieProgress = Math.min((totalCalories / calorieTarget) * 100, 100);

  const mealsByType = {
    breakfast: mealPlan.filter(m => m.mealType === 'breakfast').length,
    lunch: mealPlan.filter(m => m.mealType === 'lunch').length,
    dinner: mealPlan.filter(m => m.mealType === 'dinner').length,
    snack: mealPlan.filter(m => m.mealType === 'snack').length,
  };

  const maxMealsByType = Math.max(...Object.values(mealsByType), 1);

  const mealColors: Record<string, string> = {
    breakfast: 'linear-gradient(90deg, #D4A017 0%, #B8860B 100%)',
    lunch: 'linear-gradient(90deg, #2d5a3d 0%, #1a3d28 100%)',
    dinner: 'linear-gradient(90deg, #4a6fa5 0%, #2d4a6f 100%)',
    snack: 'linear-gradient(90deg, #C41E3A 0%, #8B1A1A 100%)',
  };

  return (
    <div className="page-container animate-smoke-reveal">
      <div className="mb-6">
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          <BarChart3 size={14} className="inline mr-1" />
          The Numbers
        </p>
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Nutrition Dashboard</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Weekly nutrition goals</p>
      </div>

      <div className="stagger-children">
        {/* Protein Card — Glowing */}
        <div className="menu-card mb-4 animate-drop-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)', boxShadow: '0 0 15px var(--crimson-glow)' }}
            >
              <Target size={16} style={{ color: '#fff' }} />
            </div>
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Protein Target</p>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{totalProtein}</span>
            <span className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>/ {proteinTarget}g</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden mb-2"
            style={{ background: 'var(--surface-hover)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000 ring-glow-crimson"
              style={{
                width: `${proteinProgress}%`,
                background: 'linear-gradient(90deg, var(--crimson) 0%, var(--ember) 100%)'
              }}
            />
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {proteinProgress >= 100 ? '🎉 Target reached!' : `${Math.round(proteinProgress)}% of weekly goal`}
          </p>
          {healthMode === 'flare' && (
            <div className="flex items-start gap-2 mt-3 rounded-lg p-3"
              style={{ background: 'var(--ember-smoke)', border: '1px solid rgba(212,160,23,0.1)' }}
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--ember)' }} />
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                During flares, aim for ~1.5g protein per kg. Your target: {proteinTarget}g/week based on {profile.weight}kg.
              </p>
            </div>
          )}
        </div>

        {/* Calories Card — Ember Glow */}
        <div className="menu-card mb-4 animate-drop-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--ember) 0%, var(--ember-dim) 100%)', boxShadow: '0 0 15px var(--ember-glow)' }}
            >
              <Flame size={16} style={{ color: '#fff' }} />
            </div>
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Calories</p>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{totalCalories.toLocaleString()}</span>
            <span className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>/ {calorieTarget.toLocaleString()} kcal</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden mb-2"
            style={{ background: 'var(--surface-hover)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000 ring-glow-ember"
              style={{
                width: `${calorieProgress}%`,
                background: 'linear-gradient(90deg, var(--ember) 0%, var(--crimson) 100%)'
              }}
            />
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {calorieProgress >= 100 ? '🎉 Target reached!' : `${Math.round(calorieProgress)}% of weekly estimate`}
          </p>
        </div>

        {/* Meal Distribution — Dark Bars */}
        <div className="menu-card mb-4 animate-drop-in">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={20} style={{ color: 'var(--text-muted)' }} />
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Meal Distribution</p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Breakfast', count: mealsByType.breakfast, key: 'breakfast' },
              { label: 'Lunch', count: mealsByType.lunch, key: 'lunch' },
              { label: 'Dinner', count: mealsByType.dinner, key: 'dinner' },
              { label: 'Snacks', count: mealsByType.snack, key: 'snack' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <p className="text-xs font-medium w-20" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
                <div className="flex-1 h-6 rounded-full overflow-hidden"
                  style={{ background: 'var(--surface-hover)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(item.count / maxMealsByType) * 100}%`, background: mealColors[item.key] }}
                  />
                </div>
                <p className="text-xs font-bold w-8 text-right" style={{ color: 'var(--text-primary)' }}>{item.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Averages */}
        <div className="grid grid-cols-2 gap-4 mb-4 stagger-children">
          <div className="menu-card animate-drop-in">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} style={{ color: 'var(--text-muted)' }} />
              <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>Avg Calories</p>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{avgCalories}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>kcal per meal</p>
          </div>
          <div className="menu-card animate-drop-in">
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={16} style={{ color: 'var(--text-muted)' }} />
              <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>Avg Protein</p>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{avgProtein}g</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>protein per meal</p>
          </div>
        </div>

        {/* Hydration Reminder — Glowing */}
        <div className="menu-card animate-drop-in"
          style={{
            background: 'linear-gradient(145deg, rgba(74,111,165,0.08) 0%, var(--surface) 100%)',
            border: '1px solid rgba(74,111,165,0.15)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4a6fa5 0%, #2d4a6f 100%)', boxShadow: '0 0 15px rgba(74,111,165,0.2)' }}
            >
              <Droplets size={20} style={{ color: '#fff' }} />
            </div>
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Stay Hydrated 💧</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {healthMode === 'flare'
                  ? 'Aim for 2-3L water daily during flares. Light yellow urine is the goal.'
                  : 'Aim for 1.5-2L daily. Hydration supports gut health and recovery.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
