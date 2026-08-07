/**
 * TokenCard.jsx — Display a single token with clean dark theme styling
 */

import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { formatWaitTime, formatTime } from '../utils/formatTime';
import { Building2, Clock, Calendar, FileText } from 'lucide-react';

export default function TokenCard({ token, highlighted = false }) {
  if (!token) return null;

  return (
    <div
      className={`space-card p-5 ${
        highlighted ? 'border-[#12b3a4] shadow-[0_0_25px_rgba(18,179,164,0.25)]' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold font-mono tracking-wider text-[#12b3a4]">
          {token.tokenId}
        </h3>
        <StatusBadge status={token.status} />
      </div>

      {/* Service & Department */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Building2 size={16} className="text-[#3aa0ff]" />
          <span>{token.service}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <FileText size={14} className="text-white/40" />
          <span>{token.department}</span>
        </div>
      </div>

      {/* Priority & Wait */}
      <div className="flex items-center gap-2.5 flex-wrap mb-3">
        <PriorityBadge level={token.priority?.level} />
        <div className="flex items-center gap-1 text-xs text-white/80 font-mono bg-white/5 px-2.5 py-1 rounded border border-white/10">
          <Clock size={13} className="text-[#ffc531]" />
          <span>{formatWaitTime(token.estimatedWaitMinutes)}</span>
        </div>
        {token.isAppointment && (
          <span className="space-badge bg-[#3aa0ff]/20 text-[#3aa0ff] border-[#3aa0ff]/40">
            <Calendar size={12} />
            Appointment
          </span>
        )}
      </div>

      {/* Priority Reason */}
      {token.priority?.reason && (
        <p className="text-xs italic text-white/60 mb-2">
          "{token.priority.reason}"
        </p>
      )}

      {/* Notes */}
      {token.notes && !token.notes.startsWith('[Processed by fallback') && (
        <p className="text-xs bg-black/40 border border-white/10 rounded-lg p-2.5 mt-2 text-white/70 font-mono">
          📝 {token.notes}
        </p>
      )}

      {/* Timestamp */}
      <p className="text-[11px] font-mono text-white/40 mt-3 pt-2 border-t border-white/5">
        Created at: {formatTime(token.createdAt)}
      </p>
    </div>
  );
}
