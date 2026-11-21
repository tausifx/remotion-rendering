import React from 'react';
import {useCurrentFrame} from 'remotion';
import {alpha, colors, ease, FPS, Tool, toolColor} from '../../theme';
import {prog} from '../../utils/animations';
import {Logo} from './Logo';

/** Persistent 3-tool progress marker (top-right) – ties the whole film together. */
const SPANS: {from: number; to: number; active: Tool[]}[] = [
  {from: 7.2, to: 20.7, active: ['elsa']},
  {from: 20.7, to: 33.0, active: ['gpt']},
  {from: 33.0, to: 43.2, active: ['annie']},
  {from: 43.2, to: 47.6, active: ['elsa']},
  {from: 47.6, to: 52.5, active: ['gpt', 'annie']},
];
const TOOLS: Tool[] = ['elsa', 'gpt', 'annie'];

export const Tracker: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const span = SPANS.find((s) => t >= s.from && t < s.to);
  const vis = prog(f, SPANS[0].from * FPS, 14) * (1 - prog(f, 52.2 * FPS, 10));
  return (
    <div style={{position: 'absolute', right: 70, top: 56, display: 'flex', gap: 18, opacity: vis}}>
      {TOOLS.map((tool) => {
        const on = !!span && span.active.includes(tool);
        return (
          <div key={tool} style={{position: 'relative', width: 58, height: 58, opacity: on ? 1 : 0.28, transform: `scale(${on ? 1 : 0.86})`}}>
            <Logo tool={tool} size={58} glowK={on ? 0.5 : 0} />
            {on && <div style={{position: 'absolute', left: -6, top: -6, right: -6, bottom: -6, borderRadius: '50%', border: `2px solid ${alpha(toolColor[tool], 0.8)}`}} />}
          </div>
        );
      })}
    </div>
  );
};
