import React, { useState } from 'react';
import { Instagram, Facebook, ChevronUp } from 'lucide-react';
import logo from '../assets/logo.png';

interface FooterProps {
  onNavigate?: (page: 'home' | 'menu' | 'admin', sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'menu' | 'admin', sectionId?: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail('');
    }
  };

  // Custom TikTok SVG since it might not be in all lucide-react versions
  const TikTokIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      width="16" 
      height="16" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  return (
    <footer className="bg-primary text-white/70 pt-12 pb-6 font-sans select-none border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          
          {/* Brand & Newsletter Col */}
          <div className="xl:col-span-5 flex flex-col items-start space-y-4 pr-0 xl:pr-12">
            <img src={logo} alt="Curry Express Logo" className="h-16 w-auto object-contain" />
            
            <p className="font-serif text-lg text-white/80 italic leading-relaxed max-w-sm">
              Where ancient spice routes meet the modern table — crafted for those who refuse to choose.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full gap-2 pt-1">
              <input 
                type="email" 
                placeholder="Join our mailing list" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#DAC49C]/50 transition-colors"
              />
              <button 
                type="submit"
                className="bg-[#DAC49C] hover:bg-[#c4af87] text-primary font-bold text-[11px] uppercase tracking-[0.1em] px-8 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Spacer */}
          <div className="hidden xl:block xl:col-span-1"></div>

          {/* Links Grid */}
          <div className="xl:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Explore */}
            <div className="space-y-4">
              <h4 className="font-sans text-[11px] uppercase font-bold tracking-[0.2em] text-[#DAC49C]">Explore</h4>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <a href="#menu" onClick={(e) => handleNavClick(e, 'menu')} className="hover:text-white transition-colors">
                    Full Menu
                  </a>
                </li>
                <li>
                  <a href="#offers" onClick={(e) => handleNavClick(e, 'home', '#offers')} className="hover:text-white transition-colors">
                    Offers & Deals
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => handleNavClick(e, 'home', '#about')} className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#gallery" onClick={(e) => handleNavClick(e, 'home', '#gallery')} className="hover:text-white transition-colors">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-sans text-[11px] uppercase font-bold tracking-[0.2em] text-[#DAC49C]">Contact</h4>
              <ul className="space-y-2 text-[13px] leading-relaxed">
                <li>
                  15190 Walden Rd<br/>
                  Montgomery, TX 77356
                </li>
                <li>
                  <a href="tel:+13468631124" className="hover:text-white transition-colors">
                    +1 (346) 863-1124
                  </a>
                </li>
                <li className="text-[#DAC49C] pt-2">
                  Open Daily: 11:00 AM – 9:30 PM
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="space-y-4">
              <h4 className="font-sans text-[11px] uppercase font-bold tracking-[0.2em] text-[#DAC49C]">Follow Us</h4>
              <div className="flex gap-2">
                <a href="#insta" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:bg-[#DAC49C] transition-all duration-300 border border-white/10 hover:border-transparent">
                  <Instagram className="w-4 h-4 stroke-[1.5]" />
                </a>
                <a href="#facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:bg-[#DAC49C] transition-all duration-300 border border-white/10 hover:border-transparent">
                  <Facebook className="w-4 h-4 stroke-[1.5]" />
                </a>
                <a href="#tiktok" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:bg-[#DAC49C] transition-all duration-300 border border-white/10 hover:border-transparent">
                  <TikTokIcon />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom copyright strip */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/40">
            © {new Date().getFullYear()} Curry Express. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-[11px] text-white/40">
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
