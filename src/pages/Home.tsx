import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Weight, Wallet, Utensils, HeartPulse,
  ShoppingCart, Settings, ChevronRight,
  Flame, Shield, Sparkles
} from 'lucide-react';

export default function Home() {
  const { profile, healthMode, mealPlan, shoppingList } = useApp();
  const navigate = useNavigate();

  const totalProtein = mealPlan.reduce((sum, m) => sum + m.protein, 0);

  const quickActions = [
    { icon: ShoppingCart, label: 'Shopping List', count: shoppingList.length, path: '/shopping' },
    { icon: Settings, label: 'Settings', count: null, path: '/settings' },
  ];

  const mealTypeColors: Record<string, string> = {
    breakfast: 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)',
    lunch: 'linear-gradient(135deg, #2d5a3d 0%, #1a3d28 100%)',
    dinner: 'linear-gradient(135deg, #4a6fa5 0%, #2d4a6f 100%)',
    snack: 'linear-gradient(135deg, #C41E3A 0%, #8B1A1A 100%)',
  };

  return (
    <div className="page-container animate-smoke-reveal">
      {/* Dramatic Welcome */}
      <div className="mb-6">
        <p className="text-sm mb-1 animate-fade-in" style={{ color: 'var(--text-muted)' }}>
          <Sparkles size={14} className="inline mr-1" />
          Good evening, {profile.name}
        </p>
        <h2 className="text-3xl font-bold animate-slide-up"
          style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          {healthMode === 'flare' ? 'Gentle Tonight' : 'You\'re Thriving'}
        </h2>
        <p className="text-sm mt-1 animate-fade-in" style={{ color: 'var(--text-secondary)' }}>
          {healthMode === 'flare'
            ? 'Soft foods, warm soul, rest well.'
            : 'Fuel your body, feed your soul.'}
        </p>
      </div>

      {/* Health Mode Banner — Glowing */}
      <div className="menu-card-featured mb-6 animate-drop-in"
        style={{
          background: healthMode === 'flare'
            ? 'linear-gradient(145deg, rgba(196,30,58,0.08) 0%, var(--surface) 100%)'
            : 'linear-gradient(145deg, rgba(45,90,61,0.08) 0%, var(--surface) 100%)'
        }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
            style={{
              background: healthMode === 'flare'
                ? 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)'
                : 'linear-gradient(135deg, var(--smoke-green) 0%, #1a3d28 100%)',
              boxShadow: healthMode === 'flare'
                ? '0 0 20px var(--crimson-glow)'
                : '0 0 20px var(--smoke-green-glow)'
            }}>
            {healthMode === 'flare' ? <Flame size={24} /> : <Shield size={24} />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
              {healthMode === 'flare' ? 'Flare Mode Active' : 'Remission Mode'}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {healthMode === 'flare'
                ? 'Gentle foods, small portions, rest and hydrate.'
                : 'More variety available. Keep building those habits!'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards — Glowing Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 stagger-children">
        {[
          { icon: Weight, label: 'Weight', value: `${profile.weight}`, unit: 'kg', color: 'var(--crimson-glow)' },
          { icon: Wallet, label: 'Budget', value: `£${profile.weeklyBudget}`, unit: '/wk', color: 'var(--ember-glow)' },
          { icon: Utensils, label: 'Meals', value: `${mealPlan.length}`, unit: 'planned', color: 'var(--smoke-green-glow)' },
          { icon: HeartPulse, label: 'Protein', value: `${totalProtein}`, unit: 'g today', color: 'var(--crimson-glow)' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="menu-card animate-drop-in">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {stat.value}<span className="text-sm font-normal" style={{ color: 'var(--text-secondary)' }}> {stat.unit}</span>
              </p>
              <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-hover)' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, (i + 1) * 25)}%`, background: stat.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h3 className="section-title mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4 mb-6 stagger-children">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="menu-card flex items-center gap-3 text-left animate-drop-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--surface-hover)' }}>
                <Icon size={20} style={{ color: 'var(--text-secondary)' }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{action.label}</p>
                {action.count !== null && (
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{action.count} items</p>
                )}
              </div>
              <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
            </button>
          );
        })}
      </div>

      {/* Today's Meals Preview */}
      <h3 className="section-title mb-4">Tonight's Menu</h3>
      <div className="space-y-3 mb-6 stagger-children">
        {mealPlan.length === 0 ? (
          <div className="menu-card text-center py-8 animate-drop-in">
            <p className="mb-3" style={{ color: 'var(--text-muted)' }}>Nothing planned yet 🍽️</p>
            <button
              onClick={() => navigate('/planner')}
              className="btn-primary text-sm py-2 px-4"
            >
              Plan Your Menu
            </button>
          </div>
        ) : (
          mealPlan.slice(0, 3).map((meal, i) => (
            <div key={meal.id} className="menu-card flex items-center gap-4 animate-drop-in"
              style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: mealTypeColors[meal.mealType] || mealTypeColors.snack, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                {meal.mealType[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{meal.foodName}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {meal.mealType} · {meal.calories} kcal · {meal.protein}g protein
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
