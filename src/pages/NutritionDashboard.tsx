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

  // Protein target: ~1.5g/kg body weight during flares, 1g/kg in remission
  const proteinTarget = healthMode === 'flare' ? Math.round(profile.weight * 1.5) : Math.round(profile.weight * 1);
  const proteinProgress = Math.min((totalProtein / proteinTarget) * 100, 100);

  // Calorie target estimate: ~25-30 kcal/kg
  const calorieTarget = Math.round(profile.weight * 30);
  const calorieProgress = Math.min((totalCalories / calorieTarget) * 100, 100);

  const mealsByType = {
    breakfast: mealPlan.filter(m => m.mealType === 'breakfast').length,
    lunch: mealPlan.filter(m => m.mealType === 'lunch').length,
    dinner: mealPlan.filter(m => m.mealType === 'dinner').length,
    snack: mealPlan.filter(m => m.mealType === 'snack').length,
  };

  const maxMealsByType = Math.max(...Object.values(mealsByType), 1);

  return (
    <div className="page-container">
      <div className="mb-6">
        <p className="text-sm text-sage-500 mb-1">Nutrition</p>
        <h2 className="section-title">Nutrition Dashboard</h2>
        <p className="text-xs text-sage-500">Track your weekly nutrition goals</p>
      </div>

      {/* Protein Card */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Target size={20} className="text-sage-600" />
          <p className="font-bold text-sage-900">Protein Target</p>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-3xl font-bold text-sage-900">{totalProtein}</span>
          <span className="text-sm text-sage-500 mb-1">/ {proteinTarget}g</span>
        </div>
        <div className="h-3 bg-sage-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-sage-500 rounded-full transition-all duration-1000"
            style={{ width: `${proteinProgress}%` }}
          />
        </div>
        <p className="text-xs text-sage-500">
          {proteinProgress >= 100 ? '🎉 Target reached!' : `${Math.round(proteinProgress)}% of weekly goal`}
        </p>
        {healthMode === 'flare' && (
          <div className="flex items-start gap-2 mt-3 bg-amber-50 rounded-lg p-3">
            <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">
              During flares, aim for ~1.5g protein per kg body weight to support healing.
              Your target: {proteinTarget}g/week based on {profile.weight}kg.
            </p>
          </div>
        )}
      </div>

      {/* Calories Card */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Flame size={20} className="text-terracotta-600" />
          <p className="font-bold text-sage-900">Calories</p>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-3xl font-bold text-sage-900">{totalCalories.toLocaleString()}</span>
          <span className="text-sm text-sage-500 mb-1">/ {calorieTarget.toLocaleString()} kcal</span>
        </div>
        <div className="h-3 bg-sage-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-terracotta-400 rounded-full transition-all duration-1000"
            style={{ width: `${calorieProgress}%` }}
          />
        </div>
        <p className="text-xs text-sage-500">
          {calorieProgress >= 100 ? '🎉 Target reached!' : `${Math.round(calorieProgress)}% of weekly estimate`}
        </p>
      </div>

      {/* Meal Distribution */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={20} className="text-sage-600" />
          <p className="font-bold text-sage-900">Meal Distribution</p>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Breakfast', count: mealsByType.breakfast, color: 'bg-amber-400' },
            { label: 'Lunch', count: mealsByType.lunch, color: 'bg-emerald-400' },
            { label: 'Dinner', count: mealsByType.dinner, color: 'bg-sky-400' },
            { label: 'Snacks', count: mealsByType.snack, color: 'bg-rose-400' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <p className="text-xs font-medium text-sage-600 w-20">{item.label}</p>
              <div className="flex-1 h-6 bg-sage-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-700`}
                  style={{ width: `${(item.count / maxMealsByType) * 100}%` }}
                />
              </div>
              <p className="text-xs font-bold text-sage-700 w-8 text-right">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Averages */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-sage-500" />
            <p className="text-xs font-semibold text-sage-500 uppercase">Avg Calories/Meal</p>
          </div>
          <p className="text-2xl font-bold text-sage-900">{avgCalories}</p>
          <p className="text-xs text-sage-500">kcal per meal</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Droplets size={16} className="text-sage-500" />
            <p className="text-xs font-semibold text-sage-500 uppercase">Avg Protein/Meal</p>
          </div>
          <p className="text-2xl font-bold text-sage-900">{avgProtein}g</p>
          <p className="text-xs text-sage-500">protein per meal</p>
        </div>
      </div>

      {/* Hydration Reminder */}
      <div className="card bg-sky-50 border-sky-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
            <Droplets size={20} className="text-sky-600" />
          </div>
          <div>
            <p className="font-semibold text-sky-900">Stay Hydrated 💧</p>
            <p className="text-xs text-sky-700">
              {healthMode === 'flare'
                ? 'Aim for 2-3L water daily during flares. Your urine should be light yellow.'
                : 'Aim for 1.5-2L water daily. Hydration supports gut health and recovery.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
