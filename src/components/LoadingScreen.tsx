import React from 'react';
import { RKStudiosLogo } from './RKStudiosLogo';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fcf9f4] select-none"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <RKStudiosLogo height={72} />
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#6b5847] font-medium">
          Loading...
        </span>
      </div>
    </div>
  );
};
