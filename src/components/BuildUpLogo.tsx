import React from 'react';

interface BuildUpLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'horizontal' | 'full' | 'mark';
  theme?: 'dark' | 'light' | 'auto';
  showSubtitle?: boolean;
}

export function BuildUpLogo({
  className = '',
  size = 'md',
  variant = 'horizontal',
  theme = 'dark',
  showSubtitle = true
}: BuildUpLogoProps) {
  // Height sizing for the official logo
  const heightMap = {
    xs: 'h-7',
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-16',
    xl: 'h-24',
    '2xl': 'h-36'
  };

  // Select the appropriate official image asset based on theme
  // Both dark and transparent assets match the authentic 3D metallic BuildUp logo provided by the user
  const logoSrc = theme === 'light' 
    ? '/buildup-logo-transparent.png' 
    : '/buildup-logo-dark.png';

  const fallbackSrc = '/buildup-logo.png';

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}>
        <img
          src={logoSrc}
          alt="BuildUp Logo Mark"
          className={`${heightMap[size]} w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,160,23,0.3)] transition-transform duration-300 hover:scale-105`}
          onError={(e) => {
            // fallback
            (e.target as HTMLImageElement).src = fallbackSrc;
          }}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="BuildUp - Business Transformation Partner"
        className={`${heightMap[size]} w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-all duration-300 hover:brightness-105`}
        onError={(e) => {
          // fallback
          (e.target as HTMLImageElement).src = fallbackSrc;
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
