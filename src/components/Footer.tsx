import React, { useState } from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';
import { 
  BookOpen, 
  Compass, 
  Film, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  Youtube,
  Facebook,
  Phone, 
  CheckCircle2,
  ExternalLink,
  Cookie,
  FileText
} from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [digestEmail, setDigestEmail] = useState('');
  const [digestSubscribed, setDigestSubscribed] = useState(false);

  const handleDigestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!digestEmail.trim()) return;
    setDigestSubscribed(true);
    setTimeout(() => {
      setDigestEmail('');
      setDigestSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#f5efe5] text-[#1c1c19] pt-14 sm:pt-20 pb-28 sm:pb-12 border-t border-[#e2d8cb] relative overflow-hidden font-sans">
      {/* Background warm radial ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#a78b71]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* 6-Column Desktop Grid for Grand Logo Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-8 pb-12 sm:pb-16 border-b border-[#ded3c2]">
          
          {/* Column 1: Grand Master Logo & Verified Social Media Channels */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="py-1">
              <RKStudiosLogo height={96} className="transition-transform duration-300 hover:scale-[1.02]" />
            </div>

            <p className="font-serif italic text-sm sm:text-base text-[#5d4f40] leading-relaxed mt-1 max-w-sm">
              “A sacred witness to unbroken vows, heartfelt tears at the Vidai, and generations united in timeless joy.”
            </p>

            {/* Social Media Links: YouTube, Facebook, Instagram, Google Maps, Phone */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <a
                href="https://www.youtube.com/@rkphotostudiorohinisector-23"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ded3c2] hover:border-[#ff0000] hover:text-[#ff0000] bg-white flex items-center justify-center transition-all shadow-2xs group"
                title="RK Photo Studio Official YouTube Channel"
              >
                <Youtube className="w-4 h-4 text-[#7c6e5e] group-hover:text-[#ff0000] transition-colors" />
              </a>

              <a
                href="https://www.facebook.com/rkphotostudiorohinisector23/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ded3c2] hover:border-[#1877F2] hover:text-[#1877F2] bg-white flex items-center justify-center transition-all shadow-2xs group"
                title="RK Photo Studio Official Facebook Page"
              >
                <Facebook className="w-4 h-4 text-[#7c6e5e] group-hover:text-[#1877F2] transition-colors" />
              </a>

              <a
                href="https://www.instagram.com/rkphotostudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ded3c2] hover:border-[#E4405F] hover:text-[#E4405F] bg-white flex items-center justify-center transition-all shadow-2xs group"
                title="Atelier Instagram Visual Archive"
              >
                <Instagram className="w-4 h-4 text-[#7c6e5e] group-hover:text-[#E4405F] transition-colors" />
              </a>

              <a
                href="https://share.google/XGXzmI1VT65XaGW7H"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#ded3c2] hover:border-[#45123E] hover:text-[#45123E] bg-white flex items-center justify-center transition-all shadow-2xs group"
                title="Google Verified Business Location"
              >
                <MapPin className="w-4 h-4 text-[#7c6e5e] group-hover:text-[#45123E] transition-colors" />
              </a>

              <a
                href="tel:+919212812625"
                className="w-9 h-9 rounded-full border border-[#ded3c2] hover:border-[#45123E] hover:text-[#45123E] bg-white flex items-center justify-center transition-all shadow-2xs group"
                title="Direct Phone Line: +91 92128 12625"
              >
                <Phone className="w-4 h-4 text-[#7c6e5e] group-hover:text-[#45123E] transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Portals & Policies */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] font-bold text-[#775a19]">
              Portals
            </span>
            <ul className="flex flex-col gap-2.5 font-sans text-xs tracking-wide text-[#594d3f]">
              <li>
                <button
                  onClick={() => onNavigate('anthology')}
                  className="hover:text-[#45123E] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#a78b71]">◆</span>
                  <span>Home &amp; Highlights</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#45123E] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#a78b71]">◆</span>
                  <span>Pricing &amp; Collections</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-[#45123E] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#a78b71]">◆</span>
                  <span>Studio &amp; Google Maps</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reserve')}
                  className="hover:text-[#45123E] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#a78b71]">◆</span>
                  <span>Reserve Dates</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookies')}
                  className="hover:text-[#45123E] transition-colors text-left flex items-center gap-1.5 cursor-pointer font-medium text-[#45123E]"
                >
                  <span className="text-[#a78b71]">◆</span>
                  <span>Cookie Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-[#45123E] transition-colors text-left flex items-center gap-1.5 cursor-pointer font-medium text-[#45123E]"
                >
                  <span className="text-[#a78b71]">◆</span>
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Archival Mediums */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] font-bold text-[#775a19]">
              Archival Craft
            </span>
            <ul className="flex flex-col gap-2 font-sans text-xs text-[#594d3f]">
              <li className="flex items-center gap-1.5">
                <span className="text-[#a78b71]">◆</span>
                <span>Hasselblad 100MP Stills</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#a78b71]">◆</span>
                <span>Arri Alexa 35 Cinema</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#a78b71]">◆</span>
                <span>Hahnemühle 308gsm Rag</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#a78b71]">◆</span>
                <span>Pure Silk Habotai Vellum</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#a78b71]">◆</span>
                <span>24K Gold Leaf Foil Binding</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Flagship Atelier & Location */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] font-bold text-[#775a19]">
              Flagship Studio
            </span>
            <div className="font-sans text-xs text-[#594d3f] space-y-1.5">
              <p className="text-[#1c1c19] font-bold">RK Photo &amp; Movies Production</p>
              <p className="leading-relaxed">
                Opposite State Bank of India (SBI), Pooth Kalan, Sector 23, Rohini, Delhi – 110085.
              </p>
              <a
                href="https://share.google/XGXzmI1VT65XaGW7H"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#45123E] font-semibold hover:underline transition-colors pt-1"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3 h-3 text-[#a78b71]" />
              </a>
              <div className="pt-2 text-[11px] text-[#775a19] font-medium">
                Call / WhatsApp: +91 92128 12625
              </div>
            </div>
          </div>

          {/* Column 5: Join Digest */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] font-bold text-[#775a19]">
              Join Digest
            </span>
            <p className="font-sans text-xs text-[#594d3f] leading-relaxed">
              Receive private invitations to seasonal monograph exhibitions, auspicious muhurat calendars, and bridal folios.
            </p>

            <form onSubmit={handleDigestSubmit} className="relative mt-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={digestEmail}
                  onChange={(e) => setDigestEmail(e.target.value)}
                  placeholder="Enter family email..."
                  required
                  className="w-full bg-white border border-[#ded3c2] focus:border-[#45123E] rounded-full pl-4 pr-12 py-3 text-xs text-[#1c1c19] placeholder-gray-400 focus:outline-none transition-all font-sans shadow-2xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-[#45123E] text-white hover:bg-[#340C2E] flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer"
                  title="Subscribe to Digest"
                >
                  <ArrowRight className="w-4 h-4 text-[#e8d5b7]" />
                </button>
              </div>

              {digestSubscribed && (
                <div className="mt-2 text-[11px] text-[#45123E] flex items-center gap-1 font-sans font-medium animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Honored. Your invitation dispatch has been logged.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Designed/Developed Bar */}
        <div className="pt-8 flex flex-col items-center justify-center gap-2 text-xs font-sans text-[#7a6b5c] text-center">
          
          {/* Centered Copyright */}
          <p className="tracking-widest uppercase text-[10px] font-medium leading-relaxed">
            © MMXXIV RK PHOTO &amp; MOVIES PRODUCTION. ALL RIGHTS RESERVED.
          </p>

          {/* Designed and Developed by */}
          <div className="font-sans text-[11px] tracking-wider text-[#5c4e3f]">
            <span>Designed and Developed by </span>
            <span className="font-bold text-[#45123E] tracking-normal hover:underline cursor-default">
              ACCustomLabs
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};
