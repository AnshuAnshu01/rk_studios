import React from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FCF9F4] select-none transition-opacity duration-500"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center justify-center gap-6 px-4">
        {/* Minimal Authentic Transparent Logo */}
        <div className="transition-transform duration-700 hover:scale-105">
          <RKStudiosLogo height={76} className="drop-shadow-sm max-w-[280px] sm:max-w-[340px]" />
        </div>

        {/* Minimal Loading... text */}
        <div className="flex items-center gap-1 text-xs font-serif uppercase tracking-[0.32em] text-[#786959]">
          <span>Loading</span>
          <span className="inline-flex">
            <span className="animate-pulse" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-pulse" style={{ animationDelay: '200ms' }}>.</span>
            <span className="animate-pulse" style={{ animationDelay: '400ms' }}>.</span>
          </span>
        </div>
      </div>
    </div>
  );
};
