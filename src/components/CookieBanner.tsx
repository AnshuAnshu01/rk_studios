import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X, Check, Settings2, ExternalLink } from 'lucide-react';

interface CookieBannerProps {
  onOpenPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPolicy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [functionalEnabled, setFunctionalEnabled] = useState(true);

  useEffect(() => {
    // Check if user has already set cookie consent
    try {
      const consent = localStorage.getItem('rk_cookie_consent');
      if (!consent) {
        // Small delay for smooth entry for new visitors
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      setIsOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      essential: true,
      functional: true,
      analytics: true,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem('rk_cookie_consent', JSON.stringify(preferences));
    } catch (e) {
      console.warn('Unable to write to localStorage', e);
    }
    setIsOpen(false);
  };

  const handleAcceptEssential = () => {
    const preferences = {
      essential: true,
      functional: false,
      analytics: false,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem('rk_cookie_consent', JSON.stringify(preferences));
    } catch (e) {
      console.warn('Unable to write to localStorage', e);
    }
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    const preferences = {
      essential: true,
      functional: functionalEnabled,
      analytics: analyticsEnabled,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem('rk_cookie_consent', JSON.stringify(preferences));
    } catch (e) {
      console.warn('Unable to write to localStorage', e);
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md z-50 animate-fadeIn">
      <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#ded5c7] shadow-2xl bg-white/95 backdrop-blur-xl text-[#1c1c19]">
        
        {/* Banner Header */}
        <div className="flex items-start justify-between gap-3 mb-2.5 sm:mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#45123E]/10 flex items-center justify-center text-[#45123E] shrink-0">
              <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-[#45123E]" />
            </div>
            <div>
              <h4 className="font-serif italic font-bold text-sm sm:text-base text-[#1c1c19]">
                Cookie &amp; Privacy Consent
              </h4>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#775a19] font-sans font-semibold">
                RK Photo Studio • Rohini, Delhi
              </span>
            </div>
          </div>
          <button
            onClick={handleAcceptEssential}
            className="text-gray-400 hover:text-[#1c1c19] p-1 rounded-full transition-colors cursor-pointer"
            title="Decline Non-Essential"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Banner Copy */}
        <p className="font-serif text-xs text-[#524436] leading-relaxed mb-3.5 sm:mb-4">
          We honor your family’s privacy. We use functional cookies and local memory to preserve your favorite ceremony plates, custom photo uploads, and session preferences.
        </p>

        {/* Detailed Preferences Accordion */}
        {showPreferences && (
          <div className="bg-[#FAF5EB] p-3 sm:p-3.5 rounded-xl border border-[#ded5c7] mb-3.5 sm:mb-4 space-y-2.5 text-xs font-sans animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1c1c19] block">Strictly Necessary</span>
                <span className="text-[11px] text-[#7a6b5c]">Required for site security and navigation.</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Always Active
              </span>
            </div>

            <div className="pt-2 border-t border-[#ded5c7] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1c1c19] block">Functional Proofs</span>
                <span className="text-[11px] text-[#7a6b5c]">Remembers saved portfolio plates &amp; drafts.</span>
              </div>
              <input
                type="checkbox"
                checked={functionalEnabled}
                onChange={(e) => setFunctionalEnabled(e.target.checked)}
                className="w-4 h-4 text-[#45123E] rounded border-gray-300 focus:ring-[#45123E] cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-[#ded5c7] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1c1c19] block">Analytics &amp; Performance</span>
                <span className="text-[11px] text-[#7a6b5c]">Helps us optimize studio page load speed.</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="w-4 h-4 text-[#45123E] rounded border-gray-300 focus:ring-[#45123E] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          {showPreferences ? (
            <button
              onClick={handleSavePreferences}
              className="w-full py-2.5 px-4 rounded-full bg-[#45123E] text-white hover:bg-[#340C2E] font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-sm text-center"
            >
              Save Cookie Choices
            </button>
          ) : (
            <>
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#45123E] text-white hover:bg-[#340C2E] font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-sm text-center"
              >
                Accept All
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAcceptEssential}
                  className="flex-1 sm:flex-none py-2.5 px-3.5 rounded-full bg-white hover:bg-[#FAF5EB] text-[#45123E] border border-[#ded5c7] font-sans text-xs uppercase tracking-wider font-medium transition-all cursor-pointer text-center"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowPreferences(prev => !prev)}
                  className="p-2.5 rounded-full hover:bg-gray-100 text-[#7a6b5c] hover:text-[#1c1c19] border border-[#ded5c7] transition-colors flex items-center justify-center cursor-pointer shrink-0"
                  title="Custom Preferences"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Read Full Policy Link */}
        <div className="mt-3 text-center">
          <button
            onClick={() => {
              onOpenPolicy();
              setIsOpen(false);
            }}
            className="text-[11px] font-sans text-[#775a19] hover:text-[#45123E] underline cursor-pointer"
          >
            Read our full Cookie &amp; Privacy Policy
          </button>
        </div>

      </div>
    </div>
  );
};
