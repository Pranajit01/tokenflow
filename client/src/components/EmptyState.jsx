/**
 * EmptyState.jsx — "No one waiting" empty state
 */

import { Coffee } from 'lucide-react';

export default function EmptyState({ message = "No one is waiting right now", subtitle = "The queue is empty — check back soon!" }) {
  return (
    <div className="memphis-card p-10 text-center">
      <div
        className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-cream)', border: '3px solid var(--color-ink)' }}
      >
        <Coffee size={36} style={{ color: 'var(--color-teal)' }} />
      </div>
      <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
        {message}
      </h3>
      <p className="text-sm opacity-60">{subtitle}</p>
    </div>
  );
}
