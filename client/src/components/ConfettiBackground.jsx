/**
 * ConfettiBackground.jsx — CSS-only animated Memphis geometric shapes
 * 
 * Renders all 9 shape types distributed across the container.
 * Each shape has its own animation (drift, bob, sway, spin, etc).
 * Purely decorative — pointer-events: none.
 */

import React from 'react';

const shapes = [
  // Triangles
  { type: 'triangle', style: { top: '8%', left: '5%', animationDelay: '0s' } },
  { type: 'triangle', style: { top: '60%', right: '8%', animationDelay: '3s', borderBottomColor: 'var(--color-mustard)' } },
  { type: 'triangle', style: { bottom: '15%', left: '12%', animationDelay: '6s', borderBottomColor: 'var(--color-violet)' } },

  // Quarter Circles
  { type: 'quarter-circle', style: { top: '15%', right: '12%', animationDelay: '1s' } },
  { type: 'quarter-circle', style: { bottom: '25%', left: '65%', animationDelay: '5s', background: 'var(--color-coral)' } },

  // Zigzags
  { type: 'zigzag', style: { top: '35%', left: '3%', animationDelay: '2s' } },
  { type: 'zigzag', style: { bottom: '10%', right: '15%', animationDelay: '7s' } },

  // Plus signs
  { type: 'plus', style: { top: '20%', left: '40%', animationDelay: '0s' } },
  { type: 'plus', style: { bottom: '30%', right: '5%', animationDelay: '4s' } },

  // Squiggles
  { type: 'squiggle', style: { top: '45%', left: '8%', animationDelay: '3s' } },
  { type: 'squiggle', style: { top: '10%', right: '25%', animationDelay: '8s' } },

  // Dotted Circles
  { type: 'dotted-circle', style: { top: '70%', left: '20%', animationDelay: '1s' } },
  { type: 'dotted-circle', style: { top: '30%', right: '3%', animationDelay: '6s' } },

  // Half Circles
  { type: 'half-circle', style: { top: '50%', left: '50%', animationDelay: '2s' } },
  { type: 'half-circle', style: { top: '5%', left: '70%', animationDelay: '5s' } },

  // Small Dots
  { type: 'dot', style: { top: '25%', left: '25%', animationDelay: '0s', background: 'var(--color-coral)' } },
  { type: 'dot', style: { top: '55%', right: '20%', animationDelay: '2s', background: 'var(--color-teal)' } },
  { type: 'dot', style: { bottom: '20%', left: '45%', animationDelay: '4s', background: 'var(--color-mustard)' } },
  { type: 'dot', style: { top: '80%', right: '40%', animationDelay: '1s', background: 'var(--color-violet)' } },
  { type: 'dot', style: { top: '40%', left: '85%', animationDelay: '3s', background: 'var(--color-sky)' } },

  // Striped Circles
  { type: 'striped-circle', style: { top: '75%', left: '75%', animationDelay: '1s' } },
  { type: 'striped-circle', style: { top: '12%', left: '55%', animationDelay: '4s' } },
];

export default function ConfettiBackground({ density = 'full' }) {
  const displayShapes = density === 'sparse' ? shapes.filter((_, i) => i % 2 === 0) : shapes;

  return (
    <div className="memphis-shapes-container" aria-hidden="true">
      {displayShapes.map((shape, i) => (
        <div
          key={i}
          className={`shape-${shape.type}`}
          style={{
            ...shape.style,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}
