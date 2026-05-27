import { Home, Utensils, MessageSquare, Tag } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileBottomNavProps {
  currentPage: 'home' | 'menu' | 'admin';
  currentSection?: string;
  onNavigate: (page: 'home' | 'menu' | 'admin', sectionId?: string) => void;
  onOrderNow: () => void;
}

export default function MobileBottomNav({ currentPage, currentSection, onNavigate, onOrderNow }: MobileBottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, page: 'home' as const, section: undefined },
    { id: 'menu', label: 'Menu', icon: Utensils, page: 'menu' as const, section: undefined },
    { id: 'offers', label: 'Offers', icon: Tag, page: 'home' as const, section: '#offers' },
    { id: 'contact', label: 'Contact', icon: MessageSquare, page: 'home' as const, section: '#contact' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-[var(--sab)] bg-white/85 backdrop-blur-lg border-t border-primary/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] touch-none">
      <div className="flex justify-between items-center px-2 py-2 relative h-16">
        {/* Order Now FAB (Floating Action Button) centered */}
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 z-50">
          <button
            onClick={onOrderNow}
            className="w-14 h-14 bg-primary text-white rounded-full flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(43,30,26,0.3)] border-4 border-background-warm active:scale-95 transition-transform duration-200"
            aria-label="Order Now"
          >
            <span className="font-sans text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5">Order</span>
          </button>
        </div>

        {/* Tabs Grid */}
        <div className="w-full flex justify-between px-4">
          {/* Left Tabs */}
          <div className="flex w-[40%] justify-between pr-4">
            {navItems.slice(0, 2).map((item) => (
              <NavTab
                key={item.id}
                item={item}
                isActive={currentPage === item.page && (item.page === 'menu' || (!item.section && !currentSection))}
                onClick={() => onNavigate(item.page, item.section)}
              />
            ))}
          </div>

          {/* Right Tabs */}
          <div className="flex w-[40%] justify-between pl-4">
            {navItems.slice(2, 4).map((item) => (
              <NavTab
                key={item.id}
                item={item}
                isActive={currentPage === item.page && currentSection === item.section}
                onClick={() => onNavigate(item.page, item.section)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavTab({ item, isActive, onClick }: { item: any, isActive: boolean, onClick: () => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center w-12 h-12 active:scale-95 transition-transform duration-200 cursor-pointer"
    >
      <div className={`relative z-10 p-1.5 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-primary/40'}`}>
        <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
      </div>
      <span className={`text-[9px] font-sans font-bold transition-colors duration-200 ${isActive ? 'text-primary' : 'text-primary/40'}`}>
        {item.label}
      </span>
    </button>
  );
}
