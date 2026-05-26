import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function GallerySection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
      title: 'Crispy Manchurian Glaze',
      desc: 'Golden-fried garden florets caramelized with minced organic scallions and spicy soy syrup.'
    },
    {
      url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
      title: 'Butter Chicken Simmer',
      desc: 'Our supreme Butter Chicken brewing in a hand-crafted copper dish with house butter dollops.'
    },
    {
      url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      title: 'Sealed Saffron Biryani',
      desc: 'Premium high-grade basmati layers steaming under handmade heavy wheat dough sealing.'
    },
    {
      url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
      title: 'Artisanal Tandoori Char',
      desc: 'Succulent marinated chicken skewers sizzling on live wood charcoal in traditional clay furnace.'
    }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % photos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 xl:px-20 bg-background-warm bg-dotted border-b border-primary/10">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Headings */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-primary/50 uppercase">
            № 05 / ARCHIVAL IMMERSION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 text-primary tracking-tight">
            Visual Symphony
          </h2>
          <div className="h-[1.5px] w-12 bg-primary mt-4"></div>
        </div>

        {/* Photos grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhotoIdx(idx)}
              className="aspect-square rounded-xl overflow-hidden border border-primary/10 bg-white p-2 hover:border-primary/30 transition-all duration-300 cursor-pointer group relative"
            >
              <div className="w-full h-full overflow-hidden border border-primary/5">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none filter contrast-[1.02] rounded-xl"
                  src={item.url}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl border border-primary px-3 py-1.5 text-primary text-[8px] uppercase tracking-[0.2em] font-bold transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Inspect Plate
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Backdrop */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <div
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 bg-primary/95 backdrop-blur-xs z-50 flex flex-col items-center justify-center p-3"
          >
            {/* Close button */}
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 p-2.5 text-white/70 hover:text-white rounded-xl border border-white/20 bg-primary transition-all z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox content container */}
            <div className="relative max-w-4xl w-full flex flex-col items-center gap-6">
              {/* Image Frame */}
              <div className="relative flex items-center justify-center w-full max-h-[65vh]">
                {/* Left navigation arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-xl text-white/80 hover:text-white bg-primary border border-white/20 hover:bg-primary/80 transition-colors z-35 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <motion.div
                  key={activePhotoIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-primary/20 p-3 max-w-full max-h-[65vh] shadow-xl"
                >
                  <img
                    alt={photos[activePhotoIdx].title}
                    className="max-w-full max-h-[60vh] object-contain select-none rounded-xl"
                    src={photos[activePhotoIdx].url}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Right navigation arrows */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-xl text-white/80 hover:text-white bg-primary border border-white/20 hover:bg-primary/80 transition-colors z-35 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption Area */}
              <motion.div
                key={`caption-${activePhotoIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-white max-w-xl px-4"
              >
                <h4 className="font-serif text-lg font-bold tracking-wide">
                  {photos[activePhotoIdx].title}
                </h4>
                <p className="font-sans text-xs text-white/75 mt-2 leading-relaxed">
                  {photos[activePhotoIdx].desc}
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
