import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenMenu: () => void;
  onOrderNow: () => void;
}

export default function Hero({ onOpenMenu, onOrderNow }: HeroProps) {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url("/hero-poster.png")` }}
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10 pointer-events-none"></div>
        {/* Subtle smoke/ambient effect overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 z-10 pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-6 max-w-4xl mx-auto mt-20">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#F5E6C8] leading-tight tracking-wide mb-8"
        >
          Authentic Flavors, <br className="hidden md:block"/> Delivered.
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 mt-8"
        >
          <button
            onClick={onOpenMenu}
            className="bg-gold text-bg px-10 py-4 font-sans text-xs uppercase tracking-[0.2em] hover:bg-text-cream transition-colors duration-300 cursor-pointer"
          >
            View Menu
          </button>
          
          <button
            onClick={onOrderNow}
            className="bg-transparent border border-gold text-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-bg transition-colors duration-300 cursor-pointer"
          >
            Order Now
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] text-[#B8B8B8] uppercase tracking-[0.2em]">Scroll to Explore</span>
        <ChevronDown className="w-5 h-5 text-gold animate-bounce" />
      </motion.div>
    </section>
  );
}
