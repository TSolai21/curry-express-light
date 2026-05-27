import { Users, Utensils, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SPECIAL_OFFERS } from '../data';
import { useState } from 'react';

interface SpecialOffersProps {
  onOrderCombo: () => void;
  onOpenMenu: () => void;
}

export default function SpecialOffers({ onOrderCombo, onOpenMenu }: SpecialOffersProps) {
  return (
    <section id="offers" className="relative pt-16 pb-20 md:pt-20 md:pb-24 px-6 md:px-12 xl:px-20 bg-background-warm bg-dotted overflow-hidden">
      {/* Decorative Floating Herb */}
      <div className="absolute top-32 right-[10%] pointer-events-none -z-0 animate-float-slow opacity-15 hidden md:block">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#6E7260]">
          <path d="M2 22C2 22 8 20 12 16C16 12 20 8 22 2C22 2 16 4 12 8C8 12 6 16 2 22Z" />
          <path d="M12 8L2 22" />
        </svg>
      </div>

      {/* Decorative Floating Spices */}
      <div className="absolute bottom-40 left-[8%] pointer-events-none -z-0 animate-float-fast opacity-10 hidden lg:block">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary">
          <circle cx="12" cy="12" r="8" strokeDasharray="4 4" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading with Editorial Style */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-primary/50 uppercase">
            № 03 / EXCLUSIVE SETS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-3 text-primary tracking-tight">
            Special Offers
          </h2>
          <div className="h-[1.5px] w-12 bg-primary mt-4"></div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Family Feast Combo */}
          <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <div className="w-full md:w-3/5 space-y-4 text-left">
              <div className="inline-block bg-white border border-primary/20 text-primary px-3 py-1 rounded-xl font-sans text-[8px] font-bold uppercase tracking-[0.2em]">
                Family Value
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-primary font-bold">
                Family Feast Combos
              </h3>
              <p className="font-sans text-xs sm:text-sm text-primary/70 leading-relaxed">
                Feeds 4-6 guests. Includes your curated choice of 2 Curries, 2 Biryanis, 4 hot Naans, and sweet mango chutney. Best of India.
              </p>
              <span className="block font-serif text-lg text-primary italic font-medium">
                Starting at $54.99
              </span>
              <button
                onClick={onOrderCombo}
                className="border border-primary/25 text-primary px-5 py-2.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/5 transition-colors cursor-pointer"
              >
                Order on DoorDash
              </button>
            </div>
            
            <div className="w-full md:w-2/5 aspect-square bg-white rounded-xl flex items-center justify-center border border-primary/10 overflow-hidden select-none p-1">
              <img
                src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
                alt="Family Feast Combo"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
              />
            </div>
          </div>

          {/* Business Lunch Box */}
          <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <div className="w-full md:w-3/5 space-y-4 text-left">
              <div className="inline-block bg-white border border-primary/20 text-primary px-3 py-1 rounded-xl font-sans text-[8px] font-bold uppercase tracking-[0.2em]">
                Daily 11AM - 3PM
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-primary font-bold">
                Business Lunch Box
              </h3>
              <p className="font-sans text-xs sm:text-sm text-primary/70 leading-relaxed">
                A customized lunch with curated chicken/veg curry, premium brown rice, side salad, crispy samosa, and hot appetizer.
              </p>
              <span className="block font-serif text-lg text-primary italic font-medium">
                Only $14.95
              </span>
              <button
                onClick={onOrderCombo}
                className="border border-primary/25 text-primary px-5 py-2.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/5 transition-colors cursor-pointer"
              >
                Order on DoorDash
              </button>
            </div>
            
            <div className="w-full md:w-2/5 aspect-square bg-white rounded-xl flex items-center justify-center border border-primary/10 overflow-hidden select-none p-1">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
                alt="Business Lunch Box"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[16px] md:h-[24px] lg:h-[32px]"
          fill="#ffffff"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
