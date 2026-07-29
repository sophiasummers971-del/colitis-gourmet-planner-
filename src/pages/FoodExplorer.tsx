import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { foodDatabase, categories, searchFoods } from '../data/foods';
import { Search, ListFilter as Filter, CircleCheck as CheckCircle, Circle as XCircle, Info, Tag, Flame, ChevronDown } from 'lucide-react';

const categoryStyles: Record<string, { color: string; glow: string; emoji: string }> = {
  Grains: { color: 'var(--cat-grains)', glow: 'var(--cat-grains-glow)', emoji: '🌾' },
  Proteins: { color: 'var(--cat-proteins)', glow: 'var(--cat-proteins-glow)', emoji: '🥩' },
  Vegetables: { color: 'var(--cat-vegetables)', glow: 'var(--cat-vegetables-glow)', emoji: '🥕' },
  Fruits: { color: 'var(--cat-fruits)', glow: 'var(--cat-fruits-glow)', emoji: '🍎' },
  Dairy: { color: 'var(--cat-dairy)', glow: 'var(--cat-dairy-glow)', emoji: '🥛' },
  Fats: { color: 'var(--cat-fats)', glow: 'var(--cat-fats-glow)', emoji: '🫒' },
  Beverages: { color: 'var(--cat-beverages)', glow: 'var(--cat-beverages-glow)', emoji: '🥤' },
  Herbs: { color: 'var(--cat-herbs)', glow: 'var(--cat-herbs-glow)', emoji: '🌿' },
  Snacks: { color: 'var(--cat-snacks)', glow: 'var(--cat-snacks-glow)', emoji: '🥨' },
};

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
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--safe)' }} className="font-semibold">{safeCount}</span> safe
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--avoid)' }} className="font-semibold">{avoidCount}</span> avoid
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{filteredFoods.length} total</span>
        </div>
      </div>

      {/* Search */}
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

      {/* Category Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setShowOnlySafe(!showOnlySafe)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200`}
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

        {['All', ...categories].map(cat => {
          const style = categoryStyles[cat];
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${isActive ? 'active' : ''}`}
              style={isActive && style ? {
                background: `${style.color}20`,
                color: style.color,
                borderColor: style.color,
              } : undefined}
            >
              {style && <span className="mr-1">{style.emoji}</span>}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Food Cards */}
      <div className="space-y-3 stagger-children">
        {filteredFoods.length === 0 ? (
          <div className="menu-card text-center py-12 animate-drop-in">
            <Search size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Nothing on the menu</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Try a different search</p>
          </div>
        ) : (
          filteredFoods.map((food, i) => {
            const isSafe = healthMode === 'flare' ? food.flareSafe : food.remissionSafe;
            const isExpanded = expandedFood === food.id;
            const catStyle = categoryStyles[food.category];

            return (
              <div
                key={food.id}
                className="food-card animate-drop-in"
                style={{
                  animationDelay: `${i * 50}ms`,
                  ['--cat-accent' as string]: catStyle?.color || 'var(--crimson)',
                  background: catStyle
                    ? `linear-gradient(145deg, ${catStyle.glow} 0%, var(--surface) 70%)`
                    : undefined,
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Category emoji icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl"
                    style={{
                      background: catStyle ? `${catStyle.color}15` : 'var(--surface-hover)',
                      border: `1px solid ${catStyle ? `${catStyle.color}30` : 'var(--border-subtle)'}`,
                    }}>
                    {catStyle?.emoji || '🍽️'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                        {food.name}
                      </h3>
                      {isSafe ? (
                        <span className="badge-safe flex items-center gap-1">
                          <CheckCircle size={10} />
                          Safe
                        </span>
                      ) : (
                        <span className="badge-avoid flex items-center gap-1">
                          <XCircle size={10} />
                          Avoid
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                      <span className="font-medium" style={{ color: catStyle?.color || 'var(--text-secondary)' }}>
                        {food.category}
                      </span>
                      <span>·</span>
                      <span>{food.calories} kcal</span>
                      <span>·</span>
                      <span>{food.protein}g protein</span>
                    </div>

                    {!isFamilyMode && (
                      <div className="flex items-center gap-1 flex-wrap mb-1">
                        {food.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
                            style={{ background: 'var(--surface-hover)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
                            <Tag size={9} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => setExpandedFood(isExpanded ? null : food.id)}
                      className="flex items-center gap-1 text-xs transition-colors hover:opacity-100"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Info size={14} />
                      {isExpanded ? 'Hide details' : 'Show details'}
                      <ChevronDown size={12} className="transition-transform duration-300"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && !isFamilyMode && (
                  <div className="mt-4 pt-4 animate-fade-in" style={{ borderTop: '1px solid var(--border-subtle)' }}>
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
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{food.notes}</p>
                    </div>
                  </div>
                )}

                {isExpanded && isFamilyMode && (
                  <div className="mt-4 pt-4 animate-fade-in" style={{ borderTop: '1px solid var(--border-subtle)' }}>
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
