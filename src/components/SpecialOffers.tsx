import { motion } from 'motion/react';
import Cropper from 'react-easy-crop';
import { SpecialOffer } from '../types';

interface SpecialOffersProps {
  offers: SpecialOffer[];
  onOrderCombo: () => void;
  onOpenMenu: () => void;
}

export default function SpecialOffers({ offers, onOrderCombo, onOpenMenu }: SpecialOffersProps) {
  if (!offers || offers.length === 0) return null; // Or show a fallback if desired

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
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="w-full md:w-3/5 space-y-4 text-left">
                {offer.tag && (
                  <div className="inline-block bg-white border border-primary/20 text-primary px-3 py-1 rounded-xl font-sans text-[8px] font-bold uppercase tracking-[0.2em]">
                    {offer.tag}
                  </div>
                )}
                <h3 className="font-serif text-xl sm:text-2xl text-primary font-bold">
                  {offer.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-primary/70 leading-relaxed">
                  {offer.description}
                </p>
                <span className="block font-serif text-lg text-primary italic font-medium">
                  {offer.price_text}
                </span>
                <button
                  onClick={onOrderCombo}
                  className="border border-primary/25 text-primary px-5 py-2.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/5 transition-colors cursor-pointer mt-2"
                >
                  Order on DoorDash
                </button>
              </div>
              
              <div className="w-full md:w-2/5 aspect-[4/3] bg-white rounded-xl flex items-center justify-center border border-primary/10 overflow-hidden relative">
                <Cropper
                  image={offer.image}
                  crop={offer.image_settings ? { x: offer.image_settings.x, y: offer.image_settings.y } : { x: 0, y: 0 }}
                  zoom={offer.image_settings?.zoom || 1}
                  aspect={4 / 3}
                  objectFit="cover"
                  onCropChange={() => {}}
                  onZoomChange={() => {}}
                  showGrid={false}
                  classes={{ containerClassName: 'pointer-events-none' }}
                  style={{ cropAreaStyle: { border: 0, boxShadow: 'none' } }}
                />
              </div>
            </div>
          ))}
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
