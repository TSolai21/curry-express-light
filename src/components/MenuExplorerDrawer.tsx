import { useState, useMemo } from 'react';
import { Search, Flame, Check, Sparkles, X, Plus, Clock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuExplorerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderNow: () => void;
  initialCategory?: 'curries' | 'biryani' | 'tandoori' | 'chinese' | 'sides' | 'desserts' | 'all';
}

export default function MenuExplorerDrawer({
  isOpen,
  onClose,
  onOrderNow,
  initialCategory = 'all'
}: MenuExplorerDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [customSpice, setCustomSpice] = useState<{ [itemId: string]: 0 | 1 | 2 | 3 }>({});
  const [addedAlert, setAddedAlert] = useState<string | null>(null);

  const categories = [
    { key: 'all', name: 'All' },
    { key: 'curries', name: 'Curries' },
    { key: 'biryani', name: 'Biryani' },
    { key: 'tandoori', name: 'Tandoori' },
    { key: 'chinese', name: 'Indo-Chinese' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSpiceSelect = (itemId: string, spice: 0 | 1 | 2 | 3) => {
    setCustomSpice((prev) => ({ ...prev, [itemId]: spice }));
  };

  const handleOrder = (item: MenuItem) => {
    onOrderNow();
  };

  // Sync category with prop change
  useMemo(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/60 backdrop-blur-xs"
          />

          {/* Slider Board */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xl h-full bg-background-warm shadow-xl flex flex-col z-10 border-l border-primary/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-white">
              <div>
                <h3 className="font-serif text-xl font-bold text-primary tracking-tight">
                  Menu Explorer
                </h3>
                <p className="font-sans text-xs text-primary/60 mt-1">
                  Adjust custom flame spice for each dish.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-primary hover:bg-primary/5 rounded-xl border border-primary/10 transition-colors cursor-pointer animate-none"
                aria-label="Close menu explorer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Filter & Search Bar */}
            <div className="p-4 bg-white border-b border-primary/10 space-y-4">
              {/* Search */}
              <div className="relative border border-primary/15 rounded-xl">
                <Search className="w-3.5 h-3.5 text-primary/40 absolute left-3.5 top-[14px]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Butter Chicken, Gobi Manchurian..."
                  className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs text-primary outline-none font-sans"
                />
              </div>

              {/* Horiz category list */}
              <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-4 py-2 rounded-xl text-[8px] font-bold uppercase tracking-[0.2em] font-sans whitespace-nowrap cursor-pointer transition-all ${
                      selectedCategory === cat.key
                        ? 'bg-primary text-white border border-primary'
                        : 'bg-white text-primary border border-primary/15 hover:bg-primary/5'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dishes list */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin select-none">
              {filteredItems.length === 0 ? (
                <div className="py-24 text-center text-primary/50 text-xs font-sans">
                  No dishes found matching your criteria.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const activeSpice = customSpice[item.id] !== undefined ? customSpice[item.id] : item.spiceLevel;
                  
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 border border-primary/10 flex gap-4 hover:border-primary/20 transition-all relative"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-background-warm border border-primary/5 p-1">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover grayscale brightness-[0.98] contrast-[1.01] rounded-xl"
                          src={item.image}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info columns */}
                      <div className="flex-grow flex flex-col justify-between text-left">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif text-sm font-bold text-primary">
                              {item.name}
                            </h4>
                            <span className="font-sans text-xs font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          
                          <p className="font-sans text-xs text-primary/60 mt-1.5 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Custom Options / Add action */}
                        <div className="pt-3 flex flex-wrap justify-between items-center gap-3 mt-1.5 border-t border-primary/5">
                          {/* Spice Selector */}
                          <div className="flex items-center gap-1">
                            <span className="text-[9px] font-bold uppercase text-primary/40 tracking-wider mr-1">Spice:</span>
                            {[0, 1, 2, 3].map((lvl) => (
                              <button
                                key={lvl}
                                onClick={() => handleSpiceSelect(item.id, lvl as 0 | 1 | 2 | 3)}
                                className={`px-2 py-0.5 rounded-xl text-[8px] font-bold flex items-center gap-0.5 cursor-pointer ${
                                  lvl === 0 
                                    ? activeSpice === 0 ? 'bg-primary text-white' : 'bg-primary/5 text-primary/40'
                                    : activeSpice >= lvl
                                      ? 'bg-secondary text-primary'
                                      : 'bg-primary/5 text-secondary/40'
                                }`}
                              >
                                {lvl === 0 ? 'None' : <Flame className="w-2.5 h-2.5 fill-current" />}
                              </button>
                            ))}
                          </div>

                          {/* Add to Cart button */}
                          <button
                            onClick={() => handleOrder(item)}
                            className="bg-primary text-white px-3 py-1.5 rounded-xl font-sans text-[8px] font-bold uppercase tracking-[0.15em] flex items-center gap-1 border border-primary hover:bg-primary/90 transition-all cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            Order Now
                          </button>
                        </div>
                      </div>

                      {/* Display Dietary labels with beautiful sharp blocks */}
                      {item.tag && (
                        <span className="absolute top-2 right-2 bg-secondary/15 text-primary border border-secondary/20 text-[7px] font-bold uppercase tracking-[0.25em] px-2 py-0.5 rounded-xl">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Clean bottom check guarantees */}
            <div className="p-4 bg-white border-t border-primary/10 text-center flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-sans font-bold text-primary/55 select-none">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Insulated wheat straw packaging configured by hand.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
