import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PlateItem } from '../data/weddingData';

interface PageHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  onPhotoClick?: (plate: PlateItem) => void;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  titleHighlight,
  subtitle,
  primaryAction,
  secondaryAction
}) => {
  return (
    <section className="relative w-full pt-24 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-[#FAF5EB] border-b border-[#ded5c7]/60">
      {/* Subtle warm ambient lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-r from-[#a78b71]/12 via-[#45123E]/8 to-transparent rounded-full filter blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-2 sm:px-6 text-center">
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#45123E]/10 text-[#45123E] text-[10px] font-sans font-semibold tracking-wider uppercase mb-3.5 sm:mb-4 border border-[#45123E]/15">
            <Sparkles className="w-3 h-3 text-[#a78b71]" />
            <span>{badge}</span>
          </div>
        )}

        <h1 
          className="font-serif italic font-normal text-[#1c1c19] tracking-tight leading-[1.14]"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 3.75rem)' }}
        >
          {title}{' '}
          {titleHighlight && (
            <span className="text-[#45123E] font-serif not-italic font-bold">
              {titleHighlight}
            </span>
          )}
        </h1>

        <p className="font-serif text-xs sm:text-base text-[#4a3b2c] max-w-xl mx-auto mt-3 sm:mt-4 leading-relaxed font-normal px-2">
          {subtitle}
        </p>

        {/* Minimal Action Buttons */}
        {(primaryAction || secondaryAction) && (
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full bg-[#45123E] text-white hover:bg-[#340C2E] font-sans text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-center"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e8d5b7]" />
              </button>
            )}

            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/95 hover:bg-white text-[#45123E] border border-[#ded5c7] hover:border-[#45123E] font-sans text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 shadow-xs active:scale-95 cursor-pointer text-center"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
