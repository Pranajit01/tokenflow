/**
 * QueueTable.jsx — Reusable queue display table
 */

import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { formatWaitTime } from '../utils/formatTime';

export default function QueueTable({ queue }) {
  if (!queue || queue.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0e121e]/80 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-xs font-mono text-white/50 uppercase tracking-wider">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Token ID</th>
            <th className="px-4 py-3 hidden sm:table-cell">Service</th>
            <th className="px-4 py-3 hidden md:table-cell">Department</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 hidden sm:table-cell">Est. Wait</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm">
          {queue.map((entry) => (
            <tr
              key={entry.tokenId}
              className={`transition-colors ${
                entry.status === 'serving'
                  ? 'bg-[#12b3a4]/10 font-semibold'
                  : 'hover:bg-white/[0.03]'
              }`}
            >
              <td className="px-4 py-3.5 font-mono text-xs text-white/70">
                {entry.status === 'serving' ? (
                  <span className="text-[#12b3a4] flex items-center gap-1 font-bold">
                    <span>▶</span> SERVING
                  </span>
                ) : (
                  entry.position || '-'
                )}
              </td>
              <td className="px-4 py-3.5">
                <span className="font-mono font-bold text-[#12b3a4]">
                  {entry.tokenId}
                </span>
              </td>
              <td className="px-4 py-3.5 text-white/90 hidden sm:table-cell">{entry.service}</td>
              <td className="px-4 py-3.5 text-white/60 text-xs hidden md:table-cell">{entry.department}</td>
              <td className="px-4 py-3.5">
                <PriorityBadge level={entry.priority?.level} showIcon={false} />
              </td>
              <td className="px-4 py-3.5">
                <StatusBadge status={entry.status} />
              </td>
              <td className="px-4 py-3.5 text-xs font-mono text-white/70 hidden sm:table-cell">
                {formatWaitTime(entry.estimatedWaitMinutes)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
