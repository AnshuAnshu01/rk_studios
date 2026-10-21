import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Phone
} from 'lucide-react';

interface SmartphoneBottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onOpenWhatsApp: (message?: string) => void;
  onOpenAppointmentModal: () => void;
}

export const SmartphoneBottomNav: React.FC<SmartphoneBottomNavProps> = ({
  activeScreen,
  onNavigate,
  onOpenWhatsApp,
  onOpenAppointmentModal
}) => {
  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-2xl border-t border-white/90 shadow-[0_-10px_35px_rgba(69,18,62,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] px-2 pt-2 pb-safe"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 8px), 8px)' }}
    >
      <div className="grid grid-cols-5 items-center justify-around gap-1 max-w-md mx-auto">
        
        {/* Tab 1: Anthology / Home */}
        <button
          onClick={() => onNavigate('anthology')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            activeScreen === 'anthology' || activeScreen === 'gallery'
              ? 'text-[#45123E]'
              : 'text-[#7c6e5e] hover:text-[#1c1c19]'
          }`}
          aria-label="View Anthology"
        >
          <div className={`p-1.5 rounded-full transition-transform ${
            activeScreen === 'anthology' ? 'bg-[#45123E]/10 scale-110' : ''
          }`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-sans font-medium tracking-tight mt-0.5">
            Anthology
          </span>
        </button>

        {/* Tab 2: Pricing & Monograph Tiers */}
        <button
          onClick={() => onNavigate('pricing')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            activeScreen === 'pricing' || activeScreen === 'services'
              ? 'text-[#45123E]'
              : 'text-[#7c6e5e] hover:text-[#1c1c19]'
          }`}
          aria-label="View Collections and Pricing"
        >
          <div className={`p-1.5 rounded-full transition-transform ${
            activeScreen === 'pricing' ? 'bg-[#45123E]/10 scale-110' : ''
          }`}>
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-sans font-medium tracking-tight mt-0.5">
            Monographs
          </span>
        </button>

        {/* Tab 3: CENTER HIGHLIGHT - WhatsApp Direct Concierge */}
        <button
          onClick={() => onOpenWhatsApp('Pranam! We would love to enquire regarding our family celebration dates and bespoke heirloom monographs.')}
          className="relative -top-3 flex flex-col items-center justify-center group focus:outline-none"
          aria-label="WhatsApp Studio Concierge"
        >
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#20b858] to-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 border-2 border-white transition-transform duration-300 group-hover:scale-110 active:scale-95">
            <MessageCircle className="w-6 h-6 fill-current text-white" />
          </div>
          <span className="text-[10px] font-sans font-bold text-[#1c1c19] tracking-tight mt-0.5">
            WhatsApp
          </span>
        </button>

        {/* Tab 4: Studio Map & Location */}
        <button
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            activeScreen === 'map'
              ? 'text-[#45123E]'
              : 'text-[#7c6e5e] hover:text-[#1c1c19]'
          }`}
          aria-label="Studio Location and Maps"
        >
          <div className={`p-1.5 rounded-full transition-transform ${
            activeScreen === 'map' ? 'bg-[#45123E]/10 scale-110' : ''
          }`}>
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-sans font-medium tracking-tight mt-0.5">
            Atelier
          </span>
        </button>

        {/* Tab 5: Reserve Dates */}
        <button
          onClick={() => onNavigate('reserve')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            activeScreen === 'reserve'
              ? 'text-[#45123E]'
              : 'text-[#7c6e5e] hover:text-[#1c1c19]'
          }`}
          aria-label="Reserve Wedding Dates"
        >
          <div className={`p-1.5 rounded-full transition-transform ${
            activeScreen === 'reserve' ? 'bg-[#45123E]/10 scale-110' : ''
          }`}>
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-sans font-medium tracking-tight mt-0.5">
            Reserve
          </span>
        </button>

      </div>
    </nav>
  );
};
