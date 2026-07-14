import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Plus, Trash2, Sunrise, Sun, Sunset, Cookie,
  ChevronRight, Sparkles
} from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = [
  { key: 'breakfast' as const, label: 'Breakfast', icon: Sunrise, color: 'bg-amber-100 text-amber-700' },
  { key: 'lunch' as const, label: 'Lunch', icon: Sun, color: 'bg-emerald-100 text-emerald-700' },
  { key: 'dinner' as const, label: 'Dinner', icon: Sunset, color: 'bg-sky-100 text-sky-700' },
  { key: 'snack' as const, label: 'Snack', icon: Cookie, color: 'bg-rose-100 text-rose-700' },
];

const sampleMeals = [
  { name: 'Oatmeal with banana', calories: 320, protein: 8 },
  { name: 'Scrambled eggs with white toast', calories: 380, protein: 18 },
  { name: 'Grilled chicken with white rice', calories: 450, protein: 35 },
  { name: 'Turkey breast with pasta', calories: 480, protein: 30 },
  { name: 'Baked salmon with mashed potatoes', calories: 520, protein: 32 },
  { name: 'Poached white fish with carrots', calories: 420, protein: 28 },
  { name: 'Chicken soup with white rice', calories: 350, protein: 25 },
  { name: 'Mashed potatoes with lean beef', calories: 460, protein: 30 },
  { name: 'Rice pudding with lactose-free milk', calories: 280, protein: 8 },
  { name: 'Banana smoothie (lactose-free)', calories: 240, protein: 6 },
  { name: 'Steamed fish with pumpkin', calories: 380, protein: 26 },
  { name: 'Chicken and rice soup', calories: 340, protein: 24 },
];

export default function WeeklyPlanner() {
  const { mealPlan, addToMealPlan, removeFromMealPlan, healthMode } = useApp();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  const dayMeals = mealPlan.filter(m => m.day === selectedDay);

  const handleAddMeal = (meal: typeof sampleMeals[0]) => {
    addToMealPlan({
      day: selectedDay,
      mealType: selectedMealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      foodName: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      notes: healthMode === 'flare' ? 'Keep it gentle and soft' : 'Enjoy with the family!',
    });
    setShowAddMeal(false);
  };

  const dayStats = {
    calories: dayMeals.reduce((sum, m) => sum + m.calories, 0),
    protein: dayMeals.reduce((sum, m) => sum + m.protein, 0),
  };

  return (
    <div className="page-container">
      <div className="mb-6">
        <p className="text-sm text-sage-500 mb-1">Meal Planning</p>
        <h2 className="section-title">Weekly Planner</h2>
        <p className="text-xs text-sage-500">{mealPlan.length} meals planned this week</p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {days.map(day => {
          const dayCount = mealPlan.filter(m => m.day === day).length;
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex flex-col items-center min-w-[60px] px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? healthMode === 'flare'
                    ? 'bg-terracotta-500 text-white shadow-md'
                    : 'bg-sage-500 text-white shadow-md'
                  : 'bg-white text-sage-600 border border-sage-200'
              }`}
            >
              <span className="text-xs font-semibold">{day.slice(0, 3)}</span>
              {dayCount > 0 && (
                <span className={`text-[10px] mt-0.5 ${isActive ? 'text-white/80' : 'text-sage-400'}`}>
                  {dayCount} meals
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Day Stats */}
      <div className="card mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-sage-500 font-semibold">{selectedDay}</p>
            <p className="text-sm text-sage-600">{dayMeals.length} meals</p>
          </div>
          <div className="h-8 w-px bg-sage-200" />
          <div>
            <p className="text-xs text-sage-500">Calories</p>
            <p className="font-bold text-sage-900">{dayStats.calories}</p>
          </div>
          <div>
            <p className="text-xs text-sage-500">Protein</p>
            <p className="font-bold text-sage-900">{dayStats.protein}g</p>
          </div>
        </div>
      </div>

      {/* Meal Slots */}
      <div className="space-y-3 mb-6">
        {mealTypes.map(type => {
          const meal = dayMeals.find(m => m.mealType === type.key);
          const Icon = type.icon;

          return (
            <div key={type.key} className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type.color}`}>
                  <Icon size={16} />
                </div>
                <p className="font-semibold text-sage-900">{type.label}</p>
              </div>

              {meal ? (
                <div className="flex items-center justify-between bg-sage-50 rounded-lg p-3">
                  <div>
                    <p className="font-medium text-sage-900">{meal.foodName}</p>
                    <p className="text-xs text-sage-500">{meal.calories} kcal · {meal.protein}g protein</p>
                    {meal.notes && (
                      <p className="text-xs text-sage-400 mt-1 italic">{meal.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromMealPlan(meal.id)}
                    className="p-2 text-sage-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedMealType(type.key);
                    setShowAddMeal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-sage-200 text-sage-400 hover:border-sage-400 hover:text-sage-600 transition-all"
                >
                  <Plus size={16} />
                  Add {type.label}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 animate-fade-in"
          onClick={() => setShowAddMeal(false)}
        >
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[70vh] overflow-hidden animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-sage-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-sage-900">Add {selectedMealType}</p>
                <p className="text-xs text-sage-500">{selectedDay} · {healthMode === 'flare' ? 'Gentle foods' : 'All foods'}</p>
              </div>
              <button onClick={() => setShowAddMeal(false)} className="text-sage-400 hover:text-sage-600">✕</button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[50vh] space-y-2">
              {sampleMeals.map((meal, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddMeal(meal)}
                  className="w-full card flex items-center justify-between text-left hover:bg-sage-50 py-3"
                >
                  <div>
                    <p className="font-medium text-sage-900">{meal.name}</p>
                    <p className="text-xs text-sage-500">{meal.calories} kcal · {meal.protein}g protein</p>
                  </div>
                  <ChevronRight size={18} className="text-sage-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={() => {
          // Auto-generate a full week
          days.forEach(day => {
            const breakfast = sampleMeals[Math.floor(Math.random() * 3)];
            const lunch = sampleMeals[Math.floor(Math.random() * 3) + 3];
            const dinner = sampleMeals[Math.floor(Math.random() * 3) + 6];
            addToMealPlan({ day, mealType: 'breakfast', foodName: breakfast.name, calories: breakfast.calories, protein: breakfast.protein, notes: 'Auto-generated' });
            addToMealPlan({ day, mealType: 'lunch', foodName: lunch.name, calories: lunch.calories, protein: lunch.protein, notes: 'Auto-generated' });
            addToMealPlan({ day, mealType: 'dinner', foodName: dinner.name, calories: dinner.calories, protein: dinner.protein, notes: 'Auto-generated' });
          });
        }}
        className="w-full btn-secondary flex items-center justify-center gap-2 mb-4"
      >
        <Sparkles size={18} />
        Generate Full Week
      </button>
    </div>
  );
}
