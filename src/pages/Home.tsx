import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Weight, Wallet, Utensils, HeartPulse,
  ShoppingCart, Settings, ChevronRight,
  Flame, Shield
} from 'lucide-react';

export default function Home() {
  const { profile, healthMode, mealPlan, shoppingList } = useApp();
  const navigate = useNavigate();

  const totalCalories = mealPlan.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = mealPlan.reduce((sum, m) => sum + m.protein, 0);

  const quickActions = [
    { icon: ShoppingCart, label: 'Shopping List', count: shoppingList.length, path: '/shopping', color: 'bg-sage-100 text-sage-600' },
    { icon: Settings, label: 'Settings', count: null, path: '/settings', color: 'bg-terracotta-100 text-terracotta-600' },
  ];

  return (
    <div className="page-container animate-fade-in">
      {/* Welcome */}
      <div className="mb-6">
        <p className="text-sm text-sage-500 mb-1">Good morning, {profile.name} 🌿</p>
        <h2 className="text-2xl font-bold text-sage-900">
          {healthMode === 'flare' ? 'Take it gentle today' : 'You\'re doing great!'}
        </h2>
      </div>

      {/* Health Mode Banner */}
      <div className={`card mb-6 ${healthMode === 'flare' ? 'border-terracotta-200 bg-terracotta-50/50' : 'border-sage-200 bg-sage-50/50'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            healthMode === 'flare' ? 'bg-terracotta-500 text-white' : 'bg-sage-500 text-white'
          }`}>
            {healthMode === 'flare' ? <Flame size={24} /> : <Shield size={24} />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sage-900">
              {healthMode === 'flare' ? 'Flare Mode Active' : 'Remission Mode'}
            </h3>
            <p className="text-sm text-sage-600">
              {healthMode === 'flare'
                ? 'Gentle foods, small portions, rest and hydrate. You\'ve got this.'
                : 'More variety available. Keep building healthy habits!'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Weight size={18} className="text-sage-500" />
            <span className="text-xs font-medium text-sage-500 uppercase tracking-wider">Weight</span>
          </div>
          <p className="text-2xl font-bold text-sage-900">{profile.weight}<span className="text-sm font-normal text-sage-500"> kg</span></p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={18} className="text-sage-500" />
            <span className="text-xs font-medium text-sage-500 uppercase tracking-wider">Budget</span>
          </div>
          <p className="text-2xl font-bold text-sage-900">£{profile.weeklyBudget}<span className="text-sm font-normal text-sage-500"> /wk</span></p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Utensils size={18} className="text-sage-500" />
            <span className="text-xs font-medium text-sage-500 uppercase tracking-wider">Meals</span>
          </div>
          <p className="text-2xl font-bold text-sage-900">{mealPlan.length}<span className="text-sm font-normal text-sage-500"> planned</span></p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <HeartPulse size={18} className="text-sage-500" />
            <span className="text-xs font-medium text-sage-500 uppercase tracking-wider">Protein</span>
          </div>
          <p className="text-2xl font-bold text-sage-900">{totalProtein}<span className="text-sm font-normal text-sage-500"> g today</span></p>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="section-title mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {quickActions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="card flex items-center gap-3 text-left hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sage-900">{action.label}</p>
                {action.count !== null && (
                  <p className="text-xs text-sage-500">{action.count} items</p>
                )}
              </div>
              <ChevronRight size={18} className="text-sage-300" />
            </button>
          );
        })}
      </div>

      {/* Today's Meals Preview */}
      <h3 className="section-title mb-4">Today's Plan</h3>
      <div className="space-y-3 mb-6">
        {mealPlan.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-sage-500 mb-2">No meals planned yet 🍽️</p>
            <button
              onClick={() => navigate('/planner')}
              className="btn-primary text-sm py-2 px-4"
            >
              Go to Planner
            </button>
          </div>
        ) : (
          mealPlan.slice(0, 3).map(meal => (
            <div key={meal.id} className="card flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                meal.mealType === 'breakfast' ? 'bg-amber-400' :
                meal.mealType === 'lunch' ? 'bg-emerald-400' :
                meal.mealType === 'dinner' ? 'bg-sky-400' : 'bg-rose-400'
              }`}>
                {meal.mealType[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sage-900">{meal.foodName}</p>
                <p className="text-xs text-sage-500">{meal.mealType} · {meal.calories} kcal · {meal.protein}g protein</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
