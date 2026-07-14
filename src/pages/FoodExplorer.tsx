import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { foodDatabase, categories, searchFoods } from '../data/foods';
import { Search, Filter, CheckCircle, XCircle, Info, Tag, Flame } from 'lucide-react';

export default function FoodExplorer() {
  const { healthMode, isFamilyMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOnlySafe, setShowOnlySafe] = useState(false);
  const [expandedFood, setExpandedFood] = useState<string | null>(null);

  const filteredFoods = useMemo(() => {
    let foods = searchQuery
      ? searchFoods(searchQuery, healthMode)
      : foodDatabase.filter(f => healthMode === 'flare' ? f.flareSafe : f.remissionSafe);

    if (selectedCategory !== 'All') {
      foods = foods.filter(f => f.category === selectedCategory);
    }

    if (showOnlySafe) {
      foods = foods.filter(f => healthMode === 'flare' ? f.flareSafe : f.remissionSafe);
    }

    return foods;
  }, [searchQuery, selectedCategory, showOnlySafe, healthMode]);

  const safeCount = filteredFoods.filter(f => healthMode === 'flare' ? f.flareSafe : f.remissionSafe).length;
  const avoidCount = filteredFoods.length - safeCount;

  return (
    <div className="page-container animate-smoke-reveal">
      <div className="mb-6">
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          <Flame size={14} className="inline mr-1" />
          The Menu
        </p>
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>
          {healthMode === 'flare' ? 'Gentle Selections' : 'Full Menu'}
        </h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {safeCount} <span style={{ color: 'var(--safe)' }}>safe</span> · {avoidCount} <span style={{ color: 'var(--avoid)' }}>avoid</span> · {filteredFoods.length} total
        </p>
      </div>

      {/* Search — Dark Glass */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search the menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Category Filters — Pills */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setShowOnlySafe(!showOnlySafe)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${showOnlySafe ? 'active' : ''}`}
          style={{
            background: showOnlySafe ? 'linear-gradient(135deg, var(--safe) 0%, #2d5a3d 100%)' : 'var(--surface)',
            color: showOnlySafe ? '#fff' : 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            boxShadow: showOnlySafe ? '0 0 15px var(--safe-glow)' : 'none'
          }}
        >
          <Filter size={14} />
          Safe Only
        </button>

        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Cards — Menu Items */}
      <div className="space-y-3 stagger-children">
        {filteredFoods.length === 0 ? (
          <div className="menu-card text-center py-12 animate-drop-in">
            <Search size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Nothing on the menu 🔍</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Try a different search</p>
          </div>
        ) : (
          filteredFoods.map((food, i) => {
            const isSafe = healthMode === 'flare' ? food.flareSafe : food.remissionSafe;
            const isExpanded = expandedFood === food.id;

            return (
              <div
                key={food.id}
                className={`menu-card transition-all duration-300 animate-drop-in ${!isSafe ? 'border-l-2' : ''}`}
                style={{
                  animationDelay: `${i * 50}ms`,
                  borderLeftColor: !isSafe ? 'var(--avoid)' : undefined
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: isSafe ? 'rgba(61,139,93,0.1)' : 'rgba(168,50,50,0.1)',
                      border: `1px solid ${isSafe ? 'rgba(61,139,93,0.2)' : 'rgba(168,50,50,0.2)'}`,
                      boxShadow: isSafe ? '0 0 10px var(--safe-glow)' : '0 0 10px var(--avoid-glow)'
                    }}>
                    {isSafe ? <CheckCircle size={20} style={{ color: 'var(--safe)' }} /> : <XCircle size={20} style={{ color: 'var(--avoid)' }} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                        {food.name}
                      </h3>
                      {isSafe ? (
                        <span className="badge-safe">Safe</span>
                      ) : (
                        <span className="badge-avoid">Avoid</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{food.category}</span>
                      <span>·</span>
                      <span>{food.calories} kcal</span>
                      <span>·</span>
                      <span>{food.protein}g protein</span>
                    </div>

                    <div className="flex items-center gap-1 flex-wrap mb-2">
                      {food.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
                          style={{ background: 'var(--surface-hover)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpandedFood(isExpanded ? null : food.id)}
                      className="flex items-center gap-1 text-xs transition-colors hover:opacity-100"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Info size={14} />
                      {isExpanded ? 'Hide details' : 'Show details'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details — Dark Glass */}
                {isExpanded && !isFamilyMode && (
                  <div className="mt-4 pt-4 animate-fade-in"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="rounded-lg p-3" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-subtle)' }}>
                        <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Texture</p>
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{food.textureNote}</p>
                      </div>
                      <div className="rounded-lg p-3" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-subtle)' }}>
                        <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Trigger Risk</p>
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{food.triggerRisk}</p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-subtle)' }}>
                      <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Chef's Notes</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{food.notes}</p>
                    </div>
                  </div>
                )}

                {isExpanded && isFamilyMode && (
                  <div className="mt-4 pt-4 animate-fade-in"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <div className="rounded-lg p-3" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-subtle)' }}>
                      <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Family Note</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {isSafe ? `${food.name} is safe for everyone to enjoy!` : `${food.name} — best avoided. Others can have it as an add-on.`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
