import React from 'react';
export const Brackets: React.FC<{w: number; h: number; color: string; len?: number; t?: number; progress?: number}> = ({w, h, color, len = 46, t = 5, progress = 1}) => {
  const s: React.CSSProperties = {position: 'absolute', width: len, height: len, borderColor: color, borderStyle: 'solid', borderWidth: 0};
  return (
    <div style={{width: w, height: h, position: 'relative', opacity: progress, transform: `scale(${1.08 - 0.08 * progress})`}}>
      <div style={{...s, left: 0, top: 0, borderTopWidth: t, borderLeftWidth: t}} />
      <div style={{...s, right: 0, top: 0, borderTopWidth: t, borderRightWidth: t}} />
      <div style={{...s, left: 0, bottom: 0, borderBottomWidth: t, borderLeftWidth: t}} />
      <div style={{...s, right: 0, bottom: 0, borderBottomWidth: t, borderRightWidth: t}} />
    </div>
  );
};
