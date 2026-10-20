import React, { useState } from 'react';
import { InvestmentTier } from '../data/weddingData';
import { Shield, Clock, Eye, MapPin, Phone, Mail, CheckCircle2, MessageCircle, Sparkles, ChevronDown, ExternalLink, Navigation } from 'lucide-react';
import { PageHero } from './PageHero';

interface ReserveDatesProps {
  initialTier?: InvestmentTier | null;
  selectedTier?: InvestmentTier | null;
  onOpenWhatsApp: (message?: string) => void;
  currency?: 'INR' | 'USD';
}

export const ReserveDates: React.FC<ReserveDatesProps> = ({
  initialTier,
  selectedTier,
  onOpenWhatsApp
}) => {
  const activeTier = selectedTier || initialTier;
  const [formData, setFormData] = useState({
    names: '',
    phone: '',
    email: '',
    dialogueChannel: 'WhatsApp Private Concierge',
    engagementType: activeTier ? `${activeTier.name} ${activeTier.nameHighlight}` : 'Multi-Day Royal Palatial Nuptials (3-5 Days)',
    dates: '',
    venue: '',
    assembly: 'Grand Assemblage (150 - 400 Guests)',
    allocation: activeTier ? `${activeTier.name} — Customized Proposal` : 'Comprehensive Photography & Cinematic Film Suite',
    narrative: '',
    requireNda: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] min-h-screen pb-16 font-sans">
      {/* 1. Page Hero with Glowing Fire Background & Photos Moving Left to Right */}
      <PageHero
        badge="Direct Studio Consultation"
        title="Reserve Your Celebration"
        titleHighlight="With Heartfelt Devotion"
        subtitle="Every couple has their own cadence, every family their own beloved rituals. Tell us about your auspicious dates, and let us prepare a timeless visual heirloom for you."
        primaryAction={{
          label: "Inquire via WhatsApp",
          onClick: () => onOpenWhatsApp("Pranam! We would love to reserve our wedding dates and schedule a consultation.")
        }}
        secondaryAction={{
          label: "Direct Call (+91 92128 12625)",
          onClick: () => window.open('tel:+919212812625')
        }}
      />

      {/* Main Reservation Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Form & Protocols (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#ded5c7] shadow-lg relative text-[#1c1c19]">
              {/* Stepper Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-6 bg-[#f6f3ee] p-3 rounded-xl border border-[#e5e2dd]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#775a19] text-white flex items-center justify-center font-numeral text-xs font-bold rounded-full">
                    I
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-[11px] uppercase tracking-wider text-[#1c1c19] font-bold">
                      I. Patron Details
                    </span>
                    <span className="font-serif text-[11px] text-[#615e5c]">Lineage &amp; Coordinates</span>
                  </div>
                </div>
                <span className="text-[#d1c5b4] hidden md:inline">❖</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#ebe8e3] text-[#765a25] flex items-center justify-center font-numeral text-xs font-bold">
                    II
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-[11px] uppercase tracking-wider text-[#7f7667]">
                      II. Scope
                    </span>
                    <span className="font-serif text-[11px] text-[#7f7667]">Estate, Guests &amp; Scale</span>
                  </div>
                </div>
                <span className="text-[#d1c5b4] hidden md:inline">❖</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#ebe8e3] text-[#765a25] flex items-center justify-center font-numeral text-xs font-bold">
                    III
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-[11px] uppercase tracking-wider text-[#7f7667]">
                      III. Narrative
                    </span>
                    <span className="font-serif text-[11px] text-[#7f7667]">Poetics &amp; Vision</span>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Section I */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline text-lg text-[#1c1c19] font-semibold">
                      Patron Dossier Credentials
                    </h3>
                    <span className="font-headline text-[11px] uppercase tracking-wider text-[#775a19] font-medium">
                      [ CONFIDENTIAL ARCHIVE ]
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Full Legal Name(s) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.names}
                        onChange={e => setFormData({ ...formData, names: e.target.value })}
                        placeholder="Lady Catherine & Lord Sterling"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base placeholder:text-[#7f7667]/70 focus:outline-none focus:border-[#775a19] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Direct WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 (0) 98765 43210"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base placeholder:text-[#7f7667]/70 focus:outline-none focus:border-[#775a19] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Primary Archival Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="patron@dynasty.co.in"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base placeholder:text-[#7f7667]/70 focus:outline-none focus:border-[#775a19] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Preferred Channel of Dialogue
                      </label>
                      <select
                        value={formData.dialogueChannel}
                        onChange={e => setFormData({ ...formData, dialogueChannel: e.target.value })}
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base focus:outline-none focus:border-[#775a19] transition-colors"
                      >
                        <option>WhatsApp Private Concierge</option>
                        <option>Private Residence Audience (South Mumbai)</option>
                        <option>Encrypted Telegram Dispatch</option>
                        <option>Bespoke Diplomatic Courier Delivery</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section II */}
                <div className="flex flex-col gap-4 pt-4 border-t border-[#e5e2dd]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline text-lg text-[#1c1c19] font-semibold">
                      Commission Scope &amp; Scale
                    </h3>
                    <span className="font-numeral text-xs text-[#7f7667] uppercase tracking-wider">
                      SEC. II
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Type of Engagement *
                      </label>
                      <select
                        value={formData.engagementType}
                        onChange={e => setFormData({ ...formData, engagementType: e.target.value })}
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base focus:outline-none focus:border-[#775a19] transition-colors"
                      >
                        <option>Multi-Day Royal Palatial Nuptials (3-5 Days)</option>
                        <option>Destination Chateau Tableau &amp; Fine Art Film</option>
                        <option>Pre-Wedding Haute Cinéma Monograph</option>
                        <option>Editorial Courtly Portrait Commission (Atelier Studio)</option>
                        <option>Heirloom Legacy Silk Folio Documentation</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Commencement Dates / Season *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.dates}
                        onChange={e => setFormData({ ...formData, dates: e.target.value })}
                        placeholder="e.g. 18th - 22nd December 2026"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base placeholder:text-[#7f7667]/70 focus:outline-none focus:border-[#775a19] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Palace / Venue Estate
                      </label>
                      <input
                        type="text"
                        value={formData.venue}
                        onChange={e => setFormData({ ...formData, venue: e.target.value })}
                        placeholder="Umaid Bhawan, Taj Lake, or Lake Como"
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base placeholder:text-[#7f7667]/70 focus:outline-none focus:border-[#775a19] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Estimated Assembly
                      </label>
                      <select
                        value={formData.assembly}
                        onChange={e => setFormData({ ...formData, assembly: e.target.value })}
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base focus:outline-none focus:border-[#775a19] transition-colors"
                      >
                        <option>Intimate Cloister (Under 75 Patrons)</option>
                        <option>Grand Assemblage (150 - 400 Guests)</option>
                        <option>Imperial Gala (500+ Guests)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                        Coverage &amp; Production Scope
                      </label>
                      <select
                        value={formData.allocation}
                        onChange={e => setFormData({ ...formData, allocation: e.target.value })}
                        className="w-full bg-[#f6f3ee] border border-[#d1c5b4]/60 px-3 py-2 text-[#1c1c19] font-serif text-base focus:outline-none focus:border-[#775a19] transition-colors"
                      >
                        <option>Full Multi-Day Nuptials (Sangeet, Pheras &amp; Reception)</option>
                        <option>Single Day Wedding &amp; Candid Portraiture</option>
                        <option>Pre-Wedding Romance Shoot &amp; Theatrical Film</option>
                        <option>Master Atelier Suite (Dual Drones, Cinema &amp; 3 Albums)</option>
                        <option>Custom Studio Shoot / Framing / Restoration Project</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section III */}
                <div className="flex flex-col gap-2 pt-4 border-t border-[#e5e2dd]">
                  <div className="flex items-center justify-between">
                    <label className="font-headline text-xs uppercase tracking-wider text-[#1c1c19]">
                      Creative Narrative &amp; Atmospheric Vision
                    </label>
                    <span className="font-serif italic text-xs text-[#765a25]">
                      Descriptive Tableau
                    </span>
                  </div>

                  {/* Corner Ornate Frame Container */}
                  <div className="relative bg-[#f6f3ee] p-3 border border-[#d1c5b4]/50">
                    <span className="absolute top-2 left-2 text-[#c5a059] select-none text-xs">⌜</span>
                    <span className="absolute top-2 right-2 text-[#c5a059] select-none text-xs">⌝</span>
                    <span className="absolute bottom-2 left-2 text-[#c5a059] select-none text-xs">⌞</span>
                    <span className="absolute bottom-2 right-2 text-[#c5a059] select-none text-xs">⌟</span>
                    <textarea
                      rows={4}
                      value={formData.narrative}
                      onChange={e => setFormData({ ...formData, narrative: e.target.value })}
                      placeholder="Detail the poetics of your celebration: lighting desires (candlelit baroque, golden hour medium-format analog), attire designers (Sabyasachi, Tarun Tahiliani, Valentino), orchestral arrangements, or sentimental relics to memorialize..."
                      className="w-full bg-transparent p-2 text-[#1c1c19] font-serif text-base placeholder:text-[#7f7667]/70 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* NDA Covenant Checkbox */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f6f3ee] p-4 border border-[#e5e2dd]">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.requireNda}
                      onChange={e => setFormData({ ...formData, requireNda: e.target.checked })}
                      className="mt-1 accent-[#775a19]"
                    />
                    <span className="font-serif text-xs text-[#4e4639] leading-tight">
                      Require Execution of Bilateral Non-Disclosure Covenant (NDA) prior to salon consultations.
                    </span>
                  </label>
                  <div className="flex items-center gap-1.5 text-[#775a19] shrink-0">
                    <Shield className="w-4 h-4 text-[#775a19]" />
                    <span className="font-headline text-[11px] uppercase tracking-wider text-[#7f7667]">
                      100% Confidential
                    </span>
                  </div>
                </div>

                {/* Submission Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 bg-[#1c1c19] text-[#c5a059] hover:bg-[#31302d] transition-all px-8 py-3.5 flex items-center justify-center gap-2 font-headline text-xs uppercase tracking-widest font-bold shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Transmit Booking Commission</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenWhatsApp("I would like to inquire about reserving my wedding dates with the Chief Concierge.")}
                    className="w-full sm:w-auto bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] px-6 py-3.5 flex items-center justify-center gap-2 border border-[#d1c5b4] font-headline text-xs uppercase tracking-widest transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#775a19]" />
                    <span>Direct WhatsApp Concierge</span>
                  </button>
                </div>

                {/* Success Notification Drawer */}
                {submitted && (
                  <div className="bg-[#f0ede9] p-5 border border-[#c5a059] shadow-sm flex flex-col gap-2 transition-all">
                    <div className="flex items-center gap-2 text-[#775a19]">
                      <CheckCircle2 className="w-5 h-5 text-[#775a19]" />
                      <span className="font-headline text-base text-[#1c1c19] font-bold">
                        Dossier Registered with Distinction
                      </span>
                    </div>
                    <p className="font-serif text-sm text-[#4e4639] leading-relaxed">
                      Your commission monograph has been placed before our Master Curator. Our Senior Salon Secretary will contact your liaison within 24 standard hours via telephone or WhatsApp.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Protocol & Guarantee Strip */}
            <div className="bg-[#f6f3ee] p-6 border border-[#d1c5b4]/60 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#775a19]">
                <Clock className="w-4 h-4 text-[#775a19]" />
                <span className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-semibold">
                  Archival Protocol &amp; Guarantee
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="font-headline text-base text-[#1c1c19] font-semibold">
                    24 Hours
                  </span>
                  <span className="font-headline text-[10px] uppercase tracking-wider text-[#7f7667]">
                    Liaison Confirmation
                  </span>
                  <p className="font-serif text-xs text-[#4e4639] mt-1 leading-relaxed">
                    Rapid confidential verification of dates and schedule integrity.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-headline text-base text-[#1c1c19] font-semibold">
                    Strict NDA
                  </span>
                  <span className="font-headline text-[10px] uppercase tracking-wider text-[#7f7667]">
                    VIP Discretion Protocol
                  </span>
                  <p className="font-serif text-xs text-[#4e4639] mt-1 leading-relaxed">
                    Absolute security for public figures, royal dynasties, and private estates.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-headline text-base text-[#1c1c19] font-semibold">
                    1-on-1 Salon
                  </span>
                  <span className="font-headline text-[10px] uppercase tracking-wider text-[#7f7667]">
                    Tasting &amp; Physical Proofs
                  </span>
                  <p className="font-serif text-xs text-[#4e4639] mt-1 leading-relaxed">
                    In-person viewing of hand-bound calfskin and gilded parchment folios.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Atelier Coordinates & Consultations (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Atelier Coordinates Card */}
            <div className="bg-white p-6 border border-[#d1c5b4]/70 shadow-md flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-semibold">
                    Studio Coordinates
                  </span>
                  <span className="font-numeral text-xs text-[#7f7667]">
                    DEL • IN
                  </span>
                </div>
                <h2 className="font-headline text-2xl text-[#1c1c19] mt-1">
                  RK Photo Studio — Flagship Atelier
                </h2>
                <p className="font-serif text-sm text-[#4e4639] leading-relaxed">
                  Located in Rohini Sector 23, Delhi, our specialized bridal studio and portrait salon welcomes celebrating couples and families to explore curated wedding monographs, hand-bound leather albums, and sacred ritual cinema.
                </p>
              </div>

              {/* Google Maps Visual & Directions Card */}
              <div className="relative w-full rounded-lg overflow-hidden border border-[#d1c5b4]/80 shadow-md bg-[#FAF5EB]">
                {/* Map Visual Banner */}
                <div className="relative h-56 w-full bg-[#E5DFD5]">
                  <iframe
                    title="RK Photo Studio Location Map"
                    src="https://maps.google.com/maps?q=RK+Photo+Studio+Rohini+Sector+23+Delhi+110085&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter saturate-90 contrast-95"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C1C19]/90 text-white px-3 py-1 text-[11px] font-sans tracking-wide rounded shadow flex items-center gap-1.5 backdrop-blur-xs">
                    <span className="w-2 h-2 rounded-full bg-[#EE9B42] animate-ping" />
                    <span>Sector 23, Rohini, Delhi</span>
                  </div>
                </div>

                {/* Direct Google Maps Action Bar */}
                <div className="p-4 bg-[#FCF9F4] border-t border-[#E5E0D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#1C1C19] block">
                      RK Photo Studio
                    </span>
                    <span className="font-sans text-xs text-[#6B5C4B]">
                      Opposite SBI Bank, Pooth Kalan, Rohini Sector 23
                    </span>
                  </div>
                  <a
                    href="https://share.google/XGXzmI1VT65XaGW7H"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#45123E] hover:bg-[#320C2D] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded shadow transition-all shrink-0"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#EE9B42]" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Contact Information List */}
              <div className="flex flex-col gap-4 bg-[#f6f3ee] p-4 border border-[#e5e2dd]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white border border-[#d1c5b4]/60 flex items-center justify-center text-[#775a19] mt-0.5 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-[10px] uppercase tracking-widest text-[#7f7667]">
                      Official Studio Address
                    </span>
                    <span className="font-serif text-sm text-[#1c1c19] font-medium leading-snug">
                      Opposite State Bank of India (SBI), Pooth Kalan, Sector 23, Rohini, Delhi – 110085
                    </span>
                    <a
                      href="https://share.google/XGXzmI1VT65XaGW7H"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs text-[#775a19] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>View pin location on Google Maps (share.google/XGXzmI1VT65XaGW7H)</span>
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white border border-[#d1c5b4]/60 flex items-center justify-center text-[#775a19] mt-0.5 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-[10px] uppercase tracking-widest text-[#7f7667]">
                      Direct Telephone &amp; WhatsApp Line
                    </span>
                    <a
                      href="tel:+919212812625"
                      className="font-numeral text-sm text-[#1c1c19] font-semibold hover:text-[#775a19] transition-colors"
                    >
                      +91 92128 12625
                    </a>
                    <span className="font-serif text-xs text-[#7f7667]">
                      Studio Hours: 10:00 AM to 8:30 PM (Open 7 Days a week)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white border border-[#d1c5b4]/60 flex items-center justify-center text-[#775a19] mt-0.5 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-[10px] uppercase tracking-widest text-[#7f7667]">
                      Wedding Commission Desk
                    </span>
                    <a
                      href="mailto:rkphotostudio23@gmail.com"
                      className="font-serif text-sm text-[#1c1c19] hover:text-[#775a19] transition-colors"
                    >
                      rkphotostudio23@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Audience Protocol */}
              <div className="bg-[#f0ede9] p-4 border border-[#d1c5b4]/50 flex flex-col gap-1">
                <span className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-bold">
                  Studio Visits &amp; Family Consultations
                </span>
                <p className="font-serif text-xs text-[#4e4639] leading-relaxed">
                  In honoring the complete privacy of our celebrating couples, our doors do not accept casual walk-ins. Every salon inspection must be scheduled through this digital portal or with our Chief Concierge.
                </p>
              </div>
            </div>

            {/* Curator Consultations FAQs */}
            <div className="bg-white p-6 border border-[#d1c5b4]/70 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#e5e2dd]">
                <span className="font-headline text-xs uppercase tracking-widest text-[#775a19] font-semibold">
                  Curator Consultations
                </span>
                <span className="font-headline text-xs text-[#7f7667]">FAQ</span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    q: 'How far in advance are bridal dates secured?',
                    a: 'Most patrons secure royal nuptial dates twelve to eighteen months prior. For bespoke European destinations (Lake Como, Swiss Alps, French Riviera), international travel clearances require minimum six months notice.'
                  },
                  {
                    q: 'Do you accommodate global overseas expeditions?',
                    a: 'Universally. Our full master cinematography unit travels with custom pelican cases containing medium-format Hasselblads, Arri cine lenses, and 35mm film scanners to any sanctuary worldwide.'
                  },
                  {
                    q: 'How are physical heirloom volumes fabricated?',
                    a: 'Each monograph is hand-bound in Florence, Italy, utilizing deckled Japanese cotton rag paper and 100% pure pigment ink that endures over two centuries without chromatic degradation.'
                  }
                ].map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-[#f6f3ee] border border-[#e5e2dd] p-3 cursor-pointer"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <div className="flex items-center justify-between text-sm font-headline text-[#1c1c19]">
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-[#775a19] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                      {isOpen && (
                        <p className="font-serif text-xs text-[#4e4639] pt-2 border-t border-[#e5e2dd]/60 mt-2 leading-relaxed">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Eternal Story Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#f6f3ee] border-t border-[#e5e2dd] mt-8 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[#775a19]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-headline text-xs uppercase tracking-widest text-[#775a19]">
              The Archival Heritage
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl text-[#1c1c19]">
            Let us craft your{' '}
            <span className="font-script text-[#c5a059] font-normal text-[1.3em] inline-block">
              Eternal Story
            </span>
          </h2>

          <p className="font-serif text-base text-[#4e4639] leading-relaxed max-w-xl">
            From the gentle unfurling of antique zardozi veils to the sweeping drama of palatial courtyard fireworks, nothing is fleeting when captured with reverence.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 font-numeral text-xs text-[#7f7667] uppercase tracking-widest">
            <span>Analog 120 Film</span>
            <span className="text-[#d1c5b4]">•</span>
            <span>Haute Cinéma</span>
            <span className="text-[#d1c5b4]">•</span>
            <span>Gilded Folios</span>
          </div>
        </div>
      </section>
    </div>
  );
};
