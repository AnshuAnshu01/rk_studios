import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VisualAnthology } from './components/VisualAnthology';
import { ServicesPricing } from './components/ServicesPricing';
import { ReserveDates } from './components/ReserveDates';
import { SacredRitualsHub } from './components/SacredRitualsHub';
import { FamilyRsvpPortal } from './components/FamilyRsvpPortal';
import { LoadingScreen } from './components/LoadingScreen';
import { InvestmentTier } from './data/weddingData';
import { RKStudiosLogo } from './components/RKStudiosLogo';
import { AppointmentModal } from './components/AppointmentModal';
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
  const [activeScreen, setActiveScreen] = useState<string>('anthology');
  const [selectedTierForBooking, setSelectedTierForBooking] = useState<InvestmentTier | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppMsg, setWhatsAppMsg] = useState('Pranam! We would love to enquire regarding our family celebration dates and bespoke heirloom monographs.');
  const [whatsAppSent, setWhatsAppSent] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top when screen changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeScreen]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#a78b71]/25 selection:text-[#45123E] bg-dots">
      {/* Top Navigation Bar */}
      <Header 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 w-full">
        {activeScreen === 'anthology' && (
          <VisualAnthology 
            onSelectScreen={setActiveScreen} 
            onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
            onOpenWhatsApp={(msg) => {
              if (msg) setWhatsAppMsg(msg);
              setIsWhatsAppOpen(true);
            }}
          />
        )}

        {activeScreen === 'services' && (
          <ServicesPricing 
            onSelectTier={handleSelectTier} 
            onOpenWhatsApp={(msg) => {
              if (msg) setWhatsAppMsg(msg);
              setIsWhatsAppOpen(true);
            }}
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
      </main>

      {/* Floating Action Controls - Discreet, elegant, and non-obtrusive */}
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-full bg-white/95 text-[#1c1c19] hover:bg-[#45123E] hover:text-white flex items-center justify-center shadow-md transition-all border border-[#ded5c7] active:scale-90 cursor-pointer"
            title="Scroll to summit"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
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
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#45123E]" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FAF5EB] rounded-3xl overflow-hidden font-sans border border-[#ded5c7] shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 bg-[#45123E] text-white flex items-start justify-between border-b border-[#a78b71]/30">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6 fill-current text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-serif italic text-lg font-bold text-white tracking-wide">
                    RK Photo &amp; Movies Production
                  </h4>
                  <p className="text-[11px] text-[#e8d5b7] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-ping" />
                    Senior Curator &amp; Family Liaison On Call
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsWhatsAppOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {whatsAppSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h5 className="font-serif italic text-xl font-bold text-[#1c1c19]">Dispatch Transmitted</h5>
                  <p className="text-xs text-[#594d3f] max-w-xs mx-auto leading-relaxed">
                    Your confidential celebration inquiry has been logged. Our Senior Atelier Master will ring your WhatsApp within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendWhatsApp} className="space-y-4">
                  <div className="bg-[#f2ece2] p-3.5 rounded-2xl border border-[#ded5c7] text-xs text-[#594d3f] space-y-1">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-bold text-[#45123E]">
                      <span>Direct Studio &amp; WhatsApp</span>
                      <a href="tel:+919212812625" className="hover:underline">+91 92128 12625</a>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#6d5e4e]">
                      RK Photo Studio • Opposite SBI Bank, Pooth Kalan, Rohini Sector 23, Delhi – 110085.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#775a19] font-bold mb-1.5">
                      Your Message / Celebration Inquiry
                    </label>
                    <textarea
                      rows={4}
                      value={whatsAppMsg}
                      onChange={(e) => setWhatsAppMsg(e.target.value)}
                      className="w-full bg-white border border-[#ded5c7] rounded-xl p-3 text-sm text-[#1c1c19] focus:border-[#45123E] focus:outline-none resize-none font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-[#7c6e5e] font-semibold">
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
                          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#45123E] text-[#594d3f] hover:text-white text-[11px] border border-[#ded5c7] transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Atelier</span>
                  </button>

                  <div className="text-center text-[10px] text-[#7c6e5e] flex items-center justify-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>Average reply time: under 12 minutes (9 AM – 11 PM IST)</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Classical Archival Footer */}
      <Footer onNavigate={(screen) => setActiveScreen(screen)} />
    </div>
  );
}
