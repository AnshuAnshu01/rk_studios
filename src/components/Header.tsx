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

  const navItems = [
    { id: 'anthology', label: 'Home' },
    { id: 'pricing', label: 'Pricing & Collections' },
    { id: 'map', label: 'Studio & Maps' },
    { id: 'reserve', label: 'Reserve Dates' },
    { id: 'rituals', label: 'Sacred Rituals' },
  ];

  const handleNavClick = (id: string) => {
    setActiveScreen(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ========================================================= */}
      {/* MINIMAL TOP NAVBAR                                        */}
      {/* ========================================================= */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#e8e2d8] transition-all">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('anthology')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            aria-label="RK Photo & Movies Production Home"
          >
            <div className="transition-transform hover:scale-[1.02]">
              <RKStudiosLogo height={42} className="sm:hidden" />
              <RKStudiosLogo height={50} className="hidden sm:inline-flex" />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#45123E]'
                      : 'text-[#6b5847] hover:text-[#1c1c19]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#45123E] rounded-full" />
                  )}
                </button>
              );
            })}
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

            {/* Book Appointment CTA (Desktop) */}
            <button
              onClick={onOpenAppointmentModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-xs uppercase tracking-[0.16em] font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#e8d5b7]" />
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
          <div className="w-full max-w-xs sm:max-w-sm h-full bg-[#fcf9f4] border-l border-[#ded5c7] p-6 flex flex-col justify-between overflow-y-auto">
            
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#e6ddd0]">
              <RKStudiosLogo height={38} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#6b5847] hover:text-[#1c1c19] hover:bg-[#efe8dc] transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Minimal Nav Links for Smartphone */}
            <div className="py-6 space-y-1.5 flex-1">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#775a19] block mb-3 px-2">
                Navigation
              </span>
              
              {navItems.map((item) => {
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#45123E] text-white shadow-xs'
                        : 'hover:bg-[#f3ece0] text-[#1c1c19]'
                    }`}
                  >
                    <span className="font-serif italic text-base font-medium">
                      {item.label}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#e8d5b7]' : 'text-[#a78b71]'}`} />
                  </button>
                );
              })}
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
