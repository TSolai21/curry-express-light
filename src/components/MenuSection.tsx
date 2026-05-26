import { BookOpen, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onSelectCategory: (category: string) => void;
  onOpenMenuWithCategory: (category: string) => void;
}

export default function MenuSection({ onSelectCategory, onOpenMenuWithCategory }: MenuSectionProps) {
  const sections = [
    {
      title: 'Indian Curry Entrées',
      description: 'Authentic recipes simmering with traditional hand-ground spices, served with steamed basmati rice.',
      category: 'entrees',
      tag: 'Classic Selection',
      tagBg: 'border-primary',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
      actionText: 'Explore Curries',
    },
    {
      title: 'Hyderabadi Dum Biryani',
      description: 'Aromatic long-grain basmati rice layered with spiced meats or vegetables, cooked under dum pressure.',
      category: 'biryani',
      tag: 'Highly Requested',
      tagBg: 'border-primary',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
      actionText: 'View Varieties',
    },
    {
      title: 'Burgers & Fusions',
      description: 'Exciting fusion creations blending American favorites with classic Indian and Mexican spices.',
      category: 'fusions',
      tag: 'New & Spicy',
      tagBg: 'border-primary',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      actionText: 'See Fusions',
    }
  ];

  return (
    <section id="menu" className="bg-background-warm py-24 px-6 md:px-12 xl:px-20 border-y border-primary/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with high-end Editorial label detail */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-primary/50 uppercase">
            № 02 / OUR CATALOGUES
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 text-primary tracking-tight">
            Signature Cuisine Sections
          </h2>
          <div className="h-[1.5px] w-12 bg-primary mt-4"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="level-1-card bg-white rounded-xl border border-primary/10 overflow-hidden flex flex-col group p-2 pb-6"
            >
              <div className="h-68 overflow-hidden relative border border-primary/5">
                <img
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out select-none filter contrast-[1.01] rounded-xl"
                  src={section.image}
                  referrerPolicy="no-referrer"
                />
                {section.tag && (
                  <div className="absolute top-4 left-4 bg-white border border-primary/20 text-primary px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-bold">
                    {section.tag}
                  </div>
                )}
              </div>

              <div className="px-5 pt-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg md:text-xl text-primary mb-3 font-bold">
                    {section.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-primary/70 leading-relaxed">
                    {section.description}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onOpenMenuWithCategory(section.category)}
                    className="font-sans text-[9px] uppercase font-bold tracking-[0.22em] text-primary pb-1 border-b border-primary/30 hover:border-primary/100 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                  >
                    {section.actionText}
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
