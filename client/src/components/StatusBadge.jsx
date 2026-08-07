/**
 * StatusBadge.jsx — Badge for token status (waiting/serving/completed/skipped)
 */

import { Clock, PlayCircle, CheckCircle, SkipForward } from 'lucide-react';

const STATUS_CONFIG = {
  waiting:   { label: 'Waiting',   bg: '#FFC531', color: '#17140D', icon: Clock },
  serving:   { label: 'Serving',   bg: '#12B3A4', color: 'white',   icon: PlayCircle },
  completed: { label: 'Completed', bg: '#17140D', color: 'white',   icon: CheckCircle },
  skipped:   { label: 'Skipped',   bg: '#FF5B57', color: 'white',   icon: SkipForward },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.waiting;
  const Icon = config.icon;

  return (
    <span
      className="memphis-badge"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
}
