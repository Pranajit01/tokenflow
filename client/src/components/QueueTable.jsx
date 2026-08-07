/**
 * QueueTable.jsx — Reusable queue display table
 */

import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { formatWaitTime } from '../utils/formatTime';

export default function QueueTable({ queue }) {
  if (!queue || queue.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
        <thead>
          <tr>
            <th className="text-left px-4 py-2 text-sm font-bold opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>#</th>
            <th className="text-left px-4 py-2 text-sm font-bold opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>Token</th>
            <th className="text-left px-4 py-2 text-sm font-bold opacity-60 hidden sm:table-cell" style={{ fontFamily: 'var(--font-heading)' }}>Service</th>
            <th className="text-left px-4 py-2 text-sm font-bold opacity-60 hidden md:table-cell" style={{ fontFamily: 'var(--font-heading)' }}>Department</th>
            <th className="text-left px-4 py-2 text-sm font-bold opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>Priority</th>
            <th className="text-left px-4 py-2 text-sm font-bold opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>Status</th>
            <th className="text-left px-4 py-2 text-sm font-bold opacity-60 hidden sm:table-cell" style={{ fontFamily: 'var(--font-heading)' }}>Wait</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((entry) => (
            <tr
              key={entry.tokenId}
              className="transition-all"
              style={{
                backgroundColor: entry.status === 'serving' ? 'rgba(18,179,164,0.1)' : 'white',
                border: entry.status === 'serving' ? '3px solid var(--color-teal)' : '3px solid var(--color-ink)',
                borderRadius: '12px',
              }}
            >
              <td className="px-4 py-3 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {entry.status === 'serving' ? '▶' : entry.position || '-'}
              </td>
              <td className="px-4 py-3">
                <span className="font-bold" style={{ color: 'var(--color-teal)', fontFamily: 'var(--font-heading)' }}>
                  {entry.tokenId}
                </span>
              </td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">{entry.service}</td>
              <td className="px-4 py-3 text-sm hidden md:table-cell">{entry.department}</td>
              <td className="px-4 py-3">
                <PriorityBadge level={entry.priority?.level} showIcon={false} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={entry.status} />
              </td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">
                {formatWaitTime(entry.estimatedWaitMinutes)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
