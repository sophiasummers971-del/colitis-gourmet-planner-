import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Home, Search, Calendar, ShoppingCart, Settings, BarChart3, Users } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/explorer', icon: Search, label: 'Foods' },
  { path: '/planner', icon: Calendar, label: 'Planner' },
  { path: '/shopping', icon: ShoppingCart, label: 'Shopping' },
  { path: '/nutrition', icon: BarChart3, label: 'Nutrition' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function NavBar() {
  const { healthMode, setHealthMode, isFamilyMode, setIsFamilyMode } = useApp();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t shadow-lg transition-colors duration-500 ${healthMode === 'flare' ? 'border-terracotta-200' : 'border-sage-200'}`}>
      <div className="max-w-6xl mx-auto px-2 py-2">
        <div className="flex items-center justify-between gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 ${
                  active
                    ? healthMode === 'flare'
                      ? 'text-terracotta-600 bg-terracotta-50'
                      : 'text-sage-600 bg-sage-50'
                    : 'text-sage-400 hover:text-sage-600'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Floating mode toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* Family Mode Toggle */}
        <button
          onClick={() => setIsFamilyMode(!isFamilyMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-md ${
            isFamilyMode
              ? 'bg-sage-500 text-white'
              : 'bg-white text-sage-500 border border-sage-200'
          }`}
          title="Toggle family mode (hides UC notes)"
        >
          <Users size={14} />
          {isFamilyMode ? 'Family' : 'Solo'}
        </button>

        {/* Health Mode Toggle */}
        <button
          onClick={() => setHealthMode(healthMode === 'flare' ? 'remission' : 'flare')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-md ${
            healthMode === 'flare'
              ? 'bg-terracotta-500 text-white'
              : 'bg-sage-500 text-white'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${healthMode === 'flare' ? 'bg-white animate-pulse' : 'bg-white'}`} />
          {healthMode === 'flare' ? '🔥 FLARE MODE' : '🌿 REMISSION'}
        </button>
      </div>
    </nav>
  );
}
