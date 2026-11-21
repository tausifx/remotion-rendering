import React from 'react';
// Places children centred on point (x, y)
export const Center: React.FC<{x: number; y: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 0, height: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>
    {children}
  </div>
);
