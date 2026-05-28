import React, { useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail('');
    }
  };

  const TikTokIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      width="20" 
      height="20" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  return (
    <footer className="bg-bg text-text-muted pt-24 pb-12 font-sans select-none border-t border-gold/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Main Footer Flex Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 pb-12 border-b border-gold/10">
          
          {/* Brand & Newsletter Col */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:pr-12">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Curry Express Logo" className="h-16 w-auto object-contain" />
              <span className="font-sans text-2xl text-text-cream tracking-widest uppercase">Curry Express</span>
            </div>
            
            <p className="font-sans text-sm text-text-muted leading-relaxed max-w-md">
              An immersive culinary journey. Experience the pinnacle of modern Indian and Chinese gastronomy.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full max-w-md gap-4 pt-4">
              <input 
                type="email" 
                placeholder="Join our mailing list" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent border-b border-text-muted/30 px-2 py-3 text-sm text-text-cream placeholder:text-text-muted outline-none focus:border-gold transition-colors text-center sm:text-left"
              />
              <button 
                type="submit"
                className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-bg font-sans text-xs uppercase tracking-[0.2em] px-8 py-3 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact & Socials */}
          <div className="lg:w-1/2 flex flex-col sm:flex-row justify-center sm:justify-start lg:justify-end items-center sm:items-start gap-12 lg:gap-24 w-full">
            
            {/* Contact */}
            <div className="space-y-6 text-center sm:text-left">
              <h4 className="font-sans text-sm uppercase tracking-[0.2em] text-text-cream">Contact</h4>
              <ul className="space-y-4 text-sm font-sans tracking-wide leading-relaxed text-text-muted">
                <li>
                  15190 Walden Rd<br/>
                  Montgomery, TX 77356
                </li>
                <li>
                  <a href="tel:+13468631124" className="hover:text-gold transition-colors">
                    +1 (346) 863-1124
                  </a>
                </li>
                <li className="text-gold pt-2">
                  Open Daily: 11:00 AM – 9:30 PM
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="space-y-6 text-center sm:text-left">
              <h4 className="font-sans text-sm uppercase tracking-[0.2em] text-text-cream">Follow Us</h4>
              <div className="flex justify-center sm:justify-start gap-6">
                <a href="#insta" className="text-text-muted hover:text-gold transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#facebook" className="text-text-muted hover:text-gold transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#tiktok" className="text-text-muted hover:text-gold transition-colors">
                  <TikTokIcon />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom copyright strip */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-xs tracking-wider text-text-muted/60">
            © {new Date().getFullYear()} Curry Express. All rights reserved.
          </p>
          
          <div className="flex justify-center gap-8 text-xs tracking-wider text-text-muted/60">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-text-cream transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-text-cream transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
