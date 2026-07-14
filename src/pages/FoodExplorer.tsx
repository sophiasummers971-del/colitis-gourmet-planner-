import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { foodDatabase, categories, searchFoods } from '../data/foods';
import { Search, Filter, CheckCircle, XCircle, Info, Tag } from 'lucide-react';

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
    <div className="page-container">
      <div className="mb-6">
        <p className="text-sm text-sage-500 mb-1">Food Database</p>
        <h2 className="section-title">{healthMode === 'flare' ? 'Flare-Safe Foods' : 'Remission Foods'}</h2>
        <p className="text-xs text-sage-500">
          {safeCount} safe · {avoidCount} avoid · {filteredFoods.length} total
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400" />
        <input
          type="text"
          placeholder="Search foods, tags, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setShowOnlySafe(!showOnlySafe)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            showOnlySafe
              ? 'bg-sage-500 text-white'
              : 'bg-white text-sage-600 border border-sage-200'
          }`}
        >
          <Filter size={14} />
          Safe Only
        </button>

        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? healthMode === 'flare' ? 'bg-terracotta-500 text-white' : 'bg-sage-500 text-white'
                : 'bg-white text-sage-600 border border-sage-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <div className="space-y-3">
        {filteredFoods.length === 0 ? (
          <div className="card text-center py-12">
            <Search size={32} className="mx-auto text-sage-300 mb-3" />
            <p className="text-sage-500">No foods found 🔍</p>
            <p className="text-xs text-sage-400 mt-1">Try a different search or category</p>
          </div>
        ) : (
          filteredFoods.map(food => {
            const isSafe = healthMode === 'flare' ? food.flareSafe : food.remissionSafe;
            const isExpanded = expandedFood === food.id;

            return (
              <div
                key={food.id}
                className={`card transition-all duration-200 ${
                  isSafe ? 'border-l-4 border-l-emerald-400' : 'border-l-4 border-l-red-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSafe ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {isSafe ? <CheckCircle size={20} /> : <XCircle size={20} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sage-900 truncate">{food.name}</h3>
                      {isSafe ? (
                        <span className="badge-safe">Safe</span>
                      ) : (
                        <span className="badge-avoid">Avoid</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-sage-500 mb-2">
                      <span>{food.category}</span>
                      <span>·</span>
                      <span>{food.calories} kcal/100g</span>
                      <span>·</span>
                      <span>{food.protein}g protein</span>
                    </div>

                    <div className="flex items-center gap-1 flex-wrap mb-2">
                      {food.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sage-50 text-sage-600 text-[10px] font-medium">
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpandedFood(isExpanded ? null : food.id)}
                      className="flex items-center gap-1 text-xs text-sage-500 hover:text-sage-700 transition-colors"
                    >
                      <Info size={14} />
                      {isExpanded ? 'Hide details' : 'Show details'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && !isFamilyMode && (
                  <div className="mt-4 pt-4 border-t border-sage-100 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-sage-50 rounded-lg p-3">
                        <p className="text-[10px] uppercase tracking-wider text-sage-500 font-semibold mb-1">Texture</p>
                        <p className="text-sm text-sage-800">{food.textureNote}</p>
                      </div>
                      <div className="bg-sage-50 rounded-lg p-3">
                        <p className="text-[10px] uppercase tracking-wider text-sage-500 font-semibold mb-1">Trigger Risk</p>
                        <p className="text-sm text-sage-800">{food.triggerRisk}</p>
                      </div>
                    </div>
                    <div className="bg-sage-50 rounded-lg p-3">
                      <p className="text-[10px] uppercase tracking-wider text-sage-500 font-semibold mb-1">UC Notes</p>
                      <p className="text-sm text-sage-800">{food.notes}</p>
                    </div>
                  </div>
                )}

                {isExpanded && isFamilyMode && (
                  <div className="mt-4 pt-4 border-t border-sage-100 animate-fade-in">
                    <div className="bg-sage-50 rounded-lg p-3">
                      <p className="text-[10px] uppercase tracking-wider text-sage-500 font-semibold mb-1">Family Note</p>
                      <p className="text-sm text-sage-800">
                        {isSafe ? `${food.name} is safe for everyone to enjoy together!` : `${food.name} should be avoided — family members can have it as an optional add-on.`}
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
