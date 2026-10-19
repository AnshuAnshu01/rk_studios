import React from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';
import { BookOpen, Compass, Film, MapPin, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#F6F1E8] text-[#1C1C19] pt-14 pb-10 border-t border-[#E2DAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Crest Header in Footer */}
        <div className="flex flex-col items-center justify-center pb-12 mb-10 border-b border-[#E0D7CB] text-center">
          <div className="mb-4">
            <RKStudiosLogo height={52} className="drop-shadow-xs" />
          </div>
          <p className="font-serif italic text-base sm:text-lg text-[#5D4E3E] max-w-xl">
            “A sacred witness to unbroken vows, heartfelt tears at the Vidai, and generations united in timeless joy.”
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs font-serif uppercase tracking-widest text-[#8F7E6D]">
            <span>Rohini Sector 23, Delhi</span>
            <span>•</span>
            <span>Opposite SBI Bank</span>
            <span>•</span>
            <span>All-India Royal Nuptials</span>
          </div>
        </div>

        {/* 4 Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Column 1: Historical Monograph */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#45123E]">
              <BookOpen className="w-4 h-4 text-[#EE9B42]" />
              <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-[#45123E]">
                Sacred Monograph
              </span>
            </div>
            <h4 className="font-serif text-lg font-bold tracking-tight text-[#1C1C19]">
              Atelier Heritage
            </h4>
            <p className="font-serif text-sm text-[#54483C] leading-relaxed">
              Founded in pursuit of uncompromised classical grandeur, RK Studios curates bespoke visual heirlooms, sacred bridal rituals, and timeless wedding monographs inspired by royal Indian salon aesthetics and poetic human connection.
            </p>
            <div className="font-sans text-[10px] text-[#827160] tracking-widest uppercase mt-1">
              ANNO MMXXIV — ARCHIVE VOL. XII
            </div>
          </div>

          {/* Column 2: Navigation Portals */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#45123E]">
              <Compass className="w-4 h-4 text-[#EE9B42]" />
              <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-[#45123E]">
                Portals &amp; Hubs
              </span>
            </div>
            <h4 className="font-serif text-lg font-bold tracking-tight text-[#1C1C19]">
              Family &amp; Guest Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 font-serif text-sm text-[#4E4135]">
              <li>
                <button
                  onClick={() => onNavigate('anthology')}
                  className="flex items-center gap-2 hover:text-[#45123E] transition-colors text-left"
                >
                  <span className="text-[#EE9B42] text-[10px]">◆</span>
                  <span>Curated Haute Folios &amp; Anthology</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="flex items-center gap-2 hover:text-[#45123E] transition-colors text-left"
                >
                  <span className="text-[#EE9B42] text-[10px]">◆</span>
                  <span>Cinema, Services &amp; Studio Products</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rituals')}
                  className="flex items-center gap-2 hover:text-[#45123E] transition-colors text-left font-medium text-[#45123E]"
                >
                  <span className="text-[#EE9B42] text-[10px]">◆</span>
                  <span>Sacred Indian Wedding Rituals Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rsvp')}
                  className="flex items-center gap-2 hover:text-[#45123E] transition-colors text-left font-medium text-[#45123E]"
                >
                  <span className="text-[#EE9B42] text-[10px]">◆</span>
                  <span>Family RSVP &amp; Sacred Aashirwad Wall</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reserve')}
                  className="flex items-center gap-2 hover:text-[#45123E] transition-colors text-left"
                >
                  <span className="text-[#EE9B42] text-[10px]">◆</span>
                  <span>Patron Dossier &amp; Date Reservation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Archival Mediums */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#45123E]">
              <Film className="w-4 h-4 text-[#EE9B42]" />
              <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-[#45123E]">
                Mediums
              </span>
            </div>
            <h4 className="font-serif text-lg font-bold tracking-tight text-[#1C1C19]">
              Archival Standards
            </h4>
            <ul className="flex flex-col gap-2 font-serif text-sm text-[#54483C]">
              <li className="flex items-center gap-2">
                <span className="text-[#EE9B42] text-[10px]">◆</span>
                <span>Medium Format 6×7 Gelatin Film</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#EE9B42] text-[10px]">◆</span>
                <span>Arri Alexa 35 Haute Ciné Glass</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#EE9B42] text-[10px]">◆</span>
                <span>Hahnemühle 308gsm Deckled Rag</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#EE9B42] text-[10px]">◆</span>
                <span>Pure Silk Habotai &amp; Tuscan Vellum</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#EE9B42] text-[10px]">◆</span>
                <span>Museum Archival Carbon Pigment Inks</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Salon Protocol */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#45123E]">
              <MapPin className="w-4 h-4 text-[#EE9B42]" />
              <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-[#45123E]">
                Flagship Studio
              </span>
            </div>
            <h4 className="font-serif text-lg font-bold tracking-tight text-[#1C1C19]">
              RK Photo Studio — Delhi
            </h4>
            <p className="font-serif text-sm text-[#54483C] leading-snug">
              Opposite State Bank of India (SBI), Pooth Kalan, Sector 23, Rohini, Delhi – 110085.
            </p>
            <a
              href="https://share.google/XGXzmI1VT65XaGW7H"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#45123E] hover:underline font-semibold font-sans mt-0.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#EE9B42]" />
              <span>Google Maps Pin (Get Directions)</span>
            </a>
            <div className="bg-[#ECE4D8] p-3 rounded border border-[#DDD3C5] text-xs">
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#45123E] block mb-1 font-bold">
                [ STUDIO PROTOCOL ]
              </span>
              <p className="font-serif text-[#605244] leading-relaxed">
                Direct Line &amp; WhatsApp: +91 92128 12625. Studio consultations for wedding albums and bridal shoots available 7 days a week (10 AM – 8:30 PM).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#E0D7CB] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-serif text-[#78695A]">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="text-[#EE9B42] select-none text-base">¶</span>
            <p className="font-sans tracking-wide">
              © MMXXIV RK STUDIOS. ALL SACRED ARCHIVAL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 font-sans text-[11px] tracking-wider text-[#645749]">
            <span className="hover:text-[#45123E] cursor-pointer">Atelier Covenant</span>
            <span className="text-[#CCC0B0]">•</span>
            <span className="hover:text-[#45123E] cursor-pointer">Archival Preservation Policy</span>
            <span className="text-[#CCC0B0]">•</span>
            <span className="hover:text-[#45123E] cursor-pointer">Family RSVP Privacy Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
