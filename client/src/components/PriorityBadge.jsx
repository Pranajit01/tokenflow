/**
 * PriorityBadge.jsx — Colored badge for priority levels
 */

import { AlertTriangle, Heart, Baby, Users, Accessibility, Clock } from 'lucide-react';

const PRIORITY_CONFIG = {
  emergency:      { label: 'Emergency',      bg: '#FF5B57', icon: AlertTriangle },
  disabled:       { label: 'Disabled',        bg: '#6B5BE6', icon: Accessibility },
  pregnant:       { label: 'Pregnant',        bg: '#FF5B57', icon: Heart },
  senior_citizen: { label: 'Senior Citizen',  bg: '#FFC531', icon: Users },
  child:          { label: 'Child',           bg: '#3AA0FF', icon: Baby },
  normal:         { label: 'Normal',          bg: '#12B3A4', icon: Clock },
};

export default function PriorityBadge({ level, showIcon = true }) {
  const config = PRIORITY_CONFIG[level] || PRIORITY_CONFIG.normal;
  const Icon = config.icon;

  return (
    <span
      className="memphis-badge"
      style={{
        backgroundColor: config.bg,
        color: level === 'senior_citizen' ? '#17140D' : 'white',
      }}
    >
      {showIcon && <Icon size={12} />}
      {config.label}
    </span>
  );
}
