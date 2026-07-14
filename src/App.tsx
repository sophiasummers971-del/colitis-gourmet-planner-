import { Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import FoodExplorer from './pages/FoodExplorer';
import WeeklyPlanner from './pages/WeeklyPlanner';
import ShoppingList from './pages/ShoppingList';
import NutritionDashboard from './pages/NutritionDashboard';
import Settings from './pages/Settings';

function App() {
  const { healthMode } = useApp();

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-500 ${healthMode === 'flare' ? 'bg-terracotta-50/50' : 'bg-sage-50'}`}>
      <div className="max-w-6xl mx-auto px-4 pt-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md ${
              healthMode === 'flare' ? 'bg-terracotta-500' : 'bg-sage-500'
            }`}>
              🍳
            </div>
            <div>
              <h1 className="text-lg font-bold text-sage-900 leading-tight">Colitis Gourmet</h1>
              <p className="text-xs text-sage-500">Meal Planner for UC</p>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<FoodExplorer />} />
          <Route path="/planner" element={<WeeklyPlanner />} />
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="/nutrition" element={<NutritionDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      <NavBar />
    </div>
  );
}

export default App;
