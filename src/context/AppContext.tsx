import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type HealthMode = 'flare' | 'remission';

export interface UserProfile {
  name: string;
  weight: number; // kg
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

interface AppState {
  profile: UserProfile;
  healthMode: HealthMode;
  mealPlan: MealPlanItem[];
  shoppingList: ShoppingItem[];
  isFamilyMode: boolean;
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
}

const defaultProfile: UserProfile = {
  name: 'Vernon',
  weight: 75,
  weeklyBudget: 60,
  healthMode: 'remission',
  dietaryNotes: 'No dairy, prefers fish over red meat',
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
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>(defaultMealPlan);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [isFamilyMode, setIsFamilyMode] = useState(false);

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
    // Simple mapping of meal plan items to shopping ingredients
    const ingredients: { name: string; quantity: string; category: string }[] = [];
    mealPlan.forEach(item => {
      if (item.foodName.includes('Oatmeal')) ingredients.push({ name: 'Oats', quantity: '500g', category: 'Grains' });
      if (item.foodName.includes('banana')) ingredients.push({ name: 'Bananas', quantity: '6', category: 'Fruit' });
      if (item.foodName.includes('chicken')) ingredients.push({ name: 'Chicken breast', quantity: '400g', category: 'Meat' });
      if (item.foodName.includes('rice')) ingredients.push({ name: 'White rice', quantity: '1kg', category: 'Grains' });
      if (item.foodName.includes('salmon')) ingredients.push({ name: 'Salmon fillet', quantity: '300g', category: 'Fish' });
      if (item.foodName.includes('potato')) ingredients.push({ name: 'Potatoes', quantity: '1kg', category: 'Vegetables' });
      if (item.foodName.includes('eggs')) ingredients.push({ name: 'Eggs', quantity: '12', category: 'Dairy' });
      if (item.foodName.includes('toast')) ingredients.push({ name: 'White bread', quantity: '1 loaf', category: 'Bakery' });
      if (item.foodName.includes('Turkey')) ingredients.push({ name: 'Turkey breast', quantity: '300g', category: 'Meat' });
      if (item.foodName.includes('pasta')) ingredients.push({ name: 'White pasta', quantity: '500g', category: 'Grains' });
      if (item.foodName.includes('fish')) ingredients.push({ name: 'White fish', quantity: '300g', category: 'Fish' });
      if (item.foodName.includes('carrots')) ingredients.push({ name: 'Carrots', quantity: '500g', category: 'Vegetables' });
    });
    // Deduplicate and add
    const seen = new Set(shoppingList.map(s => s.name));
    ingredients.forEach(ing => {
      if (!seen.has(ing.name)) {
        setShoppingList(prev => [...prev, { ...ing, id: crypto.randomUUID(), checked: false }]);
        seen.add(ing.name);
      }
    });
  }, [mealPlan, shoppingList]);

  return (
    <AppContext.Provider value={{
      profile, healthMode, mealPlan, shoppingList, isFamilyMode,
      setHealthMode, updateProfile, addToMealPlan, removeFromMealPlan,
      addToShoppingList, toggleShoppingItem, removeFromShoppingList, clearCheckedItems,
      generateShoppingListFromMealPlan, setIsFamilyMode,
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
