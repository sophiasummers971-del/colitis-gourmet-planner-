import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type HealthMode = 'flare' | 'remission';

export interface UserProfile {
  name: string;
  weight: number;
  weeklyBudget: number;
  healthMode: HealthMode;
  dietaryNotes: string;
}

export interface MealPlanItem {
  id: string;
  day: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodName: string;
  calories: number;
  protein: number;
  notes: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

export interface AppPreferences {
  animationsEnabled: boolean;
  particleBackground: boolean;
  compactMode: boolean;
  showNutritionOnCards: boolean;
  accentColor: 'crimson' | 'emerald' | 'ocean';
  temperatureUnit: 'C' | 'F';
  portionSize: 'small' | 'medium' | 'large';
  dailyProteinGoal: number;
  dailyCalorieGoal: number;
}

interface AppState {
  profile: UserProfile;
  healthMode: HealthMode;
  mealPlan: MealPlanItem[];
  shoppingList: ShoppingItem[];
  isFamilyMode: boolean;
  preferences: AppPreferences;
}

interface AppContextType extends AppState {
  setHealthMode: (mode: HealthMode) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addToMealPlan: (item: Omit<MealPlanItem, 'id'>) => void;
  removeFromMealPlan: (id: string) => void;
  addToShoppingList: (item: Omit<ShoppingItem, 'id' | 'checked'>) => void;
  toggleShoppingItem: (id: string) => void;
  removeFromShoppingList: (id: string) => void;
  clearCheckedItems: () => void;
  generateShoppingListFromMealPlan: () => void;
  setIsFamilyMode: (v: boolean) => void;
  updatePreferences: (prefs: Partial<AppPreferences>) => void;
}

const defaultProfile: UserProfile = {
  name: 'Vernon',
  weight: 75,
  weeklyBudget: 60,
  healthMode: 'remission',
  dietaryNotes: 'No dairy, prefers fish over red meat',
};

const defaultPreferences: AppPreferences = {
  animationsEnabled: true,
  particleBackground: true,
  compactMode: false,
  showNutritionOnCards: true,
  accentColor: 'crimson',
  temperatureUnit: 'C',
  portionSize: 'medium',
  dailyProteinGoal: 112,
  dailyCalorieGoal: 2250,
};

const defaultMealPlan: MealPlanItem[] = [
  { id: '1', day: 'Monday', mealType: 'breakfast', foodName: 'Oatmeal with banana', calories: 320, protein: 8, notes: 'Use lactose-free milk' },
  { id: '2', day: 'Monday', mealType: 'lunch', foodName: 'Grilled chicken with white rice', calories: 450, protein: 35, notes: 'No spice' },
  { id: '3', day: 'Monday', mealType: 'dinner', foodName: 'Baked salmon with mashed potatoes', calories: 520, protein: 32, notes: 'Steam salmon, no oil' },
  { id: '4', day: 'Tuesday', mealType: 'breakfast', foodName: 'Scrambled eggs with white toast', calories: 380, protein: 18, notes: 'Soft scramble' },
  { id: '5', day: 'Tuesday', mealType: 'lunch', foodName: 'Turkey breast with pasta', calories: 480, protein: 30, notes: 'Plain, no sauce' },
  { id: '6', day: 'Tuesday', mealType: 'dinner', foodName: 'Poached white fish with carrots', calories: 420, protein: 28, notes: 'Carrots peeled and soft' },
];

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [healthMode, setHealthModeState] = useState<HealthMode>(defaultProfile.healthMode);
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [isFamilyMode, setIsFamilyMode] = useState(false);
  const [preferences, setPreferences] = useState<AppPreferences>(defaultPreferences);
  const [loaded, setLoaded] = useState(false);

  // Load all data from Supabase on mount
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        const [mealsRes, shoppingRes, settingsRes] = await Promise.all([
          supabase.from('meal_plans').select('*').order('created_at'),
          supabase.from('shopping_items').select('*').order('created_at'),
          supabase.from('app_settings').select('*'),
        ]);

        if (cancelled) return;

