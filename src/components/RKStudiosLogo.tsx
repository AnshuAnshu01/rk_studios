import React from 'react';

interface RKStudiosLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  height?: number | string;
  showMonogramOnly?: boolean;
  alt?: string;
}

/**
 * Official RK Studios Logo:
 * - Stylized 'RK' monogram (plum & purple R with curved peach accent; purple stem & peach/orange angled strokes for K)
 * - Modern thin divider '|'
 * - Clean geometric widely-spaced 'STUDIOS' wordmark
 */
export const RKStudiosLogo: React.FC<RKStudiosLogoProps> = ({
  className = '',
  height = 42,
  showMonogramOnly = false,
  alt = 'RK Studios'
}) => {
  const src = showMonogramOnly ? '/rk_emblem.png' : '/rk_logo.png';
  const styleHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={src}
        alt={alt}
        style={{ height: styleHeight, width: 'auto' }}
        className="max-h-full object-contain filter drop-shadow-xs transition-transform duration-200"
        loading="eager"
      />
    </div>
  );
};
