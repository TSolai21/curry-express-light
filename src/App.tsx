import { useState, useEffect } from 'react';
import { Testimonial } from './types';
import { INITIAL_TESTIMONIALS } from './data';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import SpecialOffers from './components/SpecialOffers';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import MenuPage from './components/MenuPage';
import AdminPage from './components/AdminPage';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'admin'>(() => {
    // Basic routing for /admin
    if (window.location.pathname === '/admin') {
      return 'admin';
    }
    return 'home';
  });
  const [currentSection, setCurrentSection] = useState<string | undefined>(undefined);
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Customer transactions state managers (Only testimonials preserved)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  // Retrieve persistent records from localStorage on mount
  useEffect(() => {
    const cachedReviews = localStorage.getItem('curry_express_reviews');

    if (cachedReviews) {
      try {
        setTestimonials(JSON.parse(cachedReviews));
      } catch (e) {
        console.error('Failed parsing reviews cache', e);
      }
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOrderRedirect = () => {
    const doordashUrl = (import.meta as any).env.VITE_DOORDASH_URL || 'https://www.doordash.com';
    window.open(doordashUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNavigate = (page: 'home' | 'menu' | 'admin', sectionId?: string) => {
    setCurrentPage(page);
    setCurrentSection(sectionId);
    
    // Update URL if needed
    if (page === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }

    if (page === 'home' && sectionId) {
      // Delay slightly to let page render
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

  const handlePostReview = (comment: string, author: string, rating: number, image?: string) => {
    const newReview: Testimonial = {
      id: `review-${Date.now()}`,
      rating,
      comment,
      author,
      date: 'Just now',
      image
    };
    const updatedReviews = [newReview, ...testimonials];
    setTestimonials(updatedReviews);
    localStorage.setItem('curry_express_reviews', JSON.stringify(updatedReviews));
  };

  const handleDeleteReview = (id: string) => {
    const updatedReviews = testimonials.filter((t) => t.id !== id);
    setTestimonials(updatedReviews);
    localStorage.setItem('curry_express_reviews', JSON.stringify(updatedReviews));
  };

  const handleOpenMenuCategory = (category: string) => {
    setMenuInitialCategory(category);
    handleNavigate('menu');
  };

  return (
    <div className="bg-background-warm bg-dotted min-h-screen text-on-background selection:bg-[#DAC49C] selection:text-primary max-w-screen overflow-x-hidden antialiased scroll-smooth">
      {/* Cursor Glow Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(218, 196, 156, 0.12), transparent 40%)'
        }}
      />
      
      {/* Header bar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOrderNow={handleOrderRedirect}
      />

      <div className="pb-20 md:pb-0">
        {currentPage === 'home' ? (
          <main>
          {/* 1. Hero Block */}
          <Hero
            onOpenMenu={() => handleOpenMenuCategory('all')}
            onOrderNow={handleOrderRedirect}
          />

          {/* 2. Signature Sections List */}
          <MenuSection
            onSelectCategory={(cat) => handleOpenMenuCategory(cat)}
            onOpenMenuWithCategory={(cat) => handleOpenMenuCategory(cat)}
          />

          {/* 3. Limited Time Offers */}
          <SpecialOffers
            onOrderCombo={handleOrderRedirect}
            onOpenMenu={() => handleOpenMenuCategory('all')}
          />

          {/* 4. Heritage Story Segment */}
          <AboutSection />

          {/* 5. Food Photo Lightbox Gallery */}
          <GallerySection />

          {/* 6. Guest Testimonial Wall */}
          <TestimonialsSection testimonials={testimonials} />

          {/* 7. Culinary Kitchen visits & Directions */}
          <MapSection onOrderNow={handleOrderRedirect} />
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
            testimonials={testimonials}
            onAddReview={handlePostReview}
            onDeleteReview={handleDeleteReview}
            onBackToHome={() => handleNavigate('home')}
          />
          </main>
        )}
      </div>

      <Footer onNavigate={handleNavigate} />
      
      <MobileBottomNav 
        currentPage={currentPage}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onOrderNow={handleOrderRedirect}
      />

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 right-8 z-50 p-3 bg-primary text-white border border-primary/20 shadow-xl cursor-pointer hover:bg-primary/90 transition-all focus:outline-none flex items-center justify-center rounded-xl"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
