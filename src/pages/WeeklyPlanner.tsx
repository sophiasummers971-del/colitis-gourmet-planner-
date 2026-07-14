import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar, Plus, Trash2, Sunrise, Sun, Sunset, Cookie,
  ChevronRight, Sparkles
} from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = [
  { key: 'breakfast' as const, label: 'Breakfast', icon: Sunrise, color: 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)' },
  { key: 'lunch' as const, label: 'Lunch', icon: Sun, color: 'linear-gradient(135deg, #2d5a3d 0%, #1a3d28 100%)' },
  { key: 'dinner' as const, label: 'Dinner', icon: Sunset, color: 'linear-gradient(135deg, #4a6fa5 0%, #2d4a6f 100%)' },
  { key: 'snack' as const, label: 'Snack', icon: Cookie, color: 'linear-gradient(135deg, #C41E3A 0%, #8B1A1A 100%)' },
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
      notes: healthMode === 'flare' ? 'Keep it gentle' : 'Enjoy!',
    });
    setShowAddMeal(false);
  };

  const dayStats = {
    calories: dayMeals.reduce((sum, m) => sum + m.calories, 0),
    protein: dayMeals.reduce((sum, m) => sum + m.protein, 0),
  };

  return (
    <div className="page-container animate-smoke-reveal">
      <div className="mb-6">
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          <Calendar size={14} className="inline mr-1" />
          The Schedule
        </p>
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Weekly Planner</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{mealPlan.length} meals planned</p>
      </div>

      {/* Day Selector — Dark Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {days.map(day => {
          const dayCount = mealPlan.filter(m => m.day === day).length;
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className="flex flex-col items-center min-w-[60px] px-3 py-2 rounded-xl transition-all duration-200"
              style={{
                background: isActive
                  ? healthMode === 'flare'
                    ? 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)'
                    : 'linear-gradient(135deg, var(--smoke-green) 0%, #1a3d28 100%)'
                  : 'var(--surface)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                border: isActive ? 'none' : '1px solid var(--border-subtle)',
                boxShadow: isActive
                  ? healthMode === 'flare'
                    ? '0 0 15px var(--crimson-glow)'
                    : '0 0 15px var(--smoke-green-glow)'
                  : 'none'
              }}
            >
              <span className="text-xs font-semibold">{day.slice(0, 3)}</span>
              {dayCount > 0 && (
                <span className="text-[10px] mt-0.5" style={{ opacity: 0.7 }}>
                  {dayCount} meals
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Day Stats — Glass Panel */}
      <div className="glass-panel mb-4 flex items-center justify-between animate-drop-in">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>{selectedDay}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{dayMeals.length} meals</p>
          </div>
          <div className="h-8 w-px" style={{ background: 'var(--border-subtle)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Calories</p>
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{dayStats.calories}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Protein</p>
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{dayStats.protein}g</p>
          </div>
        </div>
      </div>

      {/* Meal Slots — Menu Cards */}
      <div className="space-y-3 mb-6 stagger-children">
        {mealTypes.map((type, i) => {
          const meal = dayMeals.find(m => m.mealType === type.key);
          const Icon = type.icon;

          return (
            <div key={type.key} className="menu-card animate-drop-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: type.color, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                  <Icon size={16} style={{ color: '#fff' }} />
                </div>
                <p className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>{type.label}</p>
              </div>

              {meal ? (
                <div className="flex items-center justify-between rounded-lg p-3"
                  style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-subtle)' }}>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{meal.foodName}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{meal.calories} kcal · {meal.protein}g protein</p>
                    {meal.notes && (
                      <p className="text-xs mt-1 italic" style={{ color: 'var(--text-muted)' }}>{meal.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromMealPlan(meal.id)}
                    className="p-2 transition-colors hover:opacity-100"
                    style={{ color: 'var(--text-muted)' }}
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
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed transition-all"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                >
                  <Plus size={16} />
                  Add {type.label}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Meal Modal — Dark Glass */}
      {showAddMeal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowAddMeal(false)}
        >
          <div className="rounded-2xl w-full max-w-lg max-h-[70vh] overflow-hidden animate-slide-up"
            style={{ background: 'linear-gradient(180deg, var(--surface-raised) 0%, var(--surface) 100%)', border: '1px solid var(--border-subtle)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Add {selectedMealType}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{selectedDay} · {healthMode === 'flare' ? 'Gentle foods' : 'All foods'}</p>
              </div>
              <button onClick={() => setShowAddMeal(false)} style={{ color: 'var(--text-muted)' }}>✕</button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[50vh] space-y-2">
              {sampleMeals.map((meal, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddMeal(meal)}
                  className="w-full menu-card flex items-center justify-between text-left py-3"
                >
                  <div>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{meal.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{meal.calories} kcal · {meal.protein}g protein</p>
                  </div>
                  <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Generate Button — Ember Glow */}
      <button
        onClick={() => {
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
