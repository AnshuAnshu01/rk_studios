import React from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';

interface LoadingScreenProps {
  isFading?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isFading = false }) => {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fcf9f4] select-none transition-all duration-700 ease-out ${
        isFading ? 'opacity-0 scale-[0.99] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="transition-transform duration-500 scale-100 hover:scale-105">
          <RKStudiosLogo height={64} />
        </div>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#45123E] to-transparent rounded-full animate-pulse" />
        <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#6b5847] font-medium">
          Loading Atelier Archive...
        </span>
      </div>
    </div>
  );
};
