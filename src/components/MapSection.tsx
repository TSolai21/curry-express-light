import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

interface MapSectionProps {
  onOrderNow: () => void;
}

export default function MapSection({ onOrderNow }: MapSectionProps) {
  return (
    <section id="contact" className="relative pt-16 pb-20 md:pt-20 md:pb-24 px-6 md:px-12 xl:px-20 bg-background-warm bg-dotted overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 text-left">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-primary/50 uppercase">
                  № 07 / GEOGRAPHIC DIRECTORY
                </span>
                <div className="h-[1px] w-12 bg-primary/20"></div>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary tracking-tight mt-2">
                Visit Our Kitchen
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="p-2 border border-primary/10 text-primary bg-white">
                  <MapPin className="w-4 h-4 stroke-[1.5]" />
                </span>
                <div>
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-1">
                    Location
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-primary/80 leading-relaxed">
                    15190 Walden Rd<br />Montgomery, TX 77356
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <span className="p-2 border border-primary/10 text-primary bg-white">
                  <Clock className="w-4 h-4 stroke-[1.5]" />
                </span>
                <div>
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-1">
                    Opening Hours
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-primary/80 leading-relaxed">
                    Open Daily: 11:00 AM – 9:30 PM
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <span className="p-2 border border-primary/10 text-primary bg-white">
                  <Phone className="w-4 h-4 stroke-[1.5]" />
                </span>
                <div>
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-1">
                    Contact
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-primary/80 leading-relaxed">
                    General: +1 (346) 863-1124<br />Catering: catering@curryexpress.com
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.querySelector('#menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary text-white px-6 py-4 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/95 transition-all border border-primary cursor-pointer"
              >
                Go to Menu Selection
              </button>
              <button
                onClick={onOrderNow}
                className="border border-primary/25 text-primary px-6 py-4 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/5 transition-colors cursor-pointer"
              >
                Order on DoorDash
              </button>
            </div>
          </div>

          {/* Right: Real Google Map Iframe inside perfect museum art frame */}
          <div className="lg:col-span-7 relative min-h-[400px] border border-primary/15 p-3.5 bg-white rounded-xl">
            <div className="w-full h-full border border-primary/10 relative overflow-hidden">
              <iframe
                title="Curry Express Location"
                src="https://maps.google.com/maps?q=15190%20Walden%20Rd,%20Montgomery,%20TX%2077356&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.6) contrast(1.02)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[16px] md:h-[24px] lg:h-[32px]"
          fill="#2B1E1A"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
