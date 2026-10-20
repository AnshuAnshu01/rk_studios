import React from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fcf9f4] bg-dots select-none transition-opacity duration-700"
      role="status"
      aria-live="polite"
    >
      {/* Ambient warm champagne/gold halo */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#a78b71]/15 via-[#c5a059]/10 to-[#45123E]/10 blur-[90px] animate-pulse pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center px-6 z-10">
        
        {/* Animated Emblem Container with Delicate Orbital Ring */}
        <div className="relative flex items-center justify-center p-6 mb-4">
          
          {/* Subtle spinning golden ring */}
          <div 
            className="absolute inset-0 rounded-full border border-[#c5a059]/25 border-t-[#45123E] animate-spin" 
            style={{ animationDuration: '3.5s' }}
          />

          {/* Secondary pulsating ring */}
          <div 
            className="absolute -inset-3 rounded-full border border-[#a78b71]/15 animate-ping opacity-30" 
            style={{ animationDuration: '2.8s' }}
          />

          {/* Official Clean RK Studios Logo with gentle breathing pulse */}
          <div className="relative z-10 transition-transform duration-1000 transform hover:scale-105">
            <RKStudiosLogo height={92} className="max-w-[280px] sm:max-w-[340px]" />
          </div>
        </div>

        {/* Editorial Subtitle with Shimmering Line */}
        <div className="flex flex-col items-center gap-2.5 mt-2">
          <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.35em] text-[#6b5847] font-semibold">
            <span>Curating Visual Anthology</span>
            <span className="inline-flex text-[#a78b71]">
              <span className="animate-pulse" style={{ animationDelay: '0ms' }}>•</span>
              <span className="animate-pulse" style={{ animationDelay: '250ms' }}>•</span>
              <span className="animate-pulse" style={{ animationDelay: '500ms' }}>•</span>
            </span>
          </div>

          {/* Refined golden hairline shimmer indicator */}
          <div className="w-36 h-[2px] bg-[#e6ded1] rounded-full overflow-hidden relative">
            <div 
              className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-[#45123E] to-transparent animate-pulse rounded-full"
              style={{
                animation: 'loadingSweep 2s ease-in-out infinite'
              }}
            />
          </div>
          <span className="text-[9px] font-serif italic text-[#9c8976] tracking-wider">
            Bespoke Heirlooms • Est. 1994
          </span>
        </div>
      </div>
    </div>
  );
};
