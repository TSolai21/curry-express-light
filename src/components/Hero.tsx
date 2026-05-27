import { useState } from 'react';
import { ArrowRight, Star, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface HeroProps {
  onOpenMenu: () => void;
  onOrderNow: () => void;
}

const slides = [
  {
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    badgeTop: "Top Rated Curry",
    badgeBottom: "Fresh South Indian Idli"
  },
  {
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    badgeTop: "Best Seller",
    badgeBottom: "Chef's Special Biryani"
  },
  {
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    badgeTop: "Traditional Recipe",
    badgeBottom: "Indian Curry Entrées"
  },
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badgeTop: "Fusion Favorite",
    badgeBottom: "Burgers & Fusions"
  }
];

export default function Hero({ onOpenMenu, onOrderNow }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section id="home" className="relative min-h-screen flex flex-col lg:flex-row items-center px-6 md:px-12 xl:px-20 pt-24 md:pt-32 pb-16 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glowing Ambient Symphony */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#DAC49C]/15 blur-[150px] pointer-events-none -z-10 animate-pulse-slow" style={{ animationDelay: '-5s' }}></div>

      {/* Floating Decorative Spice Accents */}
      <div className="absolute top-20 right-[15%] pointer-events-none -z-10 animate-float-slow opacity-20">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary">
          {/* Star Anise representation */}
          <path d="M12 2L14 9L21 7L16 12L21 17L14 15L12 22L10 15L3 17L8 12L3 7L10 9L12 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-[5%] pointer-events-none -z-10 animate-float-slower opacity-15">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#6E7260]">
          {/* Leaf / Herb shape */}
          <path d="M2 22C2 22 8 20 12 16C16 12 20 8 22 2C22 2 16 4 12 8C8 12 6 16 2 22Z" />
          <path d="M12 8L2 22" />
        </svg>
      </div>
      <div className="absolute top-1/3 left-[45%] pointer-events-none -z-10 animate-float-fast opacity-10">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary">
          <circle cx="12" cy="12" r="8" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Hero Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 z-10 text-left pr-0 lg:pr-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Editorial Meta & Divider */}
          <div className="flex items-center gap-3 mb-2">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-primary/50">№ 01 / CULINARY ARCHIVE</span>
            <div className="h-[1px] w-12 bg-primary/20"></div>
          </div>

          <h1 className="font-serif text-[42px] sm:text-[56px] lg:text-[72px] leading-[0.9] tracking-tighter mb-4 text-primary font-bold">
            Bold <span className="italic font-normal">Indian</span> Flavors.<br />
            <span className="font-sans font-black text-2xl sm:text-[32px] lg:text-[42px] tracking-widest text-primary block mt-1 uppercase">
              Express Chinese
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-sans text-sm md:text-base text-primary/70 max-w-md leading-relaxed border-l border-primary/20 pl-4 py-1"
        >
          Fresh Indian &amp; Indo-Chinese favorites crafted for modern cravings. A curated, artisanal dining atmosphere brought directly to your table with meticulous gourmet precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 pt-2"
        >
          <button
            onClick={onOrderNow}
            className="bg-primary text-white px-6 py-4 rounded-xl font-sans text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-primary/95 transition-all duration-200 flex items-center gap-2 cursor-pointer border border-primary"
          >
            Order on DoorDash
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenMenu}
            className="border border-primary/25 text-primary px-6 py-4 rounded-xl font-sans text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
          >
            View Full Menu
          </button>
        </motion.div>
      </div>

      {/* Hero Image Slider Container */}
      <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0 flex justify-center items-center">
        {/* Main Image Card with Swiper Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 rounded-xl overflow-hidden border border-primary/15 p-3.5 bg-white aspect-[4/5] w-full max-w-[400px] shadow-2xl hover:shadow-[0_20px_50px_rgba(43,30,26,0.15)] hover:[transform:rotate(0deg)] transition-all duration-500 flex flex-col [transform:rotate(2deg)]"
        >
          <div className="w-full h-full overflow-hidden border border-primary/10 rounded-lg relative flex flex-col">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              className="w-full h-full rounded-xl"
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={idx} className="w-full h-full relative">
                  <img
                    alt={slide.badgeBottom}
                    className="w-full h-full object-cover select-none filter contrast-[1.03]"
                    src={slide.image}
                    referrerPolicy="no-referrer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>

        {/* Dynamic Badges */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`top-${currentIndex}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-4 right-2 bg-white px-4 py-2.5 rounded-xl border border-primary/30 hidden md:flex items-center gap-2 select-none z-20 shadow-md hover:translate-y-[-2px] transition-transform duration-200"
          >
            <Star className="w-3.5 h-3.5 text-secondary fill-secondary animate-pulse" />
            <span className="font-sans text-[9px] font-bold uppercase text-primary tracking-[0.2em]">
              {slides[currentIndex].badgeTop}
            </span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`bottom-${currentIndex}`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -bottom-4 left-2 bg-white px-4 py-2.5 rounded-xl border border-primary/30 hidden md:flex items-center gap-2 select-none z-20 shadow-md hover:translate-y-[2px] transition-transform duration-200"
          >
            <Flame className="w-3.5 h-3.5 text-secondary fill-secondary animate-bounce" />
            <span className="font-sans text-[9px] font-bold uppercase text-secondary tracking-[0.2em]">
              {slides[currentIndex].badgeBottom}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
