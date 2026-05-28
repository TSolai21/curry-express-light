import { motion } from 'motion/react';
import Cropper from 'react-easy-crop';
import { SpecialOffer } from '../types';

interface SpecialOffersProps {
  offers: SpecialOffer[];
  onOrderCombo: () => void;
  onOpenMenu: () => void;
}

export default function SpecialOffers({ offers, onOrderCombo }: SpecialOffersProps) {
  if (!offers || offers.length === 0) return null;

  return (
    <section id="offers" className="bg-surface py-24 md:py-32 relative border-t border-gold/10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-sans text-gold text-sm uppercase tracking-[0.3em] font-medium block mb-4">
            Exclusive Selections
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-cream tracking-tight">
            Special Offers
          </h2>
        </div>

        {/* Offers Grid */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {offers.map((offer, i) => (
            <motion.div 
              key={offer.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 group`}
            >
              <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                {offer.tag && (
                  <div className="inline-block bg-transparent border border-gold/30 text-gold px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
                    {offer.tag}
                  </div>
                )}
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-text-cream tracking-tight">
                  {offer.title}
                </h3>
                <p className="font-sans text-base lg:text-lg text-text-muted leading-relaxed max-w-lg">
                  {offer.description}
                </p>
                <span className="block font-sans text-2xl lg:text-3xl text-gold tracking-wide mt-2">
                  {offer.price_text}
                </span>
                <button
                  onClick={onOrderCombo}
                  className="mt-8 bg-transparent border border-gold text-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-bg transition-colors cursor-pointer block"
                >
                  Order Now
                </button>
              </div>
              
              <div className="w-full lg:w-1/2 aspect-video lg:aspect-[4/3] rounded-sm flex items-center justify-center overflow-hidden relative border border-gold/10 shadow-2xl">
                <Cropper
                  image={offer.image}
                  crop={offer.image_settings ? { x: offer.image_settings.x, y: offer.image_settings.y } : { x: 0, y: 0 }}
                  zoom={offer.image_settings?.zoom || 1}
                  aspect={4 / 3}
                  objectFit="cover"
                  onCropChange={() => {}}
                  onZoomChange={() => {}}
                  showGrid={false}
                  classes={{ containerClassName: 'pointer-events-none group-hover:scale-105 transition-transform duration-700' }}
                  style={{ cropAreaStyle: { border: 0, boxShadow: 'none' } }}
                />
                <div className="absolute inset-0 bg-bg/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
