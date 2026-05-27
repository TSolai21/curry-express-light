import { useState, useMemo, useEffect } from 'react';
import { Search, ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react';
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
    <div className="min-h-screen bg-background-warm bg-dotted pt-32 pb-24 px-6 md:px-12 xl:px-20 max-w-7xl mx-auto">
      {/* Editorial Header / Breadcrumb navigation */}
      <div className="flex flex-col items-start mb-12">

        <div className="flex items-center gap-3 mb-2">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-primary/50">
            № 02 / CULINARY ARCHIVE
          </span>
          <div className="h-[1px] w-12 bg-primary/20"></div>
        </div>

        <h1 className="font-serif text-[42px] sm:text-[56px] leading-[0.9] tracking-tighter mb-4 text-primary font-bold">
          The <span className="italic font-normal">Express</span> Menu
        </h1>
        <p className="font-sans text-sm text-primary/70 max-w-xl leading-relaxed">
          Explore our meticulously crafted selection of Indian favorites and express Indo-Chinese delicacies. Select your preferred spice level and order fresh to your door via DoorDash.
        </p>
      </div>

      {/* Redesigned Filter & Search Bar Layout */}
      <div className="flex flex-col gap-6 mb-12">
        {/* Search Input Box */}
        <div className="relative bg-white border border-primary/10 p-1 shadow-xs flex items-center">
          <Search className="w-4 h-4 text-primary/30 ml-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our culinary archive (e.g. Biryani, Samosa, Noodles)..."
            className="w-full bg-transparent pl-3 pr-4 py-3.5 text-xs text-primary placeholder-primary/45 outline-none font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[9px] uppercase tracking-wider font-bold text-primary/40 hover:text-primary mr-4 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills Container */}
        <div className="relative -mx-6 md:mx-0 px-6 md:px-0">
          <div className="flex overflow-x-auto no-scrollbar touch-scroll gap-2.5 pb-2 md:pb-0 md:flex-wrap md:justify-center">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-5 py-3.5 text-[9px] font-bold uppercase tracking-[0.2em] font-sans whitespace-nowrap cursor-pointer transition-all duration-300 border shrink-0 ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white text-primary border-primary/15 hover:border-primary/30 hover:bg-primary/[0.02]'
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
        <div className="py-32 text-center text-primary/50 text-sm font-sans border border-dashed border-primary/25 bg-white/40">
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
                className="bg-white border border-primary/10 p-4 hover:border-primary/25 transition-all flex flex-col justify-between group relative"
              >
                {/* Dietary Tag */}
                {item.tag && (
                  <span className="absolute top-6 right-6 bg-secondary/15 text-primary border border-secondary/20 text-[7px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 z-10">
                    {item.tag}
                  </span>
                )}

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    {/* Dish Image Frame */}
                    <div className="h-60 w-full overflow-hidden relative border border-primary/5 p-1 bg-background-warm mb-4">
                      <img
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] rounded-xl"
                        src={item.image}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-primary group-hover:text-primary/95 transition-colors leading-snug mb-2">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs text-primary/70 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-4 border-t border-primary/10 flex justify-between items-center">
                    <span className="font-sans text-base font-extrabold text-secondary">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={onOrderNow}
                      className="bg-primary text-white px-4 py-2 font-sans text-[8px] font-bold uppercase tracking-[0.2em] flex items-center gap-1 hover:bg-primary/90 transition-colors cursor-pointer border border-primary"
                    >
                      Order Now
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Safety and packaging guidelines */}
      <div className="mt-16 p-6 bg-white border border-primary/10 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs tracking-wide font-sans font-semibold text-primary/70">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <span>Curry Express utilizes biodegradable wheat-straw boxes and secure sealed delivery packages to keep your food perfectly hot.</span>
      </div>
    </div>
  );
}
