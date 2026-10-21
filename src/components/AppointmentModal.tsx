import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight
} from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Royal Wedding & Pheras'
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: initialService,
    preferredDate: '',
    preferredTime: 'Evening (5:00 PM - 8:00 PM)',
    cityVenue: '',
    scale: 'Grand Nuptials (150 - 500 Guests)',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name or couple names.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your WhatsApp or phone number.');
      return;
    }

    // Format rich WhatsApp message
    const lines = [
      `👑 *NEW APPOINTMENT BOOKING REQUEST* 👑`,
      `*Studio:* RK Photo & Movies Production`,
      ``,
      `👤 *Couple / Patron:* ${formData.fullName.trim()}`,
      `📱 *Phone / WhatsApp:* ${formData.phone.trim()}`,
      formData.email.trim() ? `📧 *Email:* ${formData.email.trim()}` : null,
      `💍 *Ceremony Type:* ${formData.eventType}`,
      formData.preferredDate ? `📅 *Preferred Date:* ${formData.preferredDate}` : null,
      `⏰ *Preferred Time:* ${formData.preferredTime}`,
      formData.cityVenue.trim() ? `📍 *City / Venue:* ${formData.cityVenue.trim()}` : null,
      `👥 *Celebration Scale:* ${formData.scale}`,
      formData.notes.trim() ? `📝 *Special Notes:* ${formData.notes.trim()}` : null,
      ``,
      `_Requested via RK Studios Online Appointment Portal_`
    ].filter(Boolean);

    const whatsappMessage = lines.join('\n');
    const targetPhone = '919212812625';
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md transition-opacity duration-300 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#fcf9f4] rounded-2xl sm:rounded-3xl border border-[#ded5c7] shadow-2xl overflow-hidden my-auto animate-cinematic transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Background Bar */}
        <div className="relative px-4 sm:px-8 pt-5 sm:pt-7 pb-4 sm:pb-6 border-b border-[#e6ded2] bg-gradient-to-r from-[#fbf7f0] via-[#f7f0e4] to-[#fbf7f0]">
          {/* Subtle Ambient Halo */}
          <div className="absolute top-0 right-1/4 w-64 h-32 bg-[#c5a059]/15 blur-3xl pointer-events-none rounded-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-[#45123E] text-[#594d3f] hover:text-white border border-[#ded5c7] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 z-20"
            aria-label="Close appointment modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Atelier Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/90 border border-[#ded5c7] text-[#775a19] text-[9px] font-sans font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>BESPOKE APPOINTMENT ATELIER</span>
          </div>

          <h2 
            id="appointment-modal-title"
            className="font-serif italic text-xl sm:text-3xl text-[#1c1c19] font-normal tracking-tight pr-6 sm:pr-0"
          >
            Schedule Your Private Consultation
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#5d4f40] mt-1.5 leading-relaxed font-normal max-w-lg">
            Connect directly with our Master Photographers for your auspicious nuptials or studio portrait sitting.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 max-h-[75vh] sm:max-h-[72vh] overflow-y-auto" data-lenis-prevent>
          {isSubmitted ? (
            /* Success State */
            <div className="flex flex-col items-center justify-center text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#775a19]">
                DISPATCHED TO STUDIO ATELIER
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#1c1c19] font-normal">
                Thank You, {formData.fullName}!
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#5d4f40] max-w-md leading-relaxed">
                Your appointment details have been compiled and sent to our official studio WhatsApp (+91 92128 12625). Our curatorial team will confirm your preferred timing shortly.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-7 py-3 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md transition-all cursor-pointer"
                >
                  Return to Anthology
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                  {errorMsg}
                </div>
              )}

              {/* 2-Column Grid for Core Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#3a3026] mb-1.5 uppercase tracking-wider">
                    Full Name / Couple Names <span className="text-[#45123E]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a6a]" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Gayatri & Devraj"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ded5c7] rounded-xl text-xs sm:text-sm text-[#1c1c19] placeholder-gray-400 focus:outline-none focus:border-[#45123E] focus:ring-1 focus:ring-[#45123E] transition-all"
                    />
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#3a3026] mb-1.5 uppercase tracking-wider">
                    WhatsApp / Phone Number <span className="text-[#45123E]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a6a]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ded5c7] rounded-xl text-xs sm:text-sm text-[#1c1c19] placeholder-gray-400 focus:outline-none focus:border-[#45123E] focus:ring-1 focus:ring-[#45123E] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2-Column Grid for Ceremony & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ceremony / Service Type */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#3a3026] mb-1.5 uppercase tracking-wider">
                    Ceremony / Service
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#ded5c7] rounded-xl text-xs sm:text-sm text-[#1c1c19] focus:outline-none focus:border-[#45123E] focus:ring-1 focus:ring-[#45123E] transition-all cursor-pointer"
                  >
                    <option value="Royal Wedding & Pheras">Royal Wedding & Pheras</option>
                    <option value="Complete Multi-Day Nuptials (Sangeet + Phere)">Complete Multi-Day Nuptials (Sangeet + Phere)</option>
                    <option value="Pre-Wedding Romance & Cinema">Pre-Wedding Romance & Cinema</option>
                    <option value="Intimate Engagement & Roka">Intimate Engagement & Roka</option>
                    <option value="Studio Portraiture (Rohini Studio)">Studio Portraiture (Rohini Studio)</option>
                    <option value="Heirloom Framing & Restoration">Heirloom Framing & Restoration</option>
                    <option value="Destination Wedding Consult">Destination Wedding Consult</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#3a3026] mb-1.5 uppercase tracking-wider">
                    Preferred Date / Wedding Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a6a]" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ded5c7] rounded-xl text-xs sm:text-sm text-[#1c1c19] focus:outline-none focus:border-[#45123E] focus:ring-1 focus:ring-[#45123E] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2-Column Grid for Timing & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#3a3026] mb-1.5 uppercase tracking-wider">
                    Consultation Time Preference
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a6a]" />
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ded5c7] rounded-xl text-xs sm:text-sm text-[#1c1c19] focus:outline-none focus:border-[#45123E] focus:ring-1 focus:ring-[#45123E] transition-all cursor-pointer"
                    >
                      <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                      <option value="Flexible / Immediate Callback">Flexible / Immediate Callback</option>
                    </select>
                  </div>
                </div>

                {/* City / Venue */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#3a3026] mb-1.5 uppercase tracking-wider">
                    City / Venue Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a6a]" />
                    <input
                      type="text"
                      name="cityVenue"
                      value={formData.cityVenue}
                      onChange={handleChange}
                      placeholder="e.g. Delhi NCR / Udaipur / Jaipur"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ded5c7] rounded-xl text-xs sm:text-sm text-[#1c1c19] placeholder-gray-400 focus:outline-none focus:border-[#45123E] focus:ring-1 focus:ring-[#45123E] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-sans font-semibold text-[#3a3026] mb-1.5 uppercase tracking-wider">
                  Email Address <span className="text-gray-400 text-[10px] font-normal">(for Folio &amp; Quotation)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a6a]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. patron@family.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ded5c7] rounded-xl text-xs sm:text-sm text-[#1c1c19] placeholder-gray-400 focus:outline-none focus:border-[#45123E] focus:ring-1 focus:ring-[#45123E] transition-all"
                  />
                </div>
              </div>

              {/* Special Notes / Message */}
              <div>
                <label className="block text-xs font-sans font-semibold text-[#3a3026] mb-1.5 uppercase tracking-wider">
                  Vision, Traditions &amp; Specific Requests
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Share details about your ceremonies, desired dates, or specific photo/video styles..."
                  className="w-full p-3 bg-white border border-[#ded5c7] rounded-xl text-xs sm:text-sm text-[#1c1c19] placeholder-gray-400 focus:outline-none focus:border-[#45123E] focus:ring-1 focus:ring-[#45123E] transition-all"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-full bg-[#45123E] hover:bg-[#340C2E] text-white font-sans text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current shrink-0" />
                  <span className="truncate">Send Appointment Request to WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#e8d5b7] shrink-0" />
                </button>
                <p className="text-[10px] text-center text-[#7a6b5c] font-sans mt-2">
                  Transmits directly to Studio WhatsApp (+91 92128 12625) • Zero obligation consultation
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