        if (mealsRes.data && mealsRes.data.length > 0) {
          setMealPlan(mealsRes.data.map((m: Record<string, unknown>) => ({
            id: m.id as string,
            day: m.day as string,
            mealType: m.meal_type as MealPlanItem['mealType'],
            foodName: m.food_name as string,
            calories: m.calories as number,
            protein: Number(m.protein),
            notes: (m.notes as string) || '',
          })));
        } else {
          // Seed default meal plan
          setMealPlan(defaultMealPlan);
          await supabase.from('meal_plans').insert(
            defaultMealPlan.map(m => ({
              id: m.id,
              day: m.day,
              meal_type: m.mealType,
              food_name: m.foodName,
              calories: m.calories,
              protein: m.protein,
              notes: m.notes,
            }))
          );
        }

        if (shoppingRes.data) {
          setShoppingList(shoppingRes.data.map((s: Record<string, unknown>) => ({
            id: s.id as string,
            name: s.name as string,
            quantity: s.quantity as string,
            category: s.category as string,
            checked: s.checked as boolean,
          })));
        }

        if (settingsRes.data) {
          const settingsMap: Record<string, string> = {};
          settingsRes.data.forEach((s: Record<string, unknown>) => {
            settingsMap[s.key as string] = s.value as string;
          });

          const storedProfile = settingsMap['profile'];
          if (storedProfile) {
            try {
              const parsed = JSON.parse(storedProfile) as Partial<UserProfile>;
              const merged = { ...defaultProfile, ...parsed };
              setProfile(merged);
              setHealthModeState(merged.healthMode);
            } catch { /* ignore parse errors */ }
          }

          const storedPrefs = settingsMap['preferences'];
          if (storedPrefs) {
            try {
              const parsed = JSON.parse(storedPrefs) as Partial<AppPreferences>;
              setPreferences({ ...defaultPreferences, ...parsed });
            } catch { /* ignore */ }
          }

          const storedFamily = settingsMap['family_mode'];
          if (storedFamily) setIsFamilyMode(storedFamily === 'true');
        }
      } catch {
        // Fall back to defaults
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, []);

  // Persist profile to Supabase
  const persistProfile = useCallback((p: UserProfile) => {
    supabase.from('app_settings').upsert({
      key: 'profile',
      value: JSON.stringify(p),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' }).then();
  }, []);

  // Persist preferences to Supabase
  const persistPreferences = useCallback((prefs: AppPreferences) => {
    supabase.from('app_settings').upsert({
      key: 'preferences',
      value: JSON.stringify(prefs),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' }).then();
  }, []);

  const setHealthMode = useCallback((mode: HealthMode) => {
    setHealthModeState(mode);
    setProfile(p => {
      const updated = { ...p, healthMode: mode };
      persistProfile(updated);
      return updated;
    });
  }, [persistProfile]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(p => {
      const updated = { ...p, ...updates };
      persistProfile(updated);
      return updated;
    });
    if (updates.healthMode) setHealthModeState(updates.healthMode);
  }, [persistProfile]);

  const addToMealPlan = useCallback((item: Omit<MealPlanItem, 'id'>) => {
    const id = crypto.randomUUID();
    setMealPlan(prev => [...prev, { ...item, id }]);
    supabase.from('meal_plans').insert({
      id,
      day: item.day,
      meal_type: item.mealType,
      food_name: item.foodName,
      calories: item.calories,
      protein: item.protein,
      notes: item.notes,
    }).then();
  }, []);

  const removeFromMealPlan = useCallback((id: string) => {
    setMealPlan(prev => prev.filter(i => i.id !== id));
    supabase.from('meal_plans').delete().eq('id', id).then();
  }, []);

  const addToShoppingList = useCallback((item: Omit<ShoppingItem, 'id' | 'checked'>) => {
    const id = crypto.randomUUID();
    setShoppingList(prev => [...prev, { ...item, id, checked: false }]);
    supabase.from('shopping_items').insert({
      id,
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      checked: false,
    }).then();
  }, []);

  const toggleShoppingItem = useCallback((id: string) => {
    setShoppingList(prev => prev.map(i => {
      if (i.id === id) {
        const updated = { ...i, checked: !i.checked };
        supabase.from('shopping_items').update({ checked: updated.checked }).eq('id', id).then();
        return updated;
      }
      return i;
    }));
  }, []);

  const removeFromShoppingList = useCallback((id: string) => {
    setShoppingList(prev => prev.filter(i => i.id !== id));
    supabase.from('shopping_items').delete().eq('id', id).then();
  }, []);

  const clearCheckedItems = useCallback(() => {
    const checked = shoppingList.filter(i => i.checked);
    setShoppingList(prev => prev.filter(i => !i.checked));
    if (checked.length > 0) {
      supabase.from('shopping_items').delete().in('id', checked.map(c => c.id)).then();
    }
  }, [shoppingList]);

  const generateShoppingListFromMealPlan = useCallback(() => {
    const ingredients: { name: string; quantity: string; category: string }[] = [];
    mealPlan.forEach(item => {
      if (item.foodName.includes('Oatmeal')) ingredients.push({ name: 'Oats', quantity: '500g', category: 'Grains' });
      if (item.foodName.includes('banana')) ingredients.push({ name: 'Bananas', quantity: '6', category: 'Produce' });
      if (item.foodName.includes('chicken')) ingredients.push({ name: 'Chicken breast', quantity: '400g', category: 'Meat & Fish' });
      if (item.foodName.includes('rice')) ingredients.push({ name: 'White rice', quantity: '1kg', category: 'Grains' });
      if (item.foodName.includes('salmon')) ingredients.push({ name: 'Salmon fillet', quantity: '300g', category: 'Meat & Fish' });
      if (item.foodName.includes('potato')) ingredients.push({ name: 'Potatoes', quantity: '1kg', category: 'Produce' });
      if (item.foodName.includes('eggs')) ingredients.push({ name: 'Eggs', quantity: '12', category: 'Dairy' });
      if (item.foodName.includes('toast')) ingredients.push({ name: 'White bread', quantity: '1 loaf', category: 'Grains' });
      if (item.foodName.includes('Turkey')) ingredients.push({ name: 'Turkey breast', quantity: '300g', category: 'Meat & Fish' });
      if (item.foodName.includes('pasta')) ingredients.push({ name: 'White pasta', quantity: '500g', category: 'Grains' });
      if (item.foodName.includes('fish')) ingredients.push({ name: 'White fish', quantity: '300g', category: 'Meat & Fish' });
      if (item.foodName.includes('carrots')) ingredients.push({ name: 'Carrots', quantity: '500g', category: 'Produce' });
    });
    const seen = new Set(shoppingList.map(s => s.name));
    const newItems: ShoppingItem[] = [];
    ingredients.forEach(ing => {
      if (!seen.has(ing.name)) {
        const id = crypto.randomUUID();
        newItems.push({ ...ing, id, checked: false });
        seen.add(ing.name);
      }
    });
    if (newItems.length > 0) {
      setShoppingList(prev => [...prev, ...newItems]);
      supabase.from('shopping_items').insert(
        newItems.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, category: i.category, checked: false }))
      ).then();
    }
  }, [mealPlan, shoppingList]);

  const setIsFamilyModeCallback = useCallback((v: boolean) => {
    setIsFamilyMode(v);
    supabase.from('app_settings').upsert({
      key: 'family_mode',
      value: v ? 'true' : 'false',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' }).then();
  }, []);

  const updatePreferences = useCallback((prefs: Partial<AppPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...prefs };
      persistPreferences(updated);
      return updated;
    });
  }, [persistPreferences]);

  if (!loaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'var(--void)' }}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full animate-glow-pulse"
            style={{
              background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)',
            }} />
          <p className="text-sm animate-pulse" style={{ color: 'var(--text-muted)', fontFamily: "'Playfair Display', serif" }}>
            Preparing your menu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{
      profile, healthMode, mealPlan, shoppingList, isFamilyMode, preferences,
      setHealthMode, updateProfile, addToMealPlan, removeFromMealPlan,
      addToShoppingList, toggleShoppingItem, removeFromShoppingList, clearCheckedItems,
      generateShoppingListFromMealPlan, setIsFamilyMode: setIsFamilyModeCallback,
      updatePreferences,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
