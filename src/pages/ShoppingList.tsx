import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingCart, Check, Trash2, Plus, X,
  ShoppingBag
} from 'lucide-react';

const categories = ['Produce', 'Meat & Fish', 'Dairy', 'Grains', 'Pantry', 'Other'];

export default function ShoppingList() {
  const {
    shoppingList,
    addToShoppingList,
    toggleShoppingItem,
    removeFromShoppingList,
    clearCheckedItems,
    generateShoppingListFromMealPlan,
  } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Produce');

  const handleAdd = () => {
    if (!newItemName.trim()) return;
    addToShoppingList({
      name: newItemName.trim(),
      quantity: newItemQty.trim() || '1',
      category: newItemCategory,
    });
    setNewItemName('');
    setNewItemQty('');
    setShowAdd(false);
  };

  const grouped = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof shoppingList>);

  const checkedCount = shoppingList.filter(i => i.checked).length;
  const totalCount = shoppingList.length;

  return (
    <div className="page-container animate-smoke-reveal">
      <div className="mb-6">
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          <ShoppingCart size={14} className="inline mr-1" />
          The Pantry
        </p>
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Shopping List</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--safe)' }}>{checkedCount}</span> / {totalCount} collected
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2"
        >
          <Plus size={16} />
          Add Item
        </button>
        <button
          onClick={generateShoppingListFromMealPlan}
          className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm py-2"
        >
          <ShoppingBag size={16} />
          From Meals
        </button>
      </div>

      {checkedCount > 0 && (
        <button
          onClick={clearCheckedItems}
          className="w-full mb-4 text-xs transition-colors flex items-center justify-center gap-1"
          style={{ color: 'var(--text-muted)' }}
        >
          <Trash2 size={12} />
          Clear {checkedCount} checked items
        </button>
      )}

      {/* List */}
      {totalCount === 0 ? (
        <div className="menu-card text-center py-12 animate-drop-in">
          <ShoppingCart size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <p style={{ color: 'var(--text-secondary)' }} className="mb-2">Empty pantry 🛒</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Add items or generate from your menu</p>
        </div>
      ) : (
        <div className="space-y-4 stagger-children">
          {categories.map((cat, i) => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;
            return (
              <div key={cat} className="animate-drop-in" style={{ animationDelay: `${i * 60}ms` }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2 px-1"
                  style={{ color: 'var(--text-muted)' }}>
                  {cat}
                </p>
                <div className="space-y-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="menu-card flex items-center gap-3 py-3 transition-all"
                      style={{
                        opacity: item.checked ? 0.5 : 1,
                        background: item.checked ? 'var(--void)' : undefined
                      }}
                    >
                      <button
                        onClick={() => toggleShoppingItem(item.id)}
                        className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
                        style={{
                          background: item.checked ? 'var(--safe)' : 'transparent',
                          border: `2px solid ${item.checked ? 'var(--safe)' : 'var(--border-subtle)'}`,
                          boxShadow: item.checked ? '0 0 10px var(--safe-glow)' : 'none'
                        }}
                      >
                        <Check size={14} style={{ color: item.checked ? '#fff' : 'transparent' }} />
                      </button>
                      <div className="flex-1">
                        <p className="font-medium transition-all"
                          style={{
                            color: item.checked ? 'var(--text-muted)' : 'var(--text-primary)',
                            textDecoration: item.checked ? 'line-through' : 'none'
                          }}
                        >
                          {item.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromShoppingList(item.id)}
                        className="p-2 transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Item Modal — Dark Glass */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowAdd(false)}
        >
          <div className="rounded-2xl w-full max-w-lg animate-slide-up"
            style={{ background: 'linear-gradient(180deg, var(--surface-raised) 0%, var(--surface) 100%)', border: '1px solid var(--border-subtle)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid var(--border-subtle)' }}
            >
              <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Add Item</p>
              <button onClick={() => setShowAdd(false)} style={{ color: 'var(--text-muted)' }}>✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bananas"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  className="input-field"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Quantity</label>
                <input
                  type="text"
                  placeholder="e.g. 6 pieces, 1kg"
                  value={newItemQty}
                  onChange={e => setNewItemQty(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setNewItemCategory(cat)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background: newItemCategory === cat
                          ? 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)'
                          : 'var(--surface-hover)',
                        color: newItemCategory === cat ? '#fff' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: newItemCategory === cat ? '0 0 10px var(--crimson-glow)' : 'none'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAdd}
                className="w-full btn-primary mt-2"
              >
                Add to List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
