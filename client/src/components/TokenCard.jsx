/**
 * TokenCard.jsx — Display a single token with all its details
 */

import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { formatWaitTime, formatTime } from '../utils/formatTime';
import { Building2, Clock, Calendar, FileText } from 'lucide-react';

export default function TokenCard({ token, highlighted = false }) {
  if (!token) return null;

  return (
    <div
      className={`memphis-card p-5 ${highlighted ? 'ring-4' : ''}`}
      style={highlighted ? { ringColor: 'var(--color-teal)', outlineColor: 'var(--color-teal)', outline: '4px solid var(--color-teal)', outlineOffset: '2px' } : {}}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-xl font-bold tracking-wide"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-teal)' }}
        >
          {token.tokenId}
        </h3>
        <StatusBadge status={token.status} />
      </div>

      {/* Service & Department */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <Building2 size={16} style={{ color: 'var(--color-violet)' }} />
          <span className="font-medium">{token.service}</span>
        </div>
        <div className="flex items-center gap-2 text-sm opacity-70">
          <FileText size={14} />
          <span>{token.department}</span>
        </div>
      </div>

      {/* Priority & Wait */}
      <div className="flex items-center gap-3 flex-wrap mb-3">
        <PriorityBadge level={token.priority?.level} />
        <div className="flex items-center gap-1 text-sm">
          <Clock size={14} style={{ color: 'var(--color-mustard)' }} />
          <span>{formatWaitTime(token.estimatedWaitMinutes)}</span>
        </div>
        {token.isAppointment && (
          <span className="memphis-badge" style={{ backgroundColor: 'var(--color-sky)', color: 'white' }}>
            <Calendar size={12} />
            Appointment
          </span>
        )}
      </div>

      {/* Priority Reason */}
      {token.priority?.reason && (
        <p className="text-sm italic opacity-60 mb-2">
          "{token.priority.reason}"
        </p>
      )}

      {/* Notes */}
      {token.notes && !token.notes.startsWith('[Processed by fallback') && (
        <p className="text-xs bg-cream/50 rounded-lg p-2 mt-2" style={{ backgroundColor: 'rgba(245,239,226,0.5)' }}>
          📝 {token.notes}
        </p>
      )}

      {/* Created time */}
      <p className="text-xs opacity-40 mt-3">
        Created: {formatTime(token.createdAt)}
      </p>
    </div>
  );
}
