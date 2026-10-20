import React, { useState, useEffect } from 'react';
import { PageHero } from './PageHero';
import { 
  Cookie, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Settings2, 
  HelpCircle, 
  ArrowRight,
  Database,
  Eye,
  RefreshCw
} from 'lucide-react';

interface CookiePolicyPageProps {
  onNavigateHome: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({
  onNavigateHome,
  onOpenWhatsApp
}) => {
  const [cookieConsent, setCookieConsent] = useState<{
    essential: boolean;
    functional: boolean;
    analytics: boolean;
    timestamp?: string;
  }>(() => {
    try {
      const saved = localStorage.getItem('rk_cookie_consent');
      return saved ? JSON.parse(saved) : { essential: true, functional: true, analytics: true };
    } catch {
      return { essential: true, functional: true, analytics: true };
    }
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdatePreference = (key: 'functional' | 'analytics', val: boolean) => {
    const updated = { ...cookieConsent, [key]: val, timestamp: new Date().toISOString() };
    setCookieConsent(updated);
    try {
      localStorage.setItem('rk_cookie_consent', JSON.stringify(updated));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  const handleResetCookies = () => {
    try {
      localStorage.removeItem('rk_cookie_consent');
      setCookieConsent({ essential: true, functional: true, analytics: true });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.warn('LocalStorage reset error', e);
    }
  };

  return (
    <div className="w-full bg-[#fcf9f4] text-[#1c1c19] min-h-screen">
      {/* 1. Page Hero Banner */}
      <PageHero
        badge="Data Stewardship &amp; Privacy"
        title="Cookie Policy,"
        titleHighlight="Honoring Family Trust"
        subtitle="Transparent insight into how RK Photo Studio utilizes functional cookies, local browser storage, and cryptographic protection to safeguard your wedding proofs and dates."
        primaryAction={{
          label: "Return to Home",
          onClick: onNavigateHome
        }}
        secondaryAction={{
          label: "Ask Privacy Officer",
          onClick: () => onOpenWhatsApp("Namaste RK Photo Studio! I have an inquiry regarding data privacy and client photo proofs storage.")
        }}
      />

      {/* 2. Main Content Body */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-5xl mx-auto font-sans">
        
        {/* Interactive Cookie Settings Dashboard */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#ded5c7] shadow-xl bg-white mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ded5c7]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#45123E]/10 flex items-center justify-center text-[#45123E]">
                <Settings2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif italic font-bold text-xl sm:text-2xl text-[#1c1c19]">
                  Live Cookie Preference Center
                </h2>
                <p className="font-sans text-xs text-[#775a19]">
                  Configure your active session and archival storage choices
                </p>
              </div>
            </div>

            <button
              onClick={handleResetCookies}
              className="px-4 py-2 rounded-full border border-[#ded5c7] text-xs text-[#7a6b5c] hover:text-[#1c1c19] hover:bg-[#FAF5EB] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {/* Essential Cookies */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FAF5EB] border border-[#e8ded0]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#45123E]" />
                  <span className="font-bold text-sm text-[#1c1c19]">1. Strictly Necessary &amp; Security Cookies</span>
                </div>
                <p className="text-xs text-[#635343] leading-relaxed max-w-xl">
                  Required for core platform navigation, DDoS protection, cross-site scripting prevention, and secure appointment modal booking transactions.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0 self-start sm:self-auto">
                Always Active
              </span>
            </div>

            {/* Functional Cookies */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FAF5EB] border border-[#e8ded0]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#a78b71]" />
                  <span className="font-bold text-sm text-[#1c1c19]">2. Functional Proofs &amp; Family Folio Storage</span>
                </div>
                <p className="text-xs text-[#635343] leading-relaxed max-w-xl">
                  Enables local memory to store user-uploaded wedding photos, portfolio heart favorites, and ceremony inquiry drafts without requiring account login.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 self-start sm:self-auto">
                <input
                  type="checkbox"
                  checked={cookieConsent.functional}
                  onChange={(e) => handleUpdatePreference('functional', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#45123E]"></div>
              </label>
            </div>

            {/* Performance & Analytics */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FAF5EB] border border-[#e8ded0]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#a78b71]" />
                  <span className="font-bold text-sm text-[#1c1c19]">3. Performance &amp; Monograph Rendering Optimization</span>
                </div>
                <p className="text-xs text-[#635343] leading-relaxed max-w-xl">
                  Helps our engineers analyze asset load times for high-definition wedding albums, video buffering speeds, and browser compatibility.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 self-start sm:self-auto">
                <input
                  type="checkbox"
                  checked={cookieConsent.analytics}
                  onChange={(e) => handleUpdatePreference('analytics', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#45123E]"></div>
              </label>
            </div>
          </div>

          {saveSuccess && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your cookie stewardship preferences have been updated and stored locally.</span>
            </div>
          )}
        </div>

        {/* Detailed Explanatory Sections */}
        <div className="space-y-12 text-[#2c241c]">
          
          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              1. What Are Cookies and Browser Storage Technologies?
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed">
              Cookies and local browser storage (such as HTML5 LocalStorage and SessionStorage) are compact, encrypted data packets placed on your computer or mobile device when you browse our website. These small files act as a secure memory bank, allowing our website to remember your device, your curation choices, and ensure smooth rendering without repeatedly prompting you.
            </p>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              2. How RK Photo Studio Uses Local Storage
            </h3>
            <div className="space-y-3 font-serif text-sm text-[#594d3f] leading-relaxed">
              <p>
                Unlike commercial advertising networks, RK Photo Studio operates under an editorial standard. We do not sell, rent, or trade your family data to third-party ad networks. We utilize local browser storage solely to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-sans text-xs text-[#524436]">
                <li><strong>Retain Client-Uploaded Proofs:</strong> If you upload family celebration photos through the "Upload to Gallery" tool, the encrypted previews reside in your browser’s private LocalStorage key (`rk_studio_custom_gallery_photos`) until you choose to remove them.</li>
                <li><strong>Preserve Favorited Plates:</strong> Heart-marked wedding monographs remain pinned in your local browsing session for side-by-side comparison.</li>
                <li><strong>Remember Audio/Video Controls:</strong> Retain your preferences regarding sound effects and playback states.</li>
                <li><strong>Manage Cookie Consent:</strong> Record whether you have accepted or customized your preferences so the banner does not obstruct future visits.</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              3. Third-Party Integrations &amp; Embedded Media
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed mb-3">
              To provide an authentic preview of our Rohini atelier and wedding cinematography, our platform connects with trusted services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#ded5c7] shadow-xs">
                <span className="font-bold text-[#45123E] block mb-1">Google Maps</span>
                <p className="text-[#6d5e4e] leading-relaxed">
                  Embedded street directions and verified location pins for our Sector 23 Rohini studio.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#ded5c7] shadow-xs">
                <span className="font-bold text-[#45123E] block mb-1">YouTube &amp; Socials</span>
                <p className="text-[#6d5e4e] leading-relaxed">
                  Official wedding cinema trailers and visual archives hosted via YouTube, Facebook, and Instagram.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#ded5c7] shadow-xs">
                <span className="font-bold text-[#45123E] block mb-1">WhatsApp Business</span>
                <p className="text-[#6d5e4e] leading-relaxed">
                  Direct encrypted concierge liaison with our studio directors via official Meta WhatsApp APIs.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif italic text-2xl font-bold text-[#1c1c19] mb-3">
              4. Complete Control and Browser Clearing
            </h3>
            <p className="font-serif text-sm text-[#594d3f] leading-relaxed">
              You retain absolute authority over cookies stored on your hardware. You can configure your browser (Google Chrome, Apple Safari, Mozilla Firefox, or Microsoft Edge) to reject cookies, alert you before receiving one, or erase all local cookies and site data whenever you conclude your session.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#45123E]/5 border border-[#45123E]/15">
            <h4 className="font-serif italic font-bold text-lg text-[#45123E] mb-2">
              Atelier Privacy Officer Contact
            </h4>
            <p className="font-serif text-xs text-[#524436] leading-relaxed mb-4">
              For any formal inquiries regarding client image confidentiality, wedding proof purging, or personal data rights under Indian Digital Personal Data Protection legislation:
            </p>
            <div className="font-sans text-xs space-y-1 text-[#1c1c19]">
              <p><strong>RK Photo Studio &amp; Movies Production</strong></p>
              <p>Opposite State Bank of India (SBI), Pooth Kalan, Rohini Sector 23, Delhi – 110085.</p>
              <p>Direct Line / WhatsApp: <a href="tel:+919212812625" className="text-[#45123E] font-bold hover:underline">+91 92128 12625</a></p>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
};
