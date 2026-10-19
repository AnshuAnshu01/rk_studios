import React, { useState } from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';
import { 
  MessageCircle, 
  Calendar, 
  Menu, 
  X, 
  Heart, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  PhoneCall, 
  Users,
  Star 
} from 'lucide-react';

interface HeaderProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  currency?: 'INR' | 'USD';
  setCurrency?: (c: 'INR' | 'USD') => void;
  onOpenWhatsApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  setActiveScreen,
  onOpenWhatsApp
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'anthology', label: 'Visual Anthology', subtitle: 'Curated Plates & Gallery' },
    { id: 'services', label: 'Services & Products', subtitle: '74 Disciplines, Framing & Gifts' },
    { id: 'rituals', label: 'Sacred Rituals', subtitle: 'Emotional Family Lore & Pheras' },
    { id: 'rsvp', label: 'Family RSVP & Blessings', subtitle: 'Guest Manager & Aashirwad Wall' },
    { id: 'reserve', label: 'Reserve Dates', subtitle: 'Patron Booking & Consultations' },
  ];

  const handleNavClick = (id: string) => {
    setActiveScreen(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 w-full z-50 bg-[#FCF9F4]/98 backdrop-blur-md border-b border-[#E5E0D5] shadow-xs transition-all">
        {/* Main Bar */}
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('anthology')}
              className="flex items-center text-left focus:outline-none transition-transform active:scale-95 group"
              aria-label="RK Studios Home"
            >
              {/* Official Brand Logo */}
              <div className="hidden sm:block">
                <RKStudiosLogo height={44} className="drop-shadow-xs" />
              </div>
              {/* Compact Logo on mobile screens */}
              <div className="sm:hidden flex items-center gap-2">
                <RKStudiosLogo height={34} className="drop-shadow-xs" />
              </div>
            </button>

            {/* Google Verified Review Badge */}
            <a
              href="https://share.google/XGXzmI1VT65XaGW7H"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F7F2EA] border border-[#DDD3C5] hover:border-[#C5A059] text-xs font-sans transition-colors"
              title="Google Verified Reviews (Rohini Sector 23)"
            >
              <span className="font-bold text-[#1C1C19]">4.9</span>
              <div className="flex text-[#F4B400]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-[#7C6E5E] font-medium hidden 2xl:inline">Google Reviews</span>
            </a>
          </div>

          {/* Desktop & Wide Tablet Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs font-serif tracking-widest uppercase">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 transition-all group whitespace-nowrap ${
                    isActive
                      ? 'text-[#45123E] font-bold'
                      : 'text-[#695D51] hover:text-[#1C1C19]'
                  }`}
                >
                  <span className="tracking-widest">{item.label}</span>
                  {isActive ? (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#45123E] via-[#EE9B42] to-[#45123E] rounded-full" />
                  ) : (
                    <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-[#EE9B42]/50 transition-all duration-300 group-hover:left-0 group-hover:right-0 opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Zone (WhatsApp, Quick Reserve, Menu Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Direct WhatsApp Concierge Button */}
            <button
              onClick={onOpenWhatsApp}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs tracking-wider uppercase font-semibold transition-all shadow-xs"
              title="Chat with Royal Concierge"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden lg:inline">WhatsApp</span>
            </button>

            {/* Quick Reserve Button for Desktop */}
            <button
              onClick={() => handleNavClick('reserve')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#45123E] hover:bg-[#340C2E] text-[#FFF6EE] font-serif text-xs tracking-widest uppercase transition-all shadow-xs border border-[#C5A059]/40"
            >
              <Calendar className="w-3.5 h-3.5 text-[#EE9B42]" />
              <span className="font-sans font-medium text-[11px]">Book Dates</span>
            </button>

            {/* Mobile / Tablet Menu Button Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-[#45123E] hover:bg-[#EFE7DC] transition-colors border border-[#DDD3C4]"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tablet Secondary Horizontal Sub-Nav Bar */}
        <div className="hidden md:flex xl:hidden w-full overflow-x-auto scrollbar-none border-t border-[#E8E1D5] bg-[#F7F2EA] px-4 py-2 justify-center gap-4 text-xs font-serif uppercase tracking-widest">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                activeScreen === item.id
                  ? 'bg-[#45123E] text-white font-semibold'
                  : 'text-[#605446] hover:text-[#1C1C19]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Sub-Nav Pills Scrollable on Small Phones */}
        <div className="md:hidden flex items-center overflow-x-auto scrollbar-none px-3 py-2 bg-[#F6F0E6] border-t border-[#E8E1D5] gap-2 text-[11px] font-sans tracking-tight">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 transition-all ${
                activeScreen === item.id
                  ? 'bg-[#45123E] text-white font-medium shadow-xs'
                  : 'bg-white/80 text-[#5F5245] border border-[#DDD3C5]'
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
          <div className="w-full max-w-sm h-full bg-[#FCF9F4] shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E0D7C9]">
            
            {/* Drawer Top */}
            <div className="p-6 border-b border-[#EAE3D7] flex items-center justify-between">
              <RKStudiosLogo height={32} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#6E6050] hover:bg-[#EFE8DE] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="p-6 space-y-3 flex-1">
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#9A8775]">
                Private Monograph &amp; Family Sanctuary
              </p>

              <div className="space-y-1 pt-2">
                {navItems.map((item) => {
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex flex-col ${
                        isActive
                          ? 'bg-[#45123E] text-white shadow-sm'
                          : 'hover:bg-[#EFE8DE] text-[#2C2621]'
                      }`}
                    >
                      <span className="font-serif text-base font-semibold tracking-wide">
                        {item.label}
                      </span>
                      <span className={`text-xs mt-0.5 ${isActive ? 'text-[#F5C78E]' : 'text-[#847565]'}`}>
                        {item.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 bg-[#F6F0E5] border-t border-[#E5DDD0] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Private Concierge</span>
              </button>

              <button
                onClick={() => handleNavClick('reserve')}
                className="w-full py-3 rounded-lg bg-[#45123E] text-white font-serif text-xs uppercase tracking-widest font-bold shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#EE9B42]" />
                <span>Reserve Auspicious Dates</span>
              </button>

              <div className="text-center text-[11px] text-[#7E7060] font-serif italic pt-1">
                Rohini Sector 23, Delhi (Opp. SBI Bank) • +91 92128 12625
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
