import React, { useState } from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';
import { 
  Menu, 
  X, 
  ArrowRight,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  Youtube,
  Facebook,
  Instagram
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Primary navigation matching reference design
  const primaryNavItems = [
    { id: 'anthology', label: 'Home' },
    { id: 'pricing', label: 'Pricing & Collections' },
    { id: 'map', label: 'Studio & Maps' },
    { id: 'reserve', label: 'Reserve Dates' },
    { id: 'rituals', label: 'Sacred Rituals' },
  ];

  // Secondary menus grouped in the minimal More dropdown (strictly without icons)
  const moreNavItems = [
    { id: 'rsvp', label: 'Family RSVP Portal' },
    { id: 'cookies', label: 'Cookie Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
  ];

  const handleNavClick = (id: string) => {
    setActiveScreen(id);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <>
      {/* ========================================================= */}
      {/* MINIMAL TOP NAVBAR                                        */}
      {/* ========================================================= */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/75 backdrop-blur-2xl border-b border-white/85 shadow-[0_4px_25px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo: LOGO|RK Studio in a single line */}
          <button
            onClick={() => handleNavClick('anthology')}
            className="flex items-center gap-1.5 sm:gap-2.5 text-left focus:outline-none cursor-pointer shrink-0 flex-nowrap"
            aria-label="RK Photo & Movies Production Home"
          >
            <div className="transition-transform hover:scale-[1.02] shrink-0">
              <RKStudiosLogo height={40} />
            </div>
            <span className="text-[#ded5c7] text-lg font-light select-none">|</span>
            <span className="font-serif italic text-xs sm:text-sm lg:text-base font-bold text-[#45123E] tracking-wide whitespace-nowrap">
              RK Studio
            </span>
          </button>

          {/* Redesigned Desktop Navigation Links - Kept Close Together in a Sleek Capsule */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#f3ece0]/70 p-1 rounded-full border border-[#ded5c7]/70 shadow-xs backdrop-blur-md">
            {primaryNavItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#45123E] text-white shadow-xs'
                      : 'text-[#6b5847] hover:text-[#1c1c19] hover:bg-white/70'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Minimal More Dropdown - Fits inside the tight capsule */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onMouseEnter={() => setMoreDropdownOpen(true)}
                className={`px-3 py-1.5 rounded-full font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  moreNavItems.some(i => i.id === activeScreen)
                    ? 'bg-[#45123E] text-white shadow-xs'
                    : 'text-[#6b5847] hover:text-[#1c1c19] hover:bg-white/70'
                }`}
              >
                <span>More</span>
                <span className="text-[7px] opacity-75">▼</span>
              </button>

              {/* Minimalist Floating Menu Panel */}
              {moreDropdownOpen && (
                <div 
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                  className="absolute top-full right-0 mt-3 w-52 glass-lucid border border-white/90 rounded-2xl shadow-2xl py-2 z-50 animate-cinematic backdrop-blur-2xl"
                >
                  {moreNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 text-[11px] font-sans uppercase tracking-widest transition-colors cursor-pointer block ${
                        activeScreen === item.id
                          ? 'bg-white/80 text-[#45123E] font-bold'
                          : 'text-[#594d3f] hover:text-[#1c1c19] hover:bg-white/60 font-medium'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Call Button for Mobile */}
            <a
              href="tel:+919212812625"
              className="lg:hidden p-2 rounded-full text-[#45123E] hover:bg-[#efe8dd] transition-colors border border-[#ddd3c4]"
              aria-label="Call Studio at +91 92128 12625"
              title="Call studio"
            >
              <Phone className="w-4 h-4 text-[#45123E]" />
            </a>

            {/* Book Appointment CTA (Desktop) - Styled identical to reference */}
            <button
              onClick={onOpenAppointmentModal}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#3b122d] hover:bg-[#2c0b20] text-white font-sans text-xs uppercase tracking-[0.16em] font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              BOOK APPOINTMENT
            </button>

            {/* Mobile Minimal Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-[#45123E] hover:bg-[#efe8dd] transition-colors border border-[#ddd3c4] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* REDESIGNED SMARTPHONE MENU DRAWER (Minimal & Elegant)     */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-cinematic">
          <div className="w-full max-w-xs sm:max-w-sm h-full bg-[#fcf9f4] border-l border-[#ded5c7] p-6 flex flex-col justify-between overflow-y-auto" data-lenis-prevent>
            
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#e6ddd0]">
              <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
                <RKStudiosLogo height={32} />
                <span className="text-[#ded5c7] text-lg font-light select-none">|</span>
                <span className="font-serif italic text-sm font-bold text-[#45123E] tracking-wide whitespace-nowrap">
                  RK Studio
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#6b5847] hover:text-[#1c1c19] hover:bg-[#efe8dc] transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Minimal Nav Links for Smartphone in Order of Landing Page */}
            <div className="py-4 space-y-1 flex-1 overflow-y-auto">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#775a19] block mb-2 px-2">
                Main Portals
              </span>
              
              {primaryNavItems.map((item) => {
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#45123E] text-white shadow-xs font-semibold'
                        : 'hover:bg-[#f3ece0] text-[#1c1c19]'
                    }`}
                  >
                    <span className="font-serif italic text-base">
                      {item.label}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#e8d5b7]' : 'text-[#a78b71]'}`} />
                  </button>
                );
              })}

              {/* Minimal More Menu for Smartphone (Without Icons) */}
              <div className="pt-4 mt-3 border-t border-[#e6ddd0] space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#775a19] block mb-2 px-2">
                  More
                </span>
                {moreNavItems.map((item) => {
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#45123E] font-bold bg-[#f3ece0]'
                          : 'text-[#6b5847] hover:text-[#1c1c19] font-medium'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-5 border-t border-[#e6ddd0] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                className="w-full py-3 rounded-full bg-[#45123E] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#e8d5b7]" />
                <span>Book In-Person Sitting</span>
              </button>

              <div className="pt-2 text-center text-xs font-sans text-[#786a5a] space-y-2">
                {/* Social Channels in Drawer */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <a
                    href="https://www.youtube.com/@rkphotostudiorohinisector-23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#ded5c7] hover:border-[#ff0000] text-[#ff0000] bg-white flex items-center justify-center transition-all"
                    title="YouTube Channel"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.facebook.com/rkphotostudiorohinisector23/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#ded5c7] hover:border-[#1877F2] text-[#1877F2] bg-white flex items-center justify-center transition-all"
                    title="Facebook Page"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.instagram.com/rkphotostudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#ded5c7] hover:border-[#E4405F] text-[#E4405F] bg-white flex items-center justify-center transition-all"
                    title="Instagram Archive"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                </div>

                <a
                  href="tel:+919212812625"
                  className="flex items-center justify-center gap-1.5 text-[#45123E] font-bold hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 92128 12625</span>
                </a>
                <p className="text-[11px] text-[#6d5e4e]">
                  Opposite SBI Bank, Pooth Kalan, Rohini Sector 23, Delhi
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
