import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    title: 'The Ambience',
    aspect: 'aspect-square'
  },
  {
    url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop',
    title: 'Culinary Craft',
    aspect: 'aspect-[3/4]'
  },
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    title: 'Culinary Experience',
    aspect: 'aspect-[4/3]'
  },
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    title: 'Gourmet Ingredients',
    aspect: 'aspect-[4/5]'
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
    title: 'The Plating',
    aspect: 'aspect-square'
  }
];

export default function GallerySection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

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
    <section id="gallery" className="relative py-24 md:py-32 px-6 md:px-12 xl:px-20 bg-bg overflow-hidden border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Headings */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans text-gold text-sm tracking-[0.3em] font-medium uppercase mb-4">
            Visual Symphony
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-cream tracking-tight">
            The Gallery
          </h2>
        </div>

        {/* Masonry-like Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setActivePhotoIdx(idx)}
              className={`relative overflow-hidden cursor-pointer group break-inside-avoid bg-surface rounded-sm ${item.aspect}`}
            >
              <img
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] select-none filter contrast-[1.05]"
                src={item.url}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                <span className="font-sans text-text-cream text-xs uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Backdrop */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <div
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 bg-bg/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 p-2 text-text-muted hover:text-gold transition-colors z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Lightbox content container */}
            <div className="relative max-w-5xl w-full flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center w-full max-h-[75vh]">
                <button
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-12 p-3 text-text-muted hover:text-gold transition-colors z-50 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <motion.div
                  key={activePhotoIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-full max-h-[75vh] shadow-2xl"
                >
                  <img
                    alt={photos[activePhotoIdx].title}
                    className="max-w-full max-h-[75vh] object-contain select-none rounded-sm"
                    src={photos[activePhotoIdx].url}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                <button
                  onClick={handleNext}
                  className="absolute right-0 md:-right-12 p-3 text-text-muted hover:text-gold transition-colors z-50 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              <motion.div
                key={`caption-${activePhotoIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4"
              >
                <h4 className="font-sans text-sm uppercase tracking-[0.2em] text-text-cream">
                  {photos[activePhotoIdx].title}
                </h4>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
