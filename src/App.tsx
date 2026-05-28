import { useState, useEffect } from 'react';
import { Testimonial, SpecialOffer } from './types';
import { supabase } from './lib/supabase';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import Header from './components/Header';
import Hero from './components/Hero';
import SignatureDishes from './components/SignatureDishes';
import AboutSection from './components/AboutSection';
import SpecialOffers from './components/SpecialOffers';
import WhyChooseSection from './components/WhyChooseSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import MenuPage from './components/MenuPage';
import AdminPage from './components/AdminPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'admin'>(() => {
    if (window.location.pathname === '/admin') {
      return 'admin';
    }
    return 'home';
  });
  const [currentSection, setCurrentSection] = useState<string | undefined>(undefined);
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadData() {
      const [reviewsRes, offersRes] = await Promise.all([
        supabase.from('reviews').select('*').order('created_at', { ascending: false }),
        supabase.from('offers').select('*').order('created_at', { ascending: false })
      ]);
      if (reviewsRes.data) setTestimonials(reviewsRes.data);
      if (offersRes.data) setOffers(offersRes.data);
    }
    loadData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderRedirect = () => {
    const doordashUrl = (import.meta as any).env.VITE_DOORDASH_URL || 'https://www.doordash.com';
    window.open(doordashUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNavigate = (page: 'home' | 'menu' | 'admin', sectionId?: string) => {
    setCurrentPage(page);
    setCurrentSection(sectionId);
    
    if (page === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }

    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.querySelector(sectionId);
        if (el) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleOpenMenuCategory = (category: string) => {
    setMenuInitialCategory(category);
    handleNavigate('menu');
  };

  return (
    <div className="bg-bg min-h-screen text-text-muted selection:bg-gold selection:text-bg max-w-screen overflow-x-hidden antialiased scroll-smooth font-sans">
      
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOrderNow={handleOrderRedirect}
      />

      <div className="pb-0">
        {currentPage === 'home' ? (
          <main>
            <Hero
              onOpenMenu={() => handleOpenMenuCategory('all')}
              onOrderNow={handleOrderRedirect}
            />

            <SignatureDishes
              onOpenMenu={() => handleOpenMenuCategory('all')}
            />

            {offers.length > 0 && (
              <SpecialOffers 
                offers={offers}
                onOrderCombo={handleOrderRedirect}
                onOpenMenu={() => handleOpenMenuCategory('all')}
              />
            )}

            <AboutSection />

            <WhyChooseSection />

            {testimonials.length > 0 && (
              <TestimonialsSection testimonials={testimonials} />
            )}

            <CTASection onOrderNow={handleOrderRedirect} />
          </main>
        ) : currentPage === 'menu' ? (
          <main>
            <MenuPage
              onOrderNow={handleOrderRedirect}
              initialCategory={menuInitialCategory}
            />
          </main>
        ) : (
          <main>
            <AdminPage
              onBackToHome={() => handleNavigate('home')}
            />
          </main>
        )}
      </div>

      <Footer onNavigate={handleNavigate} />
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-6 md:right-8 z-50 w-12 h-12 rounded-sm bg-surface border border-gold/30 text-gold hover:bg-gold hover:text-bg flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer group focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
