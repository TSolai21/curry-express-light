import React from 'react';
import { Share2, Instagram, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

interface FooterProps {
  onNavigate?: (page: 'home' | 'menu' | 'admin', sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'menu' | 'admin', sectionId?: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, sectionId);
    }
  };

  return (
    <footer className="bg-primary text-white py-12 select-none border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-white/5">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex justify-center md:justify-start items-center gap-3">
              <img src={logo} alt="Curry Express Logo" className="h-16 w-auto object-contain" />
              <span className="font-serif text-xl font-bold text-[#DAC49C] tracking-tight">Curry Express</span>
            </div>
            <p className="font-sans text-xs text-white/50 max-w-xs leading-relaxed">
              Handcrafted Indian and Indo-Chinese cuisine, curated for modern cravings.
            </p>
          </div>

          {/* Simple Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 font-sans text-xs text-white/70">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-secondary transition-colors">
              Home
            </a>
            <a href="#menu" onClick={(e) => handleNavClick(e, 'menu')} className="hover:text-secondary transition-colors">
              Menu
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'home', '#contact')} className="hover:text-secondary transition-colors">
              Contact
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            <a
              href="#share"
              onClick={(e) => e.preventDefault()}
              className="text-white/60 hover:text-secondary transition-colors p-1"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4 stroke-[1.5]" />
            </a>
            <a
              href="#insta"
              onClick={(e) => e.preventDefault()}
              className="text-white/60 hover:text-secondary transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 stroke-[1.5]" />
            </a>
            <a
              href="mailto:catering@curryexpress.com"
              className="text-white/60 hover:text-secondary transition-colors p-1"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 stroke-[1.5]" />
            </a>
          </div>
        </div>

        {/* Bottom copyright strip */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-white/30">
          <p className="font-sans text-[10px] uppercase tracking-wider">
            © {new Date().getFullYear()} Curry Express. All rights reserved.
          </p>
          <div className="flex gap-6 font-sans text-[10px] uppercase tracking-wider">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-secondary transition-colors">
              Privacy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-secondary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
