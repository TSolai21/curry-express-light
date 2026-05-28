import { motion } from 'motion/react';
import { ChefHat, Leaf, Star } from 'lucide-react';

const reasons = [
  {
    id: 1,
    title: 'Master Chefs',
    description: 'Our culinary veterans bring decades of expertise from the finest kitchens across the globe.',
    icon: ChefHat,
  },
  {
    id: 2,
    title: 'Premium Spices',
    description: 'We meticulously source authentic, high-grade ingredients to ensure unparalleled flavor in every dish.',
    icon: Leaf,
  },
  {
    id: 3,
    title: 'Refined Quality',
    description: 'Immerse yourself in modern elegance, designed for the ultimate culinary experience.',
    icon: Star,
  }
];

export default function WhyChooseSection() {
  return (
    <section className="bg-bg py-24 md:py-32 relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="font-sans text-gold text-sm uppercase tracking-[0.3em] font-medium block mb-4">
            The Standard
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-text-cream">
            Why Choose Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {reasons.map((reason, idx) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full border border-gold/20 bg-surface flex items-center justify-center mb-8 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500 shadow-xl">
                <reason.icon className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-serif text-2xl text-text-cream mb-4 group-hover:text-gold transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed max-w-xs mx-auto">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
