import React, { useState } from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';
import { 
  MessageCircle, 
  Calendar, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currency?: 'INR' | 'USD';
  setCurrency?: (c: 'INR' | 'USD') => void;
  onOpenWhatsApp?: () => void;
  onOpenAppointmentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  setActiveScreen,
  onOpenWhatsApp,
  onOpenAppointmentModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'anthology', label: 'Visual Anthology', subtitle: 'Curated Plates & Gallery' },
    { id: 'services', label: 'Services & Products', subtitle: '74 Disciplines & Pricing' },
    { id: 'rituals', label: 'Sacred Rituals', subtitle: 'Family Lore & Pheras' },
    { id: 'rsvp', label: 'Family RSVP', subtitle: 'Guest Portal & Aashirwad' },
    { id: 'reserve', label: 'Reserve Dates', subtitle: 'Patron Booking & Consult' },
  ];

  const handleNavClick = (id: string) => {
    setActiveScreen(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Top Navbar in Light Studio Luxury Theme */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fcf9f4]/92 backdrop-blur-[14px] border-b border-[#e8e2d8] shadow-xs transition-all">
        <div className="w-full px-6 sm:px-8 lg:px-12 h-20 sm:h-22 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo using Updated Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('anthology')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
              aria-label="RK Photo & Movies Production Home"
            >
              {/* Official Updated Brand Logo */}
              <div className="transition-transform group-hover:scale-105">
                <RKStudiosLogo height={52} />
              </div>
            </button>
          </div>

          {/* Center-Aligned Links in 'Inter' (11px, uppercase, tracking-wide) */}
          <nav className="hidden xl:flex items-center gap-8 2xl:gap-10">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 font-sans text-[11px] uppercase tracking-[0.22em] font-semibold transition-all group whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#45123E]'
                      : 'text-[#615446] hover:text-[#1c1c19]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#45123E] via-[#a78b71] to-[#45123E] rounded-full shadow-xs" />
                  ) : (
                    <span className="absolute bottom-0 left-1/2 right-1/2 h-[1.5px] bg-[#a78b71] transition-all duration-300 group-hover:left-0 group-hover:right-0 opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Book Appointment Pill Button */}
            <button
              onClick={onOpenAppointmentModal}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-xs uppercase tracking-[0.16em] font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#e8d5b7]" />
            </button>

            {/* Mobile / Tablet Menu Button Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full text-[#45123E] hover:bg-[#efe8dd] transition-colors border border-[#ddd3c4]"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Navigation Scroll Strip */}
        <div className="xl:hidden flex items-center overflow-x-auto scrollbar-none px-4 py-2 bg-[#f4eee4] border-t border-[#e2d8cb] gap-2 text-[11px] font-sans">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap shrink-0 transition-all font-sans text-[11px] uppercase tracking-wider ${
                activeScreen === item.id
                  ? 'bg-[#45123E] text-white font-semibold shadow-xs'
                  : 'bg-white/80 text-[#544638] hover:text-[#1c1c19] border border-[#dcd1c2]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div className="w-full max-w-sm h-full bg-[#fcf9f4] border-l border-[#ded5c7] p-6 flex flex-col justify-between overflow-y-auto">
            {/* Top */}
            <div className="flex items-center justify-between pb-6 border-b border-[#e6ddd0]">
              <RKStudiosLogo height={44} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#6b5d4e] hover:text-[#1c1c19] hover:bg-[#efe8dc] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-6 space-y-2 flex-1">
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#775a19] mb-4">
                Atelier Portals
              </p>
              {navItems.map((item) => {
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex flex-col ${
                      isActive
                        ? 'bg-[#45123E] text-white shadow-sm'
                        : 'hover:bg-[#f3ece0] text-[#2c2621]'
                    }`}
                  >
                    <span className="font-serif italic text-base font-semibold">
                      {item.label}
                    </span>
                    <span className={`font-sans text-xs mt-0.5 ${isActive ? 'text-[#e8d5b7]' : 'text-[#7a6b5c]'}`}>
                      {item.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#e6ddd0] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                className="w-full py-3.5 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#e8d5b7]" />
                <span>Book Appointment</span>
              </button>

              <div className="text-center text-[11px] font-sans text-[#786a5a] tracking-wider pt-2">
                Rohini Sector 23, Delhi (Opp. SBI Bank) • +91 92128 12625
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
