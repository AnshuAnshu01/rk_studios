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
import { 
  MessageCircle, 
  X, 
  Send, 
  Heart, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState<string>('anthology');
  const [selectedTierForBooking, setSelectedTierForBooking] = useState<InvestmentTier | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppMsg, setWhatsAppMsg] = useState('Pranam! We would love to enquire regarding our family celebration dates and bespoke heirloom monographs.');
  const [whatsAppSent, setWhatsAppSent] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Minimal initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
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
    <div className="min-h-screen bg-[#FCF9F4] text-[#1C1C19] flex flex-col font-serif selection:bg-[#C5A059]/20 selection:text-[#5B1315]">
      {/* Top Navigation Bar */}
      <Header 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {activeScreen === 'anthology' && (
          <VisualAnthology 
            onSelectScreen={setActiveScreen} 
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

      {/* Floating Action Buttons & Concierge */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-[#1A1A18] text-[#FBF8F2] hover:bg-[#831818] flex items-center justify-center shadow-lg transition-all border border-[#C5A059]/30"
            title="Scroll to summit"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Ambient Shehnai & Sitar Button */}
        <button
          onClick={() => setIsAmbientPlaying(!isAmbientPlaying)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs uppercase tracking-widest font-sans transition-all shadow-md border ${
            isAmbientPlaying 
              ? 'bg-[#831818] text-[#FAF5EB] border-[#C5A059]' 
              : 'bg-[#FAF5EB]/95 text-[#6D5D4E] hover:text-[#1A1A18] border-[#E8DFD3]'
          }`}
          title="Sacred Wedding Ambiance"
        >
          {isAmbientPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-[#C5A059] animate-pulse" />
              <span className="font-medium text-[11px]">Shehnai & Tanpura Active</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#A89886]" />
              <span className="font-medium text-[11px]">Ambient Raga</span>
            </>
          )}
        </button>

        {/* Floating WhatsApp Concierge CTA */}
        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-sans text-xs tracking-wider uppercase font-semibold"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FAF5EB] rounded-full border-2 border-[#25D366]" />
          </div>
          <span className="hidden sm:inline">WhatsApp Concierge</span>
          <span className="text-[10px] bg-black/15 px-2 py-0.5 rounded-full lowercase font-normal">atelier online</span>
        </button>
      </div>

      {/* WhatsApp Concierge Modal */}
      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FAF5EB] border border-[#C5A059]/40 rounded-xl shadow-2xl overflow-hidden font-sans">
            {/* Modal Header */}
            <div className="bg-[#1A1A18] p-5 text-[#FAF5EB] flex items-start justify-between border-b border-[#C5A059]/30">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#F3EFE6] tracking-wide">
                    RK Studios Private Atelier
                  </h4>
                  <p className="text-[11px] text-[#A89886] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-ping" />
                    Senior Curator & Family Liaison On Call
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsWhatsAppOpen(false)}
                className="text-[#A89886] hover:text-[#FAF5EB] p-1 rounded-md transition-colors"
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
                  <h5 className="font-serif text-xl font-bold text-[#1A1A18]">Dispatch Transmitted</h5>
                  <p className="text-xs text-[#6D5D4E] max-w-xs mx-auto">
                    Your confidential celebration inquiry has been logged. Our Senior Atelier Master will ring your WhatsApp within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendWhatsApp} className="space-y-4">
                  <div className="bg-[#F2ECE1] p-3.5 rounded-lg border border-[#E0D4C3] text-xs text-[#5D5042] space-y-1">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-[#831818]">
                      <span>Direct Studio &amp; WhatsApp</span>
                      <a href="tel:+919212812625" className="hover:underline">+91 92128 12625</a>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      RK Photo Studio • Opposite SBI Bank, Pooth Kalan, Rohini Sector 23, Delhi – 110085.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#7C6E5E] font-medium mb-1.5">
                      Your Message / Celebration Inquiry
                    </label>
                    <textarea
                      rows={4}
                      value={whatsAppMsg}
                      onChange={(e) => setWhatsAppMsg(e.target.value)}
                      className="w-full bg-[#FBF8F2] border border-[#D5C7B3] rounded-md p-3 text-sm text-[#1A1A18] focus:border-[#831818] focus:outline-none resize-none font-serif"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest text-[#7C6E5E] font-medium">
                      Fast Celebration Inquiries
                    </label>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {[
                        'Check Auspicious Dates for 2026',
                        'Reserve "The Sovereign Dynasty" Tier',
                        'Bespoke Silk Album Consult',
                        'Multi-City Royal Rituals Coverage'
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setWhatsAppMsg(`Pranam! I would like to inquire about: ${item}.`)}
                          className="px-2.5 py-1 rounded bg-[#EAE2D5] hover:bg-[#D5C7B3] text-[#3E342B] text-[11px] transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-md bg-[#25D366] hover:bg-[#20b858] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Atelier</span>
                  </button>

                  <div className="text-center text-[10px] text-[#A89886] flex items-center justify-center gap-2">
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
