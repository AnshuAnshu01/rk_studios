import React from 'react';
import { PageHero } from './PageHero';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  ExternalLink, 
  MessageCircle, 
  Calendar,
  CheckCircle2,
  Compass,
  Youtube,
  Facebook,
  Instagram
} from 'lucide-react';

interface StudioMapPageProps {
  onOpenWhatsApp: (message?: string) => void;
  onOpenAppointmentModal: () => void;
}

export const StudioMapPage: React.FC<StudioMapPageProps> = ({
  onOpenWhatsApp,
  onOpenAppointmentModal
}) => {
  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] min-h-screen">
      {/* 1. Page Hero with Sacred Fire Glow & Moving Background Photos */}
      <PageHero
        badge="Visit Our Delhi Atelier"
        title="A Place for Memories,"
        titleHighlight="Shared Over Warm Chai"
        subtitle="Before booking, we invite couples and parents to hold the hand-stitched leather albums, see genuine print proofs under soft light, and talk about your family's story."
        primaryAction={{
          label: "Book Studio Visit",
          onClick: onOpenAppointmentModal
        }}
        secondaryAction={{
          label: "WhatsApp Directions",
          onClick: () => onOpenWhatsApp("Namaste! We are planning to visit RK Photo Studio in Rohini. Could you please share directions and landmark details?")
        }}
      />

      {/* 2. Google Maps & Location Sanctuary */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Interactive Google Map */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ded5c7] shadow-xl bg-white p-2.5 sm:p-3">
              {/* Map Iframe */}
              <div className="relative w-full h-[280px] sm:h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#e8e2d8]">
                <iframe
                  title="RK Photo Studio Google Map"
                  src="https://maps.google.com/maps?q=RK+Photo+Studio+Rohini+Sector+23+Delhi+110085&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter saturate-[0.95]"
                  loading="lazy"
                  allowFullScreen
                />
                
                {/* Floating Studio Pin Pill */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#ded5c7] shadow-md flex items-center gap-2 max-w-[90%]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-sans text-[11px] sm:text-xs font-semibold text-[#1c1c19] truncate">
                    RK Photo Studio • Rohini Sector 23
                  </span>
                </div>
              </div>

              {/* Action Bar below map */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h3 className="font-serif italic text-base sm:text-lg font-bold text-[#1c1c19]">
                    RK Photo &amp; Movies Production
                  </h3>
                  <p className="font-sans text-xs text-[#6b5847] mt-0.5 leading-relaxed">
                    Opposite SBI Bank, Main Market, Pooth Kalan, Rohini Sector 23, Delhi – 110085
                  </p>
                </div>

                <a
                  href="https://share.google/XGXzmI1VT65XaGW7H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-md shrink-0 cursor-pointer w-full sm:w-auto text-center"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#e8d5b7]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-white/70" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Thoughtful Visitor Information & Heritage */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Atelier Address & Details Card */}
            <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#ded5c7] shadow-lg bg-white space-y-5 sm:space-y-6">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-bold block mb-1">
                  ATELIER SANCTUARY
                </span>
                <h2 className="font-serif italic text-xl sm:text-2xl font-bold text-[#1c1c19]">
                  Visiting Our Studio
                </h2>
                <p className="font-sans text-xs text-[#5c4e3f] leading-relaxed mt-1.5 sm:mt-2">
                  Our bridal consulting lounge and archival gallery is located directly opposite the State Bank of India in Pooth Kalan, Rohini.
                </p>
              </div>

              <div className="space-y-3.5 sm:space-y-4 pt-2 border-t border-[#e8dfd2]">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#45123E]/10 border border-[#45123E]/20 flex items-center justify-center text-[#45123E] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7c6e5e] font-semibold block">
                      Physical Landmark
                    </span>
                    <span className="font-sans text-xs text-[#1c1c19] font-medium leading-relaxed block mt-0.5">
                      Opposite State Bank of India (SBI), Pooth Kalan, Rohini Sector 23, Delhi – 110085
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#45123E]/10 border border-[#45123E]/20 flex items-center justify-center text-[#45123E] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7c6e5e] font-semibold block">
                      Visiting Hours
                    </span>
                    <span className="font-sans text-xs text-[#1c1c19] font-medium leading-relaxed block mt-0.5">
                      Monday to Sunday: 9:00 AM – 9:00 PM IST
                    </span>
                    <span className="font-sans text-[10px] sm:text-[11px] text-[#775a19] block mt-0.5">
                      (Evening family consultations welcomed by appointment)
                    </span>
                  </div>
                </div>

                {/* Direct Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#45123E]/10 border border-[#45123E]/20 flex items-center justify-center text-[#45123E] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7c6e5e] font-semibold block">
                      Direct Concierge Line
                    </span>
                    <a
                      href="tel:+919212812625"
                      className="font-sans text-xs text-[#45123E] font-bold hover:underline block mt-0.5"
                    >
                      +91 92128 12625
                    </a>
                  </div>
                </div>

                {/* Verified Social Media Channels */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <a
                    href="https://www.youtube.com/@rkphotostudiorohinisector-23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff0000]/10 text-[#cc0000] border border-[#ff0000]/25 hover:bg-[#ff0000] hover:text-white transition-all text-xs font-sans font-medium"
                    title="Watch Wedding Films on YouTube"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </a>

                  <a
                    href="https://www.facebook.com/rkphotostudiorohinisector23/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/25 hover:bg-[#1877F2] hover:text-white transition-all text-xs font-sans font-medium"
                    title="Connect on Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://www.instagram.com/rkphotostudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4405F]/10 text-[#E4405F] border border-[#E4405F]/25 hover:bg-[#E4405F] hover:text-white transition-all text-xs font-sans font-medium"
                    title="Browse Instagram Archive"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-3.5 sm:pt-4 border-t border-[#e8dfd2] flex flex-col gap-2.5">
                <button
                  onClick={onOpenAppointmentModal}
                  className="w-full py-3.5 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <Calendar className="w-4 h-4 text-[#e8d5b7]" />
                  <span>Schedule an In-Person Sitting</span>
                </button>

                <button
                  onClick={() => onOpenWhatsApp("Pranam! We would love to book a consultation at your Rohini studio to view album samples.")}
                  className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Travel Guidance Note */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FAF5EB] border border-[#ded5c7] text-xs text-[#594d3f] space-y-2">
              <div className="flex items-center gap-2 font-sans font-bold text-[#45123E] text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#a78b71]" />
                <span>Travel Guidance for Families</span>
              </div>
              <p className="leading-relaxed font-sans text-[11px] text-[#635546]">
                Convenient street-level parking is readily available directly in front of the studio. Located a short 8-minute drive from Rithala Metro Station (Red Line) and easily accessible from Outer Ring Road.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
