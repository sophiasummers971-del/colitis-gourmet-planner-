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
    <>
      {/* Bottom Navigation — Dark Glass */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 mode-transition"
        style={{
          background: 'linear-gradient(180deg, rgba(7,7,8,0.8) 0%, rgba(7,7,8,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-subtle)',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.5)'
        }}>
        <div className="max-w-6xl mx-auto px-2 py-2">
          <div className="flex items-center justify-between gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${active ? 'active' : ''}`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Floating Mode Toggles — Top Right */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* Family Mode Toggle */}
        <button
          onClick={() => setIsFamilyMode(!isFamilyMode)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
          style={{
            background: isFamilyMode
              ? 'linear-gradient(135deg, var(--smoke-green) 0%, #1a3d28 100%)'
              : 'var(--surface)',
            color: isFamilyMode ? '#fff' : 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            boxShadow: isFamilyMode ? '0 0 15px var(--smoke-green-glow)' : '0 2px 8px rgba(0,0,0,0.3)'
          }}
          title="Toggle family mode (hides UC notes)"
        >
          <Users size={14} />
          {isFamilyMode ? 'Family' : 'Solo'}
        </button>

        {/* Health Mode Toggle — Crimson Glow */}
        <button
          onClick={() => setHealthMode(healthMode === 'flare' ? 'remission' : 'flare')}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300"
          style={{
            background: healthMode === 'flare'
              ? 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)'
              : 'linear-gradient(135deg, var(--smoke-green) 0%, #1a3d28 100%)',
            color: '#fff',
            boxShadow: healthMode === 'flare'
              ? '0 0 20px var(--crimson-glow), 0 2px 8px rgba(0,0,0,0.3)'
              : '0 0 20px var(--smoke-green-glow), 0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          {healthMode === 'flare' ? '🔥 FLARE' : '🌿 REMISSION'}
        </button>
      </div>
    </>
  );
}
