import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

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
  name: 'Guest',
  weight: 70,
  weeklyBudget: 50,
  healthMode: 'remission',
  dietaryNotes: '',
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
  const storageKey = 'colitis-gourmet-planner:v1';
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [healthMode, setHealthModeState] = useState<HealthMode>(defaultProfile.healthMode);
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>(defaultMealPlan);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [isFamilyMode, setIsFamilyMode] = useState(false);
  const [preferences, setPreferences] = useState<AppPreferences>(defaultPreferences);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const stored = JSON.parse(raw) as Partial<AppState>;
        const nextProfile = { ...defaultProfile, ...(stored.profile || {}) };
        setProfile(nextProfile);
        setHealthModeState(stored.healthMode || nextProfile.healthMode);
        setMealPlan(Array.isArray(stored.mealPlan) ? stored.mealPlan : defaultMealPlan);
        setShoppingList(Array.isArray(stored.shoppingList) ? stored.shoppingList : []);
        setIsFamilyMode(Boolean(stored.isFamilyMode));
        setPreferences({ ...defaultPreferences, ...(stored.preferences || {}) });
      }
    } catch {
      // If stored data is invalid, start safely with neutral defaults.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const state: AppState = {
      profile,
      healthMode,
      mealPlan,
      shoppingList,
      isFamilyMode,
      preferences,
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [loaded, profile, healthMode, mealPlan, shoppingList, isFamilyMode, preferences]);

  const setHealthMode = useCallback((mode: HealthMode) => {
    setHealthModeState(mode);
    setProfile(p => ({ ...p, healthMode: mode }));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(p => ({ ...p, ...updates }));
    if (updates.healthMode) setHealthModeState(updates.healthMode);
  }, []);

  const addToMealPlan = useCallback((item: Omit<MealPlanItem, 'id'>) => {
    setMealPlan(prev => [...prev, { ...item, id: crypto.randomUUID() }]);
  }, []);

  const removeFromMealPlan = useCallback((id: string) => {
    setMealPlan(prev => prev.filter(i => i.id !== id));
  }, []);

  const addToShoppingList = useCallback((item: Omit<ShoppingItem, 'id' | 'checked'>) => {
    setShoppingList(prev => [...prev, { ...item, id: crypto.randomUUID(), checked: false }]);
  }, []);

  const toggleShoppingItem = useCallback((id: string) => {
    setShoppingList(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  }, []);

  const removeFromShoppingList = useCallback((id: string) => {
    setShoppingList(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCheckedItems = useCallback(() => {
    setShoppingList(prev => prev.filter(i => !i.checked));
  }, []);

  const generateShoppingListFromMealPlan = useCallback(() => {
    const ingredients: { name: string; quantity: string; category: string }[] = [];
    mealPlan.forEach(item => {
      const food = item.foodName.toLowerCase();
      if (food.includes('oatmeal')) ingredients.push({ name: 'Oats', quantity: '500g', category: 'Grains' });
      if (food.includes('banana')) ingredients.push({ name: 'Bananas', quantity: '6', category: 'Produce' });
      if (food.includes('chicken')) ingredients.push({ name: 'Chicken breast', quantity: '400g', category: 'Meat & Fish' });
      if (food.includes('rice')) ingredients.push({ name: 'White rice', quantity: '1kg', category: 'Grains' });
      if (food.includes('salmon')) ingredients.push({ name: 'Salmon fillet', quantity: '300g', category: 'Meat & Fish' });
      if (food.includes('potato')) ingredients.push({ name: 'Potatoes', quantity: '1kg', category: 'Produce' });
      if (food.includes('egg')) ingredients.push({ name: 'Eggs', quantity: '12', category: 'Dairy' });
      if (food.includes('toast')) ingredients.push({ name: 'White bread', quantity: '1 loaf', category: 'Grains' });
      if (food.includes('turkey')) ingredients.push({ name: 'Turkey breast', quantity: '300g', category: 'Meat & Fish' });
      if (food.includes('pasta')) ingredients.push({ name: 'White pasta', quantity: '500g', category: 'Grains' });
      if (food.includes('fish')) ingredients.push({ name: 'White fish', quantity: '300g', category: 'Meat & Fish' });
      if (food.includes('carrot')) ingredients.push({ name: 'Carrots', quantity: '500g', category: 'Produce' });
    });

    setShoppingList(prev => {
      const seen = new Set(prev.map(item => item.name.toLowerCase()));
      const additions = ingredients
        .filter(item => {
          const key = item.name.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map(item => ({ ...item, id: crypto.randomUUID(), checked: false }));
      return [...prev, ...additions];
    });
  }, [mealPlan]);

  const updatePreferences = useCallback((prefs: Partial<AppPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  }, []);

  if (!loaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'var(--void)' }}>
        <div className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-full animate-glow-pulse"
            style={{ background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)' }}
          />
          <p className="text-sm animate-pulse" style={{ color: 'var(--text-muted)', fontFamily: "'Playfair Display', serif" }}>
            Preparing your menu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{
      profile,
      healthMode,
      mealPlan,
      shoppingList,
      isFamilyMode,
      preferences,
      setHealthMode,
      updateProfile,
      addToMealPlan,
      removeFromMealPlan,
      addToShoppingList,
      toggleShoppingItem,
      removeFromShoppingList,
      clearCheckedItems,
      generateShoppingListFromMealPlan,
      setIsFamilyMode,
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
