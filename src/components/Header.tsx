import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../assets/logo.png';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  currentPage: 'home' | 'menu' | 'admin';
  onNavigate: (page: 'home' | 'menu' | 'admin', sectionId?: string) => void;
  onOrderNow: () => void;
}

export default function Header({ currentPage, onNavigate, onOrderNow }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home', page: 'home' as const },
    { name: 'Menu', href: '#menu', page: 'home' as const },
    { name: 'Offers', href: '#offers', page: 'home' as const },
    { name: 'About', href: '#about', page: 'home' as const },
    { name: 'Reviews', href: '#reviews', page: 'home' as const },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof menuItems[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(item.page, item.page === 'home' && item.href !== '#home' ? item.href : undefined);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg/95 backdrop-blur-md py-4 border-b border-gold/20 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 z-50">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="select-none cursor-pointer flex items-center gap-3 group"
            >
              <img src={logo} alt="Curry Express Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
              <span className={`font-sans text-lg md:text-xl tracking-widest uppercase transition-colors ${!isScrolled ? 'text-[#F5E6C8]' : 'text-text-cream'}`}>Curry Express</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {menuItems.map((item) => {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${!isScrolled ? 'text-[#B8B8B8] hover:text-[#F5E6C8]' : 'text-text-muted hover:text-gold'}`}
                >
                  {item.name}
                </a>
              );
            })}
            <ThemeSwitcher />
            <button 
              onClick={onOrderNow}
              className="hidden md:block bg-transparent border border-gold text-gold px-5 py-2 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-gold hover:text-bg transition-colors duration-300 cursor-pointer"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors z-50 cursor-pointer ${!isScrolled ? 'text-[#F5E6C8]' : 'text-text-cream hover:text-gold'}`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-page Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {menuItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="font-serif text-3xl text-text-cream hover:text-gold transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOrderNow();
                }}
                className="mt-8 bg-gold text-bg w-full max-w-xs py-4 rounded font-sans text-sm uppercase tracking-widest hover:bg-text-cream transition-colors cursor-pointer"
              >
                Order Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
