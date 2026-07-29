import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';
import LandingPage from './components/LandingPage';
import ParticleBackground from './components/ParticleBackground';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import FoodExplorer from './pages/FoodExplorer';
import WeeklyPlanner from './pages/WeeklyPlanner';
import ShoppingList from './pages/ShoppingList';
import NutritionDashboard from './pages/NutritionDashboard';
import Settings from './pages/Settings';
import Resources from './pages/Resources';
import HelpSupport from './pages/HelpSupport';

function App() {
  const { healthMode, preferences } = useApp();
  const [hasEntered, setHasEntered] = useState(false);

  if (!hasEntered) {
    return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div className="min-h-screen pb-24 mode-transition animate-fade-in relative" style={{ background: 'var(--void)' }}>
      {/* Interactive particle background */}
      {preferences.particleBackground && (
        <ParticleBackground mode={healthMode} />
      )}

      {/* Ambient smoke glow at top */}
      <div className="fixed top-0 left-0 right-0 h-64 pointer-events-none hero-glow" />

      <div className="max-w-6xl mx-auto px-4 pt-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg animate-glow-pulse"
              style={{
                background: healthMode === 'flare'
                  ? 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)'
                  : 'linear-gradient(135deg, var(--smoke-green) 0%, #1a3d28 100%)',
                boxShadow: healthMode === 'flare'
                  ? '0 0 20px var(--crimson-glow)'
                  : '0 0 20px var(--smoke-green-glow)'
              }}>
              🍳
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                Colitis Gourmet
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Meal Planner for UC</p>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<FoodExplorer />} />
          <Route path="/planner" element={<WeeklyPlanner />} />
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="/nutrition" element={<NutritionDashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      <NavBar />
    </div>
  );
}

export default App;
