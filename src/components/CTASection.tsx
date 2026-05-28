import { motion } from 'motion/react';

export default function CTASection({ onOrderNow }: { onOrderNow: () => void }) {
  return (
    <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden border-t border-gold/10">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop")' }}
      >
        {/* Dark overlay fixed for both themes */}
        <div className="absolute inset-0 bg-black/80 z-0"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans text-gold text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6 block">
            Reserve Your Experience
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#F5E6C8] mb-8 leading-tight">
            An Unforgettable <br className="hidden md:block"/> Culinary Journey.
          </h2>
          <p className="font-sans text-[#B8B8B8] text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Join us for an evening of culinary excellence. Experience the finest Indian and Indo-Chinese fusion in a setting designed for the extraordinary.
          </p>
          <button
            onClick={onOrderNow}
            className="bg-gold text-bg px-12 py-5 font-sans text-sm uppercase tracking-[0.2em] hover:bg-text-cream transition-colors duration-300 shadow-2xl cursor-pointer"
          >
            Order Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
