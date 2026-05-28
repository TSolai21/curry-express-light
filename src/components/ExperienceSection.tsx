import { motion } from 'motion/react';
import { Wine, Gift, Users } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Fine Dining',
    description: 'An intimate, immersive culinary journey in our ambient dining room.',
    icon: Wine,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Catering',
    description: 'Elevate your private events with our bespoke gastronomic services.',
    icon: Gift,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Family Events',
    description: 'Create unforgettable memories with our curated group dining experiences.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop'
  }
];

export default function ExperienceSection() {
  return (
    <section className="bg-bg py-24 md:py-32 relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-sans text-gold text-sm uppercase tracking-[0.3em] font-medium block mb-4">
            Our Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-text-cream">
            The Experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group relative overflow-hidden rounded-sm aspect-[4/5] md:aspect-[3/4] cursor-pointer bg-surface shadow-xl"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover filter brightness-[0.4] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent z-10"></div>
              
              <div className="relative z-20 h-full flex flex-col justify-end p-8 text-left">
                <exp.icon className="w-8 h-8 text-gold mb-6 group-hover:-translate-y-2 transition-transform duration-500" />
                <h3 className="font-serif text-2xl text-text-cream mb-3">{exp.title}</h3>
                <div className="overflow-hidden">
                  <p className="font-sans text-sm text-text-muted leading-relaxed max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
