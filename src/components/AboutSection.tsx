import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden border-t border-gold/10">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop")' }}
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
            Our Heritage
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#F5E6C8] mb-8 leading-tight">
            A Legacy of Taste <br className="hidden md:block"/> & Tradition.
          </h2>
          <p className="font-sans text-[#B8B8B8] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Curry Express is born from a profound respect for authentic culinary traditions. We meticulously source the finest spices and freshest ingredients to create an unparalleled culinary experience.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
