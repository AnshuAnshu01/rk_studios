import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PlateItem } from '../data/weddingData';

interface PageHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  backgroundImageUrl?: string;
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
  backgroundImageUrl,
  primaryAction,
  secondaryAction
}) => {
  return (
    <section className="relative w-full pt-20 sm:pt-36 pb-10 sm:pb-22 px-3 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-[#FAF5EB] border-b border-[#ded5c7]/60">
      {/* Background Landscape Photo Layer */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img
            src={backgroundImageUrl}
            alt=""
            className="w-full h-full object-cover object-center opacity-85 scale-100"
            loading="eager"
          />
          {/* Subtle vertical blend preserving clear photo visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EB]/45 via-transparent to-[#FAF5EB]/70" />
        </div>
      )}

      {/* Subtle warm ambient lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-r from-[#a78b71]/15 via-[#45123E]/10 to-transparent rounded-full filter blur-[90px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-10 py-6 sm:py-12 rounded-2xl sm:rounded-3xl glass-lucid border border-white/85 shadow-[0_25px_60px_-15px_rgba(69,18,62,0.10),inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-2xl text-center">
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 text-[#45123E] text-[9px] sm:text-[10px] font-sans font-semibold tracking-wider uppercase mb-3 sm:mb-4 border border-white/90 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#a78b71]" />
            <span>{badge}</span>
          </div>
        )}

        <h1 
          className="font-serif italic font-normal text-[#1c1c19] tracking-tight leading-[1.12]"
          style={{ fontSize: 'clamp(1.75rem, 6.5vw, 3.75rem)' }}
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
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/95 hover:bg-white text-[#45123E] border border-white/80 hover:border-[#45123E] font-sans text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 shadow-xs active:scale-95 cursor-pointer text-center"
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
