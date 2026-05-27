import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Cropper from 'react-easy-crop';
import { Testimonial } from '../types';
import logo from '../assets/logo.png';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);

  const isMarquee = testimonials.length > 3;
  const displayTestimonials = isMarquee 
    ? [...testimonials, ...testimonials, ...testimonials, ...testimonials] 
    : testimonials;

  const renderStars = (ratingNum: number, size = 16, fillClass = "text-amber-500 fill-amber-500") => {
    const starsArray = [];
    const fullStars = Math.floor(ratingNum);
    const hasHalf = ratingNum % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsArray.push(
          <Star
            key={i}
            className={fillClass}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        starsArray.push(
          <div key={i} className="relative inline-block" style={{ width: `${size}px`, height: `${size}px` }}>
            <Star className="text-outline-variant" style={{ width: `${size}px`, height: `${size}px` }} />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
              <Star className={fillClass} style={{ width: `${size}px`, height: `${size}px` }} />
            </div>
          </div>
        );
      } else {
        starsArray.push(
          <Star
            key={i}
            className="text-outline-variant"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        );
      }
    }
    return <div className="flex gap-1">{starsArray}</div>;
  };

  // Helper to get consistent background colors for user initial avatars (Google Style)
  const getAvatarBg = (name: string) => {
    const code = name.charCodeAt(0) % 4;
    switch (code) {
      case 0: return 'bg-[#4285F4]'; // Google Blue
      case 1: return 'bg-[#EA4335]'; // Google Red
      case 2: return 'bg-[#FBBC05]'; // Google Yellow
      default: return 'bg-[#34A853]'; // Google Green
    }
  };

  return (
    <section id="reviews" className="relative pt-16 pb-20 md:pt-20 md:pb-24 px-6 md:px-12 xl:px-20 bg-white overflow-hidden">
      {/* Decorative Floating Circles representing spices/seeds */}
      <div className="absolute top-1/2 right-[5%] pointer-events-none -z-0 animate-float-fast opacity-10 hidden lg:block">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary">
          <circle cx="12" cy="12" r="8" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block with overall score pill */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 text-center md:text-left gap-6 border-b border-primary/10 pb-8">
          <div>
            <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-primary/50 uppercase">
              № 06 / GENERAL APPRAISALS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary tracking-tight">
              Guest Experiences
            </h2>
          </div>
        </div>

        {/* Dynamic Reviews Deck list */}
        <div className={`relative py-4 group ${isMarquee ? 'overflow-hidden pause-marquee -mx-6 md:-mx-12 xl:-mx-20 px-6 md:px-12 xl:px-20' : 'overflow-x-auto pb-8'}`}>
          <div className={`flex gap-8 items-stretch ${isMarquee ? 'w-max animate-marquee' : 'w-max md:w-full md:justify-center'}`}>
            {displayTestimonials.map((testi, i) => (
              <motion.div
                key={`${testi.id}-${i}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedReview(testi)}
                className="w-[300px] md:w-[380px] p-8 bg-background-warm rounded-xl space-y-5 border border-primary/10 flex flex-col justify-between text-left hover:border-primary/25 cursor-pointer hover:shadow-xs transition-all duration-300 flex-shrink-0"
                id={`review-card-${testi.id}-${i}`}
              >
                <div className="space-y-4">
                  <div className="h-44 w-full overflow-hidden border border-primary/5 bg-white mb-4 rounded-xl flex items-center justify-center relative">
                    {testi.image ? (
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
                    ) : (
                      <img
                        src={logo}
                        alt={`${testi.author}'s review representation`}
                        className="w-full h-full object-contain opacity-30 p-8"
                      />
                    )}
                  </div>
                  <div>{renderStars(testi.rating, 12)}</div>
                  <p className="font-serif text-sm sm:text-base text-primary/80 italic leading-relaxed">
                    "{testi.comment}"
                  </p>
                </div>
                <div className="font-sans text-[10px] font-bold tracking-widest text-primary/60 pt-4 border-t border-primary/10 uppercase">
                  — {testi.author}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Review Styled Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 bg-primary/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl max-w-xl w-full p-6 md:p-8 relative text-left border border-primary/5 font-sans"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-4 right-4 p-1.5 text-primary/40 hover:text-primary rounded-full hover:bg-primary/5 transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>



              {/* User Profile Info (Google Style) */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className={`w-11 h-11 rounded-full text-white flex items-center justify-center font-bold text-lg select-none shadow-xs ${getAvatarBg(selectedReview.author)}`}>
                  {selectedReview.author.charAt(0)}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-sm text-primary leading-tight">
                      {selectedReview.author}
                    </span>
                  </div>
                </div>
              </div>

              {/* Star Rating & Relative Time */}
              <div className="flex items-center gap-3 mb-4">
                {renderStars(selectedReview.rating, 16)}
                <span className="text-[10px] text-primary/40 font-sans tracking-wide">
                  {selectedReview.date || "Just now"}
                </span>
              </div>

              {/* Comment Content */}
              <p className="font-sans text-xs sm:text-sm text-primary/85 leading-relaxed text-left mb-6 select-text whitespace-pre-line">
                {selectedReview.comment.replace(/"/g, '')}
              </p>

              {/* Attached Review Photo */}
              {selectedReview.image && (
                <div className="mt-4 border-t border-primary/5 pt-4">
                  <span className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-primary/40 block mb-2">
                    Photos Attached by Reviewer
                  </span>
                  <div className="max-h-60 w-full aspect-square overflow-hidden rounded-md border border-primary/5 bg-background-warm relative">
                    <Cropper
                      image={selectedReview.image}
                      crop={selectedReview.image_settings ? { x: selectedReview.image_settings.x, y: selectedReview.image_settings.y } : { x: 0, y: 0 }}
                      zoom={selectedReview.image_settings?.zoom || 1}
                      aspect={1}
                      objectFit="cover"
                      onCropChange={() => {}}
                      onZoomChange={() => {}}
                      showGrid={false}
                      classes={{ containerClassName: 'pointer-events-none' }}
                      style={{ cropAreaStyle: { border: 0, boxShadow: 'none' } }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[16px] md:h-[24px] lg:h-[32px]"
          fill="#F5F2ED"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
