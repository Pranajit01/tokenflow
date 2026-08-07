/**
 * AuroraBackground.jsx — Living Animated Warm Aurora Backdrop
 * 
 * Signature living warm-gradient background built with pure CSS keyframes.
 * Features several large soft-focus light-blade gradient streaks:
 * - Crimson (~#ff2f3a) at core
 * - Coral (~#ff6b4a)
 * - Amber (~#ffb347) at tips
 * - Fading into near-black #07080a ground
 * 
 * Includes SVG film-grain filter + radial vignette.
 * Strictly WARM — no purple/indigo/violet!
 */

import React from 'react';

export default function AuroraBackground() {
  return (
    <div className="aurora-container" aria-hidden="true">
      {/* Light blades drifting & breathing */}
      <div className="aurora-blade blade-1" />
      <div className="aurora-blade blade-2" />
      <div className="aurora-blade blade-3" />

      {/* SVG noise film grain */}
      <div className="aurora-grain" />

      {/* Vignette */}
      <div className="aurora-vignette" />
    </div>
  );
}
