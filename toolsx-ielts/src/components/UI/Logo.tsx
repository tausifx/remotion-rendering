import React from 'react';
import {Img, staticFile} from 'remotion';
import {alpha, colors, glow, lineColor, Tool, toolColor} from '../../theme';

/** Uses the user's logo files untouched (ChatGPT: white version for dark bg). */
export const Logo: React.FC<{tool: Tool; size: number; glowK?: number; style?: React.CSSProperties}> = ({
  tool, size, glowK = 1, style,
}) => {
  const c = toolColor[tool];
  if (tool === 'elsa') {
    return (
      <div style={{width: size, height: size, borderRadius: '50%', boxShadow: glow(c, glowK), ...style}}>
        <Img src={staticFile('logos/elsa-speak.png')} style={{width: size, height: size, borderRadius: '50%'}} />
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `radial-gradient(circle at 30% 22%, ${alpha(colors.white, 0.14)}, ${alpha(colors.panel, 0.96)} 62%)`,
      border: `1.5px solid ${tool === 'gpt' ? alpha(colors.white, 0.22) : alpha(c, 0.5)}`, boxShadow: glow(c, glowK), ...style,
    }}>
      {tool === 'gpt' ? (
        <Img src={staticFile('logos/chatgpt-white.png')} style={{width: size * 0.52, height: size * 0.52}} />
      ) : (
        <Img src={staticFile('logos/call-annie.png')} style={{width: size * 0.76, height: 'auto'}} />
      )}
    </div>
  );
};

export const toolName: Record<Tool, string> = {elsa: 'ELSA Speak', gpt: 'ChatGPT', annie: 'Call Annie'};
export const lineStroke = lineColor;
