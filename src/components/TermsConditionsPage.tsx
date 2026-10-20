import React from 'react';
import { PageHero } from './PageHero';
import { 
  FileText, 
  ShieldCheck, 
  Clock, 
  Camera, 
  Lock, 
  Scale, 
  MapPin, 
  Phone,
  CheckCircle2
} from 'lucide-react';

interface TermsConditionsPageProps {
  onNavigateHome: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({
  onNavigateHome,
  onOpenWhatsApp
}) => {
  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] min-h-screen">
      {/* 1. Page Hero Banner */}
      <PageHero
        badge="Legal &amp; Atelier Governance"
        title="Terms &amp; Conditions,"
        titleHighlight="A Covenant of Sacred Trust"
        subtitle="Clear, dignified terms governing our bespoke wedding photography, cinematography engagements, copyright stewardship, and artisanal album delivery."
        primaryAction={{
          label: "Return to Home",
          onClick: onNavigateHome
        }}
        secondaryAction={{
          label: "Inquire via WhatsApp",
          onClick: () => onOpenWhatsApp("Namaste RK Photo Studio! I would like to clarify a covenant detail regarding our wedding booking contract.")
        }}
      />

      {/* 2. Main Content Body */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-5xl mx-auto font-sans">
        
        {/* Core Principles Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 rounded-2xl border border-[#ded5c7] bg-white">
            <Camera className="w-6 h-6 text-[#45123E] mb-3" />
            <h4 className="font-serif italic font-bold text-base text-[#1c1c19] mb-1">
              Archival Standards
            </h4>
            <p className="font-serif text-xs text-[#594d3f] leading-relaxed">
              Every frame captured on medium-format sensors and curated by master colorists for generational permanence.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[#ded5c7] bg-white">
            <Clock className="w-6 h-6 text-[#775a19] mb-3" />
            <h4 className="font-serif italic font-bold text-base text-[#1c1c19] mb-1">
              Punctual Proofing
            </h4>
            <p className="font-serif text-xs text-[#594d3f] leading-relaxed">
              Initial high-resolution proofs shared within 14 days; bespoke silk-bound albums crafted within 45 days.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[#ded5c7] bg-white">
            <ShieldCheck className="w-6 h-6 text-emerald-700 mb-3" />
            <h4 className="font-serif italic font-bold text-base text-[#1c1c19] mb-1">
              Unbroken Confidentiality
            </h4>
            <p className="font-serif text-xs text-[#594d3f] leading-relaxed">
              Private family ceremonies held in sacred discretion; no client frames published without explicit written consent.
            </p>
          </div>
        </div>

        {/* Detailed Articles */}
        <div className="space-y-12 text-[#2c241c]">
          
          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              1. Engagement &amp; Auspicious Date Reservation
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed">
              To guarantee that our principal cinematographers and senior masters are dedicated exclusively to your celebration, date reservations are confirmed solely upon receipt of a formal advance retainer (25% to 30% of the agreed investment tier) and mutual execution of the bespoke service folios. Tentative verbal holds are sustained for 72 hours only.
            </p>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              2. Milestone Payment Schedule
            </h3>
            <div className="font-serif text-sm text-[#594d3f] leading-relaxed space-y-2">
              <p>Unless mutually customized in your written covenant, payments are structured across milestones:</p>
              <ul className="list-disc pl-5 font-sans text-xs space-y-1 text-[#524436]">
                <li><strong>Retainer:</strong> 25% upon formal booking to lock ceremony dates in our atelier register.</li>
                <li><strong>Main Nuptial Date:</strong> 50% on or before the morning of the principal wedding ceremony.</li>
                <li><strong>Archival Delivery:</strong> 25% upon final client proof review prior to binding the physical leather/silk heirloom folios.</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              3. Copyright, License &amp; Moral Rights
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed">
              RK Photo Studio retains statutory moral and artistic copyright in all photographic plates and cinematic recordings pursuant to the Indian Copyright Act, 1957. The contracting client is granted a perpetual, non-commercial, worldwide archival license to reproduce, print, share, and frame all delivered media for personal, family, and private domestic enjoyment.
            </p>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              4. Delivery Timelines &amp; Raw Archival Preservation
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed">
              Careful color grading and audio mastering demand disciplined patience. Initial curated high-resolution proofs are released via private digital gallery within 14 business days. Following client plate approval, physical hand-bound albums (silk, Italian leather, or acrylic box monographs) are produced and handed over within 45 to 60 days. Unedited camera RAW files are retained on our redundant RAID storage arrays for a minimum of 365 calendar days post-celebration.
            </p>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              5. Rescheduling, Postponement &amp; Force Majeure
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed">
              We deeply understand that wedding itineraries may require adjustment due to health emergencies, severe weather events, or pandit-recommended muhurat alignments. If notified at least 30 calendar days in advance, your deposited retainer may be transferred to a new date within 12 months, subject to studio master availability.
            </p>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              6. Respectful Conduct &amp; Sacred Ceremony Etiquette
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed">
              Our cinematographers work with solemn reverence during sacred pheras, Vedic mantras, and emotionally poignant Vidai departures. We coordinate smoothly with family elders, pandits, and event planners to ensure flash lighting and camera movements remain unobtrusive and reverent.
            </p>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              7. Governing Law &amp; Jurisdiction
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed">
              All covenants, disputes, and obligations arising out of or in connection with our services shall be governed and interpreted under the laws of the Republic of India, and the courts of New Delhi shall possess sole and exclusive jurisdiction.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF5EB] border border-[#ded5c7] mt-8">
            <h4 className="font-serif italic font-bold text-lg text-[#45123E] mb-2">
              Atelier Directorate
            </h4>
            <p className="font-serif text-xs text-[#524436] leading-relaxed mb-4">
              For covenant discussions, custom corporate agreements, or multi-city destination itineraries:
            </p>
            <div className="font-sans text-xs space-y-1 text-[#1c1c19]">
              <p><strong>RK Photo Studio &amp; Movies Production</strong></p>
              <p>Opposite State Bank of India (SBI), Pooth Kalan, Rohini Sector 23, Delhi – 110085.</p>
              <p>Direct Call / WhatsApp: <a href="tel:+919212812625" className="text-[#45123E] font-bold hover:underline">+91 92128 12625</a></p>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
};
