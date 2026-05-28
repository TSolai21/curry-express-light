import React, { useState, useEffect } from 'react';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Cropper from 'react-easy-crop';
import { Testimonial } from '../types';

import 'swiper/css';
import 'swiper/css/pagination';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeReviewIdx, setActiveReviewIdx] = useState<number | null>(null);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReviewIdx === null) return;
      if (e.key === 'ArrowRight') handleNext(e as any);
      if (e.key === 'ArrowLeft') handlePrev(e as any);
      if (e.key === 'Escape') setActiveReviewIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReviewIdx, testimonials.length]);

  const handleNext = (e: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (activeReviewIdx !== null) {
      setActiveReviewIdx((activeReviewIdx + 1) % testimonials.length);
    }
  };

  const handlePrev = (e: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (activeReviewIdx !== null) {
      setActiveReviewIdx((activeReviewIdx - 1 + testimonials.length) % testimonials.length);
    }
  };

  const timeAgo = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // fallback if it's already a string like "2 days ago" or invalid
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${Math.max(1, seconds)}min ago`; // show 1min minimum to avoid negative or 0sec
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}hr ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} mo ago`;
    return `${Math.floor(months / 12)} yr ago`;
  };

  const renderStars = (ratingNum: number) => {
    return (
      <div className="flex justify-center md:justify-start gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < ratingNum ? 'text-gold fill-[#C89B3C]' : 'text-gold/20'}`}
          />
        ))}
      </div>
    );
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="reviews" className="bg-bg py-24 md:py-32 relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <span className="font-sans text-gold text-sm uppercase tracking-[0.3em] font-medium block mb-4">
            Guest Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-cream tracking-tight">
            Voices of Tradition
          </h2>
        </div>

        <div className="px-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={testimonials.length >= 3}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-16"
          >
            {testimonials.map((testi, i) => (
              <SwiperSlide key={`${testi.id}-${i}`} className="h-auto">
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveReviewIdx(i)}
                  className="h-full bg-surface rounded-sm border border-gold/10 hover:border-gold/30 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl text-center md:text-left group p-8"
                >
                  <div className="space-y-4 flex flex-col items-center md:items-start w-full">
                    <div className="flex items-center gap-4 w-full">
                      {testi.image && (
                        <div className="w-12 h-12 rounded-full relative border border-gold/20 overflow-hidden bg-bg shrink-0">
                          <Cropper
                            image={testi.image}
                            crop={testi.image_settings ? { x: testi.image_settings.x, y: testi.image_settings.y } : { x: 0, y: 0 }}
                            zoom={testi.image_settings?.zoom || 1}
                            aspect={1}
                            objectFit="cover"
                            onCropChange={() => {}}
                            onZoomChange={() => {}}
                            showGrid={false}
                            classes={{ containerClassName: 'pointer-events-none' }}
                            style={{ cropAreaStyle: { border: 0, boxShadow: 'none' } }}
                          />
                        </div>
                      )}
                      <div className="flex flex-col text-left">
                        <p className="font-sans text-sm font-bold text-text-cream uppercase tracking-wider">
                          {testi.author}
                        </p>
                        {(testi.created_at || testi.date) && (
                          <p className="font-sans text-xs text-text-muted mt-0.5">
                            {timeAgo(testi.created_at || testi.date)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start w-full mt-2">
                      {renderStars(testi.rating)}
                    </div>
                    
                    <p className="font-serif text-lg md:text-xl text-text-cream/90 italic leading-relaxed line-clamp-4 mt-4 w-full text-left">
                      "{testi.comment}"
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <AnimatePresence>
        {activeReviewIdx !== null && (
          <div 
            onClick={() => setActiveReviewIdx(null)}
            className="fixed inset-0 bg-bg/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveReviewIdx(null)}
              className="absolute top-6 right-6 p-2 text-text-muted hover:text-gold transition-colors cursor-pointer z-50"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative max-w-4xl w-full flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
              <div className="relative flex items-center justify-center w-full">
                
                <button
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-16 p-3 text-text-muted hover:text-gold transition-colors z-50 cursor-pointer hidden sm:block"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <motion.div
                  key={activeReviewIdx}
                  initial={{ scale: 0.95, opacity: 0, x: 20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.95, opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface rounded-sm shadow-2xl w-full p-8 md:p-16 relative text-center md:text-left border border-gold/20 flex flex-col items-center md:items-start max-w-2xl mx-auto"
                >
                  <div className="flex flex-col items-center md:items-start w-full">
                    <div className="flex items-center gap-5 mb-6 w-full">
                      {testimonials[activeReviewIdx].image && (
                        <div className="w-16 h-16 rounded-full relative border border-gold/20 overflow-hidden bg-bg shrink-0 shadow-lg">
                          <Cropper
                            image={testimonials[activeReviewIdx].image!}
                            crop={testimonials[activeReviewIdx].image_settings ? { x: testimonials[activeReviewIdx].image_settings!.x, y: testimonials[activeReviewIdx].image_settings!.y } : { x: 0, y: 0 }}
                            zoom={testimonials[activeReviewIdx].image_settings?.zoom || 1}
                            aspect={1}
                            objectFit="cover"
                            onCropChange={() => {}}
                            onZoomChange={() => {}}
                            showGrid={false}
                            classes={{ containerClassName: 'pointer-events-none' }}
                            style={{ cropAreaStyle: { border: 0, boxShadow: 'none' } }}
                          />
                        </div>
                      )}
                      <div className="flex flex-col text-left">
                        <p className="font-sans text-lg font-bold text-text-cream uppercase tracking-wider">
                          {testimonials[activeReviewIdx].author}
                        </p>
                        {(testimonials[activeReviewIdx].created_at || testimonials[activeReviewIdx].date) && (
                          <p className="font-sans text-sm text-text-muted mt-1">
                            {timeAgo(testimonials[activeReviewIdx].created_at || testimonials[activeReviewIdx].date)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6 w-full flex justify-start">
                      {renderStars(testimonials[activeReviewIdx].rating)}
                    </div>
                    
                    <p className="font-serif text-xl md:text-3xl text-text-cream leading-relaxed italic mb-4 text-left w-full">
                      "{testimonials[activeReviewIdx].comment}"
                    </p>

                    {/* Mobile Navigation controls inside card for smaller screens */}
                    <div className="flex sm:hidden justify-center gap-6 mt-8 pt-6 border-t border-gold/10 w-full">
                      <button onClick={handlePrev} className="text-text-muted hover:text-gold p-2">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button onClick={handleNext} className="text-text-muted hover:text-gold p-2">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                <button
                  onClick={handleNext}
                  className="absolute right-0 md:-right-16 p-3 text-text-muted hover:text-gold transition-colors z-50 cursor-pointer hidden sm:block"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
