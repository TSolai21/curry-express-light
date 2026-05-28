import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const signatureDishes = [
  {
    id: 1,
    name: 'Imperial Butter Chicken',
    description: 'Slow-cooked in a rich makhani sauce with aromatic spices.',
    price: '$24',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Szechuan Chili Prawns',
    description: 'Wok-tossed tiger prawns with premium szechuan peppercorns.',
    price: '$32',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Tandoori Lamb Chops',
    description: 'Overnight marinated chops roasted in a traditional clay oven.',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop'
  }
];

export default function SignatureDishes({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <section id="menu" className="bg-bg py-24 md:py-32 relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:items-end md:text-left mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <span className="font-sans text-gold text-sm uppercase tracking-[0.3em] font-medium block mb-4">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-text-cream">
              Signature Dishes
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={onOpenMenu}
            className="group flex items-center gap-3 text-text-muted hover:text-gold font-sans text-sm uppercase tracking-[0.2em] transition-colors cursor-pointer"
          >
            View Full Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {signatureDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group cursor-pointer relative flex justify-center"
            >
              {/* Plate Container */}
              <div className="rounded-full relative aspect-square shadow-[0_20px_40px_rgba(0,0,0,0.3)] w-4/5 md:w-full transition-shadow duration-500 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
                
                {/* The Real Plate Image (background) */}
                <img 
                  src="/plate.png" 
                  alt="Ceramic Plate" 
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />

                {/* Curved Brand Name on the Rim */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 200 200">
                  <defs>
                    <path id={`circlePath-${dish.id}`} d="M 100, 100 m -92, 0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0" />
                  </defs>
                  <text className="font-sans text-[9px] tracking-[0.25em] uppercase fill-[#C89B3C]/80 font-medium">
                    <textPath href={`#circlePath-${dish.id}`} startOffset="0%">
                      CURRY EXPRESS • CURRY EXPRESS • CURRY EXPRESS • CURRY EXPRESS • CURRY EXPRESS • CURRY EXPRESS •
                    </textPath>
                  </text>
                </svg>

                {/* Inner Food Area with inset shadow for depth */}
                <div className="absolute inset-[12%] rounded-full overflow-hidden shadow-[inset_0_12px_24px_rgba(0,0,0,0.6)]">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  />
                  
                  {/* Overlay that darkens on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 z-10 pointer-events-none"></div>
                  
                  {/* Name that appears on hover */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <h3 className="font-serif text-xl md:text-2xl text-[#F5E6C8] text-center leading-tight drop-shadow-2xl">
                      {dish.name}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
