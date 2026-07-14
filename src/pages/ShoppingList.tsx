import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingCart, Check, Trash2, Plus, X,
  ShoppingBag, ArrowRight
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
    <div className="page-container">
      <div className="mb-6">
        <p className="text-sm text-sage-500 mb-1">Shopping</p>
        <h2 className="section-title">Shopping List</h2>
        <p className="text-xs text-sage-500">{checkedCount}/{totalCount} items checked</p>
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
          className="w-full mb-4 text-xs text-sage-500 hover:text-red-500 transition-colors flex items-center justify-center gap-1"
        >
          <Trash2 size={12} />
          Clear {checkedCount} checked items
        </button>
      )}

      {/* List */}
      {totalCount === 0 ? (
        <div className="card text-center py-12">
          <ShoppingCart size={32} className="mx-auto text-sage-300 mb-3" />
          <p className="text-sage-500 mb-2">Your shopping list is empty 🛒</p>
          <p className="text-xs text-sage-400">Add items manually or generate from your meal plan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map(cat => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;
            return (
              <div key={cat}>
                <p className="text-xs font-bold uppercase tracking-wider text-sage-500 mb-2 px-1">{cat}</p>
                <div className="space-y-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className={`card flex items-center gap-3 py-3 transition-all ${
                        item.checked ? 'opacity-50 bg-sage-50/50' : ''
                      }`}
                    >
                      <button
                        onClick={() => toggleShoppingItem(item.id)}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          item.checked
                            ? 'bg-sage-500 border-sage-500 text-white'
                            : 'border-sage-300 text-transparent'
                        }`}
                      >
                        <Check size={14} />
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${item.checked ? 'line-through text-sage-400' : 'text-sage-900'}`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-sage-500">{item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromShoppingList(item.id)}
                        className="p-2 text-sage-300 hover:text-red-500 transition-colors"
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

      {/* Add Item Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 animate-fade-in"
          onClick={() => setShowAdd(false)}
        >
          <div className="bg-white rounded-2xl w-full max-w-lg animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-sage-100 flex items-center justify-between">
              <p className="font-bold text-sage-900">Add Item</p>
              <button onClick={() => setShowAdd(false)} className="text-sage-400 hover:text-sage-600">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-sage-600 mb-1 block">Item Name</label>
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
                <label className="text-xs font-semibold text-sage-600 mb-1 block">Quantity</label>
                <input
                  type="text"
                  placeholder="e.g. 6 pieces, 1kg, 500g"
                  value={newItemQty}
                  onChange={e => setNewItemQty(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-sage-600 mb-1 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setNewItemCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        newItemCategory === cat
                          ? 'bg-sage-500 text-white'
                          : 'bg-sage-50 text-sage-600 border border-sage-200'
                      }`}
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
