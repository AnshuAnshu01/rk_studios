import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VisualAnthology } from './components/VisualAnthology';
import { ServicesPricing } from './components/ServicesPricing';
import { ReserveDates } from './components/ReserveDates';
import { SacredRitualsHub } from './components/SacredRitualsHub';
import { FamilyRsvpPortal } from './components/FamilyRsvpPortal';
import { StudioMapPage } from './components/StudioMapPage';
import { CookiePolicyPage } from './components/CookiePolicyPage';
import { TermsConditionsPage } from './components/TermsConditionsPage';
import { CookieBanner } from './components/CookieBanner';
import { LoadingScreen } from './components/LoadingScreen';
import { InvestmentTier } from './data/weddingData';
import { RKStudiosLogo } from './components/RKStudiosLogo';
import { AppointmentModal } from './components/AppointmentModal';
import { SmartphoneBottomNav } from './components/SmartphoneBottomNav';
import { 
  MessageCircle, 
  X, 
  Send, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  Volume2,
  VolumeX,
  Phone
} from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [activeScreen, setActiveScreen] = useState<string>('anthology');
  const [selectedTierForBooking, setSelectedTierForBooking] = useState<InvestmentTier | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppMsg, setWhatsAppMsg] = useState('Pranam! We would love to enquire regarding our family celebration dates and bespoke heirloom monographs.');
  const [whatsAppSent, setWhatsAppSent] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis for buttery-smooth, seamless scrolling across mobile, tablet, and web views
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.35,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Initial loading effect - page content will only reveal once loading finishes
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 500);
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Scroll to top when screen changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeScreen]);

  // Handle scroll progress and scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeScreen]);

  const handleSelectTier = (tier: InvestmentTier) => {
    setSelectedTierForBooking(tier);
    setActiveScreen('reserve');
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsAppMsg.trim()) return;
    setWhatsAppSent(true);
    setTimeout(() => {
      setWhatsAppSent(false);
      setIsWhatsAppOpen(false);
    }, 2500);
  };

  // During loading, show exclusively the LoadingScreen so hero section never peeks in the same view
  if (isLoading) {
    return <LoadingScreen isFading={isFadingOut} />;
  }

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#a78b71]/25 selection:text-[#45123E]">

      {/* Top Navigation Bar */}
      <Header 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
      />

      {/* Main Screen Content with comfortable bottom dock clearance on mobile */}
      <main className="flex-1 w-full pb-24 sm:pb-0">
        {(activeScreen === 'anthology' || activeScreen === 'gallery') && (
          <VisualAnthology 
            onSelectScreen={setActiveScreen} 
            onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
            onOpenWhatsApp={(msg) => {
              if (msg) setWhatsAppMsg(msg);
              setIsWhatsAppOpen(true);
            }}
          />
        )}

        {(activeScreen === 'services' || activeScreen === 'pricing') && (
          <ServicesPricing 
            onSelectTier={handleSelectTier} 
            onOpenWhatsApp={(msg) => {
              if (msg) setWhatsAppMsg(msg);
              setIsWhatsAppOpen(true);
            }}
          />
        )}

        {activeScreen === 'map' && (
          <StudioMapPage 
            onOpenWhatsApp={(msg) => {
              if (msg) setWhatsAppMsg(msg);
              setIsWhatsAppOpen(true);
            }}
            onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
          />
        )}

        {activeScreen === 'reserve' && (
          <ReserveDates 
            selectedTier={selectedTierForBooking} 
            onOpenWhatsApp={(msg) => {
              if (msg) setWhatsAppMsg(msg);
              setIsWhatsAppOpen(true);
            }}
          />
        )}

        {activeScreen === 'rituals' && (
          <SacredRitualsHub 
            onOpenRsvp={() => setActiveScreen('rsvp')}
          />
        )}

        {activeScreen === 'rsvp' && (
          <FamilyRsvpPortal 
            onOpenRituals={() => setActiveScreen('rituals')}
          />
        )}

        {activeScreen === 'cookies' && (
          <CookiePolicyPage 
            onNavigateHome={() => setActiveScreen('anthology')}
            onOpenWhatsApp={(msg) => {
              if (msg) setWhatsAppMsg(msg);
              setIsWhatsAppOpen(true);
            }}
          />
        )}

        {activeScreen === 'terms' && (
          <TermsConditionsPage 
            onNavigateHome={() => setActiveScreen('anthology')}
            onOpenWhatsApp={(msg) => {
              if (msg) setWhatsAppMsg(msg);
              setIsWhatsAppOpen(true);
            }}
          />
        )}
      </main>

      {/* Floating Action Controls - Discreet, elegant, and positioned above smartphone bottom nav */}
      <div className="fixed bottom-20 right-4 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Scroll To Top Button with Circular Border Filling on Scroll */}
        {showScrollTop && (
          <button 
            onClick={() => {
              if (lenisRef.current) {
                lenisRef.current.scrollTo(0, { duration: 1.15 });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="group relative w-11 h-11 flex items-center justify-center rounded-full bg-white/95 text-[#1c1c19] hover:text-[#45123E] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            title={`Scroll to top (${Math.round(scrollProgress)}%)`}
            aria-label="Scroll to top"
          >
            {/* SVG Circular Border Filling Progress Ring */}
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" 
              viewBox="0 0 44 44"
            >
              {/* Background track circle */}
              <circle
                cx="22"
                cy="22"
                r="19"
                fill="none"
                stroke="#e8ded0"
                strokeWidth="2.5"
              />
              {/* Animated filling progress circle */}
              <circle
                cx="22"
                cy="22"
                r="19"
                fill="none"
                stroke="#45123E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 19}
                strokeDashoffset={(2 * Math.PI * 19) - (scrollProgress / 100) * (2 * Math.PI * 19)}
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>

            {/* Inner Arrow Icon */}
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-[#45123E]" />

            {/* Subtle percentage tooltip on hover */}
            <span className="absolute right-13 px-2 py-1 rounded-md bg-[#1c1c19]/90 text-white text-[10px] tracking-wider font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              Top • {Math.round(scrollProgress)}%
            </span>
          </button>
        )}

        {/* Floating Phone Call CTA */}
        <a
          href="tel:+919212812625"
          className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white shadow-md hover:shadow-lg transition-all duration-300 border border-[#a78b71]/50 hover:scale-105 active:scale-95"
          title="Direct Phone Call: +91 92128 12625"
          aria-label="Call Studio at +91 92128 12625"
        >
          <Phone className="w-4 h-4 text-[#e8d5b7] fill-current" />
          {/* Subtle hover tooltip */}
          <span className="absolute right-12 px-2.5 py-1 rounded-md bg-[#1c1c19]/90 text-white text-[10px] tracking-wider font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Call Atelier: +91 92128 12625
          </span>
        </a>
      </div>

      {/* Own Luxury Appointment Booking Modal */}
      <AppointmentModal 
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      {/* WhatsApp Concierge Modal */}
      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FAF5EB] rounded-2xl sm:rounded-3xl overflow-hidden font-sans border border-[#ded5c7] shadow-2xl max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-[#45123E] text-white flex items-start justify-between border-b border-[#a78b71]/30 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-serif italic text-base sm:text-lg font-bold text-white tracking-wide">
                    RK Photo &amp; Movies Production
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#e8d5b7] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-ping" />
                    Senior Curator &amp; Family Liaison On Call
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsWhatsAppOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto">
              {whatsAppSent ? (
                <div className="py-6 sm:py-8 text-center space-y-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300">
                    <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h5 className="font-serif italic text-lg sm:text-xl font-bold text-[#1c1c19]">Dispatch Transmitted</h5>
                  <p className="text-xs text-[#594d3f] max-w-xs mx-auto leading-relaxed">
                    Your confidential celebration inquiry has been logged. Our Senior Atelier Master will ring your WhatsApp within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendWhatsApp} className="space-y-3.5 sm:space-y-4">
                  <div className="bg-[#f2ece2] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#ded5c7] text-xs text-[#594d3f] space-y-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#45123E]">
                      <span>Direct Studio &amp; WhatsApp</span>
                      <a href="tel:+919212812625" className="hover:underline">+91 92128 12625</a>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#6d5e4e]">
                      RK Photo Studio • Opposite SBI Bank, Pooth Kalan, Rohini Sector 23, Delhi – 110085.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase tracking-widest text-[#775a19] font-bold mb-1.5">
                      Your Message / Celebration Inquiry
                    </label>
                    <textarea
                      rows={3}
                      value={whatsAppMsg}
                      onChange={(e) => setWhatsAppMsg(e.target.value)}
                      className="w-full bg-white border border-[#ded5c7] rounded-xl p-2.5 sm:p-3 text-sm text-[#1c1c19] focus:border-[#45123E] focus:outline-none resize-none font-sans"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-[#7c6e5e] font-semibold">
                      Fast Celebration Inquiries
                    </label>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {[
                        'Check Auspicious Dates for 2026',
                        'Reserve "The Golden Heritage" Tier',
                        'Bespoke Silk Album Consult',
                        'Multi-City Royal Rituals Coverage'
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setWhatsAppMsg(`Pranam! I would like to inquire about: ${item}.`)}
                          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#45123E] text-[#594d3f] hover:text-white text-[10px] sm:text-[11px] border border-[#ded5c7] transition-colors cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Atelier</span>
                  </button>

                  <div className="text-center text-[9px] sm:text-[10px] text-[#7c6e5e] flex items-center justify-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>Average reply time: under 12 minutes (9 AM – 11 PM IST)</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Functional Interactive Cookie Consent Banner for New Visitors */}
      <CookieBanner onOpenPolicy={() => setActiveScreen('cookies')} />

      {/* Classical Archival Footer */}
      <Footer onNavigate={(screen) => setActiveScreen(screen)} />

      {/* Smartphone Bottom Navigation Dock with WhatsApp and Quick Menus */}
      <SmartphoneBottomNav 
        activeScreen={activeScreen}
        onNavigate={(screen) => setActiveScreen(screen)}
        onOpenWhatsApp={(msg) => {
          if (msg) setWhatsAppMsg(msg);
          setIsWhatsAppOpen(true);
        }}
        onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
      />
    </div>
  );
}
