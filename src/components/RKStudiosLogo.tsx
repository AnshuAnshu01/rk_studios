import React from 'react';

interface RKStudiosLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  height?: number | string;
  showMonogramOnly?: boolean;
  alt?: string;
}

/**
 * Official RK Photo & Movies Production Logo
 */
export const RKStudiosLogo: React.FC<RKStudiosLogoProps> = ({
  className = '',
  height = 48,
  alt = 'RK Photo & Movies Production'
}) => {
  const styleHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/rk_logo.png"
        alt={alt}
        style={{ height: styleHeight, width: 'auto' }}
        className="max-h-full object-contain transition-transform duration-300 hover:scale-[1.02]"
        loading="eager"
      />
    </div>
  );
};
