import { useState, useMemo, useEffect } from 'react';
import { Search, ShieldCheck, ChevronRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuPageProps {
  onOrderNow: () => void;
  initialCategory?: string;
}

export default function MenuPage({ onOrderNow, initialCategory = 'all' }: MenuPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const categories = [
    { key: 'all', name: 'All Specialties' },
    { key: 'soups', name: 'Soups' },
    { key: 'appetizers', name: 'Appetizers' },
    { key: 'entrees', name: 'Curry Entrées' },
    { key: 'biryani', name: 'Dum Biryani' },
    { key: 'fusions', name: 'Burgers & Indo-Mex' },
    { key: 'chinese', name: 'Indo-Chinese' },
    { key: 'extras', name: 'Breads & Desserts' },
    { key: 'kids', name: 'Kids Menu' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-6 md:px-12 xl:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-gold mb-4">
          Culinary Archive
        </span>
        <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-cream font-light uppercase mb-6">
          The Full Menu
        </h1>
        <p className="font-sans text-sm text-text-muted max-w-xl leading-relaxed">
          Explore our meticulously crafted selection of Indian favorites and express Indo-Chinese delicacies. Select your preferred spice level and order fresh to your door.
        </p>
      </div>

      {/* Filter & Search Bar Layout */}
      <div className="flex flex-col gap-8 mb-16">
        {/* Search Input Box */}
        <div className="relative bg-surface border border-gold/20 p-1 flex items-center max-w-xl mx-auto w-full transition-colors focus-within:border-gold/50">
          <Search className="w-5 h-5 text-text-muted ml-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the archive (e.g. Biryani, Samosa)..."
            className="w-full bg-transparent pl-4 pr-4 py-4 text-sm text-text-cream placeholder:text-text-muted/50 outline-none font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-text-muted hover:text-gold mr-4 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Pills Container */}
        <div className="relative -mx-6 md:mx-0 px-6 md:px-0">
          <div className="flex overflow-x-auto no-scrollbar touch-scroll gap-4 pb-4 md:pb-0 md:flex-wrap md:justify-center border-b border-gold/10 md:border-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] font-sans whitespace-nowrap cursor-pointer transition-all duration-300 shrink-0 ${
                    isActive
                      ? 'text-bg bg-gold'
                      : 'text-text-muted border border-gold/20 hover:border-gold/50 hover:text-text-cream'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-32 text-center text-text-muted text-sm font-sans border border-gold/10 bg-surface">
          No dishes found matching your selection. Try a different search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="bg-surface border border-gold/10 hover:border-gold/30 transition-all flex flex-col justify-between group relative shadow-xl"
              >
                {/* Dietary Tag */}
                {item.tag && (
                  <span className="absolute top-4 right-4 bg-bg/80 backdrop-blur-sm text-gold border border-gold/20 text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 z-10">
                    {item.tag}
                  </span>
                )}

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    {/* Dish Image Frame */}
                    <div className="h-64 w-full overflow-hidden relative border-b border-gold/10 bg-bg mb-6">
                      <img
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        src={item.image}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-bg/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
                    </div>

                    <div className="px-6 pb-2">
                      {/* Title */}
                      <h3 className="font-sans text-xl text-text-cream uppercase tracking-wide group-hover:text-gold transition-colors leading-snug mb-3">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-sm text-text-muted leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="px-6 pb-6 pt-4 border-t border-gold/10 flex justify-between items-center mt-auto">
                    <span className="font-sans text-lg font-medium tracking-wide text-text-cream">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={onOrderNow}
                      className="bg-transparent border border-gold text-gold px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-gold hover:text-bg transition-colors cursor-pointer"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Safety and packaging guidelines */}
      <div className="mt-20 p-8 bg-surface border border-gold/10 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs tracking-[0.1em] font-sans text-text-muted uppercase">
        <ShieldCheck className="w-5 h-5 text-gold" />
        <span>Curry Express utilizes premium eco-friendly packaging to keep your food perfectly hot and fresh.</span>
      </div>
    </div>
  );
}
