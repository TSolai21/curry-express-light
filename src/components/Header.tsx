import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../assets/logo.png';

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
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home', page: 'home' as const },
    { name: 'Menu', href: '#menu', page: 'menu' as const },
    { name: 'Offers', href: '#offers', page: 'home' as const },
    { name: 'About', href: '#about', page: 'home' as const },
    { name: 'Gallery', href: '#gallery', page: 'home' as const },
    { name: 'Reviews', href: '#reviews', page: 'home' as const },
    { name: 'Contact', href: '#contact', page: 'home' as const },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof menuItems[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(item.page, item.page === 'home' && item.href !== '#home' ? item.href : undefined);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? 'bg-background-warm/95 backdrop-blur-md py-3 md:py-4 border-b border-primary/10 shadow-xs'
            : 'bg-transparent py-4 md:py-6 border-b border-primary/5'
          } pt-[var(--sat)]`}
      >
        <nav className="flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto">
          {/* Logo with clean editorial details */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="select-none cursor-pointer flex items-center gap-3"
            >
              <img src={logo} alt="Curry Express Logo" className="h-10 md:h-12 w-auto object-contain" />
              <span className="font-serif text-xl md:text-2xl font-bold text-primary tracking-tight">Curry Express</span>
            </a>
          </div>

          {/* Desktop Nav Links - Beautiful Spacing & Tracking */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => {
              const isActive = (item.name === 'Menu' && currentPage === 'menu') || (item.name === 'Home' && currentPage === 'home');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`font-sans text-[10px] uppercase font-bold tracking-[0.2em] transition-colors duration-200 ${isActive ? 'text-primary border-b border-primary/40 pb-0.5' : 'text-primary/60 hover:text-primary'
                    }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Right Header Buttons */}
          <div className="flex items-center gap-4">
            {/* Menu Drawer Link (Direct Trigger to DoorDash) */}
            <button
              onClick={onOrderNow}
              className="hidden sm:block bg-primary px-5 py-2.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.18em] text-white hover:bg-primary/90 transition-all duration-200 cursor-pointer"
            >
              Order Now
            </button>

            {/* Mobile hamburger menu hidden, replaced by bottom nav */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hidden text-primary hover:text-primary hover:bg-primary/5 rounded-xl cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
