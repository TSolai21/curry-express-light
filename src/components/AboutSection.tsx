import { useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AboutSection() {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <section id="about" className="py-24 px-6 md:px-12 xl:px-20 bg-background-warm border-y border-primary/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Chef Image placed in static art frames */}
        <div className="w-full lg:w-1/2">
          <div className="relative border border-primary/15 p-3.5 bg-white rounded-xl">
            <div className="border border-primary/5 overflow-hidden">
              <img
                alt="Artisan chef storytelling"
                className="w-full h-auto select-none filter contrast-[1.02] rounded-xl"
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Philosophy Text with Editorial Layout */}
        <div className="w-full lg:w-1/2 space-y-6 text-left">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-primary/50 uppercase">
              № 04 / OUR HERITAGE
            </span>
            <div className="h-[1px] w-12 bg-primary/20"></div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
            Philosophy of Wok &amp; Spice
          </h2>
          <p className="font-sans text-xs sm:text-sm text-primary/70 leading-relaxed">
            At Curry Express, we unite the rich, slow-simmered traditions of Indian spices with the high-fire wok techniques of Chinese cooking. We curate a culinary experience tailored for modern American palates, ensuring every single spice and sear is layered with artisanal precision.
          </p>

          <div className="pl-6 border-l border-primary/25 py-2">
            <p className="font-serif text-sm sm:text-base text-primary/90 italic font-medium">
              "Honoring classic Indian heritage, elevated with high-fire Chinese wok excellence."
            </p>
          </div>

          <button
            onClick={() => setShowFullStory(true)}
            className="border border-primary/25 text-primary px-5 py-2.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/5 transition-colors cursor-pointer flex items-center gap-2"
          >
            Read Our Full Story
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Full Backstory Modal popup structured precisely like an offset article */}
      <AnimatePresence>
        {showFullStory && (
          <div className="fixed inset-0 bg-primary/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl p-8 md:p-12 max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-primary/20 shadow-none relative text-left"
            >
              <button
                onClick={() => setShowFullStory(false)}
                className="absolute top-6 right-6 p-2 text-primary/50 hover:text-primary rounded-xl border border-primary/10 bg-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="font-sans text-[9px] font-bold text-primary/50 uppercase tracking-[0.3em]">Our Story</span>
              <h3 className="font-serif text-2xl md:text-3.5xl font-bold text-primary mt-2 mb-6 tracking-tight">Origins of Curry Express</h3>
              
              <div className="space-y-4 font-sans text-xs sm:text-sm text-primary/70 leading-relaxed border-t border-primary/10 pt-6">
                <p>
                  Curry Express was established with a singular conviction: that premium Indian and Indo-Chinese dining could be brought together in a fast, contemporary format without compromising on flavor depth. Founded in San Francisco in 2021 by Chef Sanjay Mehta and Chinese wok master Chef David Chen, our brand represents the ultimate marriage of two historic culinary traditions.
                </p>
                <p>
                  Indo-Chinese cuisine originated in the historic Hakka settlements of Kolkata, blending Chinese cooking methods with vibrant Indian masalas. Chefs Mehta and Chen wanted to share this beautiful culinary dialogue with food enthusiasts across the United States.
                </p>
                <p>
                  Instead of pre-boiling ingredients into generic sauces, we sauté fresh aromatics—ginger, green chillies, garlic—at high heat before folding in custom roasted cumin, cardamom, and house-infused Sichuan oils. This guarantees that every dish, from our Butter Chicken Masala to our Crispy Gobi Manchurian, retains its distinct, clean, and punchy flavors.
                </p>
                <p>
                  Our commitment also extends to modern, sustainable carryout procedures. All custom packaging is made from biodegradable wheat straws and configured with structural partitions to keep your Indian curries and Chinese woks perfectly fresh during transit. Thank you for dining with Curry Express!
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowFullStory(false)}
                  className="bg-primary px-6 py-3.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-white hover:bg-primary/95 transition-all cursor-pointer border border-primary"
                >
                  Return to Menu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
