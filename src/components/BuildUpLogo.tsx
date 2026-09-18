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
  const logoSrc = '/buildup-logo.png';
  const altText = 'BuildUp - Business Transformation Intelligence';

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}>
        <img
          src={logoSrc}
          alt={altText}
          className={`${heightMap[size]} w-auto object-contain`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt={altText}
        className={`${heightMap[size]} w-auto object-contain`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
